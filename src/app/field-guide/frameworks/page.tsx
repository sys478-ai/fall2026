import type { Metadata } from 'next';
import FieldGuideSectionLayout from '@/components/FieldGuideSectionLayout';
import RecognitionPatternCards from '@/components/RecognitionPatternCards';
import { FieldGuideViewProvider, FieldGuideCardSection, FieldGuideCompactSection } from '@/components/FieldGuideView';
import { getAllPosts, type PostData } from '@/lib/markdown';

interface FrameworkEntry {
  slug: string;
  num?: string;
  title: string;
  subtitle?: string;
  card_type?: string;
  order?: number;
}

function getFrameworkCards(): FrameworkEntry[] {
  return getAllPosts('ethical-frameworks')
    .filter(post => !post.hide_from_list && !post.no_render && post.card_type === 'ethical-framework')
    .map((post: PostData) => ({
      slug: `frameworks/${post.id}`,
      num: post.num,
      title: post.title,
      subtitle: (post as PostData & { subtitle?: string }).subtitle ?? post.excerpt,
      card_type: post.card_type,
      order: post.order,
    }))
    .sort((a, b) => (parseInt(a.num ?? '') || 999) - (parseInt(b.num ?? '') || 999));
}

export const metadata: Metadata = {
  title: 'Ethical Frameworks — AI Field Guide',
  description: "Tools for evaluating what you've found. Use these to move from analysis to judgment.",
};

export default function EthicalFrameworksPage() {
  const cards = getFrameworkCards();

  return (
    <FieldGuideSectionLayout contentDir="ethical-frameworks">
      {(columns) => (
        <div>
          <FieldGuideViewProvider>
            <FieldGuideCardSection>
              <section className="space-y-5 border-t border-gray-200 px-4 pt-8 dark:border-gray-800 md:px-16">
                <RecognitionPatternCards patterns={cards} badgeLabel="Framework" preserveOrder columns={columns} />
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
        </div>
      )}
    </FieldGuideSectionLayout>
  );
}
