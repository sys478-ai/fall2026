import ContentLayout from '@/components/ContentLayout';
import CourseScheduleExpandControls from '@/components/CourseScheduleExpandControls';
import CourseScheduleList from '@/components/CourseScheduleList';
import TopLevelPageHeader from '@/components/TopLevelPageHeader';
import { getTopics } from '@/lib/topics';

export default async function TopicsOverviewPage() {
  const topics = await getTopics();
  const topicIds = topics.map(topic => topic.id);

  return (
    <ContentLayout
      variant="list"
      fullWidth
      header={
        <TopLevelPageHeader
          label="Course Schedule"
          title="Course Schedule"
          description="A semester overview of the course topics, meeting dates, readings, and assignments."
          tone="indigo"
          actions={<CourseScheduleExpandControls topicIds={topicIds} />}
        />
      }
    >
      <div className="max-w-6xl">
        <CourseScheduleList topics={topics} />
      </div>
    </ContentLayout>
  );
}
