import type { ReactElement } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ContentLayout from '@/components/ContentLayout';
import PageHeader from '@/components/PageHeader';
import { getTopicMeetingBySlug } from '@/lib/topics';
import { getTopicModules } from '@/lib/topic-config';
import { getModuleAnchorId, getMeetingAnchorId } from '@/lib/navigation-helpers';

interface TopicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return getTopicModules().flatMap((module) =>
    module.meetings.map((meeting) => ({
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

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const result = await getTopicMeetingBySlug(slug);

  if (!result) {
    notFound();
  }

  const { topic, meeting, meetingIndex } = result;
  const scheduleHref = `/#${getMeetingAnchorId(topic.id, meetingIndex, meeting.topic)}`;
  const moduleHref = `/#${getModuleAnchorId(topic.id)}`;

  const assignedItems = Array.isArray(meeting.assigned)
    ? meeting.assigned
    : meeting.assigned
      ? [meeting.assigned]
      : [];

  const dueItems = Array.isArray(meeting.due)
    ? meeting.due
    : meeting.due
      ? [meeting.due]
      : [];

  const readings = meeting.readings || [];
  const optionalReadings = meeting.optionalReadings || [];
  const activities = (meeting.activities || []).filter((activity) => activity.excluded !== 1);

  return (
    <ContentLayout variant="detail-with-toc" fullWidth>
      <div className="space-y-8">
        <div className="mb-4">
          <Link href="/modules" className="text-blue-600 hover:underline dark:text-blue-400">
            Modules
          </Link>
          {' > '}
          <span className="text-gray-700 dark:text-gray-300">{topic.title}</span>
          {' > '}
          <span className="text-gray-900 dark:text-gray-100">{meeting.topic}</span>
        </div>

        <PageHeader
          title={meeting.topic}
          excerpt={`${meeting.date} · Module ${topic.id}: ${topic.title}`}
        />

        <div className="flex flex-wrap gap-3">
          <Link
            href={moduleHref}
            className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-800 no-underline hover:bg-gray-50 dark:border-gray-700 dark:bg-black dark:text-gray-200 dark:hover:bg-gray-900"
          >
            View module in schedule
          </Link>
          <Link
            href={scheduleHref}
            className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-800 no-underline hover:bg-gray-50 dark:border-gray-700 dark:bg-black dark:text-gray-200 dark:hover:bg-gray-900"
          >
            Jump to this day in schedule
          </Link>
        </div>

        <section className="space-y-4">
          <h2>Topic Overview</h2>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black">
            {typeof meeting.description === 'string' ? <p className="mb-0">{meeting.description}</p> : meeting.description}
          </div>
        </section>

        {(readings.length > 0 || optionalReadings.length > 0) && (
          <section className="space-y-4">
            <h2>Readings</h2>
            <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black">
              {readings.length > 0 && (
                <div>
                  <h3 className="mt-0">Assigned Readings</h3>
                  <ul className="list-tight">
                    {readings.map((reading, index) => (
                      <li key={`${meeting.slug}-reading-${index}`}>{renderReading(reading.citation, reading.url)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {optionalReadings.length > 0 && (
                <div>
                  <h3 className="mt-0">Optional Or Recommended</h3>
                  <ul className="list-tight">
                    {optionalReadings.map((reading, index) => (
                      <li key={`${meeting.slug}-optional-reading-${index}`}>{renderReading(reading.citation, reading.url)}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {(activities.length > 0 || assignedItems.length > 0 || dueItems.length > 0) && (
          <section className="space-y-4">
            <h2>Related Work And Resources</h2>
            <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-black">
              {activities.length > 0 && (
                <div>
                  <h3 className="mt-0">Activities And Labs</h3>
                  <div className="space-y-3">
                    {activities.map((activity) => (
                      <div key={`${meeting.slug}-activity-${activity.title}`} className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                        {activity.url ? (
                          <Link href={activity.url} className="text-base font-medium text-blue-600 hover:underline dark:text-blue-400">
                            {activity.title}
                          </Link>
                        ) : (
                          <p className="m-0 text-base font-medium text-gray-900 dark:text-gray-100">{activity.title}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {assignedItems.length > 0 && (
                <div>
                  <h3 className="mt-0">Assigned</h3>
                  <ul className="list-tight">
                    {assignedItems.map((item, index) => (
                      <li key={`${meeting.slug}-assigned-${index}`}>
                        {typeof item === 'string' ? (
                          item
                        ) : item.url ? (
                          <Link href={item.url} className="text-blue-600 hover:underline dark:text-blue-400">
                            {item.titleShort ? `${item.titleShort}: ${item.title}` : item.title}
                          </Link>
                        ) : (
                          item.titleShort ? `${item.titleShort}: ${item.title}` : item.title
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {dueItems.length > 0 && (
                <div>
                  <h3 className="mt-0">Due</h3>
                  <ul className="list-tight">
                    {dueItems.map((item, index) => (
                      <li key={`${meeting.slug}-due-${index}`}>
                        {typeof item === 'string' ? (
                          item
                        ) : item.url ? (
                          <Link href={item.url} className="text-blue-600 hover:underline dark:text-blue-400">
                            {item.titleShort ? `${item.titleShort}: ${item.title}` : item.title}
                          </Link>
                        ) : (
                          item.titleShort ? `${item.titleShort}: ${item.title}` : item.title
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </ContentLayout>
  );
}
