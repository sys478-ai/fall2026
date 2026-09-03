import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getModuleMarkdownById } from './module-markdown';

const topicsDirectory = path.join(process.cwd(), 'content', 'meetings');

export interface TopicReading {
  citation: string;
  url?: string;
  notes?: string;
  pickOne?: boolean;
}

export interface TopicAssignment {
  title: string;
  notes?: string;
  url?: string;
  dueDate?: string;
  dueTime?: string;
  type?: string;
}

export interface TopicMarkdownMetadata {
  id: string;
  order: number;
  scheduledDay?: number;
  slug: string;
  title: string;
  moduleId: number;
  module: string;
  subtitle: string;
  focus: string;
  ethicalPatterns: string[];
  recognitionPatternNotes?: string[];
  themes: string[];
  braidElsiConnection: string;
  readings: TopicReading[];
  optionalReadings: TopicReading[];
  otherPreparation: TopicReading[];
  assignments: TopicAssignment[];
  holiday?: boolean;
  retired?: boolean;
  draft: number;
  showEthicalFrameworksPreview?: boolean;
  learningTheoryPreviewCards?: string[];
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === 'string');
}

function asReadingArray(value: unknown): TopicReading[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item): TopicReading | null => {
      if (!item || typeof item !== 'object') {
        return null;
      }

      const citation = (item as Record<string, unknown>).citation;
      const url = (item as Record<string, unknown>).url;
      const notes = (item as Record<string, unknown>).notes;
      const pickOne = (item as Record<string, unknown>).pick_one;

      if (typeof citation !== 'string' || citation.trim() === '') {
        return null;
      }

      return {
        citation,
        url: typeof url === 'string' && url.trim() !== '' ? url : undefined,
        notes: typeof notes === 'string' && notes.trim() !== '' ? notes : undefined,
        pickOne: pickOne === true ? true : undefined,
      };
    })
    .filter((reading): reading is TopicReading => reading !== null);
}

function asTopicAssignmentArray(value: unknown): TopicAssignment[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item): TopicAssignment | null => {
      if (typeof item === 'string' && item.trim() !== '') {
        return { title: item.trim() };
      }

      if (!item || typeof item !== 'object') {
        return null;
      }

      const record = item as Record<string, unknown>;
      const title = typeof record.title === 'string' ? record.title.trim() : '';
      const notes = typeof record.notes === 'string' ? record.notes.trim() : '';
      const url = typeof record.url === 'string' ? record.url.trim() : '';
      const dueDate = typeof record.due_date === 'string' ? record.due_date.trim() : '';
      const dueTime = typeof record.due_time === 'string' ? record.due_time.trim() : '';
      const type = typeof record.type === 'string' ? record.type.trim() : '';

      if (!title) {
        return null;
      }

      return {
        title,
        notes: notes || undefined,
        url: url || undefined,
        dueDate: dueDate || undefined,
        dueTime: dueTime || undefined,
        type: type || undefined,
      };
    })
    .filter((item): item is TopicAssignment => item !== null);
}

function asString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

function asNumber(value: unknown) {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? undefined : parsed;
  }

  return undefined;
}

function getOrderFromFilename(fileName: string, fallback: number) {
  const match = fileName.match(/^(\d+)_/);
  return match ? Number.parseInt(match[1], 10) : fallback;
}

function getTopicSlug(id: string, scheduledDay?: number) {
  if (typeof scheduledDay === 'number') {
    return String(scheduledDay).padStart(2, '0');
  }

  return id.replace(/^\d+_/, '');
}

function readTopicMarkdownMetadata(fileName: string, fallbackOrder: number): TopicMarkdownMetadata {
  const id = fileName.replace(/\.md$/, '');
  const fullPath = path.join(topicsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const data = matterResult.data;
  const scheduledDay = asNumber(data.scheduled_day);
  // Canonical URL slug is the zero-padded scheduled day (e.g. "01"), not a descriptive kebab string.
  const slug =
    typeof scheduledDay === 'number'
      ? getTopicSlug(id, scheduledDay)
      : asString(data.slug) || getTopicSlug(id, scheduledDay);
  const subtitle = asString(data.subtitle, asString(data.focus));
  const moduleId = asNumber(data.module_id);

  if (typeof moduleId !== 'number') {
    throw new Error(`Missing module_id frontmatter in topic markdown file "${fileName}"`);
  }

  const module = getModuleMarkdownById(moduleId);
  if (!module) {
    throw new Error(`Topic markdown file "${fileName}" references unknown module_id ${moduleId}`);
  }

  return {
    id,
    order: getOrderFromFilename(fileName, fallbackOrder),
    scheduledDay,
    slug,
    title: asString(data.title, slug),
    moduleId,
    module: module.slug,
    subtitle,
    focus: asString(data.focus, subtitle),
    ethicalPatterns: asStringArray(data.ethical_patterns),
    recognitionPatternNotes: asStringArray(data.recognition_pattern_notes),
    themes: asStringArray(data.themes),
    braidElsiConnection: asString(data.braid_elsi_connection),
    readings: asReadingArray(data.readings),
    optionalReadings: asReadingArray(data.optional_readings),
    otherPreparation: asReadingArray(data.pre_class_tasks ?? data.other_preparation),
    assignments: asTopicAssignmentArray(data.assignments ?? data.discussion_assignments),
    holiday: data.holiday === true,
    retired: data.retired === true,
    draft: data.draft === 0 || data.draft === false ? 0 : 1,
    showEthicalFrameworksPreview: data.show_ethical_frameworks_preview === true,
    learningTheoryPreviewCards: asStringArray(data.learning_theory_preview_cards),
  };
}

export function getAllTopicMarkdownMetadata(): TopicMarkdownMetadata[] {
  if (!fs.existsSync(topicsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(topicsDirectory)
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName, index) => readTopicMarkdownMetadata(fileName, index + 1))
    .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
}

export function getTopicMarkdownBySlug(slug: string) {
  return getAllTopicMarkdownMetadata().find(topic => topic.slug === slug) || null;
}

export function getTopicMarkdownByModule(moduleSlug: string) {
  return getAllTopicMarkdownMetadata().filter(topic => topic.module === moduleSlug && !topic.retired);
}

export interface TopicAssignmentIndexItem {
  id: string;
  title: string;
  notes?: string;
  url?: string;
  dueDate?: string;
  dueTime?: string;
  scheduledDay?: number;
  topicSlug: string;
  draft: number;
  type?: string;
}

export function getTopicAssignmentIndexItems(): TopicAssignmentIndexItem[] {
  return getAllTopicMarkdownMetadata()
    .filter(topic => !topic.retired && !topic.holiday)
    .flatMap(topic =>
      topic.assignments.map((item, index) => {
        const typeSlug = (item.type || 'assignment').toLowerCase().replace(/\s+/g, '-');

        return {
          id: `${typeSlug}-${topic.slug}-${index}`,
          title: item.title,
          notes: item.notes,
          url: item.url,
          dueDate: item.dueDate,
          dueTime: item.dueTime,
          scheduledDay: topic.scheduledDay,
          topicSlug: topic.slug,
          draft: topic.draft,
          type: item.type,
        };
      })
    );
}
