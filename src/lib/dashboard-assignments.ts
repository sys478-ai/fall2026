import { getDateForScheduledDay, resolveDueDate } from '@/lib/course-calendar';
import { getAllPostIds, getPostData } from '@/lib/markdown';
import { getTopicAssignmentIndexItems } from '@/lib/topic-markdown';
import externalAssignments from '../../content/config/external-assignments.json';

function getAssignmentSlugFromUrl(url?: string) {
  const normalized = url?.replace(/^\/fall2026/, '').replace(/\/$/, '') || '';
  const match = normalized.match(/^\/assignments\/([^/]+)$/);
  return match?.[1] || null;
}

export type DashboardAssignmentInput = {
  id: string;
  title: string;
  due_date?: string;
  due_time?: string;
  draft?: number;
  external_url?: string;
};

export async function getDashboardAssignments(): Promise<DashboardAssignmentInput[]> {
  const assignmentIds = getAllPostIds('assignments');
  const markdownAssignments = await Promise.all(
    assignmentIds.map(async ({ params }) => {
      const postData = await getPostData(params.id, 'assignments');
      return {
        id: params.id,
        title: postData.title as string,
        due_date: resolveDueDate(postData),
        due_time: postData.due_time as string | undefined,
        draft: postData.draft === 0 ? 0 : 1,
        external_url: undefined as string | undefined,
      };
    })
  );

  const assignmentDraftById = new Map(
    markdownAssignments.map(assignment => [assignment.id, assignment.draft ?? 1])
  );

  const topicAssignments = getTopicAssignmentIndexItems().map(item => {
    const linkedAssignmentSlug = getAssignmentSlugFromUrl(item.url);
    const linkedAssignmentDraft = linkedAssignmentSlug
      ? assignmentDraftById.get(linkedAssignmentSlug)
      : undefined;

    return {
      id: item.id,
      title: item.title,
      due_date: item.dueDate || getDateForScheduledDay(item.scheduledDay),
      due_time: item.dueTime,
      draft: linkedAssignmentDraft ?? item.draft,
      external_url: item.url,
    };
  });

  const external = (
    externalAssignments as Array<{
      id: string;
      title: string;
      due_date?: string;
      due_time?: string;
      draft?: number;
      external_url?: string;
      excluded?: boolean;
      hide_from_list?: number;
    }>
  )
    .filter(item => !item.excluded && item.hide_from_list !== 1)
    .map(item => ({
      id: item.id,
      title: item.title,
      due_date: item.due_date,
      due_time: item.due_time,
      draft: item.draft,
      external_url: item.external_url,
    }));

  return [...markdownAssignments, ...topicAssignments, ...external].filter(item => item.draft !== 1);
}
