import type { ReactElement } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ContentLayout from '@/components/ContentLayout';
import { getTopicMeetingBySlug } from '@/lib/topics';
import { getTopicModules } from '@/lib/topic-config';

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

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const result = await getTopicMeetingBySlug(slug);

  if (!result) {
    notFound();
  }

  const { topic, meeting, meetingIndex } = result;
  const topicNumber = `${topic.id}.${meetingIndex + 1}`;

  const assignedItems = Array.isArray(meeting.assigned) ? meeting.assigned : meeting.assigned ? [meeting.assigned] : [];

  const dueItems = Array.isArray(meeting.due) ? meeting.due : meeting.due ? [meeting.due] : [];

  const readings = meeting.readings || [];
  const optionalReadings = meeting.optionalReadings || [];
  const activities = (meeting.activities || []).filter(activity => activity.excluded !== 1);

  return (
    <ContentLayout variant="detail-with-toc" fullWidth>
      <div className="space-y-8">
        <div className="mb-4 px-5">
          <Link href="/modules" className="text-blue-600 hover:underline dark:text-blue-400">
            Modules
          </Link>
          {' > '}
          <span className="text-gray-700 dark:text-gray-300">{topic.title}</span>
          {' > '}
          <span className="text-gray-900 dark:text-gray-100">{meeting.topic}</span>
        </div>

        <header className="grid gap-6 border-y border-gray-200 bg-slate-50 px-5 py-7 dark:border-gray-800 dark:bg-gray-950/35 md:grid-cols-[8rem_1fr]">
          <div className="border-b border-gray-200 pb-4 dark:border-gray-800 md:border-b-0 md:border-r md:pb-0 md:pr-5">
            <p className="mb-1 text-4xl font-semibold leading-none tracking-tight text-[#0b5d8f] dark:text-[#8fc4ee]">
              {topicNumber}
            </p>
            <p className="mb-0 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              {meeting.date}
            </p>
          </div>
          <div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-wide">
              <span className="text-[#0b5d8f] dark:text-[#8fc4ee]">
                Module {topic.id}: {topic.title}
              </span>
            </div>
            <h1 className="m-0! max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-950 dark:text-gray-50">
              {meeting.topic}
            </h1>
          </div>
        </header>

        <div className="space-y-10 px-5">
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
        </div>
      </div>
    </ContentLayout>
  );
}
