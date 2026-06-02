import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const topicsDirectory = path.join(process.cwd(), 'content', 'topics');

export interface TopicMarkdownMetadata {
  id: string;
  order: number;
  slug: string;
  title: string;
  module: string;
  subtitle: string;
  focus: string;
  ethicalPatterns: string[];
  recognitionPatternNotes?: string[];
  themes: string[];
  braidElsiConnection: string;
  holiday?: boolean;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === 'string');
}

function asString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

function getOrderFromFilename(fileName: string, fallback: number) {
  const match = fileName.match(/^(\d+)_/);
  return match ? Number.parseInt(match[1], 10) : fallback;
}

function readTopicMarkdownMetadata(fileName: string, fallbackOrder: number): TopicMarkdownMetadata {
  const id = fileName.replace(/\.md$/, '');
  const fullPath = path.join(topicsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const data = matterResult.data;
  const slug = asString(data.slug);

  if (!slug) {
    throw new Error(`Missing slug frontmatter in topic markdown file "${fileName}"`);
  }

  const subtitle = asString(data.subtitle, asString(data.focus));

  return {
    id,
    order: getOrderFromFilename(fileName, fallbackOrder),
    slug,
    title: asString(data.title, slug),
    module: asString(data.module),
    subtitle,
    focus: asString(data.focus, subtitle),
    ethicalPatterns: asStringArray(data.ethical_patterns),
    recognitionPatternNotes: asStringArray(data.recognition_pattern_notes),
    themes: asStringArray(data.themes),
    braidElsiConnection: asString(data.braid_elsi_connection),
    holiday: data.holiday === true,
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
  return getAllTopicMarkdownMetadata().filter(topic => topic.module === moduleSlug);
}
