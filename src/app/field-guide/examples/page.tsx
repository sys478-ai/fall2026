import type { Metadata } from 'next';
import Link from 'next/link';
import FieldGuideSectionLayout from '@/components/FieldGuideSectionLayout';
import { FieldGuideViewProvider, FieldGuideCardSection, FieldGuideCompactSection } from '@/components/FieldGuideView';
import { getAllPosts, type PostData } from '@/lib/markdown';

const DOMAIN_LABELS: Record<string, string> = {
  'criminal-justice-and-policing': 'Criminal Justice and Policing',
  'healthcare-and-medicine': 'Healthcare and Medicine',
  'labor-and-employment': 'Labor and Employment',
  'housing-and-urban-infrastructure': 'Housing and Urban Infrastructure',
  'immigration-and-borders': 'Immigration and Borders',
  'environment-and-land-use': 'Environment and Land Use',
  'education': 'Education',
  'platform-and-consumer': 'Platform and Consumer',
  'public-benefits-and-welfare': 'Public Benefits and Welfare',
};

const DOMAIN_ORDER = Object.keys(DOMAIN_LABELS);

interface ExampleEntry {
  slug: string;
  title: string;
  subtitle?: string;
  domains: string[];
}

function getExampleCards(): ExampleEntry[] {
  return getAllPosts('examples')
    .filter(post => !post.hide_from_list && !post.no_render)
    .map((post: PostData) => ({
      slug: post.id,
      title: post.title,
      subtitle: post.excerpt,
      domains: (post.domains as string[]) ?? [],
    }));
}

function groupByDomain(cards: ExampleEntry[]): Map<string, ExampleEntry[]> {
  const groups = new Map<string, ExampleEntry[]>();
  for (const card of cards) {
    const cardDomains = card.domains.length > 0 ? card.domains : ['uncategorized'];
    for (const domain of cardDomains) {
      const existing = groups.get(domain) ?? [];
      existing.push(card);
      groups.set(domain, existing);
    }
  }
  return groups;
}

export const metadata: Metadata = {
  title: 'Example Cards — AI Field Guide',
  description: 'Real situations where AI patterns appear — organized by domain.',
};

export default function ExampleCardsPage() {
  const cards = getExampleCards();
  const grouped = groupByDomain(cards);

  const orderedDomains = [
    ...DOMAIN_ORDER.filter(d => grouped.has(d)),
    ...[...grouped.keys()].filter(d => !DOMAIN_ORDER.includes(d)),
  ];

  return (
    <FieldGuideSectionLayout contentDir="examples">
      {(columns) => (
        <div>
          <FieldGuideViewProvider>
            {orderedDomains.map(domain => {
              const domainCards = grouped.get(domain) ?? [];
              const label = DOMAIN_LABELS[domain] ?? domain;

              return (
                <div key={domain}>
                  <FieldGuideCardSection>
                    <section className="space-y-5 border-t border-gray-200 px-4 pt-8 dark:border-gray-800 md:px-16">
                      <h2 className="m-0 text-3xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">{label}</h2>
                      <div className={`max-w-5xl grid gap-4 ${columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                        {domainCards.map(card => (
                          <Link
                            key={card.slug}
                            href={`/field-guide/examples/${card.slug}`}
                            className="group block rounded-xl border border-gray-200 bg-white p-5 no-underline shadow-sm transition-colors hover:border-violet-300 hover:bg-violet-50/50 dark:border-gray-800 dark:bg-black dark:hover:border-violet-700 dark:hover:bg-violet-950/20"
                          >
                            <h3 className="m-0 text-base font-semibold text-[#0b5d8f] group-hover:text-violet-700 dark:text-[#8fc4ee] dark:group-hover:text-violet-300">
                              {card.title}
                            </h3>
                            {card.subtitle && (
                              <p className="mb-0 mt-1 text-sm leading-6 text-gray-700 dark:text-gray-300">{card.subtitle}</p>
                            )}
                            {card.domains.length > 1 && (
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {card.domains.map(d => (
                                  <span
                                    key={d}
                                    className="rounded bg-violet-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-violet-700 dark:bg-violet-900/50 dark:text-violet-300"
                                  >
                                    {DOMAIN_LABELS[d] ?? d}
                                  </span>
                                ))}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </section>
                  </FieldGuideCardSection>
                  <FieldGuideCompactSection
                    label={label}
                    cards={domainCards.map(card => ({
                      title: card.title,
                      subtitle: card.subtitle,
                      href: `/field-guide/examples/${card.slug}`,
                    }))}
                  />
                </div>
              );
            })}
          </FieldGuideViewProvider>
        </div>
      )}
    </FieldGuideSectionLayout>
  );
}
