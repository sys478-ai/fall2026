import { getCourseConfig } from '@/lib/config';
import type { ModuleColorToken } from '@/lib/module-colors';
import { getTopics } from '@/lib/topics';
import { getMeetingAnchorId, getModuleAnchorId } from '@/lib/navigation-helpers';
import { getTopicModules } from '@/lib/topic-config';
import SidebarNavClient from './SidebarNavClient';

interface SidebarTopicItem {
  id: string;
  title: string;
  date: string;
  contentHref: string;
  isNoClass?: boolean;
}

interface SidebarModuleItem {
  id: number;
  title: string;
  color: ModuleColorToken;
  href: string;
  topics: SidebarTopicItem[];
}

export default async function Navigation() {
  const courseConfig = getCourseConfig();
  const scheduledTopics = await getTopics();
  const topicModules = getTopicModules();

  const meetingBySlug = new Map(
    scheduledTopics.flatMap((module) =>
      module.meetings
        .filter((meeting) => meeting.slug)
        .map((meeting) => [meeting.slug!, meeting] as const)
    )
  );

  const modules: SidebarModuleItem[] = topicModules.map((module) => ({
    id: module.id,
    title: module.title,
    color: module.color,
    href: module.slug ? `/topics/${module.slug}` : `/#${getModuleAnchorId(module.id)}`,
    topics: [
      ...(module.slug
        ? [
            {
              id: module.slug,
              title: `Overview`,
              date: 'Module overview',
              contentHref: `/topics/${module.slug}`,
              isNoClass: false,
            },
          ]
        : []),
      ...module.meetings.map((meeting, index) => {
        const scheduledMeeting = meetingBySlug.get(meeting.slug);
        const contentHref = meeting.slug
          ? `/topics/${meeting.slug}`
          : `/#${getMeetingAnchorId(module.id, index, meeting.title)}`;

        return {
          id: meeting.slug || getMeetingAnchorId(module.id, index, meeting.title),
          title: meeting.title,
          date: scheduledMeeting?.date || '',
          contentHref,
          isNoClass: scheduledMeeting?.holiday === true,
        };
      }),
    ],
  }));

  return (
    <SidebarNavClient
      courseTitle={`${courseConfig.courseNumber}: ${courseConfig.semester}`}
      modules={modules}
    />
  );
}
