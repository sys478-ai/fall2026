import Link from 'next/link';
import { getPostData, getQuizData } from '@/lib/markdown';
import MarkdownContent from '@/components/MarkdownContent';
import ContentLayout from '@/components/ContentLayout';
import ResourceQuiz from '@/components/ResourceQuiz';
import QuickLinksNav from '@/components/QuickLinksNav';
import TopLevelPageHeader from '@/components/TopLevelPageHeader';
import { getTopics } from '@/lib/topics';

type SyllabusTopics = Awaited<ReturnType<typeof getTopics>>;

type SyllabusMeeting = SyllabusTopics[number]['meetings'][number];

interface RelatedCourseItem {
  label: string;
  href?: string;
}

function splitContentAfterIntroTable(content: string) {
  const closingTableTag = '</table>';
  const tableEndIndex = content.toLowerCase().indexOf(closingTableTag);

  if (tableEndIndex === -1) {
    return {
      introContent: content,
      remainingContent: '',
    };
  }

  const splitIndex = tableEndIndex + closingTableTag.length;

  return {
    introContent: content.slice(0, splitIndex),
    remainingContent: content.slice(splitIndex),
  };
}

function getCompactRelatedItemLabel(label: string, href?: string) {
  const trimmedLabel = label.trim();
  const labelMatch = trimmedLabel.match(/^(Lab|Career Module)\s+([A-Za-z0-9]+)/i);

  if (labelMatch) {
    const itemType = labelMatch[1].toLowerCase() === 'lab' ? 'Lab' : 'Career Module';
    return `${itemType} ${labelMatch[2]}`;
  }

  const slug = href?.split('/').filter(Boolean).pop() || '';
  const labSlugMatch = slug.match(/^lab0*([0-9]+[a-z]?)/i);
  if (labSlugMatch) {
    return `Lab ${labSlugMatch[1]}`;
  }

  const careerSlugMatch = slug.match(/^career-module0*([0-9]+)/i);
  if (careerSlugMatch) {
    return `Career Module ${careerSlugMatch[1]}`;
  }

  return trimmedLabel;
}

function getRelatedCourseItems(meeting: SyllabusMeeting): RelatedCourseItem[] {
  const items = new Map<string, RelatedCourseItem>();

  const addItem = (label: string, href?: string) => {
    const normalizedLabel = label.trim();
    if (!normalizedLabel) return;

    const key = href || normalizedLabel.toLowerCase();
    if (!items.has(key)) {
      items.set(key, { label: normalizedLabel, href });
    }
  };

  const assignedItems = Array.isArray(meeting.assigned) ? meeting.assigned : meeting.assigned ? [meeting.assigned] : [];

  assignedItems.forEach(item => {
    if (typeof item === 'string') return;

    const normalizedType = item.type?.toLowerCase();
    if (normalizedType !== 'lab' && normalizedType !== 'career module') {
      return;
    }

    const label = getCompactRelatedItemLabel(item.titleShort || item.title, item.url);
    addItem(label, item.url);
  });

  (meeting.activities || []).forEach(activity => {
    const label = activity.title?.trim();
    if (!label) return;

    const looksLikeRelevantItem =
      /^lab\b/i.test(label) || /^career module\b/i.test(label) || activity.url?.includes('/assignments/');

    if (!looksLikeRelevantItem) {
      return;
    }

    addItem(getCompactRelatedItemLabel(label, activity.url), activity.url);
  });

  return Array.from(items.values());
}

function SyllabusTopicList({ topics }: { topics: SyllabusTopics }) {
  return (
    <div className="mt-6 space-y-6">
      <h2>Schedule</h2>
      {topics.map(topic => (
        <section key={topic.id}>
          <div className="border-b border-gray-200 pt-1 pb-0 dark:border-gray-800">
            <h3 className="m-0 text-lg font-semibold text-gray-950 dark:text-gray-50">
              Module {topic.id}. {topic.title}
            </h3>
          </div>

          <ol className="m-0 divide-y divide-gray-200 p-0! dark:divide-gray-800">
            {topic.meetings.map((meeting, index) => {
              const isNoClass = meeting.holiday === true;
              const topicHref = meeting.slug && !isNoClass ? `/topics/${meeting.slug}` : undefined;
              const relatedItems = isNoClass ? [] : getRelatedCourseItems(meeting);

              return (
                <li
                  key={`${topic.id}-${meeting.slug || index}`}
                  className="grid gap-4 px-2 py-2 grid-cols-[6rem_auto_5rem]"
                >
                  <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">{meeting.date}</span>
                  <div className="min-w-0">
                    {topicHref ? (
                      <Link href={topicHref} className="block no-underline group">
                        <span className="block text-md font-medium text-gray-950 group-hover:text-[#0b5d8f] dark:text-gray-100 dark:group-hover:text-[#8fc4ee]">
                          {meeting.topic}
                        </span>
                        {meeting.subtitle && (
                          <span className="mt-0.5 block text-sm leading-5 text-gray-500 dark:text-gray-500">
                            {meeting.subtitle}
                          </span>
                        )}
                      </Link>
                    ) : (
                      <>
                        <span className="block text-md font-medium text-gray-950 dark:text-gray-100">
                          {meeting.topic}
                        </span>
                        {isNoClass && (
                          <span className="mt-0.5 block text-md font-medium text-gray-500 dark:text-gray-500">
                            No class
                          </span>
                        )}
                        {!isNoClass && meeting.subtitle && (
                          <span className="mt-0.5 block text-sm leading-5 text-gray-500 dark:text-gray-500">
                            {meeting.subtitle}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <div>
                    {relatedItems.length > 0 && (
                      <div className="space-y-1">
                        {relatedItems.map(item => (
                          <span key={item.label} className="block text-sm font-normal text-gray-600 dark:text-gray-400">
                            {item.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}

export default async function SyllabusPageContent() {
  const postData = await getPostData('syllabus');
  const { title, excerpt, heading_max_level } = postData;
  const quizData = getQuizData('syllabus');
  const topics = await getTopics();
  const { introContent, remainingContent } = splitContentAfterIntroTable(postData.content);

  return (
    <ContentLayout
      variant="detail-with-toc"
      leftNav={<QuickLinksNav />}
      showToc={postData.toc !== false}
      tocMaxLevel={heading_max_level || 2}
      fullWidth
      header={<TopLevelPageHeader label="Syllabus" title={title} description={excerpt} tone="sky" />}
    >
      <div className="max-w-4xl pr-8 pt-6">
        <MarkdownContent content={introContent} />
        <SyllabusTopicList topics={topics} />
        {remainingContent && <MarkdownContent content={remainingContent} />}

        {quizData && <ResourceQuiz key="quiz-syllabus" quizData={quizData} resourceSlug="syllabus" variant="desktop" />}
      </div>
    </ContentLayout>
  );
}
