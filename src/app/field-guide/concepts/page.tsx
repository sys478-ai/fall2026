import type { Metadata } from 'next';
import FieldGuideSectionLayout from '@/components/FieldGuideSectionLayout';
import RecognitionPatternCards from '@/components/RecognitionPatternCards';
import { FieldGuideViewProvider, FieldGuideCardSection, FieldGuideCompactSection } from '@/components/FieldGuideView';
import { getAllPosts, type PostData } from '@/lib/markdown';
import { normalizeFeaturedImagePath, getDarkFeaturedImagePath } from '@/lib/featured-image';

interface ConceptEntry {
  slug: string;
  num?: string;
  title: string;
  subtitle?: string;
  card_type?: string;
  order?: number;
  field_guide_order?: number;
  featured_image?: string;
  featured_image_dark?: string;
}

function getConceptCards(): ConceptEntry[] {
  return getAllPosts('concept-guide')
    .filter(post => !post.hide_from_list && !post.no_render && post.card_type === 'concept')
    .map((post: PostData) => ({
      slug: post.id,
      num: post.num,
      title: post.title,
      subtitle: post.excerpt,
      card_type: post.card_type,
      order: post.field_guide_order ?? post.order,
      field_guide_order: post.field_guide_order,
      featured_image: normalizeFeaturedImagePath(post.featured_image),
      featured_image_dark: getDarkFeaturedImagePath(post.featured_image),
    }))
    .sort((a, b) => (parseInt(a.num ?? '') || 999) - (parseInt(b.num ?? '') || 999));
}

export const metadata: Metadata = {
  title: 'Concept Cards — AI Field Guide',
  description: 'The STS frameworks and theoretical foundations underlying the field guide recognition patterns.',
};

export default function ConceptCardsPage() {
  const cards = getConceptCards();

  return (
    <FieldGuideSectionLayout contentDir="concept-guide">
      {(columns) => (
        <div>
          <FieldGuideViewProvider>
            <FieldGuideCardSection>
              <section className="space-y-5 border-t border-gray-200 px-4 pt-8 dark:border-gray-800 md:px-16">
                <RecognitionPatternCards patterns={cards} badgeLabel="Concept" preserveOrder columns={columns} />
              </section>
            </FieldGuideCardSection>
            <FieldGuideCompactSection
              cards={cards.map(card => ({
                title: card.title,
                subtitle: card.subtitle,
                href: card.slug ? `/field-guide/${card.slug}` : undefined,
              }))}
            />
          </FieldGuideViewProvider>
        </div>
      )}
    </FieldGuideSectionLayout>
  );
}
