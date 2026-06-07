import type { Metadata } from 'next';
import Link from 'next/link';
import FieldGuideSectionLayout from '@/components/FieldGuideSectionLayout';
import RecognitionPatternCards from '@/components/RecognitionPatternCards';
import { FieldGuideViewProvider, FieldGuideCardSection, FieldGuideCompactSection } from '@/components/FieldGuideView';
import { getAllPosts, type PostData } from '@/lib/markdown';

interface ExplainerEntry {
  slug: string;
  num?: string;
  title: string;
  subtitle?: string;
  card_type?: string;
  order?: number;
}

function getExplainerCards(): ExplainerEntry[] {
  return getAllPosts('technical-explainers')
    .filter(post => !post.hide_from_list && !post.no_render && post.card_type === 'technical-explainer')
    .map((post: PostData) => ({
      slug: `technical-explainers/${post.id}`,
      num: post.num,
      title: post.title,
      subtitle: (post as PostData & { subtitle?: string }).subtitle ?? post.excerpt,
      card_type: post.card_type,
      order: post.order,
    }))
    .sort((a, b) => (parseInt(a.num ?? '') || 999) - (parseInt(b.num ?? '') || 999));
}

export const metadata: Metadata = {
  title: 'Technical Explainers — AI Field Guide',
  description: 'Enough technical understanding to ask better critical questions.',
};

export default function TechnicalExplainersPage() {
  const cards = getExplainerCards();

  return (
    <FieldGuideSectionLayout contentDir="technical-explainers">
      {(columns) => (
        <div>
          <div className="border-b border-gray-200 px-4 py-6 dark:border-gray-800 md:px-16">
            <Link
              href="/field-guide/ai-history"
              className="group inline-flex items-center gap-3 rounded-xl border border-violet-200 bg-violet-50 px-5 py-4 no-underline transition-colors hover:border-violet-300 hover:bg-violet-100 dark:border-violet-900 dark:bg-violet-950/30 dark:hover:border-violet-800 dark:hover:bg-violet-950/50"
            >
              <span className="text-2xl" aria-hidden="true">📅</span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
                  Featured Resource
                </span>
                <span className="block font-semibold text-gray-900 group-hover:text-violet-700 dark:text-gray-100 dark:group-hover:text-violet-300">
                  History of AI
                </span>
                <span className="block text-sm text-gray-600 dark:text-gray-400">
                  An interactive timeline from Turing to today, linking key moments to field guide recognition cards.
                </span>
              </span>
              <span className="ml-auto text-violet-500 dark:text-violet-400" aria-hidden="true">→</span>
            </Link>
          </div>

          <FieldGuideViewProvider>
            <FieldGuideCardSection>
              <section className="space-y-5 border-t border-gray-200 px-4 pt-8 dark:border-gray-800 md:px-16">
                <RecognitionPatternCards patterns={cards} badgeLabel="Explainer" preserveOrder columns={columns} />
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
