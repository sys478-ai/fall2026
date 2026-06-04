import { getAllPostIds, getPostData } from '@/lib/markdown';
import ContentLayout from '@/components/ContentLayout';
import QuickLinksNav from '@/components/QuickLinksNav';
import TopLevelPageHeader from '@/components/TopLevelPageHeader';
import AssignmentsTabbedList from '@/components/assignments/AssignmentsTabbedList';
import { getDueDateForScheduledDay } from '@/lib/course-calendar';
import externalAssignments from '../../../content/config/external-assignments.json';

interface AssignmentData {
  id: string;
  num?: string;
  title: string;
  excerpt?: string;
  date?: string;
  due_date?: string;
  type?: string;
  assigned?: string;
  scheduled_day?: number;
  notes?: string;
  draft?: number;
  external_url?: string;
  external_type?: string;
  excluded?: boolean;
  no_render?: number;
  hide_from_list?: number;
}


export default async function AssignmentsPage() {
  // Get all assignment files from content/assignments directory
  const assignmentIds = getAllPostIds('assignments');
  
  const markdownAssignments: AssignmentData[] = await Promise.all(assignmentIds.map(async ({ params }) => {
    const postData = await getPostData(params.id, 'assignments');
    return {
      id: params.id,
      num: postData.num,
      title: postData.title,
      excerpt: postData.excerpt,
      date: postData.date,
      due_date: getDueDateForScheduledDay(postData.scheduled_day) || postData.due_date,
      type: postData.type,
      assigned: postData.assigned,
      scheduled_day: postData.scheduled_day,
      notes: postData.notes,
      draft: postData.draft,
      excluded: postData.excluded,
      no_render: postData.no_render,
      hide_from_list: postData.hide_from_list,
    };
  }));

  // Combine markdown assignments with external assignments
  let assignments: AssignmentData[] = [...markdownAssignments, ...externalAssignments];
  // Filter out excluded assignments, no_render assignments, and explicitly hidden list items.
  assignments = assignments.filter(
    assignment =>
      !assignment.excluded &&
      assignment.no_render !== 1 &&
      assignment.hide_from_list !== 1
  );

  // Sort assignments
  assignments.sort((a, b) => {
    // Primary sort: by date
    if (a.due_date && b.due_date) {
      const dateComparison = new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      if (dateComparison !== 0) return dateComparison;
    }
    // If only one has a date, put the one without date at the end
    if (a.due_date && !b.due_date) return -1;
    if (!a.due_date && b.due_date) return 1;
    
    // Secondary sort: by assignment number
    const aNum = parseInt(a.num as string) || 100000;
    const bNum = parseInt(b.num as string) || 100000;
    return aNum - bNum;
  });

  const pageDescription =
    'Labs, career modules, and other assignment-type course materials. Unless otherwise noted, submitted work is due at 11:59pm ET on the listed date.';

  return (
    <ContentLayout
      variant="list"
      leftNav={<QuickLinksNav />}
      header={
        <TopLevelPageHeader
          label="Assignments"
          title="Assignments"
          description={pageDescription}
          tone="sky"
        />
      }
    >
      <div className="space-y-6">
        <AssignmentsTabbedList items={assignments} />
      </div>
    </ContentLayout>
  );
} 
