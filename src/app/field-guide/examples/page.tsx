import type { Metadata } from 'next';
import Link from 'next/link';
import FieldGuideSectionLayout from '@/components/FieldGuideSectionLayout';
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

const DOMAIN_LABELS: Record<string, string> = {
  'criminal-justice-and-policing': 'Criminal Justice & Policing',
  'healthcare-and-medicine': 'Healthcare & Medicine',
  'labor-and-employment': 'Labor & Employment',
  'housing-and-urban-infrastructure': 'Housing & Urban Infrastructure',
  'immigration-and-borders': 'Immigration & Borders',
  'environment-and-land-use': 'Environment & Land Use',
  'education': 'Education',
  'platform-and-consumer': 'Platform & Consumer',
  'public-benefits-and-welfare': 'Public Benefits & Welfare',
};

interface ExampleEntry {
  slug: string;
  title: string;
  subtitle?: string;
  domains: string[];
  tags: string[];
}

function getExampleCards(): ExampleEntry[] {
  return getAllPosts('examples')
    .filter(post => !post.hide_from_list && !post.no_render)
    .map((post: PostData) => ({
      slug: post.id,
      title: post.title,
      subtitle: post.excerpt,
      domains: (post.domains as string[]) ?? [],
      tags: (post.tags as string[]) ?? [],
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
              <div className={`max-w-5xl grid gap-4 ${columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                {cards.map(card => (
                  <div
                    key={card.slug}
                    className="group relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors hover:border-violet-300 hover:bg-violet-50/50 dark:border-gray-800 dark:bg-black dark:hover:border-violet-700 dark:hover:bg-violet-950/20"
                  >
                    <h3 className="m-0 text-base font-semibold">
                      <Link
                        href={`/field-guide/examples/${card.slug}`}
                        className="text-[#0b5d8f] no-underline after:absolute after:inset-0 group-hover:text-violet-700 dark:text-[#8fc4ee] dark:group-hover:text-violet-300"
                      >
                        {card.title}
                      </Link>
                    </h3>
                    {card.subtitle && (
                      <p className="mb-0 mt-1 text-sm leading-6 text-gray-700 dark:text-gray-300">{card.subtitle}</p>
                    )}
                    {card.tags.length > 0 && (
                      <div className="relative z-10 mt-3 flex flex-wrap gap-1.5">
                        {card.tags.map(tag => (
                          <Link
                            key={tag}
                            href={`/field-guide/examples/tags/${tag}`}
                            className="rounded bg-violet-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-violet-700 no-underline hover:bg-violet-200 dark:bg-violet-900/50 dark:text-violet-300 dark:hover:bg-violet-800/50"
                          >
                            {TAG_LABELS[tag] ?? tag}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </FieldGuideCardSection>
          <FieldGuideCompactSection
            cards={cards.map(card => ({
              title: card.title,
              subtitle: card.subtitle,
              href: `/field-guide/examples/${card.slug}`,
              tags: card.tags.map(t => ({ label: TAG_LABELS[t] ?? t, href: `/field-guide/examples/tags/${t}` })),
            }))}
          />
        </FieldGuideViewProvider>
      )}
    </FieldGuideSectionLayout>
  );
}
