import featuredRelationsData from '../../content/config/featured-relations.json';
import { getAllModuleMarkdownMetadata } from './module-markdown';
import type { ModuleColorToken } from './module-colors';
import { getTopicMarkdownByModule } from './topic-markdown';

export interface TopicMeetingConfig {
  slug: string;
  title: string;
  subtitle: string;
  focus: string;
  ethicalPatterns: string[];
  recognitionPatternNotes?: string[];
  themes: string[];
  braidElsiConnection: string;
}

interface TopicModuleConfigBase {
  contentId: string;
  id: number;
  slug: string;
  title: string;
  color: ModuleColorToken;
  excerpt?: string;
  unitFocus: string;
  braidElsiArc?: string;
}

export interface TopicModuleConfig extends TopicModuleConfigBase {
  ethicalPatterns: string[];
  recognitionPatternNotes?: string[];
  themes: string[];
  meetings: TopicMeetingConfig[];
}

interface FeaturedPatternRelations {
  featuredAssignments?: string[];
  featuredTopics?: string[];
  featuredResources?: string[];
}

interface FeaturedTopicRelations {
  featuredAssignments?: string[];
  featuredPatterns?: string[];
  featuredResources?: string[];
}

interface FeaturedRelationsFile {
  version: number;
  description: string;
  patterns: Record<string, FeaturedPatternRelations>;
  topics: Record<string, FeaturedTopicRelations>;
}

const featuredRelations = featuredRelationsData as FeaturedRelationsFile;

function uniqueStrings(values: Array<string | undefined>) {
  return Array.from(new Set(values.filter((value): value is string => typeof value === 'string' && value.length > 0)));
}

export function getTopicModules() {
  return getAllModuleMarkdownMetadata().map(module => {
    const topics = getTopicMarkdownByModule(module.slug);
    const recognitionPatternNotes = uniqueStrings(topics.flatMap(topic => topic.recognitionPatternNotes || []));

    return {
      ...module,
      ethicalPatterns: uniqueStrings(topics.flatMap(topic => topic.ethicalPatterns)),
      recognitionPatternNotes: recognitionPatternNotes.length > 0 ? recognitionPatternNotes : undefined,
      themes: uniqueStrings(topics.flatMap(topic => topic.themes)),
      meetings: topics.map(topic => ({
        slug: topic.slug,
        title: topic.title,
        subtitle: topic.subtitle,
        focus: topic.focus,
        ethicalPatterns: topic.ethicalPatterns,
        recognitionPatternNotes: topic.recognitionPatternNotes,
        themes: topic.themes,
        braidElsiConnection: topic.braidElsiConnection,
      })),
    };
  });
}

export function getTopicModuleBySlug(moduleSlug: string) {
  return getTopicModules().find((module) => module.slug === moduleSlug);
}

export function getTopicMeetingBySlug(meetingSlug: string) {
  for (const module of getTopicModules()) {
    const meeting = module.meetings.find((item) => item.slug === meetingSlug);
    if (meeting) {
      return { module, meeting };
    }
  }

  return null;
}

export function getFeaturedRelations() {
  return featuredRelations;
}
