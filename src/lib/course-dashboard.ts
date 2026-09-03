import type { ModuleColorToken } from '@/lib/module-colors';
import { formatIsoDateLocal, parseMeetingDate } from '@/lib/meeting-dates';
import {
  countRequiredReadingGroups,
  getClassPrepSummary,
  getPrepAssignments,
  type DashboardPrepRow,
  type PrepAssignmentItem,
} from '@/lib/prep-materials';
import type { Topic } from '@/lib/topics';

export interface TimelineMeeting {
  moduleId: number;
  moduleTitle: string;
  moduleColor: ModuleColorToken;
  meetingIndex: number;
  topicNumber: string;
  dateIso: string;
  dateLabel: string;
  title: string;
  slug?: string;
  isHoliday: boolean;
  isDraft: boolean;
  readingGroupCount: number;
  taskCount: number;
  reminders: Array<{ title: string; url?: string; notes?: string }>;
  prepAssignments: PrepAssignmentItem[];
}

export interface CourseTimeline {
  todayMeeting: TimelineMeeting | null;
  nextMeeting: TimelineMeeting | null;
}

export type FocusMeetingKind = 'today' | 'latest' | 'next';

export interface FocusMeetingResult {
  meeting: TimelineMeeting;
  kind: FocusMeetingKind;
}

export interface DashboardAssignmentItem {
  id: string;
  title: string;
  dueDate: string;
  dueTime?: string;
  href: string;
}

export interface UpcomingPrepMeeting {
  meeting: TimelineMeeting;
  prepRows: DashboardPrepRow[];
  beforeClassHref: string | null;
}

function getMeetingTopicNumber(topicId: number, meetingIndex: number) {
  return `${topicId}.${meetingIndex + 1}`;
}

function buildClassPrepRows(meeting: TimelineMeeting): DashboardPrepRow[] {
  const hasClassPrep =
    meeting.readingGroupCount > 0 || meeting.taskCount > 0 || meeting.reminders.length > 0;
  if (!hasClassPrep) {
    return [];
  }

  const beforeClassHref =
    meeting.slug && !meeting.isDraft ? `/meetings/${meeting.slug}#meeting-before-class` : null;

  return [
    {
      key: 'prep',
      category: 'prep',
      summary: getClassPrepSummary(meeting.readingGroupCount, meeting.taskCount, meeting.reminders),
      href: beforeClassHref,
    },
  ];
}

export function flattenCourseMeetings(topics: Topic[]): TimelineMeeting[] {
  return topics.flatMap(topic =>
    topic.meetings.flatMap((meeting, meetingIndex) => {
      if (meeting.scheduleOnly) {
        return [];
      }

      const dateIso = parseMeetingDate(meeting.date);
      if (!dateIso) {
        return [];
      }

      return [
        {
          moduleId: topic.id,
          moduleTitle: topic.title,
          moduleColor: topic.color,
          meetingIndex,
          topicNumber: getMeetingTopicNumber(topic.id, meetingIndex),
          dateIso,
          dateLabel: meeting.date,
          title: meeting.topic,
          slug: meeting.slug,
          isHoliday: meeting.holiday === true,
          isDraft: meeting.draft === 1,
          readingGroupCount: countRequiredReadingGroups(meeting.readings),
          taskCount: (meeting.otherPreparation || []).length,
          reminders: (meeting.beforeClassReminders || []).map(reminder => ({
            title: reminder.title,
            url: reminder.url,
            notes: reminder.notes,
          })),
          prepAssignments: getPrepAssignments(meeting),
        },
      ];
    })
  );
}

function isOpenClassMeeting(item: TimelineMeeting) {
  return !item.isHoliday && !item.isDraft && Boolean(item.slug);
}

function addDaysToIsoDate(dateIso: string, days: number): string {
  const [year, month, day] = dateIso.split('-').map(Number);
  const date = new Date(year, month - 1, day, 12, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return formatIsoDateLocal(date);
}

export function getCourseTimeline(
  meetings: TimelineMeeting[],
  referenceDate: Date = new Date()
): CourseTimeline {
  const todayIso = formatIsoDateLocal(referenceDate);
  const sorted = [...meetings].sort((a, b) => a.dateIso.localeCompare(b.dateIso));
  const openMeetings = sorted.filter(isOpenClassMeeting);
  const todayMeeting = sorted.find(item => item.dateIso === todayIso) || null;

  const nextMeeting =
    todayMeeting && isOpenClassMeeting(todayMeeting)
      ? openMeetings.find(item => item.dateIso > todayMeeting.dateIso) || null
      : openMeetings.find(item => item.dateIso > todayIso) || null;

  return {
    todayMeeting,
    nextMeeting,
  };
}

/**
 * Meeting students should land on from Topics nav:
 * 1. today's open class
 * 2. most recent past open class
 * 3. next upcoming open class
 */
export function getFocusMeeting(
  meetings: TimelineMeeting[],
  referenceDate: Date = new Date()
): FocusMeetingResult | null {
  const todayIso = formatIsoDateLocal(referenceDate);
  const sorted = [...meetings].sort((a, b) => a.dateIso.localeCompare(b.dateIso));
  const openMeetings = sorted.filter(isOpenClassMeeting);

  const todayMeeting = sorted.find(item => item.dateIso === todayIso) || null;
  if (todayMeeting && isOpenClassMeeting(todayMeeting)) {
    return { meeting: todayMeeting, kind: 'today' };
  }

  const mostRecentPast =
    [...openMeetings].reverse().find(item => item.dateIso <= todayIso) || null;
  if (mostRecentPast) {
    return { meeting: mostRecentPast, kind: 'latest' };
  }

  const nextUpcoming = openMeetings.find(item => item.dateIso > todayIso) || null;
  if (nextUpcoming) {
    return { meeting: nextUpcoming, kind: 'next' };
  }

  return null;
}

type AssignmentSource = {
  title: string;
  due_date?: string;
  due_time?: string;
  draft?: number;
  id: string;
  external_url?: string;
};

function toDashboardAssignment(item: AssignmentSource): DashboardAssignmentItem {
  return {
    id: item.id,
    title: item.title.trim(),
    dueDate: item.due_date as string,
    dueTime: item.due_time,
    href: item.external_url || `/assignments/${item.id}`,
  };
}

/** Assignments due in [today, today+days], inclusive. */
export function getAssignmentsInWindow(
  assignments: AssignmentSource[],
  referenceDate: Date = new Date(),
  days = 14
): DashboardAssignmentItem[] {
  const todayIso = formatIsoDateLocal(referenceDate);
  const endIso = addDaysToIsoDate(todayIso, days);

  return assignments
    .filter(
      item =>
        item.draft !== 1 &&
        item.due_date &&
        item.due_date >= todayIso &&
        item.due_date <= endIso
    )
    .sort((a, b) => (a.due_date || '').localeCompare(b.due_date || ''))
    .map(toDashboardAssignment);
}

export function getUpcomingPrepMeetings(
  meetings: TimelineMeeting[],
  referenceDate: Date = new Date(),
  days = 7
): UpcomingPrepMeeting[] {
  const todayIso = formatIsoDateLocal(referenceDate);
  const endIso = addDaysToIsoDate(todayIso, days);
  const openMeetings = [...meetings]
    .filter(isOpenClassMeeting)
    .sort((a, b) => a.dateIso.localeCompare(b.dateIso));

  // Open class meetings after today through the next `days` calendar days (inclusive).
  return openMeetings
    .filter(item => item.dateIso > todayIso && item.dateIso <= endIso)
    .map(meeting => ({
      meeting,
      prepRows: buildClassPrepRows(meeting),
      beforeClassHref:
        meeting.slug && !meeting.isDraft ? `/meetings/${meeting.slug}#meeting-before-class` : null,
    }));
}
