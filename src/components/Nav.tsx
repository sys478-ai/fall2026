import { getCourseConfig } from '@/lib/config';
import { getTopics } from '@/lib/topics';
import { getMeetingAnchorId, getModuleAnchorId } from '@/lib/navigation-helpers';
import SidebarNavClient from './SidebarNavClient';

interface SidebarTopicItem {
  id: string;
  title: string;
  date: string;
  contentHref: string;
  resourcesHref: string;
  resourcesCount: number;
  activitiesHref: string;
  activitiesCount: number;
}

interface SidebarModuleItem {
  id: number;
  title: string;
  href: string;
  topics: SidebarTopicItem[];
}

function extractResourcesInfo(
  meeting: Awaited<ReturnType<typeof getTopics>>[number]['meetings'][number],
  contentHref: string
) {
  const readingUrls = [...(meeting.readings || []), ...(meeting.optionalReadings || [])]
    .map((reading) => reading.url)
    .filter((url): url is string => Boolean(url));

  const resourcesCount = (meeting.readings?.length || 0) + (meeting.optionalReadings?.length || 0);

  return {
    resourcesHref: readingUrls[0] || contentHref,
    resourcesCount,
  };
}

function extractActivitiesInfo(
  meeting: Awaited<ReturnType<typeof getTopics>>[number]['meetings'][number],
  contentHref: string
) {
  const urls: string[] = [];

  (meeting.activities || []).forEach((activity) => {
    if (activity.url) {
      urls.push(activity.url);
    }
  });

  const assignedItems = Array.isArray(meeting.assigned)
    ? meeting.assigned
    : meeting.assigned
      ? [meeting.assigned]
      : [];

  assignedItems.forEach((item) => {
    if (typeof item === 'object' && item.url) {
      urls.push(item.url);
    }
  });

  return {
    activitiesHref: urls[0] || contentHref,
    activitiesCount: (meeting.activities?.length || 0) + assignedItems.length,
  };
}

export default async function Navigation() {
  const courseConfig = getCourseConfig();
  const topics = await getTopics();

  const modules: SidebarModuleItem[] = topics.map((topic) => ({
    id: topic.id,
    title: topic.title,
    href: topic.slug ? `/topics/${topic.slug}` : `/#${getModuleAnchorId(topic.id)}`,
    topics: [
      ...(topic.slug
        ? [
            {
              id: topic.slug,
              title: `${topic.id}.1 Overview`,
              date: 'Module overview',
              contentHref: `/topics/${topic.slug}`,
              resourcesHref: `/topics/${topic.slug}`,
              resourcesCount: 0,
              activitiesHref: `/topics/${topic.slug}`,
              activitiesCount: 0,
            },
          ]
        : []),
      ...topic.meetings.map((meeting, index) => {
        const contentHref = meeting.slug ? `/topics/${meeting.slug}` : `/#${getMeetingAnchorId(topic.id, index, meeting.topic)}`;
        const { resourcesHref, resourcesCount } = extractResourcesInfo(meeting, contentHref);
        const { activitiesHref, activitiesCount } = extractActivitiesInfo(meeting, contentHref);

        return {
          id: meeting.slug || getMeetingAnchorId(topic.id, index, meeting.topic),
          title: `${topic.id}.${index + 2} ${meeting.topic}`,
          date: meeting.date,
          contentHref,
          resourcesHref,
          resourcesCount,
          activitiesHref,
          activitiesCount,
        };
      }),
    ],
  }));

  return <SidebarNavClient courseTitle={`${courseConfig.courseNumber}: ${courseConfig.semester}`} modules={modules} />;
}
