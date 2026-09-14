import { getAllPosts, getPostData, type PostData } from '@/lib/markdown';
import { getFieldGuideBannerClasses, getFieldGuideContentClass } from '@/lib/field-guide-palettes';

export interface AIHistoryTimelineCard {
  label: string;
  href?: string;
}

/** Payload for opening an example in the shared resource side sheet. */
export interface AIHistoryExampleSheet {
  title: string;
  href: string;
  html: string;
  badgeLabel: string;
  moreLinkLabel: string;
  headerClass: string;
  labelClass: string;
  moreLinkClass: string;
}

export interface AIHistoryTimelineEntry {
  year: string;
  title: string;
  description: string;
  contested?: string;
  cards: AIHistoryTimelineCard[];
  exampleSlug?: string;
  exampleSheet?: AIHistoryExampleSheet;
  historySlug?: string;
}

type PostWithExtras = PostData & {
  year?: string | number;
  contested?: string;
  timeline_cards?: AIHistoryTimelineCard[];
  show_in_timeline?: boolean;
};

export async function getAIHistoryTimelineEntries(): Promise<AIHistoryTimelineEntry[]> {
  const toEntry = (
    post: PostData,
    opts?: { exampleSlug?: string; historySlug?: string; exampleSheet?: AIHistoryExampleSheet }
  ): AIHistoryTimelineEntry => {
    const p = post as PostWithExtras;
    return {
      year: String(p.year ?? ''),
      title: p.title,
      description: String(p.excerpt ?? ''),
      contested: p.contested,
      cards: p.timeline_cards ?? [],
      exampleSlug: opts?.exampleSlug,
      exampleSheet: opts?.exampleSheet,
      historySlug: opts?.historySlug,
    };
  };

  const historyPosts = getAllPosts('ai-history').filter(p => !p.hide_from_list);
  const examplePosts = getAllPosts('examples').filter(p => !!(p as PostWithExtras).show_in_timeline);
  const banner = getFieldGuideBannerClasses('examples');
  const contentClass = getFieldGuideContentClass('examples');

  const exampleEntries = await Promise.all(
    examplePosts.map(async post => {
      const full = await getPostData(post.id, 'examples');
      const html = contentClass
        ? `<div class="${contentClass}">${full.content ?? ''}</div>`
        : (full.content ?? '');

      return toEntry(post, {
        exampleSlug: post.id,
        exampleSheet: {
          title: full.title,
          href: `/field-guide/examples/${post.id}`,
          html,
          badgeLabel: 'Example',
          moreLinkLabel: '', // temporarily hide "More examples" footer on timeline sheets
          // moreLinkLabel: 'More examples',
          headerClass: banner.sheetHeader,
          labelClass: banner.label,
          moreLinkClass: banner.moreLink,
        },
      });
    })
  );

  return [
    ...historyPosts.map(p => toEntry(p, { historySlug: p.id })),
    ...exampleEntries,
  ].sort((a, b) => parseInt(a.year, 10) - parseInt(b.year, 10));
}
