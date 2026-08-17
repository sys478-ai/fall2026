import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getModuleMarkdownById } from './module-markdown';

const topicsDirectory = path.join(process.cwd(), 'content', 'topics');

export interface TopicReading {
  citation: string;
  url?: string;
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
  holiday?: boolean;
  retired?: boolean;
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

      if (typeof citation !== 'string' || citation.trim() === '') {
        return null;
      }

      return {
        citation,
        url: typeof url === 'string' && url.trim() !== '' ? url : undefined,
      };
    })
    .filter((reading): reading is TopicReading => reading !== null);
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
    return `topic-${String(scheduledDay).padStart(2, '0')}`;
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
  const slug = asString(data.slug) || getTopicSlug(id, scheduledDay);
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
    holiday: data.holiday === true,
    retired: data.retired === true,
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
