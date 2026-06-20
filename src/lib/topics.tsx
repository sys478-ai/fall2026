import { getAllPosts, PostData, getAllQuizMetadata, QuizMetadata, getQuizData, getQuizCheatsheet, QuizData } from './markdown';
import React from 'react';
import taxonomyConfig from '../../content/config/taxonomy.json';
import { courseCalendar } from '../../content/config/schedule';
import { getCourseConfig } from './config';
import type { ModuleColorToken } from './module-colors';
import { getAllModuleMarkdownMetadata, getModuleMarkdownBySlug, type ModuleMarkdownMetadata } from './module-markdown';
import { getAllTopicMarkdownMetadata, getTopicMarkdownByModule, getTopicMarkdownBySlug, type TopicMarkdownMetadata } from './topic-markdown';
import { generateCourseMeetingDates, getDueDateForScheduledDay, type GeneratedMeetingDate } from './course-calendar';

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
}

export interface Reading {
  citation: string | React.ReactElement;
  url?: string;
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
  holiday?: boolean;
  discussionQuestions?: DiscussionQuestion[];
  assigned?: Assignment | string | (Assignment | string)[];
  due?: Assignment | string | (Assignment | string)[];
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
  holiday?: boolean;
  discussionQuestions?: DiscussionQuestion[];
  assigned?: Assignment | string | (Assignment | string)[];
  due?: Assignment | string | (Assignment | string)[];
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
}

type TopicsArray = Topic[];
type BaseTopicsArray = BaseTopic[];
type PatternConfig = { slug: string; title: string };

const patternTitleBySlug = Object.fromEntries(
  ((taxonomyConfig.ethicalPatterns || []) as PatternConfig[]).map(pattern => [pattern.slug, pattern.title])
) as Record<string, string>;

function getAssignmentTitleShort(assignment: { type?: string; num?: string | number }): string {
  if (assignment.type === 'homework') {
    return `HW ${assignment.num}`;
  }

  if (assignment.type === 'tutorial') {
    return `Tutorial ${assignment.num}`;
  }

  if (assignment.type === 'project') {
    return assignment.num ? `Project ${assignment.num}` : 'Project';
  }

  const typeLabel = assignment.type
    ? assignment.type.charAt(0).toUpperCase() + assignment.type.slice(1)
    : 'Assignment';

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

function buildTopicMeeting(module: ModuleMarkdownMetadata, meeting: TopicMarkdownMetadata, meetingDate: GeneratedMeetingDate): BaseMeeting {
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
  };
}

function buildHolidayMeeting(module: ModuleMarkdownMetadata, holidayTopic: TopicMarkdownMetadata | null, meetingDate: GeneratedMeetingDate): BaseMeeting {
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
  };
}

function getModuleForHolidayDate(holidayDate: GeneratedMeetingDate, topics: TopicMarkdownMetadata[]) {
  const sortedScheduledTopics = topics
    .filter((topic): topic is TopicMarkdownMetadata & { scheduledDay: number } => typeof topic.scheduledDay === 'number')
    .sort((a, b) => a.scheduledDay - b.scheduledDay);

  const meetingDateByScheduledDay = new Map(
    generateCourseMeetingDates()
      .filter((meetingDate): meetingDate is GeneratedMeetingDate & { scheduledDay: number } => typeof meetingDate.scheduledDay === 'number')
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
      .filter((meetingDate): meetingDate is GeneratedMeetingDate & { scheduledDay: number } => typeof meetingDate.scheduledDay === 'number')
      .map(meetingDate => [meetingDate.scheduledDay, meetingDate])
  );
  const holidayTopicsByTitle = new Map(
    allTopics
      .filter(topic => topic.holiday)
      .map(topic => [topic.title.toLowerCase(), topic])
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
        throw new Error(`No generated class meeting for scheduled_day ${topic.scheduledDay} used by topic "${topic.slug}"`);
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

  return modules.map((module) => {
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
    };
  });
}

// Date parsing utilities
function parseMeetingDate(meetingDate: string): string | null {
  // Format: "Tu, Jan 13" -> "2026-01-13"
  // Get year from course config
  const year = getCourseConfig().year;
  
  const monthMap: Record<string, number> = {
    'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
    'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
  };
  
  const match = meetingDate.match(/(\w+), (\w+) (\d+)/);
  if (!match) return null;
  
  const [, , monthAbbr, day] = match;
  const month = monthMap[monthAbbr];
  if (!month) return null;
  
  const monthStr = String(month).padStart(2, '0');
  const dayStr = String(parseInt(day)).padStart(2, '0');
  
  return `${year}-${monthStr}-${dayStr}`;
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

// Enrichment function
async function enrichTopicsWithMarkdown(baseTopics: BaseTopicsArray): Promise<TopicsArray> {
  // Read all activities, assignments, and quizzes
  const allActivities = getAllPosts('activities');
  const allAssignments = getAllPosts('assignments');
  const allQuizzes = getAllQuizMetadata();
  
  // Filter scheduled activities and assignments by scheduled_day.
  const scheduledActivities = allActivities.filter(a => typeof getScheduledDay(a.scheduled_day) === 'number' && !a.excluded);
  const scheduledAssignments = allAssignments.filter(a => typeof getScheduledDay(a.scheduled_day) === 'number' && a.hide_from_list !== 1);
  const assignmentsWithAssignedDate = allAssignments.filter(a => a.assigned_date && a.hide_from_list !== 1);
  const assignmentsWithDueDate = allAssignments.filter(a => {
    const dueDate = getDueDateForScheduledDay(a.scheduled_day) || a.due_date;
    return Boolean(dueDate && a.hide_from_list !== 1);
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
    const date = normalizeDate(getDueDateForScheduledDay(assignment.scheduled_day) || assignment.due_date);
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
        assigned: meeting.assigned ? (typeof meeting.assigned === 'object' ? { ...meeting.assigned } : meeting.assigned) : undefined,
      };
    }) as Meeting[]
  }));
  
  // Enrich each meeting
  enrichedTopics.forEach((topic) => {
    topic.meetings.forEach((meeting) => {
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
                  quizName = children.map((c: unknown) => typeof c === 'string' ? c : '').join('');
                }
                // Try to extract url from anchor tag if present
                if (props?.href) {
                  url = props.href;
                }
              }
              
              return { quizName: quizName || 'Quiz', url: url || '#' };
            })
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
              cheatsheetContent: cheatsheetContent || undefined
            };
          }
          // If quizData exists but cheatsheetContent doesn't, load it
          if (quiz.quizData && !quiz.cheatsheetContent && quiz.slug) {
            const cheatsheetContent = getQuizCheatsheet(quiz.quizData, quiz.slug);
            return {
              ...quiz,
              cheatsheetContent: cheatsheetContent || undefined
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
          order: activity.ordering ?? activity.order
        }));

      const autoScheduledAssignmentsAsActivities = matchingScheduledAssignments.map((assignment: PostData) => ({
        title: assignment.title,
        url: `/assignments/${assignment.id}/`,
        draft: assignment.draft || 0,
        order: assignment.ordering ?? assignment.order,
      }));

      const autoScheduledActivities = [...autoActivities, ...autoScheduledAssignmentsAsActivities];
      
      // Create auto-populated assignment entries for assigned (all matches, including drafts)
      const autoAssignedAssignments = matchingAssignmentsByAssigned.map((assignment) => {
        const titleShort = getAssignmentTitleShort(assignment);
        return {
          titleShort: titleShort,
          title: assignment.title,
          url: `/assignments/${assignment.id}/`,
          draft: assignment.draft || 0,
          order: assignment.order,
          type: assignment.type
        };
      });
      
      // Create auto-populated assignment entries for due (all matches, including drafts)
      const autoDueAssignments = matchingAssignmentsByDue.map((assignment) => {
        const titleShort = getAssignmentTitleShort(assignment);
        return {
          titleShort: titleShort,
          title: assignment.title,
          url: `/assignments/${assignment.id}/`,
          draft: assignment.draft || 0,
          order: assignment.order,
          type: assignment.type
        };
      });
      
      // Create auto-populated quiz entries (include full quiz data for client-side rendering)
      const autoQuizzes = matchingQuizzes.map((quiz: QuizMetadata) => {
        const quizData = getQuizData(quiz.slug);
        const cheatsheetContent = getQuizCheatsheet(quizData, quiz.slug);
        return {
          title: quiz.quizName,
          slug: quiz.slug,
          quizData: quizData || undefined,
          cheatsheetContent: cheatsheetContent || undefined,
          draft: 0
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
          meeting.assigned = autoAssignedAssignments.length === 1 ? autoAssignedAssignments[0] : autoAssignedAssignments;
        } else if (Array.isArray(meeting.assigned)) {
          // If already an array, merge (avoid duplicates by URL)
          const existingUrls = new Set(
            meeting.assigned
              .filter((a): a is Assignment => typeof a !== 'string')
              .map((a) => a.url)
          );
          const newAssignedAssignments = autoAssignedAssignments.filter((a) => !existingUrls.has(a.url));
          meeting.assigned = [...meeting.assigned, ...newAssignedAssignments];
        } else {
          // If single item, convert to array and merge
          const existingUrl = typeof meeting.assigned === 'object' ? meeting.assigned.url : null;
          const newAssignedAssignments = autoAssignedAssignments.filter((a) => a.url !== existingUrl);
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
      
      // Merge due assignments: add all auto-populated ones (including drafts)
      if (autoDueAssignments.length > 0) {
        if (!meeting.due) {
          // If no manual due items, set to array of auto-populated ones
          meeting.due = autoDueAssignments.length === 1 ? autoDueAssignments[0] : autoDueAssignments;
        } else if (Array.isArray(meeting.due)) {
          // If already an array, merge (avoid duplicates by URL)
          const existingUrls = new Set(
            meeting.due
              .filter((d): d is Assignment => typeof d !== 'string')
              .map((d) => d.url)
          );
          const newDueAssignments = autoDueAssignments.filter((a) => !existingUrls.has(a.url));
          meeting.due = [...meeting.due, ...newDueAssignments];
        } else {
          // If single item, convert to array and merge
          const existingUrl = typeof meeting.due === 'object' ? meeting.due.url : null;
          const newDueAssignments = autoDueAssignments.filter((a) => a.url !== existingUrl);
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
  
  // Find all assignment dates that don't have corresponding meetings
  const allMeetingDates = new Set<string>();
  enrichedTopics.forEach((topic) => {
    topic.meetings.forEach((meeting) => {
      const meetingDateStr = parseMeetingDate(meeting.date);
      if (meetingDateStr) {
        allMeetingDates.add(meetingDateStr);
      }
    });
  });
  
  // Find assignments with assigned_date that don't have meetings
  const orphanedAssignments = new Map<string, PostData[]>();
  assignmentsByAssignedDate.forEach((assignments, dateStr) => {
    if (!allMeetingDates.has(dateStr)) {
      orphanedAssignments.set(dateStr, assignments);
    }
  });
  
  // Create new meetings for orphaned assignments
  if (orphanedAssignments.size > 0) {
    // Find the appropriate topic for each orphaned assignment based on date
    orphanedAssignments.forEach((assignments, dateStr) => {
      const formattedDate = formatDateForMeeting(dateStr);
      if (!formattedDate) return;
      
      // Find the topic that this date should belong to
      // Look for the topic with the latest date that is still before or equal to the assignment date
      let targetTopic: Topic | null = null;
      let latestTopicDate = '';
      
      enrichedTopics.forEach((topic) => {
        // Get all dates in this topic
        const topicDates: string[] = [];
        topic.meetings.forEach((meeting) => {
          const meetingDateStr = parseMeetingDate(meeting.date);
          if (meetingDateStr) {
            topicDates.push(meetingDateStr);
          }
        });
        
        if (topicDates.length > 0) {
          // Find the latest date in this topic that is <= assignment date
          const datesBeforeOrEqual = topicDates.filter(d => d <= dateStr).sort();
          if (datesBeforeOrEqual.length > 0) {
            const latestDate = datesBeforeOrEqual[datesBeforeOrEqual.length - 1];
            if (latestDate > latestTopicDate) {
              latestTopicDate = latestDate;
              targetTopic = topic;
            }
          }
        }
      });
      
      // If no topic found with dates before/equal, use the first topic as fallback
      if (!targetTopic) {
        targetTopic = enrichedTopics[0];
      }
      
      if (targetTopic) {
        // Determine topic name based on assignment type
        const isTutorial = assignments.some(a => a.type === 'tutorial');
        const isHomework = assignments.some(a => a.type === 'homework');
        const isProject = assignments.some(a => a.type === 'project');
        let topicName = 'Assignment';
        if (isTutorial && !isHomework) {
          topicName = 'Tutorial';
        } else if (isHomework && !isTutorial) {
          topicName = 'Homework';
        } else if (isTutorial && isHomework) {
          topicName = 'Tutorial & Homework';
        } else if (isProject && !isTutorial && !isHomework) {
          topicName = 'Project';
        }
        
        // Create auto-populated assignment entries
        const autoAssignedAssignments = assignments.map((assignment) => {
          const titleShort = getAssignmentTitleShort(assignment);
          return {
            titleShort: titleShort,
            title: assignment.title,
            url: `/assignments/${assignment.id}/`,
            draft: assignment.draft || 0,
            type: assignment.type
          };
        });
        
        const newMeeting: Meeting = {
          date: formattedDate,
          topic: topicName,
          assigned: autoAssignedAssignments.length === 1 ? autoAssignedAssignments[0] : autoAssignedAssignments
        };
        
        // Add to the end of the topic's meetings (will be sorted below)
        targetTopic.meetings.push(newMeeting);
        
        // Sort all meetings in the topic by date
        targetTopic.meetings.sort((a, b) => {
          const dateA = parseMeetingDate(a.date);
          const dateB = parseMeetingDate(b.date);
          if (!dateA || !dateB) return 0;
          return dateA.localeCompare(dateB);
        });
      }
    });
  }
  
  return enrichedTopics;
}

// Export async function to get enriched topics
export async function getTopics() {
  return await enrichTopicsWithMarkdown(buildBaseTopicsFromMarkdown());
}

export async function getTopicMeetingBySlug(slug: string) {
  const topics = await getTopics();

  for (const topic of topics) {
    const meetingIndex = topic.meetings.findIndex((meeting) => meeting.slug === slug);

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
