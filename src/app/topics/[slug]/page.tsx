import type { ReactElement } from 'react';
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
import { getModuleColorClasses, type ModuleColorClasses } from '@/lib/module-colors';
import { getTopics } from '@/lib/topics';
import type { Topic } from '@/lib/topics';
import { getReadingsForTopic, type Reading } from '@/lib/readings';
import { getTopicModules } from '@/lib/topic-config';
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

function EditorialSection({
  id,
  label,
  title,
  titleClassName,
  labelClassName,
  borderless,
  children,
}: {
  id?: string;
  label: string;
  title?: string;
  titleClassName?: string;
  labelClassName?: string;
  borderless?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 grid gap-8 ${
        borderless ? 'pt-10' : 'border-t border-gray-200 pt-7 dark:border-gray-800'
      }`}
    >
      <div>
        {title && (
          <h2
            className={`m-0! mb-4! text-2xl font-semibold tracking-tight text-gray-950 dark:text-gray-50 ${titleClassName || ''}`}
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}

function EditorialLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="m-0! text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
      {children}
    </h3>
  );
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
  shortTitle: string;
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

function buildNextClassReadingItems(meeting: Topic['meetings'][number]): TopicWorkItem[] {
  const meetingKey = getMeetingKey(meeting.date, meeting.topic);
  const topicSlug = meeting.slug || '';

  return (meeting.readings || []).map((reading, index) => ({
    id: `${topicSlug}-reading-${index}`,
    type: 'reading' as const,
    title: getReadingTitle(reading.citation, index, 'Assigned reading'),
    href: reading.url,
    syncKeys: [`${meetingKey}-reading-${index}`],
  }));
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

  return undefined;
}

function toDisplayLabel(value: string) {
  return value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getEmbeddedContentShortTitle(postData: PostData | null, fallbackType: EmbeddedTopicContent['type']) {
  if (postData?.type) {
    const typeLabel = toDisplayLabel(postData.type);

    if (postData.type.toLowerCase() === 'activity') {
      return typeLabel;
    }

    return postData.num ? `${typeLabel} ${postData.num}` : typeLabel;
  }

  return fallbackType === 'assignment' ? 'Assignment' : 'Activity';
}

function buildTopicWorkItems({
  topicSlug,
  meeting,
  anchorByHref = new Map<string, string>(),
}: {
  topicSlug: string;
  meeting: Topic['meetings'][number];
  anchorByHref?: Map<string, string>;
}): TopicWorkItem[] {
  const meetingKey = getMeetingKey(meeting.date, meeting.topic);
  const items: TopicWorkItem[] = [];

  (meeting.readings || []).forEach((reading, index) => {
    items.push({
      id: `reading-${index}`,
      type: 'reading',
      title: getReadingTitle(reading.citation, index, 'Assigned reading'),
      href: reading.url,
      syncKeys: [`${meetingKey}-reading-${index}`],
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
      syncKeys: [`${meetingKey}-activity-${index}`],
    });
  });

  const assignedItems = Array.isArray(meeting.assigned) ? meeting.assigned : meeting.assigned ? [meeting.assigned] : [];

  assignedItems.forEach((item, index) => {
    if (typeof item === 'string' || item.draft === 1) {
      return;
    }

    const assignmentSlug = getSlugFromUrl(item.url, 'assignments');

    items.push({
      id: `assigned-${index}`,
      type: 'assignment',
      title: getAssignmentTitle(item),
      label: getAssignmentWorkLabel(item),
      href: getScopedHref(item.url, anchorByHref),
      optional: true,
      syncKeys: [
        `${meetingKey}-assigned-${index}`,
        ...(assignmentSlug ? [`assignment-${assignmentSlug}`, `assignments-${assignmentSlug}`] : []),
      ],
    });
  });

  const dueItems = Array.isArray(meeting.due) ? meeting.due : meeting.due ? [meeting.due] : [];

  dueItems.forEach((item, index) => {
    if (typeof item === 'string' || item.draft === 1) {
      return;
    }

    const assignmentSlug = getSlugFromUrl(item.url, 'assignments');

    items.push({
      id: `due-${index}`,
      type: 'due',
      title: getAssignmentTitle(item),
      label: getAssignmentWorkLabel(item),
      href: getScopedHref(item.url, anchorByHref),
      meta: meeting.date,
      syncKeys: [
        `${meetingKey}-due-${index}`,
        ...(assignmentSlug ? [`assignment-${assignmentSlug}`, `assignments-${assignmentSlug}`] : []),
      ],
    });
  });

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
        shortTitle: getEmbeddedContentShortTitle(postData, candidate.type),
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
  return (
    <EditorialSection id={item.id} label={item.shortTitle} borderless>
      {item.postData ? (
        <MarkdownContent content={item.postData.content} className="embedded-topic-content" />
      ) : (
        <p className="mb-0 text-gray-700 dark:text-gray-300">
          This item has a standalone page, but it could not be embedded here.
        </p>
      )}
    </EditorialSection>
  );
}

function TopicHeader({
  moduleColor,
  number,
  date,
  moduleId,
  moduleTitle,
  title,
  subtitle,
}: {
  moduleColor: ModuleColorClasses;
  number: string;
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
    <nav className="flex items-start justify-between gap-8 border-t border-gray-200 pt-8 dark:border-gray-800" aria-label="Topic navigation">
      {previousTopic ? (
        <Link
          href={`/topics/${previousTopic.slug}`}
          className="min-w-0 max-w-[48%] text-sm text-gray-600 no-underline hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
        >
          ← {previousTopic.title}
        </Link>
      ) : (
        <span />
      )}

      {nextTopic ? (
        <Link
          href={`/topics/${nextTopic.slug}`}
          className="min-w-0 max-w-[48%] text-right text-sm text-gray-600 no-underline hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
        >
          {nextTopic.title} →
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

  const assignedItems = Array.isArray(meeting.assigned) ? meeting.assigned : meeting.assigned ? [meeting.assigned] : [];

  const dueItems = Array.isArray(meeting.due) ? meeting.due : meeting.due ? [meeting.due] : [];

  const readings = meeting.readings || [];
  const optionalReadings = meeting.optionalReadings || [];
  const bibliographyReadings = getReadingsForTopic(meeting.scheduledDay);
  const activities = (meeting.activities || []).filter(activity => activity.excluded !== 1);
  const topicPostData = meeting.topicContentId
    ? await getPostData(meeting.topicContentId, 'topics').catch(() => null)
    : null;
  const embeddedTopicContent = await getEmbeddedTopicContent(meeting);
  const anchorByHref = new Map(embeddedTopicContent.map(item => [normalizeHref(item.sourceHref), item.contentHref]));
  const topicWorkItems = buildTopicWorkItems({
    topicSlug: meeting.slug || slug,
    meeting,
    anchorByHref,
  });
  const nextClassMeeting = getNextClassMeeting(topics, meeting.slug || slug);
  const nextClassReadingItems = nextClassMeeting ? buildNextClassReadingItems(nextClassMeeting) : [];
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

  if (readings.length > 0 || optionalReadings.length > 0 || bibliographyReadings.length > 0) {
    topicSections.push({
      navItem: { id: 'read-watch', label: 'Read / Watch' },
      panel: (
        <EditorialSection key="read-watch" label="Materials" title="Readings">
          <div className="space-y-6">
            {readings.length > 0 && (
              <div className="space-y-3">
                <EditorialLabel>Assigned Readings</EditorialLabel>
                <ul className="m-0! list-disc divide-y divide-gray-200 pl-8! dark:divide-gray-800">
                  {readings.map((reading, index) => (
                    <li
                      key={`${meeting.slug}-reading-${index}`}
                      className="py-3 text-sm leading-6 text-gray-800 dark:text-gray-200"
                    >
                      {renderReading(reading.citation, reading.url)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {optionalReadings.length > 0 && (
              <div className="space-y-3">
                <EditorialLabel>Optional Or Recommended</EditorialLabel>
                <ul className="m-0! list-disc divide-y divide-gray-200 pl-8! dark:divide-gray-800">
                  {optionalReadings.map((reading, index) => (
                    <li
                      key={`${meeting.slug}-optional-reading-${index}`}
                      className="py-3 text-sm leading-6 text-gray-800 dark:text-gray-200"
                    >
                      {renderReading(reading.citation, reading.url)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {bibliographyReadings.length > 0 && (
              <div className="space-y-3">
                <EditorialLabel>Field Guide Bibliography</EditorialLabel>
                <ul className="m-0! list-disc divide-y divide-gray-200 pl-8! dark:divide-gray-800">
                  {bibliographyReadings.map((reading: Reading) => (
                    <li key={reading.id} className="py-3 text-sm leading-6 text-gray-800 dark:text-gray-200">
                      <a href={reading.url} target="_blank" rel="noopener noreferrer" className="font-medium">
                        {reading.title}
                      </a>
                      {reading.authors && (
                        <span className="text-gray-600 dark:text-gray-400"> — {reading.authors}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </EditorialSection>
      ),
    });
  }

  embeddedTopicContent.forEach(item => {
    topicSections.push({
      navItem: {
        id: item.id,
        label: item.shortTitle,
      },
      panel: <EmbeddedTopicContentSection key={item.id} item={item} />,
    });
  });

  if (topicWorkItems.length > 0 || nextClassReadingItems.length > 0) {
    topicSections.push({
      navItem: { id: 'topic-work', label: 'Checklist' },
      panel: (
        <TopicWorkList
          key="topic-work"
          topicSlug={meeting.slug || slug}
          items={topicWorkItems}
          upcomingItems={nextClassReadingItems}
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
      <div className="space-y-8">
        <Breadcrumbs
          className="px-4 md:px-16"
          items={[
            { label: 'Modules', href: '/modules' },
            { label: `${topic.id}. ${topic.title}` },
            { label: `${topicNumber} ${meeting.topic}` },
          ]}
        />

        <TopicHeader
          moduleColor={moduleColor}
          number={topicNumber}
          date={meeting.date}
          moduleId={topic.id}
          moduleTitle={topic.title}
          title={meeting.topic}
          subtitle={meeting.subtitle}
        />

        <div className="space-y-10 px-4 md:px-16">
          <TopicSectionNav items={topicSections.map(section => section.navItem)}>
            {topicSections.map(section => section.panel)}
          </TopicSectionNav>

          <div id="topic-sequence" className="scroll-mt-24">
            <TopicSequenceNav previousTopic={previousTopic} nextTopic={nextTopic} />
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
