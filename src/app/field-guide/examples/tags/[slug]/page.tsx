import type { Metadata } from 'next';
import Link from 'next/link';
import ContentLayout from '@/components/ContentLayout';
import { FieldGuideViewProvider, FieldGuideCardSection, FieldGuideCompactSection } from '@/components/FieldGuideView';
import { getAllTags, getExamplesForTag } from '@/lib/examples';

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return getAllTags().map(tag => ({ slug: tag.id }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = getAllTags().find(t => t.id === slug);
  return {
    title: `${tag?.title ?? slug} — AI Field Guide`,
    description: tag?.description,
  };
}

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

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = getAllTags().find(t => t.id === slug);
  const examples = getExamplesForTag(slug);

  const cards = examples.map(post => ({
    slug: post.id,
    title: post.title,
    subtitle: post.excerpt,
    tags: (post.tags as string[]) ?? [],
  }));

  return (
    <ContentLayout
      variant="list"
      fullWidth
      contentPadding={false}
      header={
        <header className="border-y border-violet-200 bg-violet-50 px-4 py-16 dark:border-violet-900 dark:bg-violet-950/30 md:px-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
            <Link href="/field-guide/examples/tags" className="hover:underline">← Topics</Link>
          </p>
          <h1 className="m-0! max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-950 dark:text-gray-50">
            {tag?.title ?? slug}
          </h1>
          {tag?.description && (
            <p className="mb-0 mt-5 max-w-4xl text-lg leading-8 text-gray-700 dark:text-gray-300">{tag.description}</p>
          )}
        </header>
      }
    >
      <div className="space-y-12">
        <FieldGuideViewProvider>
          <FieldGuideCardSection>
            <section className="px-4 pt-4 pb-8 md:px-16">
              <div className="max-w-5xl grid gap-4 grid-cols-1">
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
                        {card.tags.map(t => (
                          <Link
                            key={t}
                            href={`/field-guide/examples/tags/${t}`}
                            className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest no-underline ${
                              t === slug
                                ? 'bg-violet-600 text-white dark:bg-violet-500'
                                : 'bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-violet-900/50 dark:text-violet-300 dark:hover:bg-violet-800/50'
                            }`}
                          >
                            {TAG_LABELS[t] ?? t}
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
            }))}
          />
        </FieldGuideViewProvider>
      </div>
    </ContentLayout>
  );
}
