import type { Metadata } from 'next';
import FieldGuideSectionLayout from '@/components/FieldGuideSectionLayout';
import RecognitionPatternCards from '@/components/RecognitionPatternCards';
import { FieldGuideViewProvider, FieldGuideCardSection, FieldGuideCompactSection } from '@/components/FieldGuideView';
import { getAllPosts, type PostData } from '@/lib/markdown';
import { normalizeFeaturedImagePath, getDarkFeaturedImagePath } from '@/lib/featured-image';

interface GovernanceEntry {
  slug: string;
  title: string;
  subtitle?: string;
  card_type?: string;
  order?: number;
  featured_image?: string;
  featured_image_dark?: string;
}

function getGovernanceCards(): GovernanceEntry[] {
  return getAllPosts('governance')
    .filter(post => !post.hide_from_list && !post.no_render && !!post.slug)
    .map((post: PostData) => ({
      slug: `governance/${post.slug}`,
      title: post.title,
      subtitle: (post as PostData & { subtitle?: string }).subtitle ?? post.excerpt,
      card_type: post.card_type,
      order: post.field_guide_order ?? post.order,
      featured_image: normalizeFeaturedImagePath(post.featured_image),
      featured_image_dark: getDarkFeaturedImagePath(post.featured_image),
    }))
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export const metadata: Metadata = {
  title: 'Governance — AI Field Guide',
  description:
    'Concepts and practice pages for shaping emerging technologies before they become difficult to challenge or reverse.',
};

export default function GovernancePage() {
  const cards = getGovernanceCards();

  return (
    <FieldGuideSectionLayout contentDir="governance">
      {columns => (
        <FieldGuideViewProvider>
          <FieldGuideCardSection>
            <section className="space-y-5 border-t border-gray-200 px-4 pt-8 dark:border-gray-800 md:px-16">
              <RecognitionPatternCards patterns={cards} badgeLabel="Governance" preserveOrder columns={columns} />
            </section>
          </FieldGuideCardSection>
          <FieldGuideCompactSection
            cards={cards.map(card => ({
              title: card.title,
              subtitle: card.subtitle,
              href: `/field-guide/${card.slug}`,
            }))}
          />
        </FieldGuideViewProvider>
      )}
    </FieldGuideSectionLayout>
  );
}
