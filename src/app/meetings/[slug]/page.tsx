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
import { getAllPosts, getPostData } from '@/lib/markdown';
import type { PostData } from '@/lib/markdown';
import FieldGuideCardPreview from '@/components/FieldGuideCardPreview';
import { getFieldGuidePreviewItems } from '@/lib/field-guide-preview';
import { getFieldGuideBannerClasses } from '@/lib/field-guide-palettes';
import { getModuleColorClasses, type ModuleColorClasses } from '@/lib/module-colors';
import { getTopics } from '@/lib/topics';
import type { Topic } from '@/lib/topics';
import { getReadingsForTopic, type Reading } from '@/lib/readings';
import { groupReadingsByPickOne } from '@/lib/reading-groups';
import { getTopicModules } from '@/lib/topic-config';
import StatusBanner from '@/components/StatusBanner';
import AssignmentDueMeta from '@/components/topics/AssignmentDueMeta';
import AssignmentTypeBadge from '@/components/assignments/AssignmentTypeBadge';
import NextTimeChecklist from '@/components/topics/NextTimeChecklist';
import { resolveDueDate } from '@/lib/course-calendar';
import {
  getDashboardPrepRows,
  getPrepAssignments,
  getPrepBadgeKindFromAssignment,
  type PrepBadgeKind,
} from '@/lib/prep-materials';
import { isEndOfDayDueTime } from '@/lib/utils';

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

function formatInlineDate(dateStr: string | undefined) {
  if (!dateStr) {
    return undefined;
  }

  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const dayAbbr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return `${dayAbbr[date.getDay()]}, ${monthAbbr[date.getMonth()]} ${date.getDate()}`;
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

function PrepBeforeClassBanner({
  classDate,
  deadlineLabel = 'before class',
}: {
  classDate?: string;
  deadlineLabel?: 'before class' | 'before midnight';
}) {
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
        Please complete the tasks and readings listed below {deadlineLabel} on{' '}
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

type PrepBadgeKindLocal = PrepBadgeKind;

function PrepItemBadge({ kind }: { kind: PrepBadgeKindLocal }) {
  return <AssignmentTypeBadge kind={kind} className="mt-0.5" />;
}

function PrepItemRow({ kind, children }: { kind: PrepBadgeKindLocal; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 text-base leading-7 text-gray-800 dark:text-gray-200">
      <PrepItemBadge kind={kind} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function getTaskBadgeKind(citation: string | ReactElement): PrepBadgeKindLocal {
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

function isCareerEmbeddedContent(item: EmbeddedTopicContent) {
  const title = item.title.toLowerCase();
  const sourceHref = item.sourceHref.toLowerCase();
  const contentHref = item.contentHref.toLowerCase();
  const postType = item.postData?.type?.toLowerCase() || '';

  return (
    postType === 'career module' ||
    title.includes('career module') ||
    sourceHref.includes('career-module') ||
    contentHref.includes('career-module')
  );
}

function isHomeworkEmbeddedContent(item: EmbeddedTopicContent) {
  return (item.postData?.type || '').toLowerCase() === 'homework';
}

function isClassWorkExcludedContent(item: EmbeddedTopicContent) {
  return isHomeworkEmbeddedContent(item) || isCareerEmbeddedContent(item);
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
  if (!url) {
    return undefined;
  }

  let pathname = url;
  try {
    if (/^https?:\/\//i.test(url)) {
      pathname = new URL(url).pathname;
    }
  } catch {
    return undefined;
  }

  // Only local course routes count as embeddable (e.g. /assignments/lab01 or /fall2026/assignments/lab01).
  // Canvas URLs like /courses/1907/assignments/8714 must not match.
  return pathname.match(new RegExp(`^(?:/fall2026)?/${contentType}/([^/]+)/?$`))?.[1];
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
  deadlineLabel = 'before class',
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
  deadlineLabel?: 'before class' | 'before midnight';
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
      <PrepBeforeClassBanner classDate={classDate} deadlineLabel={deadlineLabel} />
      {reminders.length > 0 && (
        <PrepGroup label="Reminders">
          {reminders.map((reminder, index) => (
            <div key={`${meetingSlug}-reminder-${index}`} className="text-base leading-7 text-gray-800 dark:text-gray-200">
              {reminder.url ? (
                <Link href={reminder.url} className={`font-medium ${READING_LINK_CLASS}`}>
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
                <a href={reading.url} target="_blank" rel="noopener noreferrer" className={`font-medium ${READING_LINK_CLASS}`}>
                  {reading.title}
                </a>
                {reading.authors && <span className="text-gray-500 dark:text-gray-400"> – {reading.authors}</span>}
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
                    className={READING_LINK_CLASS}
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

function TopicForNextTimePanel({
  nextMeeting,
  nextTopicNavItem,
}: {
  nextMeeting: Topic['meetings'][number];
  nextTopicNavItem: TopicNavigationItem | null;
}) {
  const rows = getDashboardPrepRows(nextMeeting, { isDraft: nextTopicNavItem?.draft === 1 });
  return <NextTimeChecklist rows={rows} />;
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

function TopicCareerPanel({
  careerContent,
}: {
  careerContent: EmbeddedTopicContent[];
}) {
  const inClass = careerContent.filter(item => item.type === 'activity');
  const afterClass = careerContent.filter(item => item.type === 'assignment');
  const firstAfterClass = afterClass[0];
  const fallbackHomeworkHref = inClass[0]?.sourceHref
    ?.replace('/activities/', '/assignments/')
    .replace(/-in-class\/?$/, '');
  const homeworkHref = firstAfterClass?.sourceHref || fallbackHomeworkHref;
  const homeworkPost = firstAfterClass?.postData || null;
  const homeworkDueDate = homeworkPost
    ? resolveDueDate({
        scheduled_day: homeworkPost.scheduled_day as number | string | undefined,
        due_date: homeworkPost.due_date as string | undefined,
        due_days_after: homeworkPost.due_days_after as number | undefined,
      })
    : undefined;
  const homeworkDueLabel = formatInlineDate(homeworkDueDate);
  const homeworkDueTime =
    typeof homeworkPost?.due_time === 'string' && homeworkPost.due_time.trim() !== ''
      ? homeworkPost.due_time.trim()
      : undefined;
  const homeworkExcerpt =
    typeof homeworkPost?.excerpt === 'string' && homeworkPost.excerpt.trim() !== ''
      ? homeworkPost.excerpt.trim()
      : 'complete the paired career-module homework';

  return (
    <div className="space-y-12">
      {inClass.length > 0 && (
        <section className="space-y-6">
          <div className="space-y-12">
            {inClass.map(item => (
              <EmbeddedTopicContentSection key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {homeworkHref && (
        <section className="space-y-4 border-t border-gray-200 pt-6 dark:border-gray-800">
          <h3 className="m-0! text-2xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">What to Submit</h3>
          <p className="mb-0 text-base leading-7 text-gray-700 dark:text-gray-300">
            {homeworkExcerpt}.{' '}
            <Link href={homeworkHref} className={READING_LINK_CLASS}>
              Open the homework
            </Link>
          </p>
          {(homeworkDueLabel || homeworkDueTime) && (
            <p className="mb-0 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Submit by {homeworkDueLabel || 'the listed due date'}
              {homeworkDueTime ? ` at ${homeworkDueTime}` : ''}
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
            Topic {moduleId}. {moduleTitle}
          </span>
        </div>
        <h1 className="m-0! max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-950 dark:text-gray-50">
          {title}
        </h1>
        {subtitle && (
          <p className="mb-0 mt-5 max-w-4xl text-lg leading-6 text-gray-700 dark:text-gray-300">{subtitle}</p>
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
        title="Draft – not yet available"
      >
        <span className="block text-sm text-gray-400 dark:text-gray-600">{label}</span>
        <span className="mt-1 block text-base font-medium text-gray-400 dark:text-gray-600">{item.title}</span>
      </span>
    );
  }

  return (
    <Link href={`/meetings/${item.slug}`} className={`group min-w-0 max-w-[48%] no-underline ${alignClass}`}>
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
      className="topic-sequence-nav mt-16 flex items-start justify-between gap-8 border-t border-gray-200 pt-10 dark:border-gray-800"
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
    ? await getPostData(meeting.topicContentId, 'meetings').catch(() => null)
    : null;
  const embeddedTopicContent = await getEmbeddedTopicContent(meeting);
  const careerTopicContent = embeddedTopicContent.filter(isCareerEmbeddedContent);
  const hasCareerActivity = careerTopicContent.some(item => item.type === 'activity');
  const hasOnlyCareerHomework =
    !hasCareerActivity &&
    embeddedTopicContent.length > 0 &&
    embeddedTopicContent.every(item => isCareerEmbeddedContent(item) && item.type === 'assignment');
  const regularTopicContent = (
    hasCareerActivity
      ? embeddedTopicContent.filter(item => !isCareerEmbeddedContent(item))
      : hasOnlyCareerHomework
        ? []
        : embeddedTopicContent
  ).filter(item => !isClassWorkExcludedContent(item));
  const nextClassMeeting = getNextClassMeeting(topics, meeting.slug || slug);
  const nextTopicNavItem = nextClassMeeting?.slug
    ? topicNavigationItems.find(item => item.slug === nextClassMeeting.slug) ?? null
    : null;
  const nextTimeRows = nextClassMeeting
    ? getDashboardPrepRows(nextClassMeeting, { isDraft: nextTopicNavItem?.draft === 1 })
    : [];
  const prepAssignments = getPrepAssignments(meeting);
  const todayContent = topicPostData?.content.trim()
    ? topicPostData.content
    : null;
  const topicSections: Array<{
    navItem: TopicSectionNavItem;
    panel: ReactElement;
  }> = [];

  if (!meeting.holiday && hasPrepMaterials(meeting, bibliographyReadings)) {
    const usesMidnightDeadline = prepAssignments.some(item => isEndOfDayDueTime(item.dueTime));
    const prepSectionLabel = usesMidnightDeadline ? 'Before midnight' : 'Before class';
    const prepDeadlineLabel = usesMidnightDeadline ? 'before midnight' : 'before class';

    topicSections.push({
      navItem: { id: 'meeting-before-class', label: prepSectionLabel },
      panel: (
        <TopicWorkflowSection id="meeting-before-class" label={prepSectionLabel}>
          <TopicOverviewMaterials
            readings={readings}
            optionalReadings={optionalReadings}
            otherPreparation={otherPreparation}
            bibliographyReadings={bibliographyReadings}
            prepAssignments={prepAssignments}
            beforeClassReminders={meeting.beforeClassReminders}
            meetingSlug={meeting.slug}
            classDate={meeting.date}
            deadlineLabel={prepDeadlineLabel}
          />
        </TopicWorkflowSection>
      ),
    });
  }

  if (!meeting.holiday && meeting.showEthicalFrameworksPreview) {
    const ethicalFrameworks = await getFieldGuidePreviewItems('ethical-frameworks', 'ethical-framework');
    if (ethicalFrameworks.length > 0) {
      topicSections.push({
        navItem: { id: 'meeting-ethical-frameworks', label: 'Ethical Frameworks' },
        panel: (
          <TopicWorkflowSection id="meeting-ethical-frameworks" label="Ethical Frameworks">
            <FieldGuideCardPreview
              intro="Markkula's framework gives you a general process for moving from analysis to judgment. Each card below unpacks one specific ethical tradition you can plug into that process - click a card to preview it."
              items={ethicalFrameworks}
              badgeLabel="Ethical Framework"
              linkBasePath="/field-guide/ethical-frameworks"
              moreLinkLabel="More theories of ethics"
              banner={getFieldGuideBannerClasses('ethical-frameworks')}
              sheetTitleId="ethical-framework-sheet-title"
            />
          </TopicWorkflowSection>
        ),
      });
    }
  }

  if (!meeting.holiday && meeting.learningTheoryPreviewCards && meeting.learningTheoryPreviewCards.length > 0) {
    const learningTheories = await getFieldGuidePreviewItems(
      'theories-of-learning',
      'learning-theory',
      meeting.learningTheoryPreviewCards
    );
    if (learningTheories.length > 0) {
      topicSections.push({
        navItem: { id: 'meeting-theories-of-learning', label: 'Theories of Learning' },
        panel: (
          <TopicWorkflowSection id="meeting-theories-of-learning" label="Theories of Learning">
            <FieldGuideCardPreview
              intro="Each card below unpacks one account of how learning actually happens. Click a card to preview it, or open the full page for the complete write-up – worth holding up against whatever an AI system's makers mean when they say it 'learns.'"
              items={learningTheories}
              badgeLabel="Theory of Learning"
              linkBasePath="/field-guide/theories-of-learning"
              moreLinkLabel="More theories of learning"
              banner={getFieldGuideBannerClasses('theories-of-learning')}
              sheetTitleId="learning-theory-sheet-title"
            />
          </TopicWorkflowSection>
        ),
      });
    }
  }

  if (todayContent || meeting.description) {
    topicSections.push({
      navItem: { id: 'meeting-overview', label: "Today's materials" },
      panel: (
        <TopicWorkflowSection id="meeting-overview" label="Today's materials">
          {todayContent ? (
            <TopicOverviewMarkdown content={todayContent} />
          ) : typeof meeting.description === 'string' ? (
            <p className="mb-0 text-lg leading-6 text-gray-800 dark:text-gray-200">{meeting.description}</p>
          ) : (
            meeting.description
          )}
        </TopicWorkflowSection>
      ),
    });
  }

  if (!meeting.holiday && hasCareerActivity) {
    topicSections.push({
      navItem: { id: 'meeting-career', label: 'Career' },
      panel: (
        <TopicWorkflowSection id="meeting-career" label="Career">
          <TopicCareerPanel careerContent={careerTopicContent} />
        </TopicWorkflowSection>
      ),
    });
  }

  if (!meeting.holiday && regularTopicContent.length > 0) {
    topicSections.push({
      navItem: { id: 'meeting-class-work', label: 'Class work' },
      panel: (
        <TopicWorkflowSection id="meeting-class-work" label="Class work">
          <TopicClassWorkPanel embeddedTopicContent={regularTopicContent} />
        </TopicWorkflowSection>
      ),
    });
  }

  if (!meeting.holiday && nextClassMeeting && nextTimeRows.length > 0) {
    topicSections.push({
      navItem: { id: 'meeting-next', label: 'For next time' },
      panel: (
        <TopicWorkflowSection id="meeting-next" label="For next time">
          <TopicForNextTimePanel nextMeeting={nextClassMeeting} nextTopicNavItem={nextTopicNavItem} />
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
            contentType="meetings"
          />
        ) : undefined
      }
    >
      <div className="space-y-8 pb-4">
        <Breadcrumbs
          className="px-4 md:px-16"
          items={[
            { label: 'Course Overview', href: '/topics' },
            { label: `${topic.id}. ${topic.title}` },
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

          <div id="meeting-sequence" className="scroll-mt-24">
            <TopicSequenceNav previousTopic={previousTopic} nextTopic={nextTopic} />
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
