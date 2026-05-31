import { getAllPosts, PostData } from './markdown';
import { getFeaturedRelations, getTopicMeetingBySlug, getTopicModules } from './topic-config';
import { getTopics } from './topics';

type ContentKind = 'assignments' | 'resources' | 'activities';

export interface RelatedContentItem {
  id: string;
  title: string;
  href: string;
  kind: ContentKind;
  topics: string[];
  ethicalPatterns: string[];
  themes: string[];
}

export interface RelatedScheduleItem {
  title: string;
  href: string;
  kind: 'assignments' | 'activities';
  moduleTitle: string;
  meetingTitle: string;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === 'string');
}

function buildHref(kind: ContentKind, id: string) {
  if (kind === 'assignments') {
    return `/assignments/${id}/`;
  }

  if (kind === 'resources') {
    return `/resources/${id}/`;
  }

  return `/activities/${id}/`;
}

function collectPosts(kind: ContentKind): RelatedContentItem[] {
  return getAllPosts(kind).map((post: PostData) => ({
    id: post.id,
    title: post.title,
    href: buildHref(kind, post.id),
    kind,
    topics: asStringArray((post as PostData & { topics?: unknown }).topics),
    ethicalPatterns: asStringArray((post as PostData & { ethical_patterns?: unknown }).ethical_patterns),
    themes: asStringArray((post as PostData & { themes?: unknown }).themes),
  }));
}

export function getCrosslistedContent(): RelatedContentItem[] {
  return [...collectPosts('assignments'), ...collectPosts('resources'), ...collectPosts('activities')];
}

export function getRelatedTopicsForPattern(patternSlug: string) {
  return getTopicModules().flatMap((module) =>
    module.meetings
      .filter((meeting) => meeting.ethicalPatterns.includes(patternSlug))
      .map((meeting) => ({
        moduleSlug: module.slug,
        moduleTitle: module.title,
        meetingSlug: meeting.slug,
        meetingTitle: meeting.title,
      }))
  );
}

export function getRelatedPatternsForTopic(meetingSlug: string) {
  const result = getTopicMeetingBySlug(meetingSlug);
  if (!result) {
    return [];
  }

  return result.meeting.ethicalPatterns;
}

export function getRelatedContentForPattern(patternSlug: string) {
  const allContent = getCrosslistedContent();
  const matches = allContent.filter((item) => item.ethicalPatterns.includes(patternSlug));
  const featured = getFeaturedRelations().patterns[patternSlug];

  return {
    items: matches,
    featuredAssignments: featured?.featuredAssignments || [],
    featuredTopics: featured?.featuredTopics || [],
    featuredResources: featured?.featuredResources || [],
  };
}

export function getRelatedContentForTopic(meetingSlug: string) {
  const allContent = getCrosslistedContent();
  const matches = allContent.filter((item) => item.topics.includes(meetingSlug));
  const featured = getFeaturedRelations().topics[meetingSlug];

  return {
    items: matches,
    featuredAssignments: featured?.featuredAssignments || [],
    featuredPatterns: featured?.featuredPatterns || [],
    featuredResources: featured?.featuredResources || [],
  };
}

function classifyHref(href: string): 'assignments' | 'activities' | null {
  if (href.startsWith('/assignments/')) {
    return 'assignments';
  }

  if (href.startsWith('/activities/')) {
    return 'activities';
  }

  return null;
}

export async function getRelatedScheduleItemsForPattern(patternSlug: string): Promise<RelatedScheduleItem[]> {
  const topics = await getTopics();
  const seen = new Set<string>();
  const items: RelatedScheduleItem[] = [];

  topics.forEach((module) => {
    module.meetings.forEach((meeting) => {
      if (!meeting.ethicalPatterns?.includes(patternSlug)) {
        return;
      }

      (meeting.activities || []).forEach((activity) => {
        if (!activity.url) {
          return;
        }

        const kind = classifyHref(activity.url);
        if (!kind) {
          return;
        }

        const key = `${kind}:${activity.url}`;
        if (seen.has(key)) {
          return;
        }

        seen.add(key);
        items.push({
          title: activity.title,
          href: activity.url,
          kind,
          moduleTitle: module.title,
          meetingTitle: meeting.topic,
        });
      });
    });
  });

  return items;
}
