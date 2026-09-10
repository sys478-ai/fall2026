import { getAllPosts, type PostData } from '@/lib/markdown';

export interface AIHistoryTimelineCard {
  label: string;
  href?: string;
}

export interface AIHistoryTimelineEntry {
  year: string;
  title: string;
  description: string;
  contested?: string;
  cards: AIHistoryTimelineCard[];
  exampleSlug?: string;
  historySlug?: string;
}

type PostWithExtras = PostData & {
  year?: string | number;
  contested?: string;
  timeline_cards?: AIHistoryTimelineCard[];
  show_in_timeline?: boolean;
};

export function getAIHistoryTimelineEntries(): AIHistoryTimelineEntry[] {
  const toEntry = (
    post: PostData,
    opts?: { exampleSlug?: string; historySlug?: string }
  ): AIHistoryTimelineEntry => {
    const p = post as PostWithExtras;
    return {
      year: String(p.year ?? ''),
      title: p.title,
      description: String(p.excerpt ?? ''),
      contested: p.contested,
      cards: p.timeline_cards ?? [],
      exampleSlug: opts?.exampleSlug,
      historySlug: opts?.historySlug,
    };
  };

  const historyPosts = getAllPosts('ai-history').filter(p => !p.hide_from_list);
  const examplePosts = getAllPosts('examples').filter(p => !!(p as PostWithExtras).show_in_timeline);

  return [
    ...historyPosts.map(p => toEntry(p, { historySlug: p.id })),
    ...examplePosts.map(p => toEntry(p, { exampleSlug: p.id })),
  ].sort((a, b) => parseInt(a.year, 10) - parseInt(b.year, 10));
}
