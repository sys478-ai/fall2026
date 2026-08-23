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
import { groupReadingsByPickOne } from '@/lib/reading-groups';
import { getTopicModules } from '@/lib/topic-config';
import { formatDate, formatDueDateTime } from '@/lib/utils';
import StatusBanner from '@/components/StatusBanner';
import AssignmentDueMeta from '@/components/topics/AssignmentDueMeta';
import AssignmentTypeBadge from '@/components/assignments/AssignmentTypeBadge';
import {
  ASSIGNMENT_BADGE_BASE_CLASS,
  ASSIGNMENT_BADGE_CLASSES,
  type AssignmentBadgeKind,
} from '@/lib/assignment-badges';

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

const NEXT_TIME_DETAILS_BUTTON_CLASS =
  'inline-flex items-center rounded-lg border border-[#0b5d8f]/35 bg-transparent px-2.5 py-1 text-sm font-medium text-[#0b5d8f] no-underline transition-colors hover:bg-[#0b5d8f]/10 dark:border-[#8fc4ee]/35 dark:text-[#8fc4ee] dark:hover:bg-[#8fc4ee]/10';

function getCitationText(citation: string | ReactElement) {
  return typeof citation === 'string' ? citation.trim() : '';
}

function stripTrailingUrl(citation: string) {
  return citation.replace(/\s*https?:\/\/\S+\s*$/i, '').trim();
}

function renderReading(citation: string | ReactElement, url?: string, notes?: string) {
  if (typeof citation !== 'string') {
    return citation;
  }

  const label = stripTrailingUrl(citation) || citation;
  const notesEl = notes ? (
    <div className="text-sm italic text-gray-500 dark:text-gray-400">{notes}</div>
  ) : null;

  if (!url) {
    return (
      <>
        {label}
        {notesEl}
      </>
    );
  }

  return (
    <>
      {label}{' '}
      <Link href={url} target="_blank" rel="noopener noreferrer" className={READING_LINK_CLASS}>
        Link
      </Link>
      {notesEl}
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

function PrepBeforeClassBanner({ classDate }: { classDate?: string }) {
  if (!classDate) {
    return null;
  }

  return (
    <div
      className="border-0 border-l-8 border-indigo-600 bg-indigo-50 px-4 pt-4 pb-0.5 dark:border-indigo-900/80 dark:bg-indigo-950/35"
      role="note"
    >
      <p className="mb-0 text leading-6 text-indigo-950 dark:text-indigo-100">
        <i aria-hidden="true" className="far text-2xl fa-calendar mr-1.5 text-indigo-700 dark:text-indigo-300" />
        Please complete the tasks and readings listed below before class on{' '}
        <span className="font-semibold">{classDate}</span>.
      </p>
    </div>
  );
}

function PrepGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="mt-0 mb-3 text-xl font-semibold tracking-tight text-gray-950 md:text-2xl dark:text-gray-50">
        {label}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

type PrepBadgeKind = AssignmentBadgeKind;

function PrepItemBadge({ kind }: { kind: PrepBadgeKind }) {
  return <AssignmentTypeBadge kind={kind} className="mt-0.5" />;
}

function PrepItemRow({ kind, children }: { kind: PrepBadgeKind; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 text-base leading-7 text-gray-800 dark:text-gray-200">
      <PrepItemBadge kind={kind} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function getPrepBadgeKindFromAssignment(input: {
  type?: string;
  title?: string;
  href?: string;
}): PrepBadgeKind {
  const raw = (input.type || '').toLowerCase().trim();
  const haystack = `${raw} ${input.title || ''} ${input.href || ''}`.toLowerCase();

  if (raw === 'quiz' || haystack.includes('/quizzes/')) {
    return 'quiz';
  }

  if (raw === 'discussion' || haystack.includes('discussion')) {
    return 'discussion';
  }

  if (raw === 'reflection') {
    return 'reflection';
  }

  if (raw === 'career' || raw === 'Career Module' || haystack.includes('career-module') || haystack.includes('pathwayu')) {
    return 'career';
  }

  if (raw === 'lab') {
    return 'lab';
  }

  return 'homework';
}

function getTaskBadgeKind(citation: string | ReactElement): PrepBadgeKind {
  const text = getCitationText(citation).toLowerCase();

  if (text.includes('pathwayu') || text.includes('career')) {
    return 'career';
  }

  return 'homework';
}

interface TopicNavigationItem {
  slug: string;
  title: string;
  number: string;
  draft?: number;
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
              draft: meeting.draft,
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

function getPrepAssignmentDueDateIso(dueDate?: string) {
  return dueDate && /^\d{4}-\d{2}-\d{2}$/.test(dueDate) ? dueDate : undefined;
}

function getPrepAssignments(meeting: Topic['meetings'][number]) {
  const dueItems = Array.isArray(meeting.due) ? meeting.due : meeting.due ? [meeting.due] : [];

  return [
    ...dueItems.flatMap(item => {
      if (typeof item === 'string' || item.draft === 1) {
        return [];
      }

      const dateLabel =
        item.dueDate && /^\d{4}-\d{2}-\d{2}$/.test(item.dueDate) ? formatDate(item.dueDate) : meeting.date;

      return [
        {
          title: getAssignmentTitle(item),
          href: item.url,
          dueDate: formatDueDateTime(dateLabel, item.dueTime),
          dueDateIso: getPrepAssignmentDueDateIso(item.dueDate),
          dueTime: item.dueTime,
          notes: item.notes,
          badgeKind: getPrepBadgeKindFromAssignment({
            type: item.type,
            title: getAssignmentTitle(item),
            href: item.url,
          }),
        },
      ];
    }),
    ...(meeting.assignments || []).map(item => ({
      title: item.title,
      href: item.url,
      dueDate: getDiscussionDueLabel(item, meeting.date),
      dueDateIso: getPrepAssignmentDueDateIso(item.dueDate),
      dueTime: item.dueTime,
      notes: item.notes,
      badgeKind: getPrepBadgeKindFromAssignment({
        type: item.type,
        title: item.title,
        href: item.url,
      }),
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
    (meeting.otherPreparation || []).length > 0 ||
    bibliographyReadings.length > 0 ||
    getPrepAssignments(meeting).length > 0 ||
    (meeting.beforeClassReminders || []).length > 0
  );
}

function countRequiredReadingGroups(readings: Topic['meetings'][number]['readings']) {
  return groupReadingsByPickOne(readings || []).length;
}

type NextTimeCategory = 'prep' | 'assignments';

const NEXT_TIME_CATEGORY_LABELS: Record<NextTimeCategory, string> = {
  prep: 'Class prep',
  assignments: 'Assignments',
};

const NEXT_TIME_CATEGORY_CLASSES: Record<NextTimeCategory, string> = {
  prep: ASSIGNMENT_BADGE_CLASSES.reading,
  assignments: ASSIGNMENT_BADGE_CLASSES.homework,
};

function NextTimeCategoryTag({
  category,
  assignmentBadgeKind,
}: {
  category: NextTimeCategory;
  assignmentBadgeKind?: AssignmentBadgeKind;
}) {
  if (category === 'assignments' && assignmentBadgeKind) {
    return <AssignmentTypeBadge kind={assignmentBadgeKind} />;
  }

  return (
    <span className={`${ASSIGNMENT_BADGE_BASE_CLASS} ${NEXT_TIME_CATEGORY_CLASSES[category]}`}>
      {NEXT_TIME_CATEGORY_LABELS[category]}
    </span>
  );
}

function NextTimeDetailsLink({ href, linkText = 'View' }: { href: string; linkText?: string }) {
  return (
    <Link href={href} className={`${NEXT_TIME_DETAILS_BUTTON_CLASS} gap-1.5`}>
      <i aria-hidden="true" className="fas fa-link text-xs" />
      {linkText}
    </Link>
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

function renderReadingItems(
  readings: Topic['meetings'][number]['readings'],
  keyPrefix: string
) {
  return groupReadingsByPickOne(readings || []).map((group, index) => {
    if (group.kind === 'single') {
      const { reading } = group;
      return (
        <PrepItemRow key={`${keyPrefix}-${index}`} kind="reading">
          {renderReading(reading.citation, reading.url, reading.notes)}
        </PrepItemRow>
      );
    }

    return (
      <PrepItemRow key={`${keyPrefix}-${index}`} kind="reading">
        <div>
          <span className="font-medium text-gray-900 dark:text-gray-100">Pick one</span>
          <div className="mt-2 space-y-2 border-l-2 border-gray-200 pl-4 dark:border-gray-700">
            {group.options.map((reading, optionIndex) => (
              <div key={`${keyPrefix}-${index}-${optionIndex}`} className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0 text-sm font-semibold tabular-nums text-gray-500 dark:text-gray-400">
                  {optionIndex + 1}.
                </span>
                <div className="min-w-0">{renderReading(reading.citation, reading.url, reading.notes)}</div>
              </div>
            ))}
          </div>
        </div>
      </PrepItemRow>
    );
  });
}

function TopicOverviewMaterials({
  readings,
  optionalReadings,
  otherPreparation,
  bibliographyReadings,
  prepAssignments,
  beforeClassReminders,
  meetingSlug,
  classDate,
}: {
  readings: Topic['meetings'][number]['readings'];
  optionalReadings: Topic['meetings'][number]['optionalReadings'];
  otherPreparation?: Topic['meetings'][number]['otherPreparation'];
  bibliographyReadings: Reading[];
  prepAssignments: Array<{
    title: string;
    href?: string;
    dueDate?: string;
    dueDateIso?: string;
    dueTime?: string;
    notes?: string;
    badgeKind: PrepBadgeKind;
  }>;
  beforeClassReminders?: Topic['meetings'][number]['beforeClassReminders'];
  meetingSlug?: string;
  classDate?: string;
}) {
  const assignedReadings = readings || [];
  const extraReadings = optionalReadings || [];
  const otherPrep = otherPreparation || [];
  const reminders = beforeClassReminders || [];
  const hasContent =
    assignedReadings.length > 0 ||
    extraReadings.length > 0 ||
    otherPrep.length > 0 ||
    bibliographyReadings.length > 0 ||
    prepAssignments.length > 0 ||
    reminders.length > 0;

  if (!hasContent) {
    return null;
  }

  return (
    <div className="space-y-10">
      <PrepBeforeClassBanner classDate={classDate} />
      {reminders.length > 0 && (
        <PrepGroup label="Reminders">
          {reminders.map((reminder, index) => (
            <div key={`${meetingSlug}-reminder-${index}`} className="text-base leading-7 text-gray-800 dark:text-gray-200">
              {reminder.url ? (
                <Link href={reminder.url} className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                  {reminder.title}
                </Link>
              ) : (
                reminder.title
              )}
              <span className="mt-1 block text-sm text-gray-500 dark:text-gray-400">{reminder.notes}</span>
            </div>
          ))}
        </PrepGroup>
      )}
      {otherPrep.length > 0 && (
        <PrepGroup label="Tasks">
          {otherPrep.map((item, index) => (
            <PrepItemRow key={`${meetingSlug}-other-prep-${index}`} kind={getTaskBadgeKind(item.citation)}>
              {renderReading(item.citation, item.url, item.notes)}
            </PrepItemRow>
          ))}
        </PrepGroup>
      )}
      {assignedReadings.length > 0 && (
        <PrepGroup label="Required Readings">
          {renderReadingItems(assignedReadings, `${meetingSlug}-reading`)}
        </PrepGroup>
      )}
      {extraReadings.length > 0 && (
        <PrepGroup label="Optional Readings">
          {renderReadingItems(extraReadings, `${meetingSlug}-optional-reading`)}
        </PrepGroup>
      )}
      {bibliographyReadings.length > 0 && (
        <PrepGroup label="Field Guide bibliography">
          {bibliographyReadings.map((reading: Reading) => (
            <PrepItemRow key={reading.id} kind="reading">
              <span>
                <a href={reading.url} target="_blank" rel="noopener noreferrer" className="font-medium">
                  {reading.title}
                </a>
                {reading.authors && <span className="text-gray-500 dark:text-gray-400"> — {reading.authors}</span>}
              </span>
            </PrepItemRow>
          ))}
        </PrepGroup>
      )}
      {prepAssignments.length > 0 && (
        <PrepGroup label="Submit to Canvas">
          {prepAssignments.map((item, index) => (
            <PrepItemRow key={`${meetingSlug}-prep-${index}`} kind={item.badgeKind}>
              <span>
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
                {(item.dueDate || item.dueDateIso) && (
                  <AssignmentDueMeta
                    dueDateLabel={item.dueDate}
                    dueDateIso={item.dueDateIso}
                    dueTime={item.dueTime}
                  />
                )}
              </span>
            </PrepItemRow>
          ))}
        </PrepGroup>
      )}
    </div>
  );
}

function getClassPrepSummary(
  readingCount: number,
  taskCount: number,
  reminders: NonNullable<Topic['meetings'][number]['beforeClassReminders']>
) {
  const parts: string[] = [];

  if (readingCount > 0 && taskCount > 0) {
    parts.push(
      `${readingCount} reading${readingCount === 1 ? '' : 's'}`,
      `${taskCount} task${taskCount === 1 ? '' : 's'}`
    );
    return parts.join(' · ');
  }

  if (readingCount > 0) {
    return `${readingCount} to complete`;
  }

  if (taskCount > 0) {
    return `${taskCount} task${taskCount === 1 ? '' : 's'}`;
  }

  if (reminders.length === 1 && reminders[0].title) {
    const title = reminders[0].title.trim();
    return title.length > 72 ? `${title.slice(0, 69).trimEnd()}…` : title;
  }

  if (reminders.length > 0) {
    return `${reminders.length} reminder${reminders.length === 1 ? '' : 's'}`;
  }

  return 'Prep work';
}

function TopicForNextTimePanel({
  nextMeeting,
  prepAssignments,
  nextTopicNavItem,
}: {
  nextMeeting: Topic['meetings'][number];
  prepAssignments: Array<{
    title: string;
    dueDate?: string;
    badgeKind: AssignmentBadgeKind;
  }>;
  nextTopicNavItem: TopicNavigationItem | null;
}) {
  const readingCount = countRequiredReadingGroups(nextMeeting.readings);
  const taskCount = (nextMeeting.otherPreparation || []).length;
  const reminders = nextMeeting.beforeClassReminders || [];
  const hasClassPrep = readingCount > 0 || taskCount > 0 || reminders.length > 0;
  const isDraft = nextTopicNavItem?.draft === 1;
  const beforeClassHref =
    nextMeeting.slug && !isDraft ? `/topics/${nextMeeting.slug}#topic-before-class` : null;

  const rows: Array<{
    key: string;
    category: NextTimeCategory;
    summary: string;
    href: string | null;
    assignmentBadgeKind?: AssignmentBadgeKind;
  }> = [];

  if (hasClassPrep) {
    rows.push({
      key: 'prep',
      category: 'prep',
      summary: getClassPrepSummary(readingCount, taskCount, reminders),
      href: beforeClassHref,
    });
  }

  prepAssignments.forEach((assignment, index) => {
    rows.push({
      key: `assignment-${index}`,
      category: 'assignments',
      summary: assignment.title,
      href: '/assignments',
      assignmentBadgeKind: assignment.badgeKind,
    });
  });

  if (rows.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 text-base leading-7 text-gray-800 dark:text-gray-200">
      <h2 className="mt-0 mb-0 text-xl font-semibold tracking-tight text-gray-950 md:text-2xl dark:text-gray-50">
        Before next class
      </h2>
      <table className="next-time-checklist w-auto! min-w-xl max-w-full border-collapse text-left">
        <tbody>
          {rows.map(row => (
            <tr key={row.key}>
              <td className="whitespace-nowrap align-top">
                <NextTimeCategoryTag
                  category={row.category}
                  assignmentBadgeKind={row.assignmentBadgeKind}
                />
              </td>
              <td className="wrap-break-word align-top text-gray-800 dark:text-gray-200">
                {row.summary}
              </td>
              <td className="whitespace-nowrap text-right align-top">
                {row.href ? (
                  <NextTimeDetailsLink href={row.href} />
                ) : (
                  <span className="text-sm text-gray-500 dark:text-gray-400">Not yet available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

function TopicSequenceNavLink({
  direction,
  item,
}: {
  direction: 'previous' | 'next';
  item: TopicNavigationItem;
}) {
  const isDraft = item.draft === 1;
  const label = direction === 'previous' ? 'Previous' : 'Next';
  const alignClass = direction === 'next' ? 'text-right' : '';

  if (isDraft) {
    return (
      <span
        className={`min-w-0 max-w-[48%] ${alignClass}`}
        aria-disabled="true"
        title="Draft — not yet available"
      >
        <span className="block text-sm text-gray-400 dark:text-gray-600">{label}</span>
        <span className="mt-1 block text-base font-medium text-gray-400 dark:text-gray-600">{item.title}</span>
      </span>
    );
  }

  return (
    <Link href={`/topics/${item.slug}`} className={`group min-w-0 max-w-[48%] no-underline ${alignClass}`}>
      <span className="block text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span className="mt-1 block text-base font-medium text-gray-950 group-hover:text-gray-600 dark:text-gray-50 dark:group-hover:text-gray-300">
        {item.title}
      </span>
    </Link>
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
      {previousTopic ? <TopicSequenceNavLink direction="previous" item={previousTopic} /> : <span />}

      {nextTopic ? <TopicSequenceNavLink direction="next" item={nextTopic} /> : <span />}
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
  const otherPreparation = meeting.otherPreparation || [];
  const bibliographyReadings = getReadingsForTopic(meeting.scheduledDay);
  const topicPostData = meeting.topicContentId
    ? await getPostData(meeting.topicContentId, 'topics').catch(() => null)
    : null;
  const embeddedTopicContent = await getEmbeddedTopicContent(meeting);
  const nextClassMeeting = getNextClassMeeting(topics, meeting.slug || slug);
  const nextTopicNavItem = nextClassMeeting?.slug
    ? topicNavigationItems.find(item => item.slug === nextClassMeeting.slug) ?? null
    : null;
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
            otherPreparation={otherPreparation}
            bibliographyReadings={bibliographyReadings}
            prepAssignments={prepAssignments}
            beforeClassReminders={meeting.beforeClassReminders}
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
          <TopicForNextTimePanel
            nextMeeting={nextClassMeeting}
            prepAssignments={nextClassPrepAssignments}
            nextTopicNavItem={nextTopicNavItem}
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
      <div className="space-y-8 pb-4">
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
