import type { Metadata } from 'next';
import ContentLayout from '@/components/ContentLayout';
import FieldGuideNav from '@/components/FieldGuideNav';
import RecognitionPatternCards from '@/components/RecognitionPatternCards';
import { getAllPosts, type PostData } from '@/lib/markdown';

interface ConceptEntry {
  slug: string;
  num?: string;
  title: string;
  subtitle?: string;
  card_type?: string;
  order?: number;
  field_guide_order?: number;
}

function getConceptCards(): ConceptEntry[] {
  return getAllPosts('ethical-patterns')
    .filter(post => !post.hide_from_list && !post.no_render && post.card_type === 'concept')
    .map((post: PostData) => ({
      slug: post.id,
      num: post.num,
      title: post.title,
      subtitle: post.excerpt,
      card_type: post.card_type,
      order: post.field_guide_order ?? post.order,
      field_guide_order: post.field_guide_order,
    }))
    .sort((a, b) => (a.field_guide_order ?? 999) - (b.field_guide_order ?? 999));
}

export const metadata: Metadata = {
  title: 'Concept Cards — AI Field Guide',
  description: 'The STS frameworks and theoretical foundations underlying the field guide recognition patterns.',
};

export default function ConceptCardsPage() {
  const cards = getConceptCards();

  return (
    <ContentLayout
      variant="list"
      fullWidth
      contentPadding={false}
      header={
        <header className="border-y border-violet-200 bg-violet-50 px-4 py-16 dark:border-violet-900 dark:bg-violet-950/30 md:px-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
            Field Guide — Concept Cards
          </p>
          <h1 className="m-0! max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-950 dark:text-gray-50">
            Concepts and Frameworks
          </h1>
          <p className="mb-0 mt-5 max-w-4xl text-lg leading-8 text-gray-700 dark:text-gray-300">
            The theoretical foundations underlying the recognition patterns. Use these for deeper analysis, formal
            writing, or understanding why the recognition patterns occur.
          </p>
          <FieldGuideNav />
        </header>
      }
    >
      <div className="space-y-12">
        <section className="max-w-6xl px-4 md:px-16">
          <p className="mb-0 text-base leading-8 text-gray-700 dark:text-gray-300">
            Each concept card introduces an STS framework or theoretical claim that underlies multiple recognition
            patterns. Recognition cards link back to the concept cards that explain why the pattern occurs.
          </p>
        </section>
        <section className="space-y-5 border-t border-gray-200 px-4 pt-8 dark:border-gray-800 md:px-16">
          <RecognitionPatternCards patterns={cards} badgeLabel="Concept" preserveOrder />
        </section>
      </div>
    </ContentLayout>
  );
}
