import topicsData from '../../content/config/topics.json';
import featuredRelationsData from '../../content/config/featured-relations.json';

export interface TopicMeetingConfig {
  slug: string;
  title: string;
  focus: string;
  ethicalPatterns: string[];
  recognitionPatternNotes?: string[];
  themes: string[];
  braidElsiConnection: string;
}

export interface TopicModuleConfig {
  id: number;
  slug: string;
  title: string;
  ethicalPatterns: string[];
  recognitionPatternNotes?: string[];
  themes: string[];
  unitFocus: string;
  braidElsiArc?: string;
  meetings: TopicMeetingConfig[];
}

interface TopicsConfigFile {
  version: number;
  description: string;
  modules: TopicModuleConfig[];
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

const topicsConfig = topicsData as TopicsConfigFile;
const featuredRelations = featuredRelationsData as FeaturedRelationsFile;

export function getTopicsConfig() {
  return topicsConfig;
}

export function getTopicModules() {
  return topicsConfig.modules;
}

export function getTopicModuleBySlug(moduleSlug: string) {
  return topicsConfig.modules.find((module) => module.slug === moduleSlug);
}

export function getTopicMeetingBySlug(meetingSlug: string) {
  for (const module of topicsConfig.modules) {
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
