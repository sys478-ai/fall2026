import { getCourseConfig } from '@/lib/config';
import type { ModuleColorToken } from '@/lib/module-colors';
import { getTopics } from '@/lib/topics';
import { getMeetingAnchorId, getModuleAnchorId } from '@/lib/navigation-helpers';
import SidebarNavClient from './SidebarNavClient';

interface SidebarTopicItem {
  id: string;
  title: string;
  date: string;
  contentHref: string;
  isNoClass?: boolean;
  isDraft?: boolean;
}

interface SidebarModuleItem {
  id: number;
  title: string;
  color: ModuleColorToken;
  href: string;
  isDraft?: boolean;
  topics: SidebarTopicItem[];
}

export default async function Navigation() {
  const courseConfig = getCourseConfig();
  const scheduledTopics = await getTopics();

  const modules: SidebarModuleItem[] = scheduledTopics.map(module => ({
    id: module.id,
    title: module.title,
    color: module.color,
    href: module.slug ? `/topics/${module.slug}` : `/#${getModuleAnchorId(module.id)}`,
    isDraft: module.draft === 1,
    topics: module.meetings.map((meeting, index) => {
      const contentHref = meeting.slug
        ? `/topics/${meeting.slug}`
        : `/#${getMeetingAnchorId(module.id, index, meeting.topic)}`;

      return {
        id: meeting.slug || getMeetingAnchorId(module.id, index, meeting.topic),
        title: meeting.topic,
        date: meeting.date || '',
        contentHref,
        isNoClass: meeting.holiday === true,
        isDraft: meeting.draft === 1,
      };
    }),
  }));

  return <SidebarNavClient courseTitle={`${courseConfig.courseNumber}: ${courseConfig.semester}`} modules={modules} />;
}
