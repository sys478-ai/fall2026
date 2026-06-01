import type { ReactElement } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContentLayout from '@/components/ContentLayout';
import MarkdownContent from '@/components/MarkdownContent';
import { getPostData } from '@/lib/markdown';
import { getTopics } from '@/lib/topics';
import type { Topic } from '@/lib/topics';
import { getTopicModules } from '@/lib/topic-config';

interface TopicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const MODULE_COLOR_CLASSES = [
  {
    background: 'bg-indigo-50 dark:bg-indigo-950/30',
    border: 'border-indigo-200 dark:border-indigo-900',
    accent: 'text-indigo-700 dark:text-indigo-300',
  },
  {
    background: 'bg-sky-50 dark:bg-sky-950/30',
    border: 'border-sky-200 dark:border-sky-900',
    accent: 'text-sky-700 dark:text-sky-300',
  },
  {
    background: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-200 dark:border-emerald-900',
    accent: 'text-emerald-700 dark:text-emerald-300',
  },
  {
    background: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-900',
    accent: 'text-amber-700 dark:text-amber-300',
  },
  {
    background: 'bg-rose-50 dark:bg-rose-950/30',
    border: 'border-rose-200 dark:border-rose-900',
    accent: 'text-rose-700 dark:text-rose-300',
  },
  {
    background: 'bg-violet-50 dark:bg-violet-950/30',
    border: 'border-violet-200 dark:border-violet-900',
    accent: 'text-violet-700 dark:text-violet-300',
  },
  {
    background: 'bg-teal-50 dark:bg-teal-950/30',
    border: 'border-teal-200 dark:border-teal-900',
    accent: 'text-teal-700 dark:text-teal-300',
  },
  {
    background: 'bg-orange-50 dark:bg-orange-950/30',
    border: 'border-orange-200 dark:border-orange-900',
    accent: 'text-orange-700 dark:text-orange-300',
  },
] as const;

function getModuleColorClasses(moduleId: number) {
  return MODULE_COLOR_CLASSES[(moduleId - 1) % MODULE_COLOR_CLASSES.length];
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return getTopicModules().flatMap(module => [
    { slug: module.slug },
    ...module.meetings.map(meeting => ({
      slug: meeting.slug,
    })),
  ]);
}

function renderReading(citation: string | ReactElement, url?: string) {
  if (typeof citation === 'string') {
    if (url) {
      return (
        <Link href={url} className="text-blue-600 hover:underline dark:text-blue-400">
          {citation}
        </Link>
      );
    }

    return citation;
  }

  return citation;
}

function EditorialSection({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-5 border-t border-gray-200 pt-7 dark:border-gray-800 md:grid-cols-[8rem_1fr]">
      <div className="border-b border-gray-200 pb-4 dark:border-gray-800 md:border-b-0 md:border-r md:pb-0 md:pr-5">
        <p className="mb-0 text-xs font-semibold uppercase tracking-[0.18em] text-[#0b5d8f] dark:text-[#8fc4ee]">
          {label}
        </p>
      </div>
      <div>
        <h2 className="m-0! mb-4! text-2xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">
          {title}
        </h2>
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

type ModuleColorClasses = ReturnType<typeof getModuleColorClasses>;

interface TopicNavigationItem {
  slug: string;
  title: string;
  number: string;
}

function getModuleOverviewNumber(topic: Topic) {
  return `${topic.id}.1`;
}

function getMeetingTopicNumber(topic: Topic, meetingIndex: number) {
  return `${topic.id}.${meetingIndex + 2}`;
}

function getTopicNavigationItems(topics: Topic[]): TopicNavigationItem[] {
  return topics.flatMap(topic => {
    const overviewItem = topic.slug
      ? [
          {
            slug: topic.slug,
            title: `${topic.title} Overview`,
            number: getModuleOverviewNumber(topic),
          },
        ]
      : [];

    return [
      ...overviewItem,
      ...topic.meetings.flatMap((meeting, index) =>
        meeting.slug
          ? [
              {
                slug: meeting.slug,
                title: meeting.topic,
                number: getMeetingTopicNumber(topic, index),
              },
            ]
          : []
      ),
    ];
  });
}

function findTopicMeeting(topics: Topic[], slug: string) {
  for (const topic of topics) {
    const meetingIndex = topic.meetings.findIndex((meeting) => meeting.slug === slug);

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

function TopicHeader({
  moduleColor,
  number,
  date,
  moduleId,
  moduleTitle,
  title,
  excerpt,
}: {
  moduleColor: ModuleColorClasses;
  number: string;
  date?: string;
  moduleId: number;
  moduleTitle: string;
  title: string;
  excerpt?: string;
}) {
  return (
    <header className={`grid gap-6 border-y px-16 py-16 ${moduleColor.background} ${moduleColor.border} md:grid-cols-[8rem_1fr]`}>
      <div className={`border-b pb-4 ${moduleColor.border} md:border-b-0 md:border-r md:pb-0 md:pr-5`}>
        <p className={`mb-1 text-4xl font-semibold leading-none tracking-tight ${moduleColor.accent}`}>
          {number}
        </p>
        {date && (
          <p className="mb-0 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
            {date}
          </p>
        )}
      </div>
      <div>
        <div className="mb-4 text-xs font-semibold uppercase tracking-wide">
          <span className={moduleColor.accent}>
            Module {moduleId}: {moduleTitle}
          </span>
        </div>
        <h1 className="m-0! max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-950 dark:text-gray-50">
          {title}
        </h1>
        {excerpt && (
          <p className="mb-0 mt-5 max-w-4xl text-lg leading-8 text-gray-700 dark:text-gray-300">
            {excerpt}
          </p>
        )}
      </div>
    </header>
  );
}

function ModuleTopicsList({ topic }: { topic: Topic }) {
  return (
    <EditorialSection label="Sequence" title="Topics In This Module">
      <div className="grid gap-3">
        {topic.meetings.map((meeting, index) => {
          const topicNumber = getMeetingTopicNumber(topic, index);
          const description = typeof meeting.description === 'string' ? meeting.description : undefined;
          const content = (
            <>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-sm font-semibold text-[#0b5d8f] dark:text-[#8fc4ee]">
                  {topicNumber}
                </span>
                <span className="text-base font-semibold text-gray-950 dark:text-gray-50">
                  {meeting.topic}
                </span>
                {meeting.date && (
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {meeting.date}
                  </span>
                )}
              </div>
              {description && (
                <p className="mb-0 mt-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
                  {description}
                </p>
              )}
            </>
          );

          if (!meeting.slug) {
            return (
              <div
                key={`${topic.slug || topic.id}-${topicNumber}`}
                className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-black"
              >
                {content}
              </div>
            );
          }

          return (
            <Link
              key={meeting.slug}
              href={`/topics/${meeting.slug}`}
              className="rounded-xl border border-gray-200 bg-white p-4 no-underline transition-colors hover:border-[#0b5d8f]/40 hover:bg-gray-50 dark:border-gray-800 dark:bg-black dark:hover:border-[#8fc4ee]/40 dark:hover:bg-gray-950"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </EditorialSection>
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
      className="flex flex-col gap-4 border-t border-gray-200 pt-8 dark:border-gray-800 sm:flex-row sm:justify-between"
      aria-label="Topic navigation"
    >
      {previousTopic ? (
        <Link
          href={`/topics/${previousTopic.slug}`}
          className="group flex min-w-0 max-w-full items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 no-underline transition-all hover:border-blue-500 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-600 dark:hover:bg-gray-800 sm:max-w-md"
        >
          <ChevronLeftIcon className="h-5 w-5 shrink-0 text-gray-600 group-hover:text-[#0b5d8f] dark:text-gray-300 dark:group-hover:text-[#8fc4ee]" />
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
              Previous
            </span>
            <span className="block wrap-break-word font-medium text-gray-900 group-hover:text-[#0b5d8f] dark:text-gray-100 dark:group-hover:text-[#8fc4ee]">
              {previousTopic.number}. {previousTopic.title}
            </span>
          </div>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {nextTopic && (
        <Link
          href={`/topics/${nextTopic.slug}`}
          className="group flex min-w-0 max-w-full items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 no-underline transition-all hover:border-blue-500 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-600 dark:hover:bg-gray-800 sm:ml-auto sm:max-w-md sm:text-right"
        >
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
              Next
            </span>
            <span className="block wrap-break-word font-medium text-gray-900 group-hover:text-[#0b5d8f] dark:text-gray-100 dark:group-hover:text-[#8fc4ee]">
              {nextTopic.number}. {nextTopic.title}
            </span>
          </div>
          <ChevronRightIcon className="ml-auto h-5 w-5 shrink-0 text-gray-600 group-hover:text-[#0b5d8f] dark:text-gray-300 dark:group-hover:text-[#8fc4ee] sm:ml-0" />
        </Link>
      )}
    </nav>
  );
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topics = await getTopics();
  const result = findTopicMeeting(topics, slug);
  const overviewTopic = result ? null : topics.find(topic => topic.slug === slug);

  if (!result && !overviewTopic) {
    notFound();
  }

  const topicNavigationItems = getTopicNavigationItems(topics);
  const currentTopicIndex = topicNavigationItems.findIndex(item => item.slug === slug);
  const previousTopic = currentTopicIndex > 0 ? topicNavigationItems[currentTopicIndex - 1] : null;
  const nextTopic =
    currentTopicIndex !== -1 && currentTopicIndex < topicNavigationItems.length - 1
      ? topicNavigationItems[currentTopicIndex + 1]
      : null;

  if (overviewTopic) {
    let overviewData: Awaited<ReturnType<typeof getPostData>>;

    try {
      overviewData = await getPostData(overviewTopic.slug || slug, 'module-overviews');
    } catch {
      notFound();
    }

    const overviewNumber = getModuleOverviewNumber(overviewTopic);
    const moduleColor = getModuleColorClasses(overviewTopic.id);

    return (
      <ContentLayout variant="detail-with-toc" fullWidth showToc={false} contentPadding={false}>
        <div className="space-y-8">
          <Breadcrumbs
            className="px-16"
            items={[
              { label: 'Modules', href: '/modules' },
              { label: `${overviewTopic.id}. ${overviewTopic.title}` },
              { label: `${overviewNumber}. Overview` },
            ]}
          />

          <TopicHeader
            moduleColor={moduleColor}
            number={overviewNumber}
            moduleId={overviewTopic.id}
            moduleTitle={overviewTopic.title}
            title={overviewData.title}
            excerpt={overviewData.excerpt}
          />

          <div className="space-y-10 px-16">
            <div className="max-w-4xl">
              <MarkdownContent content={overviewData.content} />
            </div>

            <ModuleTopicsList topic={overviewTopic} />

            <TopicSequenceNav previousTopic={previousTopic} nextTopic={nextTopic} />
          </div>
        </div>
      </ContentLayout>
    );
  }

  if (!result) {
    notFound();
  }

  const { topic, meeting, meetingIndex } = result;
  const topicNumber = getMeetingTopicNumber(topic, meetingIndex);
  const moduleColor = getModuleColorClasses(topic.id);

  const assignedItems = Array.isArray(meeting.assigned) ? meeting.assigned : meeting.assigned ? [meeting.assigned] : [];

  const dueItems = Array.isArray(meeting.due) ? meeting.due : meeting.due ? [meeting.due] : [];

  const readings = meeting.readings || [];
  const optionalReadings = meeting.optionalReadings || [];
  const activities = (meeting.activities || []).filter(activity => activity.excluded !== 1);

  return (
    <ContentLayout variant="detail-with-toc" fullWidth showToc={false} contentPadding={false}>
      <div className="space-y-8">
        <Breadcrumbs
          className="px-16"
          items={[
            { label: 'Modules', href: '/modules' },
            { label: `${topic.id}. ${topic.title}` },
            { label: `${topicNumber}. ${meeting.topic}` },
          ]}
        />

        <TopicHeader
          moduleColor={moduleColor}
          number={topicNumber}
          date={meeting.date}
          moduleId={topic.id}
          moduleTitle={topic.title}
          title={meeting.topic}
        />

        <div className="space-y-10 px-16">
          <EditorialSection label="Context" title="Topic Overview">
            <div className="max-w-4xl text-lg leading-8 text-gray-800 dark:text-gray-200">
              {typeof meeting.description === 'string' ? (
                <p className="mb-0">{meeting.description}</p>
              ) : (
                meeting.description
              )}
            </div>
          </EditorialSection>

          {(readings.length > 0 || optionalReadings.length > 0) && (
            <EditorialSection label="Materials" title="Readings">
              <div className="space-y-6">
                {readings.length > 0 && (
                  <div className="space-y-3">
                    <EditorialLabel>Assigned Readings</EditorialLabel>
                    <ul className="m-0! list-none divide-y divide-gray-200 p-0! dark:divide-gray-800">
                      {readings.map((reading, index) => (
                        <li key={`${meeting.slug}-reading-${index}`} className="py-3 text-sm leading-6 text-gray-800 dark:text-gray-200">
                          {renderReading(reading.citation, reading.url)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {optionalReadings.length > 0 && (
                  <div className="space-y-3">
                    <EditorialLabel>Optional Or Recommended</EditorialLabel>
                    <ul className="m-0! list-none divide-y divide-gray-200 p-0! dark:divide-gray-800">
                      {optionalReadings.map((reading, index) => (
                        <li key={`${meeting.slug}-optional-reading-${index}`} className="py-3 text-sm leading-6 text-gray-800 dark:text-gray-200">
                          {renderReading(reading.citation, reading.url)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </EditorialSection>
          )}

          {activities.length > 0 && (
            <EditorialSection label="Activities" title="Activities And Labs">
              <div className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800">
                {activities.map(activity => (
                  <div
                    key={`${meeting.slug}-activity-${activity.title}`}
                    className="py-3 text-sm leading-6"
                  >
                    {activity.url ? (
                      <Link
                        href={activity.url}
                        className="font-medium text-gray-900 no-underline hover:text-[#0b5d8f] dark:text-gray-100 dark:hover:text-[#8fc4ee]"
                      >
                        {activity.title}
                      </Link>
                    ) : (
                      <p className="m-0 text-base font-medium text-gray-900 dark:text-gray-100">
                        {activity.title}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </EditorialSection>
          )}

          {(assignedItems.length > 0 || dueItems.length > 0) && (
            <EditorialSection label="Practice" title="Assigned And Due">
              <div className="space-y-7">
                {assignedItems.length > 0 && (
                  <div className="space-y-3">
                    <EditorialLabel>Assigned</EditorialLabel>
                    <ul className="m-0! list-none divide-y divide-gray-200 p-0! dark:divide-gray-800">
                      {assignedItems.map((item, index) => (
                        <li key={`${meeting.slug}-assigned-${index}`} className="py-3 text-sm leading-6 text-gray-800 dark:text-gray-200">
                          {typeof item === 'string' ? (
                            item
                          ) : item.url ? (
                            <Link href={item.url} className="font-medium text-gray-900 no-underline hover:text-[#0b5d8f] dark:text-gray-100 dark:hover:text-[#8fc4ee]">
                              {item.titleShort ? `${item.titleShort}: ${item.title}` : item.title}
                            </Link>
                          ) : item.titleShort ? (
                            `${item.titleShort}: ${item.title}`
                          ) : (
                            item.title
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {dueItems.length > 0 && (
                  <div className="space-y-3">
                    <EditorialLabel>Due</EditorialLabel>
                    <ul className="m-0! list-none divide-y divide-gray-200 p-0! dark:divide-gray-800">
                      {dueItems.map((item, index) => (
                        <li key={`${meeting.slug}-due-${index}`} className="py-3 text-sm leading-6 text-gray-800 dark:text-gray-200">
                          {typeof item === 'string' ? (
                            item
                          ) : item.url ? (
                            <Link href={item.url} className="font-medium text-gray-900 no-underline hover:text-[#0b5d8f] dark:text-gray-100 dark:hover:text-[#8fc4ee]">
                              {item.titleShort ? `${item.titleShort}: ${item.title}` : item.title}
                            </Link>
                          ) : item.titleShort ? (
                            `${item.titleShort}: ${item.title}`
                          ) : (
                            item.title
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </EditorialSection>
          )}

          <TopicSequenceNav previousTopic={previousTopic} nextTopic={nextTopic} />
        </div>
      </div>
    </ContentLayout>
  );
}
