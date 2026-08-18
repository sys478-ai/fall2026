import ContentLayout from '@/components/ContentLayout';
import CourseScheduleList from '@/components/CourseScheduleList';
import TopLevelPageHeader from '@/components/TopLevelPageHeader';
import { getTopics } from '@/lib/topics';

export default async function ModulesPage() {
  const topics = await getTopics();

  return (
    <ContentLayout
      variant="list"
      fullWidth
      header={
        <TopLevelPageHeader
          label="Course Schedule"
          title="Modules"
          description="A semester overview of the course modules, meeting dates, assigned readings, and due work."
          tone="indigo"
        />
      }
    >
      <div className="max-w-6xl">
        <CourseScheduleList topics={topics} />
      </div>
    </ContentLayout>
  );
}
