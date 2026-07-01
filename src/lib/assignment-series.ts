import { getAllPosts, getPostData, type PostData } from '@/lib/markdown';
import type { TopicWorkItem } from '@/components/TopicWorkList';

export type AssignmentSeriesRole = 'hub' | 'step' | 'resource';

export interface AssignmentSeriesMember {
  id: string;
  title: string;
  excerpt?: string;
  series_order: number;
  series_label?: string;
  series_tab_id?: string;
  series_card_id?: string;
  tabId: string;
  cardId?: string;
}

export interface AssignmentSeries {
  id: string;
  hub: AssignmentSeriesMember;
  steps: AssignmentSeriesMember[];
  resources: AssignmentSeriesMember[];
}

function stripSeriesPrefix(seriesId: string, slug: string): string {
  const prefix = `${seriesId}-`;
  return slug.startsWith(prefix) ? slug.slice(prefix.length) : slug;
}

function toSeriesMember(post: PostData): AssignmentSeriesMember {
  const seriesId = post.assignment_series as string;
  const tabId = post.series_tab_id || stripSeriesPrefix(seriesId, post.id);
  const cardId = post.series_card_id || stripSeriesPrefix(seriesId, post.id);

  return {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    series_order: post.series_order ?? 0,
    series_label: post.series_label,
    series_tab_id: post.series_tab_id,
    series_card_id: post.series_card_id,
    tabId,
    cardId: post.series_role === 'resource' ? cardId : undefined,
  };
}

function sortByOrder(members: AssignmentSeriesMember[]): AssignmentSeriesMember[] {
  return [...members].sort((a, b) => a.series_order - b.series_order);
}

export function getAssignmentSeries(seriesId: string): AssignmentSeries | null {
  const posts = getAllPosts('assignments').filter(post => post.assignment_series === seriesId);
  const hubPost = posts.find(post => post.series_role === 'hub');

  if (!hubPost) {
    return null;
  }

  return {
    id: seriesId,
    hub: toSeriesMember(hubPost),
    steps: sortByOrder(posts.filter(post => post.series_role === 'step').map(toSeriesMember)),
    resources: sortByOrder(posts.filter(post => post.series_role === 'resource').map(toSeriesMember)),
  };
}

export function getSeriesRedirectTarget(slug: string, post: PostData): string | null {
  if (!post.assignment_series || post.series_role === 'hub') {
    return null;
  }

  const series = getAssignmentSeries(post.assignment_series);
  if (!series) {
    return null;
  }

  if (post.series_role === 'step') {
    const member = series.steps.find(step => step.id === slug);
    const tabId = member?.tabId || stripSeriesPrefix(post.assignment_series, slug);
    return `/assignments/${series.hub.id}#${tabId}`;
  }

  if (post.series_role === 'resource') {
    const member = series.resources.find(resource => resource.id === slug);
    const cardId = member?.cardId || stripSeriesPrefix(post.assignment_series, slug);
    return `/assignments/${series.hub.id}#topics-${cardId}`;
  }

  return null;
}

export function isAssignmentSeriesChild(post: PostData): boolean {
  return post.series_role === 'step' || post.series_role === 'resource';
}

export function getSeriesSummary(seriesId: string): string | undefined {
  const series = getAssignmentSeries(seriesId);
  if (!series) {
    return undefined;
  }

  const stepCount = series.steps.length;
  const resourceCount = series.resources.length;

  if (stepCount === 0 && resourceCount === 0) {
    return undefined;
  }

  const passLabel = `${stepCount} pass${stepCount === 1 ? '' : 'es'}`;
  const topicLabel = `${resourceCount} topic${resourceCount === 1 ? '' : 's'}`;

  return `${passLabel} · ${topicLabel}`;
}

export async function loadAssignmentSeriesPosts(series: AssignmentSeries) {
  const [hubPost, stepPosts, resourcePosts] = await Promise.all([
    getPostData(series.hub.id, 'assignments'),
    Promise.all(series.steps.map(step => getPostData(step.id, 'assignments'))),
    Promise.all(series.resources.map(resource => getPostData(resource.id, 'assignments'))),
  ]);

  return { hubPost, stepPosts, resourcePosts };
}

export function buildHw01ChecklistItems(hubSlug: string): TopicWorkItem[] {
  const base = `/assignments/${hubSlug}`;

  return [
    {
      id: 'review-background',
      type: 'reading',
      title: 'Review background readings on anomaly detection, neuromorphic computing, edge AI, and anticipatory governance',
      label: 'Prepare',
    },
    {
      id: 'review-topic',
      type: 'assignment',
      title: 'Review your topic and choose one scenario for your group',
      label: 'Topic',
      href: `${base}#topics`,
    },
    {
      id: 'complete-pass-1',
      type: 'assignment',
      title: 'Complete Pass 1: Scenario Worksheet',
      label: 'Pass 1',
      href: `${base}#pass-1`,
    },
    {
      id: 'submit-pass-1',
      type: 'due',
      title: 'Submit Pass 1 artifact',
      label: 'Submit',
    },
    {
      id: 'complete-pass-2',
      type: 'assignment',
      title: 'Complete Pass 2: Framework Sorting',
      label: 'Pass 2',
      href: `${base}#pass-2`,
    },
    {
      id: 'submit-pass-2',
      type: 'due',
      title: 'Submit Pass 2 artifact',
      label: 'Submit',
    },
    {
      id: 'complete-pass-3',
      type: 'assignment',
      title: 'Complete Pass 3: Governance Brief',
      label: 'Pass 3',
      href: `${base}#pass-3`,
    },
    {
      id: 'submit-pass-3',
      type: 'due',
      title: 'Submit final brief',
      label: 'Submit',
    },
    {
      id: 'presentation',
      type: 'due',
      title: 'Give group presentation',
      label: 'Present',
    },
    {
      id: 'reflection',
      type: 'assignment',
      title: 'Complete individual reflection',
      label: 'Reflect',
    },
  ];
}
