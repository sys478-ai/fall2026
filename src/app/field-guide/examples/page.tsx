import type { Metadata } from 'next';
import FieldGuideSectionLayout from '@/components/FieldGuideSectionLayout';
import FieldGuideFlipCards from '@/components/FieldGuideFlipCards';
import { FieldGuideViewProvider, FieldGuideCardSection, FieldGuideCompactSection } from '@/components/FieldGuideView';
import { getAllPosts, type PostData } from '@/lib/markdown';

const TAG_LABELS: Record<string, string> = {
  'criminal-justice': 'Criminal Justice',
  'finance': 'Finance',
  'governance': 'Governance',
  'healthcare': 'Healthcare',
  'housing': 'Housing',
  'immigration': 'Immigration',
  'labor': 'Labor',
  'media-platforms': 'Media & Platforms',
  'national-security': 'National Security',
  'public-benefits': 'Public Benefits',
};

interface ExampleEntry {
  slug: string;
  title: string;
  subtitle?: string;
  href: string;
  tags: { label: string; href: string }[];
}

function getExampleCards(): ExampleEntry[] {
  return getAllPosts('examples')
    .filter(post => !post.hide_from_list && !post.no_render)
    .map((post: PostData) => ({
      slug: post.id,
      title: post.title,
      subtitle: post.excerpt,
      href: `/field-guide/examples/${post.id}`,
      tags: ((post.tags as string[]) ?? []).map(tag => ({
        label: TAG_LABELS[tag] ?? tag,
        href: `/field-guide/examples/tags/${tag}`,
      })),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export const metadata: Metadata = {
  title: 'Example Cards — AI Field Guide',
  description: 'Real situations where AI patterns appear.',
};

export default function ExampleCardsPage() {
  const cards = getExampleCards();

  return (
    <FieldGuideSectionLayout contentDir="examples">
      {(columns) => (
        <FieldGuideViewProvider>
          <FieldGuideCardSection>
            <section className="px-4 pt-4 pb-8 md:px-16">
              <FieldGuideFlipCards
                items={cards}
                preserveOrder
                columns={columns}
                palette="examples"
                linkLabel="Open example →"
                iconClass="fa-solid fa-landmark"
              />
            </section>
          </FieldGuideCardSection>
          <FieldGuideCompactSection
            cards={cards.map(card => ({
              title: card.title,
              subtitle: card.subtitle,
              href: card.href,
              tags: card.tags,
            }))}
          />
        </FieldGuideViewProvider>
      )}
    </FieldGuideSectionLayout>
  );
}
