import { getCourseConfig } from '@/lib/config';
import { flattenCourseMeetings } from '@/lib/course-dashboard';
import { getDashboardAssignments } from '@/lib/dashboard-assignments';
import { getTopics } from '@/lib/topics';
import SidebarNavClient from './SidebarNavClient';

export default async function Navigation() {
  const courseConfig = getCourseConfig();
  const scheduledTopics = await getTopics();
  const meetings = flattenCourseMeetings(scheduledTopics);
  const assignments = await getDashboardAssignments();

  return (
    <SidebarNavClient
      courseTitle={`${courseConfig.courseNumber}: ${courseConfig.semester}`}
      meetings={meetings}
      assignments={assignments}
    />
  );
}
