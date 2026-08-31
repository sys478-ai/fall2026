// Shared fetch helper behind FieldGuideCardPreview – used both by topic pages (which
// embed a subset of a section's cards inline) and by the section list pages themselves
// (which show the full set using the same card-grid + side-sheet component).

import { getAllPosts, getPostData, type PostData } from './markdown';
import type { FieldGuidePreviewItem } from '@/components/FieldGuideCardPreview';

export async function getFieldGuidePreviewItems(
  contentDir: string,
  cardType: string,
  cardIds?: string[]
): Promise<FieldGuidePreviewItem[]> {
  let cards = getAllPosts(contentDir)
    .filter(
      post =>
        post.card_type === cardType &&
        !post.hide_from_list &&
        post.no_render !== 1 &&
        !post.excluded
    )
    .sort((a, b) => Number(a.num ?? 0) - Number(b.num ?? 0));

  if (cardIds && cardIds.length > 0) {
    const idSet = new Set(cardIds);
    cards = cards.filter(post => idSet.has(post.id));
  }

  return Promise.all(
    cards.map(async card => {
      const full = await getPostData(card.id, contentDir);
      const subtitle = (full as PostData & { subtitle?: string }).subtitle;
      return {
        id: full.id,
        num: String(full.num ?? ''),
        title: full.title,
        subtitle: subtitle ?? '',
        contentHtml: full.content,
      };
    })
  );
}
