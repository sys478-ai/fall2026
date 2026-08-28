import {
  getAllPosts,
  PostData,
  getAllQuizMetadata,
  QuizMetadata,
  getQuizData,
  getQuizCheatsheet,
  QuizData,
} from './markdown';
import React from 'react';
import taxonomyConfig from '../../content/config/taxonomy.json';
import { courseCalendar } from '../../content/config/schedule';
import { parseMeetingDate } from './meeting-dates';
import type { ModuleColorToken } from './module-colors';
import { getAllModuleMarkdownMetadata, getModuleMarkdownBySlug, type ModuleMarkdownMetadata } from './module-markdown';
import {
  getAllTopicMarkdownMetadata,
  getTopicMarkdownByModule,
  getTopicMarkdownBySlug,
  type TopicMarkdownMetadata,
} from './topic-markdown';
import { generateCourseMeetingDates, resolveDueDate, type GeneratedMeetingDate } from './course-calendar';
import { isCareerModuleAssignment } from './assignment-display';

// Type definitions for topics structure
interface Activity {
  title: string;
  url?: string;
  draft?: number;
  excluded?: number;
  order?: number;
}

interface Assignment {
  titleShort: string;
  title: string;
  url?: string;
  draft?: number;
  order?: number;
  type?: string;
  dueDate?: string;
  dueTime?: string;
  notes?: string;
}

export interface TopicAssignment {
  title: string;
  notes?: string;
  url?: string;
  dueDate?: string;
  dueTime?: string;
  type?: string;
}

export interface BeforeClassReminder {
  title: string;
  notes: string;
  url?: string;
}

export interface Reading {
  citation: string | React.ReactElement;
  url?: string;
  notes?: string;
  pickOne?: boolean;
}

export interface Quiz {
  title: string;
  slug: string;
  quizData?: QuizData;
  cheatsheetContent?: string | null;
  draft?: number;
}

export interface ScheduleQuiz {
  quizName: string;
  url: string;
}

export interface DiscussionQuestion {
  question: string | React.ReactElement;
}

export interface Meeting {
  slug?: string;
  scheduledDay?: number;
  date: string;
  topic: string;
  subtitle?: string;
  description?: string | React.ReactElement;
  topicContentId?: string;
  focus?: string;
  braidElsiConnection?: string;
  activities?: Activity[];
  quizzes?: Quiz[];
  scheduleQuizzes?: ScheduleQuiz[]; // Quizzes from schedule.tsx with quizName and url
  readings?: Reading[];
  optionalReadings?: Reading[];
  otherPreparation?: Reading[];
  holiday?: boolean;
  draft?: number;
  /** Synthetic row on /modules for deadlines that fall on non-class days. */
  scheduleOnly?: boolean;
  discussionQuestions?: DiscussionQuestion[];
  assigned?: Assignment | string | (Assignment | string)[];
  due?: Assignment | string | (Assignment | string)[];
  assignments?: TopicAssignment[];
  beforeClassReminders?: BeforeClassReminder[];
  ethicalPatterns?: string[];
  recognitionPatternNotes?: string[];
  themes?: string[];
}

export interface Topic {
  id: number;
  slug?: string;
  moduleContentId?: string;
  title: string;
  color: ModuleColorToken;
  description: string | React.ReactElement;
  meetings: Meeting[];
  ethicalPatterns?: string[];
  recognitionPatternNotes?: string[];
  themes?: string[];
  draft?: number;
}

// Allows quizzes to be either Quiz, Reading (citation), or ScheduleQuiz (quizName/url).
interface ScheduleQuizInput {
  quizName: string;
  url: string;
}

interface BaseMeeting {
  slug?: string;
  scheduledDay?: number;
  date: string;
  topic: string;
  subtitle?: string;
  description?: string | React.ReactElement;
  topicContentId?: string;
  focus?: string;
  braidElsiConnection?: string;
  activities?: Activity[];
  quizzes?: (Quiz | Reading | ScheduleQuizInput)[]; // Can contain Quiz, Reading (citation), or ScheduleQuiz (quizName/url) from schedule.tsx
  readings?: Reading[];
  optionalReadings?: Reading[];
  otherPreparation?: Reading[];
  holiday?: boolean;
  draft?: number;
  /** Synthetic row on /modules for deadlines that fall on non-class days. */
  scheduleOnly?: boolean;
  discussionQuestions?: DiscussionQuestion[];
  assigned?: Assignment | string | (Assignment | string)[];
  due?: Assignment | string | (Assignment | string)[];
  assignments?: TopicAssignment[];
  beforeClassReminders?: BeforeClassReminder[];
  ethicalPatterns?: string[];
  recognitionPatternNotes?: string[];
  themes?: string[];
}

interface BaseTopic {
  id: number;
  slug?: string;
  moduleContentId?: string;
  title: string;
  color: ModuleColorToken;
  description: string | React.ReactElement;
  meetings: BaseMeeting[];
  ethicalPatterns?: string[];
  recognitionPatternNotes?: string[];
  themes?: string[];
  draft?: number;
}

type TopicsArray = Topic[];
type BaseTopicsArray = BaseTopic[];
type PatternConfig = { slug: string; title: string };

const patternTitleBySlug = Object.fromEntries(
  ((taxonomyConfig.ethicalPatterns || []) as PatternConfig[]).map(pattern => [pattern.slug, pattern.title])
) as Record<string, string>;

function getAssignmentTitleShort(assignment: { type?: string; num?: string | number; id?: string }): string {
  if (assignment.type === 'homework') {
    return `HW ${assignment.num}`;
  }

  if (assignment.type === 'tutorial') {
    return `Tutorial ${assignment.num}`;
  }

  if (assignment.type === 'project') {
    return assignment.num ? `Project ${assignment.num}` : 'Project';
  }

  if (isCareerModuleAssignment(assignment)) {
    return assignment.num ? `Career Module ${assignment.num}` : 'Career Module';
  }

  const typeLabel = assignment.type ? assignment.type.charAt(0).toUpperCase() + assignment.type.slice(1) : 'Assignment';

  return assignment.num ? `${typeLabel} ${assignment.num}` : typeLabel;
}

function getScheduledDay(value: unknown) {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? undefined : parsed;
  }

  return undefined;
}

function uniqueStrings(values: Array<string | undefined>) {
  return Array.from(new Set(values.filter((value): value is string => typeof value === 'string' && value.length > 0)));
}

function getRecognitionPatternLabels(patternSlugs: string[], notes?: string[]) {
  return [...patternSlugs.map(slug => patternTitleBySlug[slug] || slug), ...(notes || [])];
}

function getModuleTopicMetadata(moduleSlug: string) {
  const topics = getTopicMarkdownByModule(moduleSlug);
  const recognitionPatternNotes = uniqueStrings(topics.flatMap(topic => topic.recognitionPatternNotes || []));

  return {
    ethicalPatterns: uniqueStrings(topics.flatMap(topic => topic.ethicalPatterns)),
    recognitionPatternNotes: recognitionPatternNotes.length > 0 ? recognitionPatternNotes : undefined,
    themes: uniqueStrings(topics.flatMap(topic => topic.themes)),
  };
}

function renderModuleDescription(module: ModuleMarkdownMetadata) {
  const moduleMetadata = getModuleTopicMetadata(module.slug);
  const recognitionPatterns = getRecognitionPatternLabels(
    moduleMetadata.ethicalPatterns,
    moduleMetadata.recognitionPatternNotes
  );

  return (
    <>
      <ul className="list-spaced">
        {recognitionPatterns.length > 0 && (
          <li>
            <strong>Recognition patterns:</strong> {recognitionPatterns.join('; ')}
          </li>
        )}
        <li>
          <strong>Unit focus:</strong> {module.unitFocus}
        </li>
        {module.braidElsiArc && (
          <li>
            <strong>BRAID / ELSI arc:</strong> {module.braidElsiArc}
          </li>
        )}
      </ul>
    </>
  );
}

function renderMeetingDescription(meeting: TopicMarkdownMetadata) {
  const recognitionPatterns = getRecognitionPatternLabels(meeting.ethicalPatterns, meeting.recognitionPatternNotes);

  return (
    <>
      <p>
        <strong>Topic / focus:</strong> {meeting.focus}
      </p>
      {recognitionPatterns.length > 0 && (
        <>
          <p>
            <strong>Recognition patterns:</strong>
          </p>
          <ul className="list-tight">
            {recognitionPatterns.map(pattern => (
              <li key={pattern}>{pattern}</li>
            ))}
          </ul>
        </>
      )}
      <p>
        <strong>BRAID / ELSI connection:</strong> {meeting.braidElsiConnection}
      </p>
    </>
  );
}

function buildTopicMeeting(
  module: ModuleMarkdownMetadata,
  meeting: TopicMarkdownMetadata,
  meetingDate: GeneratedMeetingDate
): BaseMeeting {
  return {
    slug: meeting.slug,
    scheduledDay: meeting.scheduledDay,
    topic: meeting.title,
    subtitle: meeting.subtitle,
    date: meetingDate.dateLabel,
    description: meeting.holiday ? 'No class.' : renderMeetingDescription(meeting),
    holiday: meeting.holiday || false,
    topicContentId: meeting.id,
    focus: meeting.focus,
    braidElsiConnection: meeting.braidElsiConnection,
    ethicalPatterns: meeting.ethicalPatterns,
    recognitionPatternNotes: meeting.recognitionPatternNotes,
    themes: meeting.themes,
    readings: meeting.readings,
    optionalReadings: meeting.optionalReadings,
    otherPreparation: meeting.otherPreparation,
    assignments: meeting.assignments,
    draft: meeting.draft ?? 1,
  };
}

function buildHolidayMeeting(
  module: ModuleMarkdownMetadata,
  holidayTopic: TopicMarkdownMetadata | null,
  meetingDate: GeneratedMeetingDate
): BaseMeeting {
  const title = meetingDate.holiday?.title || holidayTopic?.title || 'No class';

  return {
    slug: holidayTopic?.slug,
    topic: title,
    subtitle: 'No class',
    date: meetingDate.dateLabel,
    description: 'No class.',
    holiday: true,
    topicContentId: holidayTopic?.id,
    focus: holidayTopic?.focus,
    braidElsiConnection: holidayTopic?.braidElsiConnection,
    ethicalPatterns: holidayTopic?.ethicalPatterns || [],
    recognitionPatternNotes: holidayTopic?.recognitionPatternNotes,
    themes: holidayTopic?.themes || [],
  };
}

function buildFinalExamMeeting(module: ModuleMarkdownMetadata, meeting: TopicMarkdownMetadata): BaseMeeting {
  return {
    slug: meeting.slug,
    topic: meeting.title,
    subtitle: meeting.subtitle,
    date: courseCalendar.finalExam.dateLabel,
    description: renderMeetingDescription(meeting),
    holiday: meeting.holiday || false,
    topicContentId: meeting.id,
    focus: meeting.focus,
    braidElsiConnection: meeting.braidElsiConnection,
    ethicalPatterns: meeting.ethicalPatterns,
    recognitionPatternNotes: meeting.recognitionPatternNotes,
    themes: meeting.themes,
    readings: meeting.readings,
    optionalReadings: meeting.optionalReadings,
    otherPreparation: meeting.otherPreparation,
    assignments: meeting.assignments,
    draft: meeting.draft ?? 1,
  };
}

function getModuleForHolidayDate(holidayDate: GeneratedMeetingDate, topics: TopicMarkdownMetadata[]) {
  const sortedScheduledTopics = topics
    .filter(
      (topic): topic is TopicMarkdownMetadata & { scheduledDay: number } => typeof topic.scheduledDay === 'number'
    )
    .sort((a, b) => a.scheduledDay - b.scheduledDay);

  const meetingDateByScheduledDay = new Map(
    generateCourseMeetingDates()
      .filter(
        (meetingDate): meetingDate is GeneratedMeetingDate & { scheduledDay: number } =>
          typeof meetingDate.scheduledDay === 'number'
      )
      .map(meetingDate => [meetingDate.scheduledDay, meetingDate.date])
  );
  const nextTopic = sortedScheduledTopics.find(topic => {
    const topicDate = meetingDateByScheduledDay.get(topic.scheduledDay);
    return topicDate ? topicDate > holidayDate.date : false;
  });
  const previousTopic = [...sortedScheduledTopics].reverse().find(topic => {
    const topicDate = meetingDateByScheduledDay.get(topic.scheduledDay);
    return topicDate ? topicDate < holidayDate.date : false;
  });
  const moduleSlug = nextTopic?.module || previousTopic?.module;

  return moduleSlug ? getModuleMarkdownBySlug(moduleSlug) : null;
}

function buildBaseTopicsFromMarkdown(): BaseTopicsArray {
  const modules = getAllModuleMarkdownMetadata();
  const allTopics = getAllTopicMarkdownMetadata();
  const meetingDates = generateCourseMeetingDates();
  const meetingDateByScheduledDay = new Map(
    meetingDates
      .filter(
        (meetingDate): meetingDate is GeneratedMeetingDate & { scheduledDay: number } =>
          typeof meetingDate.scheduledDay === 'number'
      )
      .map(meetingDate => [meetingDate.scheduledDay, meetingDate])
  );
  const holidayTopicsByTitle = new Map(
    allTopics.filter(topic => topic.holiday).map(topic => [topic.title.toLowerCase(), topic])
  );
  const topicMeetingsByModule = new Map<string, BaseMeeting[]>();

  allTopics
    .filter(topic => !topic.holiday && !topic.retired && topic.slug !== courseCalendar.finalExam.topicSlug)
    .forEach(topic => {
      if (typeof topic.scheduledDay !== 'number') {
        throw new Error(`Missing scheduled_day frontmatter in topic "${topic.slug}"`);
      }

      const module = getModuleMarkdownBySlug(topic.module);
      if (!module) {
        throw new Error(`Missing module slug "${topic.module}" for topic "${topic.slug}"`);
      }

      const meetingDate = meetingDateByScheduledDay.get(topic.scheduledDay);
      if (!meetingDate) {
        throw new Error(
          `No generated class meeting for scheduled_day ${topic.scheduledDay} used by topic "${topic.slug}"`
        );
      }

      const meetings = topicMeetingsByModule.get(module.slug) || [];
      meetings.push(buildTopicMeeting(module, topic, meetingDate));
      topicMeetingsByModule.set(module.slug, meetings);
    });

  meetingDates
    .filter(meetingDate => meetingDate.holiday)
    .forEach(meetingDate => {
      const holidayTopic = holidayTopicsByTitle.get((meetingDate.holiday?.title || '').toLowerCase()) || null;
      const module = holidayTopic
        ? getModuleMarkdownBySlug(holidayTopic.module)
        : getModuleForHolidayDate(meetingDate, allTopics);

      if (!module) {
        throw new Error(`Unable to place holiday "${meetingDate.holiday?.title}" in a module`);
      }

      const meetings = topicMeetingsByModule.get(module.slug) || [];
      meetings.push(buildHolidayMeeting(module, holidayTopic, meetingDate));
      topicMeetingsByModule.set(module.slug, meetings);
    });

  const finalExamTopic = getTopicMarkdownBySlug(courseCalendar.finalExam.topicSlug);
  if (finalExamTopic) {
    const module = getModuleMarkdownBySlug(finalExamTopic.module);
    if (!module) {
      throw new Error(`Missing module slug "${finalExamTopic.module}" for final exam topic "${finalExamTopic.slug}"`);
    }

    const meetings = topicMeetingsByModule.get(module.slug) || [];
    meetings.push(buildFinalExamMeeting(module, finalExamTopic));
    topicMeetingsByModule.set(module.slug, meetings);
  }

  return modules.map(module => {
    const meetings = topicMeetingsByModule.get(module.slug) || [];
    meetings.sort((a, b) => {
      const dateA = parseMeetingDate(a.date) || '9999-99-99';
      const dateB = parseMeetingDate(b.date) || '9999-99-99';
      if (dateA !== dateB) {
        return dateA.localeCompare(dateB);
      }
      return (a.scheduledDay || 999999) - (b.scheduledDay || 999999);
    });

    const moduleMetadata = getModuleTopicMetadata(module.slug);

    return {
      id: module.id,
      slug: module.slug,
      moduleContentId: module.contentId,
      title: module.title,
      color: module.color,
      description: renderModuleDescription(module),
      ethicalPatterns: moduleMetadata.ethicalPatterns,
      recognitionPatternNotes: moduleMetadata.recognitionPatternNotes,
      themes: moduleMetadata.themes,
      meetings,
      draft: module.draft ?? 1,
    };
  });
}

function normalizeDate(dateStr: string | undefined): string | null {
  if (!dateStr) return null;
  // Ensure YYYY-MM-DD format
  if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return dateStr;
  }
  return null;
}

// Convert YYYY-MM-DD to "Mo, Jan 12" format
function formatDateForMeeting(dateStr: string): string | null {
  const date = new Date(dateStr + 'T00:00:00');
  if (isNaN(date.getTime())) return null;

  const dayAbbr = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const dayOfWeek = dayAbbr[date.getDay()];
  const monthAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthAbbr[date.getMonth()];
  const day = date.getDate();

  return `${dayOfWeek}, ${month} ${day}`;
}

function collectAllMeetingDates(topics: Topic[]): Set<string> {
  const dates = new Set<string>();

  topics.forEach(topic => {
    topic.meetings.forEach(meeting => {
      const meetingDateStr = parseMeetingDate(meeting.date);
      if (meetingDateStr) {
        dates.add(meetingDateStr);
      }
    });
  });

  return dates;
}

function findTargetTopicForOrphanDate(topics: Topic[], dateStr: string): Topic {
  let targetTopic: Topic | null = null;
  let latestTopicDate = '';

  topics.forEach(topic => {
    const topicDates: string[] = [];

    topic.meetings.forEach(meeting => {
      const meetingDateStr = parseMeetingDate(meeting.date);
      if (meetingDateStr) {
        topicDates.push(meetingDateStr);
      }
    });

    if (topicDates.length > 0) {
      const datesBeforeOrEqual = topicDates.filter(date => date <= dateStr).sort();
      if (datesBeforeOrEqual.length > 0) {
        const latestDate = datesBeforeOrEqual[datesBeforeOrEqual.length - 1];
        if (latestDate > latestTopicDate) {
          latestTopicDate = latestDate;
          targetTopic = topic;
        }
      }
    }
  });

  return targetTopic || topics[0];
}

function findMeetingByDateIso(topics: Topic[], dateIso: string): Meeting | null {
  for (const topic of topics) {
    for (const meeting of topic.meetings) {
      if (parseMeetingDate(meeting.date) === dateIso) {
        return meeting;
      }
    }
  }

  return null;
}

function sortTopicMeetings(topic: Topic) {
  topic.meetings.sort((a, b) => {
    const dateA = parseMeetingDate(a.date);
    const dateB = parseMeetingDate(b.date);
    if (!dateA || !dateB) return 0;
    return dateA.localeCompare(dateB);
  });
}

function normalizeAssignmentUrl(url?: string) {
  return url?.replace(/^\/fall2026/, '').replace(/\/$/, '') || '';
}

function getAssignmentSlugFromUrl(url?: string) {
  const normalized = normalizeAssignmentUrl(url);
  const match = normalized.match(/^\/assignments\/([^/]+)$/);
  return match?.[1] || null;
}

function buildAssignmentDraftById(assignments: PostData[]) {
  return new Map<string, number>(
    assignments.map(assignment => [assignment.id as string, assignment.draft === 0 ? 0 : 1])
  );
}

function isDraftAssignmentUrl(url: string | undefined, assignmentDraftById: Map<string, number>) {
  const slug = getAssignmentSlugFromUrl(url);
  return Boolean(slug && assignmentDraftById.get(slug) === 1);
}

function mapTopicAssignmentToDueEntry(
  item: TopicAssignment,
  assignmentDraftById: Map<string, number>
): Assignment | null {
  if (isDraftAssignmentUrl(item.url, assignmentDraftById)) {
    return null;
  }

  const slug = getAssignmentSlugFromUrl(item.url);

  return {
    titleShort: item.title,
    title: item.title,
    url: item.url,
    draft: slug ? (assignmentDraftById.get(slug) ?? 0) : 0,
    type: item.type,
    dueDate: item.dueDate,
    dueTime: item.dueTime,
    notes: item.notes,
  };
}

function collectTopicFrontmatterDueByDate(
  topics: Topic[],
  assignmentDraftById: Map<string, number>
): Map<string, Assignment[]> {
  const byDate = new Map<string, Assignment[]>();

  topics.forEach(topic => {
    topic.meetings.forEach(meeting => {
      (meeting.assignments || []).forEach(item => {
        const dueDate = normalizeDate(item.dueDate);
        if (!dueDate) {
          return;
        }

        const entry = mapTopicAssignmentToDueEntry(item, assignmentDraftById);
        if (!entry) {
          return;
        }

        const existing = byDate.get(dueDate) || [];
        byDate.set(dueDate, [...existing, entry]);
      });
    });
  });

  return byDate;
}

function mapAssignmentToDueEntry(assignment: PostData): Assignment | null {
  if (assignment.draft === 1) {
    return null;
  }

  const titleShort = getAssignmentTitleShort(assignment);

  return {
    titleShort,
    title: assignment.title,
    url: `/assignments/${assignment.id}/`,
    draft: 0,
    order: assignment.order,
    type: assignment.type,
    dueDate: resolveDueDate(assignment),
    dueTime: assignment.due_time,
    notes: assignment.submission_notes,
  };
}

function mergeDueAssignments(meeting: Meeting, incoming: Assignment[]) {
  const published = incoming.filter(item => item.draft !== 1);
  if (published.length === 0) {
    return;
  }

  const existing = meeting.due
    ? Array.isArray(meeting.due)
      ? meeting.due
      : [meeting.due]
    : [];
  const existingUrls = new Set(
    existing
      .filter((item): item is Assignment => typeof item !== 'string')
      .map(item => normalizeAssignmentUrl(item.url))
  );
  const newItems = published.filter(item => !existingUrls.has(normalizeAssignmentUrl(item.url)));

  if (newItems.length === 0) {
    return;
  }

  const merged = [...existing, ...newItems];
  meeting.due = merged.length === 1 ? merged[0] : merged;
}

function getOrphanAssignedTopicName(assignments: PostData[]) {
  const isTutorial = assignments.some(assignment => assignment.type === 'tutorial');
  const isHomework = assignments.some(assignment => assignment.type === 'homework');
  const isProject = assignments.some(assignment => assignment.type === 'project');

  if (isTutorial && !isHomework) {
    return 'Tutorial';
  }

  if (isHomework && !isTutorial) {
    return 'Homework';
  }

  if (isTutorial && isHomework) {
    return 'Tutorial & Homework';
  }

  if (isProject && !isTutorial && !isHomework) {
    return 'Project';
  }

  return 'Assignment';
}

// Enrichment function
async function enrichTopicsWithMarkdown(baseTopics: BaseTopicsArray): Promise<TopicsArray> {
  // Read all activities, assignments, and quizzes
  const allActivities = getAllPosts('activities');
  const allAssignments = getAllPosts('assignments');
  const allQuizzes = getAllQuizMetadata();
  const assignmentDraftById = buildAssignmentDraftById(allAssignments);

  // Filter scheduled activities and assignments by scheduled_day.
  const scheduledActivities = allActivities.filter(
    a => typeof getScheduledDay(a.scheduled_day) === 'number' && !a.excluded
  );
  const scheduledAssignments = allAssignments.filter(
    a => typeof getScheduledDay(a.scheduled_day) === 'number' && a.hide_from_list !== 1
  );
  const assignmentsWithAssignedDate = allAssignments.filter(a => a.assigned_date && a.hide_from_list !== 1);
  const assignmentsWithDueDate = allAssignments.filter(a => {
    if (a.draft === 1 || a.hide_from_list === 1) {
      return false;
    }

    const dueDate = resolveDueDate(a);
    return Boolean(dueDate);
  });
  const quizzesWithDates = allQuizzes.filter(q => q.start_date);

  // Create maps for quick lookup by scheduled day/date
  const activitiesByScheduledDay = new Map<number, PostData[]>();
  const assignmentsByScheduledDay = new Map<number, PostData[]>();
  const assignmentsByAssignedDate = new Map<string, PostData[]>();
  const assignmentsByDueDate = new Map<string, PostData[]>();
  const quizzesByDate = new Map<string, QuizMetadata[]>();

  scheduledActivities.forEach(activity => {
    const scheduledDay = getScheduledDay(activity.scheduled_day);
    if (typeof scheduledDay === 'number') {
      if (!activitiesByScheduledDay.has(scheduledDay)) {
        activitiesByScheduledDay.set(scheduledDay, []);
      }
      activitiesByScheduledDay.get(scheduledDay)!.push(activity);
    }
  });

  scheduledAssignments.forEach(assignment => {
    const scheduledDay = getScheduledDay(assignment.scheduled_day);
    if (typeof scheduledDay === 'number') {
      if (!assignmentsByScheduledDay.has(scheduledDay)) {
        assignmentsByScheduledDay.set(scheduledDay, []);
      }
      assignmentsByScheduledDay.get(scheduledDay)!.push(assignment);
    }
  });

  assignmentsWithAssignedDate.forEach(assignment => {
    const date = normalizeDate(assignment.assigned_date);
    if (date) {
      if (!assignmentsByAssignedDate.has(date)) {
        assignmentsByAssignedDate.set(date, []);
      }
      assignmentsByAssignedDate.get(date)!.push(assignment);
    }
  });

  assignmentsWithDueDate.forEach(assignment => {
    const date = normalizeDate(resolveDueDate(assignment));
    if (date) {
      if (!assignmentsByDueDate.has(date)) {
        assignmentsByDueDate.set(date, []);
      }
      assignmentsByDueDate.get(date)!.push(assignment);
    }
  });

  quizzesWithDates.forEach(quiz => {
    const date = normalizeDate(quiz.start_date!);
    if (date) {
      if (!quizzesByDate.has(date)) {
        quizzesByDate.set(date, []);
      }
      quizzesByDate.get(date)!.push(quiz);
    }
  });

  // Clone generated base topics to avoid mutating the original
  // We need to preserve React elements in descriptions, so we do a shallow copy
  // Cast topics to allow quizzes to be (Quiz | Reading)[] initially
  const enrichedTopics: TopicsArray = baseTopics.map((topic: BaseTopic) => ({
    ...topic,
    meetings: topic.meetings.map((meeting: BaseMeeting) => {
      const markdownTopic = meeting.slug ? getTopicMarkdownBySlug(meeting.slug) : null;

      return {
        ...meeting,
        topic: markdownTopic?.title || meeting.topic,
        subtitle: markdownTopic?.subtitle || meeting.subtitle,
        focus: markdownTopic?.focus || meeting.focus,
        braidElsiConnection: markdownTopic?.braidElsiConnection || meeting.braidElsiConnection,
        ethicalPatterns: markdownTopic?.ethicalPatterns || meeting.ethicalPatterns,
        recognitionPatternNotes: markdownTopic?.recognitionPatternNotes || meeting.recognitionPatternNotes,
        themes: markdownTopic?.themes || meeting.themes,
        activities: meeting.activities ? [...meeting.activities] : undefined,
        assigned: meeting.assigned
          ? typeof meeting.assigned === 'object'
            ? { ...meeting.assigned }
            : meeting.assigned
          : undefined,
      };
    }) as Meeting[],
  }));

  // Enrich each meeting
  enrichedTopics.forEach(topic => {
    topic.meetings.forEach(meeting => {
      const meetingDateStr = parseMeetingDate(meeting.date);
      if (!meetingDateStr) return;

      // Check if meeting has schedule quizzes from schedule.tsx
      // These can be either Reading (citation) or ScheduleQuiz (quizName/url) format
      // Note: meeting.quizzes can contain Quiz, Reading, or ScheduleQuizInput types from schedule.tsx
      if (meeting.quizzes && Array.isArray(meeting.quizzes)) {
        // Type guard: check if item is a ScheduleQuiz (has quizName and url, no title/slug/citation)
        const isScheduleQuiz = (q: Quiz | Reading | ScheduleQuizInput): q is ScheduleQuizInput => {
          return 'quizName' in q && 'url' in q && !('title' in q) && !('slug' in q) && !('citation' in q);
        };

        // Type guard: check if item is a Reading (has citation, no title/slug/quizName)
        const isCitationQuiz = (q: Quiz | Reading | ScheduleQuizInput): q is Reading => {
          return 'citation' in q && !('title' in q) && !('slug' in q) && !('quizName' in q);
        };

        // Type guard: check if item is a Quiz (has title/slug, no citation/quizName)
        const isQuiz = (q: Quiz | Reading | ScheduleQuizInput): q is Quiz => {
          return 'title' in q && 'slug' in q && !('citation' in q) && !('quizName' in q);
        };

        // Cast to union type to allow filtering
        const quizzesArray = meeting.quizzes as (Quiz | Reading | ScheduleQuizInput)[];
        const scheduleQuizzes = quizzesArray.filter(isScheduleQuiz);
        const citationQuizzes = quizzesArray.filter(isCitationQuiz);

        // Combine schedule quizzes (new format) and citation quizzes (old format) into scheduleQuizzes
        if (scheduleQuizzes.length > 0 || citationQuizzes.length > 0) {
          // Convert ScheduleQuizInput to ScheduleQuiz format
          const convertedScheduleQuizzes: ScheduleQuiz[] = [
            ...scheduleQuizzes.map(q => ({ quizName: q.quizName, url: q.url })),
            // Convert old citation format to new format (extract text and url from citation)
            ...citationQuizzes.map(q => {
              // For citation format, try to extract text and url
              // If citation is a string, use it as quizName
              // If citation is React element, extract text from children
              let quizName = '';
              let url = q.url || '';

              if (typeof q.citation === 'string') {
                quizName = q.citation;
              } else if (React.isValidElement(q.citation)) {
                // Try to extract text from React element (simple case)
                const props = q.citation.props as { children?: React.ReactNode; href?: string };
                const children = props?.children;
                if (typeof children === 'string') {
                  quizName = children;
                } else if (Array.isArray(children)) {
                  quizName = children.map((c: unknown) => (typeof c === 'string' ? c : '')).join('');
                }
                // Try to extract url from anchor tag if present
                if (props?.href) {
                  url = props.href;
                }
              }

              return { quizName: quizName || 'Quiz', url: url || '#' };
            }),
          ];

          meeting.scheduleQuizzes = convertedScheduleQuizzes;

          // Keep only Quiz objects (with title/slug) in quizzes array
          const manualQuizzes = quizzesArray.filter(isQuiz);
          // Enrich manual quizzes with quizData and cheatsheetContent if not already present
          meeting.quizzes = manualQuizzes.map((quiz: Quiz) => {
            if (!quiz.quizData && quiz.slug) {
              const quizData = getQuizData(quiz.slug);
              const cheatsheetContent = getQuizCheatsheet(quizData, quiz.slug);
              return {
                ...quiz,
                quizData: quizData || undefined,
                cheatsheetContent: cheatsheetContent || undefined,
              };
            }
            // If quizData exists but cheatsheetContent doesn't, load it
            if (quiz.quizData && !quiz.cheatsheetContent && quiz.slug) {
              const cheatsheetContent = getQuizCheatsheet(quiz.quizData, quiz.slug);
              return {
                ...quiz,
                cheatsheetContent: cheatsheetContent || undefined,
              };
            }
            return quiz;
          });
          // If no Quiz objects remain, set to undefined
          if (meeting.quizzes.length === 0) {
            meeting.quizzes = undefined;
          }
        }
      }

      // Find matching activities and assignments by scheduled_day
      const matchingScheduledActivities =
        typeof meeting.scheduledDay === 'number' ? activitiesByScheduledDay.get(meeting.scheduledDay) || [] : [];
      const matchingScheduledAssignments =
        typeof meeting.scheduledDay === 'number' ? assignmentsByScheduledDay.get(meeting.scheduledDay) || [] : [];

      // Find matching assignments by assigned_date
      const matchingAssignmentsByAssigned = assignmentsByAssignedDate.get(meetingDateStr) || [];

      // Find matching assignments by due_date
      const matchingAssignmentsByDue = assignmentsByDueDate.get(meetingDateStr) || [];

      // Find matching quizzes
      const matchingQuizzes = quizzesByDate.get(meetingDateStr) || [];

      // Create auto-populated activity entries (excluding excluded activities)
      const autoActivities = matchingScheduledActivities
        .filter((activity: PostData) => !activity.excluded)
        .map((activity: PostData) => ({
          title: activity.title,
          url: `/activities/${activity.id}/`,
          draft: activity.draft || 0,
          excluded: activity.excluded ? 1 : 0,
          order: activity.ordering ?? activity.order,
        }));

      const autoScheduledAssignmentsAsActivities = matchingScheduledAssignments
        .filter((assignment: PostData) => assignment.type?.toLowerCase() !== 'career module')
        .map((assignment: PostData) => ({
        title: assignment.title,
        url: `/assignments/${assignment.id}/`,
        draft: assignment.draft || 0,
        order: assignment.ordering ?? assignment.order,
      }));

      const autoScheduledActivities = [...autoActivities, ...autoScheduledAssignmentsAsActivities];

      // Create auto-populated "before class" reminders from assignments scheduled on this day
      // that carry reminder_notes frontmatter.
      const autoBeforeClassReminders: BeforeClassReminder[] = matchingScheduledAssignments
        .filter((assignment: PostData) => assignment.draft !== 1 && Boolean(assignment.reminder_notes?.trim()))
        .map((assignment: PostData) => ({
          title: assignment.title,
          notes: assignment.reminder_notes!.trim(),
          url: `/assignments/${assignment.id}/`,
        }));

      // Create auto-populated assignment entries for assigned (all matches, including drafts)
      const autoAssignedAssignments = matchingAssignmentsByAssigned.map(assignment => {
        const titleShort = getAssignmentTitleShort(assignment);
        return {
          titleShort: titleShort,
          title: assignment.title,
          url: `/assignments/${assignment.id}/`,
          draft: assignment.draft || 0,
          order: assignment.order,
          type: assignment.type,
        };
      });

      // Create auto-populated assignment entries for due (published assignments only)
      const autoDueAssignments = matchingAssignmentsByDue
        .map(mapAssignmentToDueEntry)
        .filter((assignment): assignment is Assignment => assignment !== null);

      // Create auto-populated quiz entries (include full quiz data for client-side rendering)
      const autoQuizzes = matchingQuizzes.map((quiz: QuizMetadata) => {
        const quizData = getQuizData(quiz.slug);
        const cheatsheetContent = getQuizCheatsheet(quizData, quiz.slug);
        return {
          title: quiz.quizName,
          slug: quiz.slug,
          quizData: quizData || undefined,
          cheatsheetContent: cheatsheetContent || undefined,
          draft: 0,
        };
      });

      // Merge activities: keep manual entries, add auto-populated ones
      if (autoScheduledActivities.length > 0) {
        const existingActivities = meeting.activities || [];
        // Check if auto-populated activities already exist (by URL) to avoid duplicates
        const existingUrls = new Set(existingActivities.map((a: Activity) => a.url));
        const newAutoActivities = autoScheduledActivities.filter((a: Activity) => !existingUrls.has(a.url));
        meeting.activities = [...existingActivities, ...newAutoActivities];
      }
      // Sort activities: first by order, then alphabetically by title (always sort if activities exist)
      if (Array.isArray(meeting.activities) && meeting.activities.length > 0) {
        meeting.activities.sort((a: Activity, b: Activity) => {
          const orderA = 'order' in a && typeof a.order === 'number' ? a.order : 999999;
          const orderB = 'order' in b && typeof b.order === 'number' ? b.order : 999999;
          if (orderA !== orderB) {
            return orderA - orderB;
          }
          return a.title.localeCompare(b.title);
        });
      }

      // Merge assigned assignments: add all auto-populated ones (including drafts)
      if (autoAssignedAssignments.length > 0) {
        if (!meeting.assigned) {
          // If no manual assigned items, set to array of auto-populated ones
          meeting.assigned =
            autoAssignedAssignments.length === 1 ? autoAssignedAssignments[0] : autoAssignedAssignments;
        } else if (Array.isArray(meeting.assigned)) {
          // If already an array, merge (avoid duplicates by URL)
          const existingUrls = new Set(
            meeting.assigned.filter((a): a is Assignment => typeof a !== 'string').map(a => a.url)
          );
          const newAssignedAssignments = autoAssignedAssignments.filter(a => !existingUrls.has(a.url));
          meeting.assigned = [...meeting.assigned, ...newAssignedAssignments];
        } else {
          // If single item, convert to array and merge
          const existingUrl = typeof meeting.assigned === 'object' ? meeting.assigned.url : null;
          const newAssignedAssignments = autoAssignedAssignments.filter(a => a.url !== existingUrl);
          if (newAssignedAssignments.length > 0) {
            meeting.assigned = [meeting.assigned, ...newAssignedAssignments];
          }
        }
        // Sort assigned assignments: first by order, then alphabetically by title
        if (Array.isArray(meeting.assigned)) {
          meeting.assigned.sort((a: Assignment | string, b: Assignment | string) => {
            if (typeof a === 'string' || typeof b === 'string') return 0;
            const orderA = 'order' in a && typeof a.order === 'number' ? a.order : 999999;
            const orderB = 'order' in b && typeof b.order === 'number' ? b.order : 999999;
            if (orderA !== orderB) {
              return orderA - orderB;
            }
            return a.title.localeCompare(b.title);
          });
        }
      }

      // Merge before-class reminders: keep manual entries, add auto-populated ones
      if (autoBeforeClassReminders.length > 0) {
        const existingReminders = meeting.beforeClassReminders || [];
        const existingUrls = new Set(existingReminders.map(r => r.url));
        const newAutoReminders = autoBeforeClassReminders.filter(r => !existingUrls.has(r.url));
        if (newAutoReminders.length > 0) {
          meeting.beforeClassReminders = [...existingReminders, ...newAutoReminders];
        } else if (existingReminders.length > 0) {
          meeting.beforeClassReminders = existingReminders;
        }
      }

      // Merge quizzes: keep manual entries, add auto-populated ones
      if (autoQuizzes.length > 0) {
        const existingQuizzes = meeting.quizzes || [];
        // Check if auto-populated quizzes already exist (by slug) to avoid duplicates
        const existingSlugs = new Set(existingQuizzes.map((q: Quiz) => q.slug));
        const newAutoQuizzes = autoQuizzes.filter((q: Quiz) => !existingSlugs.has(q.slug));
        if (newAutoQuizzes.length > 0) {
          meeting.quizzes = [...existingQuizzes, ...newAutoQuizzes];
        } else if (existingQuizzes.length > 0) {
          meeting.quizzes = existingQuizzes;
        }
      }

      // Merge due assignments: add auto-populated published assignments only
      if (autoDueAssignments.length > 0) {
        if (!meeting.due) {
          // If no manual due items, set to array of auto-populated ones
          meeting.due = autoDueAssignments.length === 1 ? autoDueAssignments[0] : autoDueAssignments;
        } else if (Array.isArray(meeting.due)) {
          // If already an array, merge (avoid duplicates by URL)
          const existingUrls = new Set(
            meeting.due.filter((d): d is Assignment => typeof d !== 'string').map(d => d.url)
          );
          const newDueAssignments = autoDueAssignments.filter(a => !existingUrls.has(a.url));
          meeting.due = [...meeting.due, ...newDueAssignments];
        } else {
          // If single item, convert to array and merge
          const existingUrl = typeof meeting.due === 'object' ? meeting.due.url : null;
          const newDueAssignments = autoDueAssignments.filter(a => a.url !== existingUrl);
          if (newDueAssignments.length > 0) {
            meeting.due = [meeting.due, ...newDueAssignments];
          }
        }
        // Sort due assignments: first by order, then alphabetically by title
        if (Array.isArray(meeting.due)) {
          meeting.due.sort((a: Assignment | string, b: Assignment | string) => {
            if (typeof a === 'string' || typeof b === 'string') return 0;
            const orderA = 'order' in a && typeof a.order === 'number' ? a.order : 999999;
            const orderB = 'order' in b && typeof b.order === 'number' ? b.order : 999999;
            if (orderA !== orderB) {
              return orderA - orderB;
            }
            return a.title.localeCompare(b.title);
          });
        }
      }
    });
  });

  // Add schedule rows for assignment dates that don't fall on a class meeting.
  const topicFrontmatterDueByDate = collectTopicFrontmatterDueByDate(enrichedTopics, assignmentDraftById);
  const allMeetingDates = collectAllMeetingDates(enrichedTopics);

  topicFrontmatterDueByDate.forEach((entries, dateStr) => {
    if (!allMeetingDates.has(dateStr)) {
      return;
    }

    const existingMeeting = findMeetingByDateIso(enrichedTopics, dateStr);
    if (existingMeeting) {
      mergeDueAssignments(existingMeeting, entries);
    }
  });

  const orphanedAssignedByDate = new Map<string, PostData[]>();
  assignmentsByAssignedDate.forEach((assignments, dateStr) => {
    if (!allMeetingDates.has(dateStr)) {
      orphanedAssignedByDate.set(dateStr, assignments);
    }
  });

  orphanedAssignedByDate.forEach((assignments, dateStr) => {
    const formattedDate = formatDateForMeeting(dateStr);
    if (!formattedDate) return;

    const targetTopic = findTargetTopicForOrphanDate(enrichedTopics, dateStr);
    const autoAssignedAssignments = assignments.map(assignment => {
      const titleShort = getAssignmentTitleShort(assignment);
      return {
        titleShort,
        title: assignment.title,
        url: `/assignments/${assignment.id}/`,
        draft: assignment.draft || 0,
        type: assignment.type,
      };
    });

    const newMeeting: Meeting = {
      date: formattedDate,
      topic: getOrphanAssignedTopicName(assignments),
      scheduleOnly: true,
      assigned:
        autoAssignedAssignments.length === 1 ? autoAssignedAssignments[0] : autoAssignedAssignments,
    };

    targetTopic.meetings.push(newMeeting);
    sortTopicMeetings(targetTopic);
    allMeetingDates.add(dateStr);
  });

  const orphanedDueByDate = new Map<string, Assignment[]>();
  assignmentsByDueDate.forEach((assignments, dateStr) => {
    if (!allMeetingDates.has(dateStr)) {
      const published = assignments
        .map(mapAssignmentToDueEntry)
        .filter((assignment): assignment is Assignment => assignment !== null);
      if (published.length > 0) {
        orphanedDueByDate.set(dateStr, published);
      }
    }
  });

  topicFrontmatterDueByDate.forEach((entries, dateStr) => {
    if (allMeetingDates.has(dateStr)) {
      return;
    }

    const existing = orphanedDueByDate.get(dateStr) || [];
    orphanedDueByDate.set(dateStr, [...existing, ...entries]);
  });

  orphanedDueByDate.forEach((autoDueAssignments, dateStr) => {
    const published = autoDueAssignments.filter(item => item.draft !== 1);
    if (published.length === 0) {
      return;
    }

    const formattedDate = formatDateForMeeting(dateStr);
    if (!formattedDate) return;

    const existingMeeting = findMeetingByDateIso(enrichedTopics, dateStr);

    if (existingMeeting) {
      mergeDueAssignments(existingMeeting, published);
      return;
    }

    const targetTopic = findTargetTopicForOrphanDate(enrichedTopics, dateStr);
    const newMeeting: Meeting = {
      date: formattedDate,
      topic: '',
      scheduleOnly: true,
      due: published.length === 1 ? published[0] : published,
    };

    targetTopic.meetings.push(newMeeting);
    sortTopicMeetings(targetTopic);
    allMeetingDates.add(dateStr);
  });

  return enrichedTopics;
}

// Export async function to get enriched topics
export async function getTopics() {
  return await enrichTopicsWithMarkdown(buildBaseTopicsFromMarkdown());
}

export async function getTopicMeetingBySlug(slug: string) {
  const topics = await getTopics();

  for (const topic of topics) {
    const meetingIndex = topic.meetings.findIndex(meeting => meeting.slug === slug);

    if (meetingIndex !== -1) {
      return {
        topic,
        meeting: topic.meetings[meetingIndex],
        meetingIndex,
      };
    }
  }

  return null;
}

export default getTopics;
