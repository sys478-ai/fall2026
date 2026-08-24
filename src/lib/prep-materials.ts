import type { AssignmentBadgeKind } from '@/lib/assignment-badges';
import { groupReadingsByPickOne } from '@/lib/reading-groups';
import type { Topic } from '@/lib/topics';
import { formatDate, formatDueDateTime } from '@/lib/utils';

export type PrepBadgeKind = AssignmentBadgeKind;

export type PrepAssignmentItem = {
  title: string;
  href?: string;
  dueDate?: string;
  dueDateIso?: string;
  dueTime?: string;
  notes?: string;
  badgeKind: PrepBadgeKind;
};

export type NextTimeCategory = 'prep' | 'assignments';

export type DashboardPrepRow = {
  key: string;
  category: NextTimeCategory;
  summary: string;
  href: string | null;
  assignmentBadgeKind?: AssignmentBadgeKind;
};

export function getPrepBadgeKindFromAssignment(input: {
  type?: string;
  title?: string;
  href?: string;
}): PrepBadgeKind {
  const raw = (input.type || '').toLowerCase().trim();
  const haystack = `${raw} ${input.title || ''} ${input.href || ''}`.toLowerCase();

  if (raw === 'quiz' || haystack.includes('/quizzes/')) {
    return 'quiz';
  }

  if (raw === 'discussion' || haystack.includes('discussion')) {
    return 'discussion';
  }

  if (raw === 'reflection') {
    return 'reflection';
  }

  if (
    raw === 'career' ||
    raw === 'career module' ||
    haystack.includes('career-module') ||
    haystack.includes('pathwayu')
  ) {
    return 'career';
  }

  if (raw === 'lab') {
    return 'lab';
  }

  return 'homework';
}

function getAssignmentTitle(item: { titleShort?: string; title: string }) {
  return item.titleShort ? `${item.titleShort}: ${item.title}` : item.title;
}

function getDiscussionDueLabel(item: { dueDate?: string; dueTime?: string }, meetingDate: string) {
  const dateLabel =
    item.dueDate && /^\d{4}-\d{2}-\d{2}$/.test(item.dueDate) ? formatDate(item.dueDate) : item.dueDate || meetingDate;

  return formatDueDateTime(dateLabel, item.dueTime);
}

function getPrepAssignmentDueDateIso(dueDate?: string) {
  return dueDate && /^\d{4}-\d{2}-\d{2}$/.test(dueDate) ? dueDate : undefined;
}

export function getPrepAssignments(meeting: Topic['meetings'][number]): PrepAssignmentItem[] {
  const dueItems = Array.isArray(meeting.due) ? meeting.due : meeting.due ? [meeting.due] : [];

  return [
    ...dueItems.flatMap(item => {
      if (typeof item === 'string' || item.draft === 1) {
        return [];
      }

      const dateLabel =
        item.dueDate && /^\d{4}-\d{2}-\d{2}$/.test(item.dueDate) ? formatDate(item.dueDate) : meeting.date;

      return [
        {
          title: getAssignmentTitle(item),
          href: item.url,
          dueDate: formatDueDateTime(dateLabel, item.dueTime),
          dueDateIso: getPrepAssignmentDueDateIso(item.dueDate),
          dueTime: item.dueTime,
          notes: item.notes,
          badgeKind: getPrepBadgeKindFromAssignment({
            type: item.type,
            title: getAssignmentTitle(item),
            href: item.url,
          }),
        },
      ];
    }),
    ...(meeting.assignments || []).map(item => ({
      title: item.title,
      href: item.url,
      dueDate: getDiscussionDueLabel(item, meeting.date),
      dueDateIso: getPrepAssignmentDueDateIso(item.dueDate),
      dueTime: item.dueTime,
      notes: item.notes,
      badgeKind: getPrepBadgeKindFromAssignment({
        type: item.type,
        title: item.title,
        href: item.url,
      }),
    })),
  ];
}

export function countRequiredReadingGroups(readings: Topic['meetings'][number]['readings']) {
  return groupReadingsByPickOne(readings || []).length;
}

export function getClassPrepSummary(
  readingCount: number,
  taskCount: number,
  reminders: Array<{ title: string; notes?: string }>
) {
  if (readingCount > 0 && taskCount > 0) {
    return [
      `${readingCount} reading${readingCount === 1 ? '' : 's'}`,
      `${taskCount} task${taskCount === 1 ? '' : 's'}`,
    ].join(' · ');
  }

  if (readingCount > 0) {
    return `${readingCount} readings to complete`;
  }

  if (taskCount > 0) {
    return `${taskCount} task${taskCount === 1 ? '' : 's'}`;
  }

  if (reminders.length === 1 && reminders[0].title) {
    const title = reminders[0].title.trim();
    return title.length > 72 ? `${title.slice(0, 69).trimEnd()}…` : title;
  }

  if (reminders.length > 0) {
    return `${reminders.length} reminder${reminders.length === 1 ? '' : 's'}`;
  }

  return 'Prep work';
}

export function getDashboardPrepRows(
  meeting: Topic['meetings'][number],
  options: { isDraft?: boolean } = {}
): DashboardPrepRow[] {
  const readingCount = countRequiredReadingGroups(meeting.readings);
  const taskCount = (meeting.otherPreparation || []).length;
  const reminders = meeting.beforeClassReminders || [];
  const prepAssignments = getPrepAssignments(meeting);
  const hasClassPrep = readingCount > 0 || taskCount > 0 || reminders.length > 0;
  const isDraft = options.isDraft === true;
  const beforeClassHref = meeting.slug && !isDraft ? `/topics/${meeting.slug}#topic-before-class` : null;

  const rows: DashboardPrepRow[] = [];

  if (hasClassPrep) {
    rows.push({
      key: 'prep',
      category: 'prep',
      summary: getClassPrepSummary(readingCount, taskCount, reminders),
      href: beforeClassHref,
    });
  }

  prepAssignments.forEach((assignment, index) => {
    rows.push({
      key: `assignment-${index}`,
      category: 'assignments',
      summary: assignment.title,
      href: '/assignments',
      assignmentBadgeKind: assignment.badgeKind,
    });
  });

  return rows;
}
