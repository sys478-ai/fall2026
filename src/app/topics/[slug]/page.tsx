import { Fragment, type ReactElement, type ReactNode } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContentLayout from '@/components/ContentLayout';
import HorizontalCardStrip from '@/components/HorizontalCardStrip';
import type { HorizontalCardStripItem } from '@/components/HorizontalCardStrip';
import MarkdownContent from '@/components/MarkdownContent';
import TopicSectionNav from '@/components/TopicSectionNav';
import type { TopicSectionNavItem } from '@/components/TopicSectionNav';
import { getPostData } from '@/lib/markdown';
import type { PostData } from '@/lib/markdown';
import { getModuleColorClasses, type ModuleColorClasses } from '@/lib/module-colors';
import { getTopics } from '@/lib/topics';
import type { Topic } from '@/lib/topics';
import { getReadingsForTopic, type Reading } from '@/lib/readings';
import { getTopicModules } from '@/lib/topic-config';
import { formatDate, formatDueDateTime } from '@/lib/utils';
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

const READING_LINK_CLASS =
  'text-[#0b5d8f] underline decoration-[#0b5d8f] underline-offset-2 dark:text-[#8fc4ee] dark:decoration-[#8fc4ee]';

function getCitationText(citation: string | ReactElement) {
  return typeof citation === 'string' ? citation.trim() : '';
}

function stripTrailingUrl(citation: string) {
  return citation.replace(/\s*https?:\/\/\S+\s*$/i, '').trim();
}

function renderReading(citation: string | ReactElement, url?: string) {
  if (typeof citation !== 'string') {
    return citation;
  }

  const label = stripTrailingUrl(citation) || citation;
  if (!url) {
    return label;
  }

  return (
    <>
      {label}{' '}
      <Link href={url} target="_blank" rel="noopener noreferrer" className={READING_LINK_CLASS}>
        Link
      </Link>
    </>
  );
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

function PrepGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="mt-0 mb-3 text-xl font-semibold tracking-tight text-gray-950 md:text-2xl dark:text-gray-50">
        {label}
      </h2>
      <ul className="mb-0 mt-0 list-disc space-y-2 pl-5 text-base leading-7 text-gray-800 dark:text-gray-200">
        {children}
      </ul>
    </div>
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

function getDiscussionDueLabel(item: { dueDate?: string; dueTime?: string }, meetingDate: string) {
  const dateLabel =
    item.dueDate && /^\d{4}-\d{2}-\d{2}$/.test(item.dueDate) ? formatDate(item.dueDate) : item.dueDate || meetingDate;

  return formatDueDateTime(dateLabel, item.dueTime);
}

function getPrepAssignments(meeting: Topic['meetings'][number]) {
  const dueItems = Array.isArray(meeting.due) ? meeting.due : meeting.due ? [meeting.due] : [];

  return [
    ...dueItems.flatMap(item => {
      if (typeof item === 'string' || item.draft === 1 || !isPrepAssignment(item)) {
        return [];
      }

      return [{ title: getAssignmentTitle(item), href: item.url, dueDate: meeting.date }];
    }),
    ...(meeting.discussionAssignments || []).map(item => ({
      title: item.title,
      href: item.url,
      dueDate: getDiscussionDueLabel(item, meeting.date),
      notes: item.notes,
    })),
  ];
}

function hasPrepMaterials(
  meeting: Topic['meetings'][number],
  bibliographyReadings: Reading[] = []
) {
  return (
    (meeting.readings || []).length > 0 ||
    (meeting.optionalReadings || []).length > 0 ||
    bibliographyReadings.length > 0 ||
    getPrepAssignments(meeting).length > 0
  );
}

function TopicWorkflowSection({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-label={label} className="scroll-mt-28">
      <div className="max-w-4xl">{children}</div>
    </section>
  );
}

function getSlugFromUrl(url: string | undefined, contentType: 'assignments' | 'activities') {
  return url?.match(new RegExp(`/${contentType}/([^/]+)/?`))?.[1];
}

function normalizeHref(href: string | undefined) {
  return href?.replace(/^\/fall2026/, '').replace(/\/$/, '') || '';
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

function contentStartsWithHeading(html: string | undefined) {
  return Boolean(html?.trim().match(/^<h[1-3]\b/i));
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

function TopicOverviewMaterials({
  readings,
  optionalReadings,
  bibliographyReadings,
  prepAssignments,
  meetingSlug,
}: {
  readings: Topic['meetings'][number]['readings'];
  optionalReadings: Topic['meetings'][number]['optionalReadings'];
  bibliographyReadings: Reading[];
  prepAssignments: Array<{ title: string; href?: string; dueDate?: string; notes?: string }>;
  meetingSlug?: string;
}) {
  const assignedReadings = readings || [];
  const extraReadings = optionalReadings || [];
  const hasContent =
    assignedReadings.length > 0 || extraReadings.length > 0 || bibliographyReadings.length > 0 || prepAssignments.length > 0;

  if (!hasContent) {
    return null;
  }

  return (
    <div className="space-y-10">
      {assignedReadings.length > 0 && (
        <PrepGroup label="Readings">
          {assignedReadings.map((reading, index) => (
            <li key={`${meetingSlug}-reading-${index}`}>{renderReading(reading.citation, reading.url)}</li>
          ))}
        </PrepGroup>
      )}
      {extraReadings.length > 0 && (
        <PrepGroup label="Optional">
          {extraReadings.map((reading, index) => (
            <li key={`${meetingSlug}-optional-reading-${index}`}>{renderReading(reading.citation, reading.url)}</li>
          ))}
        </PrepGroup>
      )}
      {bibliographyReadings.length > 0 && (
        <PrepGroup label="Field Guide bibliography">
          {bibliographyReadings.map((reading: Reading) => (
            <li key={reading.id}>
              <a href={reading.url} target="_blank" rel="noopener noreferrer" className="font-medium">
                {reading.title}
              </a>
              {reading.authors && <span className="text-gray-500 dark:text-gray-400"> — {reading.authors}</span>}
            </li>
          ))}
        </PrepGroup>
      )}
      {prepAssignments.length > 0 && (
        <PrepGroup label="Due">
          {prepAssignments.map((item, index) => (
            <li key={`${meetingSlug}-prep-${index}`}>
              {item.href ? (
                <Link
                  href={item.href}
                  {...(/^https?:\/\//i.test(item.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  {item.title}
                </Link>
              ) : (
                item.title
              )}
              {(item.dueDate || item.notes) && (
                <span className="mt-1 block text-sm text-gray-500 dark:text-gray-400">
                  {[item.dueDate ? `Due ${item.dueDate}` : null, item.notes].filter(Boolean).join(' · ')}
                </span>
              )}
            </li>
          ))}
        </PrepGroup>
      )}
    </div>
  );
}

function TopicClassWorkPanel({
  embeddedTopicContent,
}: {
  embeddedTopicContent: EmbeddedTopicContent[];
}) {
  return (
    <div className="space-y-12">
      {embeddedTopicContent.map(item => (
        <EmbeddedTopicContentSection key={item.id} item={item} />
      ))}
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
  const nextClassMeeting = getNextClassMeeting(topics, meeting.slug || slug);
  const prepAssignments = getPrepAssignments(meeting);
  const nextClassPrepAssignments = nextClassMeeting ? getPrepAssignments(nextClassMeeting) : [];
  const todayContent = topicPostData?.content.trim()
    ? topicPostData.content
    : null;
  const topicSections: Array<{
    navItem: TopicSectionNavItem;
    panel: ReactElement;
  }> = [];

  if (!meeting.holiday && hasPrepMaterials(meeting, bibliographyReadings)) {
    topicSections.push({
      navItem: { id: 'topic-before-class', label: 'Before class' },
      panel: (
        <TopicWorkflowSection id="topic-before-class" label="Before class">
          <TopicOverviewMaterials
            readings={readings}
            optionalReadings={optionalReadings}
            bibliographyReadings={bibliographyReadings}
            prepAssignments={prepAssignments}
            meetingSlug={meeting.slug}
          />
        </TopicWorkflowSection>
      ),
    });
  }

  if (todayContent || meeting.description) {
    topicSections.push({
      navItem: { id: 'topic-overview', label: "Today's materials" },
      panel: (
        <TopicWorkflowSection id="topic-overview" label="Today's materials">
          {todayContent ? (
            <TopicOverviewMarkdown content={todayContent} />
          ) : typeof meeting.description === 'string' ? (
            <p className="mb-0 text-lg leading-8 text-gray-800 dark:text-gray-200">{meeting.description}</p>
          ) : (
            meeting.description
          )}
        </TopicWorkflowSection>
      ),
    });
  }

  if (!meeting.holiday && embeddedTopicContent.length > 0) {
    topicSections.push({
      navItem: { id: 'topic-class-work', label: 'Class work' },
      panel: (
        <TopicWorkflowSection id="topic-class-work" label="Class work">
          <TopicClassWorkPanel embeddedTopicContent={embeddedTopicContent} />
        </TopicWorkflowSection>
      ),
    });
  }

  if (!meeting.holiday && nextClassMeeting && hasPrepMaterials(nextClassMeeting)) {
    topicSections.push({
      navItem: { id: 'topic-next', label: 'For next time' },
      panel: (
        <TopicWorkflowSection id="topic-next" label="For next time">
          <TopicOverviewMaterials
            readings={nextClassMeeting.readings}
            optionalReadings={nextClassMeeting.optionalReadings}
            bibliographyReadings={[]}
            prepAssignments={nextClassPrepAssignments}
            meetingSlug={nextClassMeeting.slug}
          />
        </TopicWorkflowSection>
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
          <TopicSectionNav variant="stepper" moduleColor={moduleColor} items={topicSections.map(section => section.navItem)}>
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
