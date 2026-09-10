// Shared fetch helper behind FieldGuideCardPreview – used both by topic pages (which
// embed a subset of a section's cards inline) and by the section list pages themselves
// (which show the full set using the same card-grid + side-sheet component).

import { getAllPosts, getPostData, type PostData } from './markdown';
import type { FieldGuidePreviewItem } from '@/components/FieldGuideCardPreview';

const CONTENT_DIR_STANDALONE_BASE: Record<string, string> = {
  'ai-deployment-patterns': '/field-guide/deployment-patterns',
  'sts-concepts': '/field-guide/sts-concepts',
  examples: '/field-guide/examples',
  'ethical-frameworks': '/field-guide/ethical-frameworks',
  'technical-explainers': '/field-guide/technical-explainers',
  'theories-of-learning': '/field-guide/theories-of-learning',
  governance: '/field-guide/governance',
};

function getStandaloneHref(contentDir: string, post: PostData): string | undefined {
  if (typeof post.card_href === 'string' && post.card_href.trim()) {
    return post.card_href.trim();
  }

  const base = CONTENT_DIR_STANDALONE_BASE[contentDir];
  if (!base) return undefined;

  const slug = typeof post.slug === 'string' && post.slug.trim() ? post.slug.trim() : post.id;
  if (!slug) return undefined;

  return `${base}/${slug}`;
}

export interface FieldGuidePreviewSection {
  key: string;
  title?: string;
  intro?: string;
  order: number;
  items: FieldGuidePreviewItem[];
}

export async function getFieldGuidePreviewItems(
  contentDir: string,
  cardType?: string | null,
  cardIds?: string[]
): Promise<FieldGuidePreviewItem[]> {
  let cards = getAllPosts(contentDir)
    .filter(
      post =>
        !post.hide_from_list &&
        post.no_render !== 1 &&
        !post.excluded &&
        (cardType == null || cardType === '' || post.card_type === cardType)
    )
    .sort((a, b) => Number(a.num ?? a.order ?? 0) - Number(b.num ?? b.order ?? 0));

  if (cardIds && cardIds.length > 0) {
    const idSet = new Set(cardIds);
    cards = cards.filter(post => idSet.has(post.id));
  }

  return Promise.all(
    cards.map(async card => {
      const full = await getPostData(card.id, contentDir);
      const extras = full as PostData & {
        subtitle?: string;
        field_guide_display_title?: string;
        field_guide_group?: string;
        field_guide_group_title?: string;
        field_guide_group_intro?: string;
        field_guide_group_order?: number;
      };
      const href = getStandaloneHref(contentDir, full);
      const sheetEmbed = full.sheet_embed === 'ai-history' ? 'ai-history' : undefined;

      return {
        id: full.id,
        num: String(full.num ?? ''),
        title: extras.field_guide_display_title || full.title,
        subtitle: extras.subtitle || full.excerpt || '',
        contentHtml: full.content,
        href,
        hrefLabel: sheetEmbed === 'ai-history' ? 'Open interactive timeline' : href ? 'Open full page' : undefined,
        sheetEmbed,
        groupKey: extras.field_guide_group,
        groupTitle: extras.field_guide_group_title,
        groupIntro: extras.field_guide_group_intro,
        groupOrder: extras.field_guide_group_order,
      };
    })
  );
}

export async function getFieldGuidePreviewSections(
  contentDir: string,
  cardType?: string | null,
  cardIds?: string[]
): Promise<FieldGuidePreviewSection[]> {
  const items = await getFieldGuidePreviewItems(contentDir, cardType, cardIds);
  const sectionsByKey = new Map<string, FieldGuidePreviewSection>();

  items.forEach(item => {
    if (!item.groupKey || !item.groupTitle) {
      const fallback = sectionsByKey.get('_ungrouped') || {
        key: '_ungrouped',
        order: 999,
        items: [],
      };
      fallback.items.push(item);
      sectionsByKey.set('_ungrouped', fallback);
      return;
    }

    const existing = sectionsByKey.get(item.groupKey) || {
      key: item.groupKey,
      title: item.groupTitle,
      intro: item.groupIntro,
      order: item.groupOrder ?? 999,
      items: [],
    };
    existing.items.push(item);
    sectionsByKey.set(item.groupKey, existing);
  });

  return Array.from(sectionsByKey.values()).sort((a, b) => a.order - b.order);
}
