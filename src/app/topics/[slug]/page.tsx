import { Fragment, type ReactElement } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContentLayout from '@/components/ContentLayout';
import HorizontalCardStrip from '@/components/HorizontalCardStrip';
import type { HorizontalCardStripItem } from '@/components/HorizontalCardStrip';
import MarkdownContent from '@/components/MarkdownContent';
import TopicSectionNav from '@/components/TopicSectionNav';
import type { TopicSectionNavItem } from '@/components/TopicSectionNav';
import TopicWorkList from '@/components/TopicWorkList';
import type { TopicWorkItem } from '@/components/TopicWorkList';
import { getPostData } from '@/lib/markdown';
import type { PostData } from '@/lib/markdown';
import { getDateForScheduledDay, getDueDateForScheduledDay } from '@/lib/course-calendar';
import { getModuleColorClasses, type ModuleColorClasses } from '@/lib/module-colors';
import { getTopics } from '@/lib/topics';
import type { Topic } from '@/lib/topics';
import { getReadingsForTopic, type Reading } from '@/lib/readings';
import { getTopicModules } from '@/lib/topic-config';
import { formatDate } from '@/lib/utils';
import StatusBanner from '@/components/StatusBanner';

interface TopicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return getTopicModules().flatMap(module =>
    module.meetings.map(meeting => ({
      slug: meeting.slug,
    }))
  );
}

function renderReading(citation: string | ReactElement, url?: string) {
  if (typeof citation === 'string') {
    if (url) {
      return (
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          {citation}
        </Link>
      );
    }

    return citation;
  }

  return citation;
}

function decodeHtmlText(text: string) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x26;/gi, '&')
    .replace(/&#38;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function getPlainTextFromHtml(html: string) {
  return decodeHtmlText(html.replace(/<[^>]+>/g, '').trim());
}

function slugifyForId(value: string) {
  return value
    .toLowerCase()
    .replace(/&amp;/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function splitHtmlByHeading(content: string, headingLevel: 2 | 3) {
  const headingRegex = new RegExp(`<h${headingLevel}[^>]*>([\\s\\S]*?)<\\/h${headingLevel}>`, 'gi');
  const sections: Array<{ label: string; content: string; headingHtml: string }> = [];
  let currentLabel = '';
  let currentHeadingHtml = '';
  let currentStart = 0;
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const sectionContent = content.slice(currentStart, match.index).trim();

    if (sectionContent) {
      sections.push({
        label: currentLabel,
        content: sectionContent,
        headingHtml: currentHeadingHtml,
      });
    }

    currentLabel = getPlainTextFromHtml(match[1]);
    currentHeadingHtml = match[0];
    currentStart = match.index + match[0].length;
  }

  const finalContent = content.slice(currentStart).trim();
  if (finalContent) {
    sections.push({
      label: currentLabel,
      content: finalContent,
      headingHtml: currentHeadingHtml,
    });
  }

  return sections;
}

function splitSlideCards(content: string): {
  intro: string;
  items: HorizontalCardStripItem[];
} {
  const sections = splitHtmlByHeading(content, 3);
  const items: HorizontalCardStripItem[] = [];
  let intro = '';

  sections.forEach(section => {
    if (!section.label) {
      intro = section.content;
      return;
    }

    items.push({
      id: slugifyForId(section.label),
      label: section.label,
      content: section.content,
    });
  });

  return { intro, items };
}

// Hidden for now: these sections exist in the source markdown but aren't shown to students yet.
const HIDDEN_OVERVIEW_SECTION_LABELS = new Set(['career / braid integration', 'field guide & resources']);

function removeHiddenOverviewSections(content: string): string {
  const rawSections = splitHtmlByHeading(content, 2);

  if (!rawSections.some(section => HIDDEN_OVERVIEW_SECTION_LABELS.has(section.label.toLowerCase()))) {
    return content;
  }

  return rawSections
    .filter(section => !HIDDEN_OVERVIEW_SECTION_LABELS.has(section.label.toLowerCase()))
    .map(section => `${section.headingHtml}${section.content}`)
    .join('');
}

function TopicOverviewMarkdown({ content }: { content: string }) {
  const visibleContent = removeHiddenOverviewSections(content);
  const sections = splitHtmlByHeading(visibleContent, 2);

  if (!sections.some(section => section.label.toLowerCase() === 'slides')) {
    return <MarkdownContent content={visibleContent} />;
  }

  return (
    <div className="space-y-8">
      {sections.map((section, index) => {
        const key = `${section.label || 'intro'}-${index}`;

        if (section.label.toLowerCase() !== 'slides') {
          return <MarkdownContent key={key} content={`${section.headingHtml}${section.content}`} />;
        }

        const { intro, items } = splitSlideCards(section.content);

        return (
          <div key={key} className="min-w-0 space-y-4">
            <MarkdownContent content={section.headingHtml} />
            <HorizontalCardStrip
              intro={intro}
              items={items}
              cardClassName="bg-yellow-50 dark:bg-yellow-950/20"
              cardLayoutClassName="w-[22rem] p-6 sm:w-[28rem]"
              cardContentClassName="[&_p]:text-base [&_ul]:pl-5! [&_li]:my-1.5"
            />
          </div>
        );
      })}
    </div>
  );
}

function ClassWorkSubhead({ children }: { children: React.ReactNode }) {
  return <h3 className="m-0! mb-3 text-base font-medium text-gray-950 dark:text-gray-50">{children}</h3>;
}

function ClassWorkList({ children }: { children: React.ReactNode }) {
  return <ul className="m-0! list-none space-y-3 p-0!">{children}</ul>;
}

interface TopicNavigationItem {
  slug: string;
  title: string;
  number: string;
}

interface EmbeddedTopicContent {
  id: string;
  type: 'assignment' | 'activity';
  title: string;
  sourceHref: string;
  contentHref: string;
  postData: PostData | null;
}

function getMeetingTopicNumber(topic: Topic, meetingIndex: number) {
  return `${topic.id}.${meetingIndex + 1}`;
}

function getTopicNavigationItems(topics: Topic[]): TopicNavigationItem[] {
  return topics.flatMap(topic =>
    topic.meetings.flatMap((meeting, index) =>
      meeting.slug
        ? [
            {
              slug: meeting.slug,
              title: meeting.topic,
              number: getMeetingTopicNumber(topic, index),
            },
          ]
        : []
    )
  );
}

function findTopicMeeting(topics: Topic[], slug: string) {
  for (const topic of topics) {
    const meetingIndex = topic.meetings.findIndex(meeting => meeting.slug === slug);

    if (meetingIndex !== -1) {
      return {
        topic,
        meeting: topic.meetings[meetingIndex],
        meetingIndex,
      };
    }
  }

  return null;
}

function getNextClassMeeting(topics: Topic[], currentSlug: string) {
  const navigationItems = getTopicNavigationItems(topics);
  const currentIndex = navigationItems.findIndex(item => item.slug === currentSlug);

  for (let index = currentIndex + 1; index < navigationItems.length; index += 1) {
    const result = findTopicMeeting(topics, navigationItems[index].slug);

    if (result && !result.meeting.holiday) {
      return result.meeting;
    }
  }

  return null;
}

function buildNextClassPrepItems(meeting: Topic['meetings'][number]): TopicWorkItem[] {
  const meetingKey = getMeetingKey(meeting.date, meeting.topic);
  const topicSlug = meeting.slug || '';
  const items: TopicWorkItem[] = (meeting.readings || []).map((reading, index) => ({
    id: `${topicSlug}-reading-${index}`,
    type: 'reading' as const,
    title: getReadingTitle(reading.citation, index, 'Assigned reading'),
    href: reading.url,
    assignedDate: meeting.date,
    dueDate: meeting.date,
    submissionMethod: 'N/A — discussion only',
    syncKeys: [`${meetingKey}-reading-${index}`],
  }));

  const dueItems = Array.isArray(meeting.due) ? meeting.due : meeting.due ? [meeting.due] : [];
  dueItems.forEach((item, index) => {
    if (typeof item === 'string' || item.draft === 1 || !isPrepAssignment(item)) {
      return;
    }

    items.push({
      id: `${topicSlug}-due-${index}`,
      type: 'due',
      title: getAssignmentTitle(item),
      label: getAssignmentWorkLabel(item),
      href: item.url,
      assignedDate: meeting.date,
      dueDate: meeting.date,
      submissionMethod: 'Canvas',
      syncKeys: [`${meetingKey}-due-${index}`],
    });
  });

  return items;
}

function getMeetingKey(date: string, topicTitle: string) {
  return `meeting-${date}-${topicTitle.replace(/\s+/g, '-').toLowerCase()}`;
}

function getSlugFromUrl(url: string | undefined, contentType: 'assignments' | 'activities') {
  return url?.match(new RegExp(`/${contentType}/([^/]+)/?`))?.[1];
}

function normalizeHref(href: string | undefined) {
  return href?.replace(/^\/fall2026/, '').replace(/\/$/, '') || '';
}

function getScopedHref(href: string | undefined, anchorByHref: Map<string, string>) {
  if (!href) {
    return undefined;
  }

  return anchorByHref.get(normalizeHref(href)) || href;
}

function getReadingTitle(citation: string | ReactElement, index: number, fallback: string) {
  return typeof citation === 'string' ? citation : `${fallback} ${index + 1}`;
}

function getAssignmentTitle(item: { titleShort?: string; title: string }) {
  return item.titleShort ? `${item.titleShort}: ${item.title}` : item.title;
}

function getAssignmentWorkLabel(item: { type?: string; url?: string }) {
  const normalizedType = item.type?.toLowerCase();
  const assignmentSlug = getSlugFromUrl(item.url, 'assignments') || '';

  if (normalizedType === 'career module' || assignmentSlug.startsWith('career-module')) {
    return 'Career Module';
  }

  if (normalizedType === 'lab' || assignmentSlug.startsWith('lab')) {
    return 'Lab';
  }

  if (normalizedType === 'homework' || normalizedType === 'assignment' || assignmentSlug.startsWith('hw')) {
    return 'Homework';
  }

  return undefined;
}

function isPrepAssignment(item: { type?: string; url?: string }) {
  const label = getAssignmentWorkLabel(item);
  return label === 'Homework';
}

async function getAssignmentScheduleDates(url?: string) {
  const slug = getSlugFromUrl(url, 'assignments');
  if (!slug) {
    return { assignedDate: undefined as string | undefined, dueDate: undefined as string | undefined };
  }

  try {
    const post = await getPostData(slug, 'assignments');
    const assignedIso = getDateForScheduledDay(post.scheduled_day);
    const dueIso = getDueDateForScheduledDay(post.scheduled_day) || post.due_date;
    return {
      assignedDate: assignedIso ? formatDate(assignedIso) : undefined,
      dueDate: dueIso ? formatDate(dueIso) : undefined,
    };
  } catch {
    return { assignedDate: undefined as string | undefined, dueDate: undefined as string | undefined };
  }
}

function contentStartsWithHeading(html: string | undefined) {
  return Boolean(html?.trim().match(/^<h[1-3]\b/i));
}

async function buildTopicWorkItems({
  topicSlug,
  meeting,
  anchorByHref = new Map<string, string>(),
}: {
  topicSlug: string;
  meeting: Topic['meetings'][number];
  anchorByHref?: Map<string, string>;
}): Promise<TopicWorkItem[]> {
  const meetingKey = getMeetingKey(meeting.date, meeting.topic);
  const items: TopicWorkItem[] = [];

  (meeting.readings || []).forEach((reading, index) => {
    items.push({
      id: `reading-${index}`,
      type: 'reading',
      title: getReadingTitle(reading.citation, index, 'Assigned reading'),
      href: reading.url,
      assignedDate: meeting.date,
      dueDate: meeting.date,
      submissionMethod: 'N/A — discussion only',
      syncKeys: [`${meetingKey}-reading-${index}`],
    });
  });

  (meeting.optionalReadings || []).forEach((reading, index) => {
    items.push({
      id: `optional-reading-${index}`,
      type: 'optional-reading',
      title: getReadingTitle(reading.citation, index, 'Optional reading'),
      href: reading.url,
      assignedDate: meeting.date,
      dueDate: meeting.date,
      submissionMethod: 'N/A — discussion only',
      optional: true,
      syncKeys: [`${meetingKey}-optional-reading-${index}`],
    });
  });

  (meeting.activities || []).forEach((activity, index) => {
    if (activity.excluded === 1 || activity.draft === 1) {
      return;
    }

    items.push({
      id: `activity-${index}`,
      type: 'activity',
      title: activity.title,
      label: getAssignmentWorkLabel(activity),
      href: getScopedHref(activity.url, anchorByHref),
      assignedDate: meeting.date,
      dueDate: meeting.date,
      submissionMethod: 'In class',
      syncKeys: [`${meetingKey}-activity-${index}`],
    });
  });

  const assignedItems = Array.isArray(meeting.assigned) ? meeting.assigned : meeting.assigned ? [meeting.assigned] : [];

  for (const [index, item] of assignedItems.entries()) {
    if (typeof item === 'string' || item.draft === 1) {
      continue;
    }

    const assignmentSlug = getSlugFromUrl(item.url, 'assignments');
    const dates = await getAssignmentScheduleDates(item.url);

    items.push({
      id: `assigned-${index}`,
      type: 'assignment',
      title: getAssignmentTitle(item),
      label: getAssignmentWorkLabel(item),
      href: getScopedHref(item.url, anchorByHref),
      assignedDate: dates.assignedDate || meeting.date,
      dueDate: dates.dueDate || meeting.date,
      submissionMethod: 'Canvas',
      optional: true,
      syncKeys: [
        `${meetingKey}-assigned-${index}`,
        ...(assignmentSlug ? [`assignment-${assignmentSlug}`, `assignments-${assignmentSlug}`] : []),
      ],
    });
  }

  const dueItems = Array.isArray(meeting.due) ? meeting.due : meeting.due ? [meeting.due] : [];

  for (const [index, item] of dueItems.entries()) {
    if (typeof item === 'string' || item.draft === 1) {
      continue;
    }

    const assignmentSlug = getSlugFromUrl(item.url, 'assignments');
    const dates = await getAssignmentScheduleDates(item.url);

    items.push({
      id: `due-${index}`,
      type: 'due',
      title: getAssignmentTitle(item),
      label: getAssignmentWorkLabel(item),
      href: getScopedHref(item.url, anchorByHref),
      assignedDate: dates.assignedDate || meeting.date,
      dueDate: dates.dueDate || meeting.date,
      submissionMethod: 'Canvas',
      syncKeys: [
        `${meetingKey}-due-${index}`,
        ...(assignmentSlug ? [`assignment-${assignmentSlug}`, `assignments-${assignmentSlug}`] : []),
      ],
    });
  }

  return items.map(item => ({
    ...item,
    id: `${topicSlug}-${item.id}`,
  }));
}

function collectEmbeddedContentCandidates(meeting: Topic['meetings'][number]) {
  const candidates: Array<{
    type: 'assignment' | 'activity';
    title: string;
    href: string;
    contentType: 'assignments' | 'activities';
    slug: string;
  }> = [];

  (meeting.activities || []).forEach(activity => {
    if (activity.excluded === 1 || activity.draft === 1 || !activity.url) {
      return;
    }

    const assignmentSlug = getSlugFromUrl(activity.url, 'assignments');
    const activitySlug = getSlugFromUrl(activity.url, 'activities');

    if (assignmentSlug || activitySlug) {
      candidates.push({
        type: assignmentSlug ? 'assignment' : 'activity',
        title: activity.title,
        href: activity.url,
        contentType: assignmentSlug ? 'assignments' : 'activities',
        slug: assignmentSlug || activitySlug || '',
      });
    }
  });

  const assignmentItems = [
    ...(Array.isArray(meeting.assigned) ? meeting.assigned : meeting.assigned ? [meeting.assigned] : []),
    ...(Array.isArray(meeting.due) ? meeting.due : meeting.due ? [meeting.due] : []),
  ];

  assignmentItems.forEach(item => {
    if (typeof item === 'string' || item.draft === 1 || !item.url) {
      return;
    }

    const assignmentSlug = getSlugFromUrl(item.url, 'assignments');
    if (assignmentSlug) {
      candidates.push({
        type: 'assignment',
        title: getAssignmentTitle(item),
        href: item.url,
        contentType: 'assignments',
        slug: assignmentSlug,
      });
    }
  });

  const seen = new Set<string>();
  return candidates.filter(candidate => {
    const key = normalizeHref(candidate.href);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

async function getEmbeddedTopicContent(meeting: Topic['meetings'][number]): Promise<EmbeddedTopicContent[]> {
  const candidates = collectEmbeddedContentCandidates(meeting);

  return Promise.all(
    candidates.map(async (candidate, index) => {
      const id = `topic-work-${candidate.type}-${candidate.slug || index}`;
      let postData: PostData | null = null;

      try {
        postData = await getPostData(candidate.slug, candidate.contentType);
      } catch {
        postData = null;
      }

      return {
        id,
        type: candidate.type,
        title: postData?.title || candidate.title,
        sourceHref: candidate.href,
        contentHref: `#${id}`,
        postData,
      };
    })
  );
}

function EmbeddedTopicContentSection({
  item,
}: {
  item: EmbeddedTopicContent;
}) {
  const showTitle = Boolean(item.title) && !contentStartsWithHeading(item.postData?.content);

  return (
    <section id={item.id} className="scroll-mt-24 space-y-4">
      {showTitle && (
        <h3 className="m-0! text-xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">
          {item.title}
        </h3>
      )}
      {item.postData ? (
        <MarkdownContent content={item.postData.content} className="embedded-topic-content" />
      ) : (
        <p className="mb-0 text-gray-700 dark:text-gray-300">
          This item has a standalone page, but it could not be embedded here.
        </p>
      )}
    </section>
  );
}

function TopicClassWorkPanel({
  readings,
  optionalReadings,
  bibliographyReadings,
  prepAssignments,
  embeddedTopicContent,
  meetingSlug,
}: {
  readings: Topic['meetings'][number]['readings'];
  optionalReadings: Topic['meetings'][number]['optionalReadings'];
  bibliographyReadings: Reading[];
  prepAssignments: Array<{ title: string; href?: string }>;
  embeddedTopicContent: EmbeddedTopicContent[];
  meetingSlug?: string;
}) {
  const assignedReadings = readings || [];
  const extraReadings = optionalReadings || [];
  const hasBeforeClass =
    assignedReadings.length > 0 || extraReadings.length > 0 || bibliographyReadings.length > 0 || prepAssignments.length > 0;
  const hasInClass = true;

  return (
    <div className="max-w-4xl space-y-12">
      {hasBeforeClass && (
        <section>
          <h2 className="mt-0 mb-5 text-xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">
            Before class
          </h2>
          <div className="space-y-8">
            {assignedReadings.length > 0 && (
              <div>
                <ClassWorkSubhead>Assigned readings</ClassWorkSubhead>
                <ClassWorkList>
                  {assignedReadings.map((reading, index) => (
                    <li
                      key={`${meetingSlug}-reading-${index}`}
                      className="text-base leading-7 text-gray-800 dark:text-gray-200"
                    >
                      {renderReading(reading.citation, reading.url)}
                    </li>
                  ))}
                </ClassWorkList>
              </div>
            )}

            {extraReadings.length > 0 && (
              <div>
                <ClassWorkSubhead>Optional</ClassWorkSubhead>
                <ClassWorkList>
                  {extraReadings.map((reading, index) => (
                    <li
                      key={`${meetingSlug}-optional-reading-${index}`}
                      className="text-base leading-7 text-gray-800 dark:text-gray-200"
                    >
                      {renderReading(reading.citation, reading.url)}
                    </li>
                  ))}
                </ClassWorkList>
              </div>
            )}

            {bibliographyReadings.length > 0 && (
              <div>
                <ClassWorkSubhead>Field Guide bibliography</ClassWorkSubhead>
                <ClassWorkList>
                  {bibliographyReadings.map((reading: Reading) => (
                    <li key={reading.id} className="text-base leading-7 text-gray-800 dark:text-gray-200">
                      <a href={reading.url} target="_blank" rel="noopener noreferrer" className="font-medium">
                        {reading.title}
                      </a>
                      {reading.authors && (
                        <span className="text-gray-500 dark:text-gray-400"> — {reading.authors}</span>
                      )}
                    </li>
                  ))}
                </ClassWorkList>
              </div>
            )}

            {prepAssignments.length > 0 && (
              <div>
                <ClassWorkSubhead>Due before class</ClassWorkSubhead>
                <ClassWorkList>
                  {prepAssignments.map((item, index) => (
                    <li
                      key={`${meetingSlug}-prep-${index}`}
                      className="text-base leading-7 text-gray-800 dark:text-gray-200"
                    >
                      {item.href ? (
                        <Link href={item.href} className="text-gray-950 no-underline hover:underline dark:text-gray-50">
                          {item.title}
                        </Link>
                      ) : (
                        item.title
                      )}
                    </li>
                  ))}
                </ClassWorkList>
              </div>
            )}
          </div>
        </section>
      )}

      {hasInClass && (
        <section>
          {hasBeforeClass && (
            <h2 className="mt-0 mb-5 text-xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">
              In class
            </h2>
          )}
          {embeddedTopicContent.length > 0 ? (
            <div className="space-y-12">
              {embeddedTopicContent.map(item => (
                <EmbeddedTopicContentSection key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="mb-0 text-lg leading-8 text-gray-600 dark:text-gray-400">
              This meeting is a seminar discussion. Use the Overview tab for the day&apos;s focus, guiding questions, and
              plan.
            </p>
          )}
        </section>
      )}
    </div>
  );
}

function TopicHeader({
  moduleColor,
  date,
  moduleId,
  moduleTitle,
  title,
  subtitle,
}: {
  moduleColor: ModuleColorClasses;
  date?: string;
  moduleId: number;
  moduleTitle: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header
      className={`grid gap-6 border-y px-4 py-16 ${moduleColor.background} ${moduleColor.border} md:grid-cols-[10rem_1fr] md:px-16`}
    >
      <div
        className={`flex flex-col justify-center border-b pb-4 ${moduleColor.border} md:border-b-0 md:border-r md:pb-0 md:pr-5`}
      >
        <p className="mt-0! text-xl text-center font-bold uppercase tracking-wide text-gray-600 dark:text-gray-400">
          {date ? date : 'Overview'}
        </p>
      </div>
      <div>
        <div className="mb-4 text-xs font-semibold uppercase tracking-wide">
          <span className={moduleColor.accent}>
            Module {moduleId}. {moduleTitle}
          </span>
        </div>
        <h1 className="m-0! max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-950 dark:text-gray-50">
          {title}
        </h1>
        {subtitle && (
          <p className="mb-0 mt-5 max-w-4xl text-lg leading-8 text-gray-700 dark:text-gray-300">{subtitle}</p>
        )}
      </div>
    </header>
  );
}

function TopicSequenceNav({
  previousTopic,
  nextTopic,
}: {
  previousTopic: TopicNavigationItem | null;
  nextTopic: TopicNavigationItem | null;
}) {
  if (!previousTopic && !nextTopic) {
    return null;
  }

  return (
    <nav
      className="mt-16 flex items-start justify-between gap-8 border-t border-gray-200 pt-10 dark:border-gray-800"
      aria-label="Topic navigation"
    >
      {previousTopic ? (
        <Link
          href={`/topics/${previousTopic.slug}`}
          className="group min-w-0 max-w-[48%] no-underline"
        >
          <span className="block text-sm text-gray-500 dark:text-gray-400">Previous</span>
          <span className="mt-1 block text-base font-medium text-gray-950 group-hover:text-gray-600 dark:text-gray-50 dark:group-hover:text-gray-300">
            {previousTopic.title}
          </span>
        </Link>
      ) : (
        <span />
      )}

      {nextTopic ? (
        <Link
          href={`/topics/${nextTopic.slug}`}
          className="group min-w-0 max-w-[48%] text-right no-underline"
        >
          <span className="block text-sm text-gray-500 dark:text-gray-400">Next</span>
          <span className="mt-1 block text-base font-medium text-gray-950 group-hover:text-gray-600 dark:text-gray-50 dark:group-hover:text-gray-300">
            {nextTopic.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topics = await getTopics();
  const result = findTopicMeeting(topics, slug);

  if (!result) {
    notFound();
  }

  const topicNavigationItems = getTopicNavigationItems(topics);
  const currentTopicIndex = topicNavigationItems.findIndex(item => item.slug === slug);
  const previousTopic = currentTopicIndex > 0 ? topicNavigationItems[currentTopicIndex - 1] : null;
  const nextTopic =
    currentTopicIndex !== -1 && currentTopicIndex < topicNavigationItems.length - 1
      ? topicNavigationItems[currentTopicIndex + 1]
      : null;

  const { topic, meeting, meetingIndex } = result;
  const topicNumber = getMeetingTopicNumber(topic, meetingIndex);
  const moduleColor = getModuleColorClasses(topic.color);

  const readings = meeting.readings || [];
  const optionalReadings = meeting.optionalReadings || [];
  const bibliographyReadings = getReadingsForTopic(meeting.scheduledDay);
  const topicPostData = meeting.topicContentId
    ? await getPostData(meeting.topicContentId, 'topics').catch(() => null)
    : null;
  const embeddedTopicContent = await getEmbeddedTopicContent(meeting);
  const anchorByHref = new Map(embeddedTopicContent.map(item => [normalizeHref(item.sourceHref), item.contentHref]));
  const topicWorkItems = await buildTopicWorkItems({
    topicSlug: meeting.slug || slug,
    meeting,
    anchorByHref,
  });
  const nextClassMeeting = getNextClassMeeting(topics, meeting.slug || slug);
  const nextClassPrepItems = nextClassMeeting ? buildNextClassPrepItems(nextClassMeeting) : [];
  const dueItems = Array.isArray(meeting.due) ? meeting.due : meeting.due ? [meeting.due] : [];
  const prepAssignments = dueItems.flatMap(item => {
    if (typeof item === 'string' || item.draft === 1 || !isPrepAssignment(item)) {
      return [];
    }

    return [{ title: getAssignmentTitle(item), href: item.url }];
  });
  const topicSections: Array<{
    navItem: TopicSectionNavItem;
    panel: ReactElement;
  }> = [];

  topicSections.push({
    navItem: { id: 'topic-overview', label: 'Overview' },
    panel: (
      <div className="max-w-4xl">
        {topicPostData?.content.trim() ? (
          <TopicOverviewMarkdown content={topicPostData.content} />
        ) : typeof meeting.description === 'string' ? (
          <p className="mb-0 text-lg leading-8 text-gray-800 dark:text-gray-200">{meeting.description}</p>
        ) : (
          meeting.description
        )}
      </div>
    ),
  });

  if (!meeting.holiday) {
    topicSections.push({
      navItem: { id: 'topic-class-work', label: 'Class Work' },
      panel: (
        <TopicClassWorkPanel
          readings={readings}
          optionalReadings={optionalReadings}
          bibliographyReadings={bibliographyReadings}
          prepAssignments={prepAssignments}
          embeddedTopicContent={embeddedTopicContent}
          meetingSlug={meeting.slug}
        />
      ),
    });

    topicSections.push({
      navItem: { id: 'topic-work', label: 'Checklist' },
      panel: (
        <TopicWorkList
          key="topic-work"
          variant="plain"
          topicSlug={meeting.slug || slug}
          items={topicWorkItems}
          upcomingItems={nextClassPrepItems}
          thisClassTitle="For this class"
          upcomingTitle="Coming up"
          upcomingDescription={
            nextClassMeeting
              ? `${nextClassMeeting.topic}${nextClassMeeting.date ? ` · ${nextClassMeeting.date}` : ''}`
              : undefined
          }
        />
      ),
    });
  }

  return (
    <ContentLayout
      variant="detail-with-toc"
      fullWidth
      showToc={false}
      showFooter={false}
      contentPadding={false}
      header={
        topicPostData ? (
          <StatusBanner
            section="topicsAndAssignments"
            status={topicPostData.status}
            status_reviewer={topicPostData.status_reviewer}
            status_date={topicPostData.status_date}
            status_notes={topicPostData.status_notes}
            contentType="topics"
          />
        ) : undefined
      }
    >
      <div className="space-y-8 pb-16">
        <Breadcrumbs
          className="px-4 md:px-16"
          items={[
            { label: 'Course Schedule', href: '/modules' },
            { label: `${topic.id}. ${topic.title}`, href: `/modules/${topic.id}` },
            { label: `${topicNumber} ${meeting.topic}` },
          ]}
        />

        <TopicHeader
          moduleColor={moduleColor}
          date={meeting.date}
          moduleId={topic.id}
          moduleTitle={topic.title}
          title={meeting.topic}
          subtitle={meeting.subtitle}
        />

        <div className="topic-page space-y-10 px-4 md:px-16">
          <TopicSectionNav variant="plain" items={topicSections.map(section => section.navItem)}>
            {topicSections.map(section => (
              <Fragment key={section.navItem.id}>{section.panel}</Fragment>
            ))}
          </TopicSectionNav>

          <div id="topic-sequence" className="scroll-mt-24">
            <TopicSequenceNav previousTopic={previousTopic} nextTopic={nextTopic} />
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
