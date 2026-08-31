import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostData, type PostData } from '@/lib/markdown';
import ContentLayout from '@/components/ContentLayout';
import MarkdownContent from '@/components/MarkdownContent';
import Breadcrumbs from '@/components/Breadcrumbs';

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface TimelineCard {
  label: string;
  href?: string;
}

type AIHistoryPost = PostData & {
  year?: string | number;
  timeline_cards?: TimelineCard[];
  hide_from_list?: boolean;
};

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return getAllPosts('ai-history')
    .filter(post => !post.no_render)
    .map(post => ({ slug: post.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostData(slug, 'ai-history');
    return { title: `${post.title} – History of AI`, description: post.excerpt };
  } catch {
    return { title: 'History of AI' };
  }
}

export default async function AIHistoryDetailPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const post = (await getPostData(slug, 'ai-history')) as AIHistoryPost;
    const cards = post.timeline_cards ?? [];

    return (
      <ContentLayout
        variant="detail-with-toc"
        fullWidth
        showToc={false}
        header={
          <div className="space-y-4 py-6">
            <Breadcrumbs
              className="px-4 md:px-16"
              items={[
                { label: 'Field Guide', href: '/field-guide' },
                { label: 'History of AI', href: '/field-guide/ai-history' },
                { label: post.title },
              ]}
            />
            <header className="border-y border-violet-200 bg-violet-50 px-4 py-16 dark:border-violet-900 dark:bg-violet-950/30 md:px-16">
              {post.year && (
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
                  {post.year}
                </p>
              )}
              <h1 className="m-0! max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-950 dark:text-gray-50">
                {post.title}
              </h1>
            </header>
          </div>
        }
      >
        <div className="space-y-8">
          <section className="space-y-4 pt-4">
            <MarkdownContent content={post.content} />
          </section>

          {cards.length > 0 && (
            <section className="space-y-4 pt-4">
              <h2 className="text-3xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">
                Related Field Guide Pages
              </h2>
              <div className="flex flex-wrap gap-2">
                {cards.map((card, i) =>
                  card.href ? (
                    <Link
                      key={i}
                      href={card.href}
                      className="inline-flex items-center rounded-full bg-violet-100 px-3.5 py-1.5 text-sm font-medium text-violet-800 no-underline transition-colors hover:bg-violet-200 dark:bg-violet-900/50 dark:text-violet-200 dark:hover:bg-violet-800/60"
                    >
                      {card.label}
                    </Link>
                  ) : (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-full bg-gray-100 px-3.5 py-1.5 text-sm font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-500"
                    >
                      {card.label}
                    </span>
                  )
                )}
              </div>
            </section>
          )}

          <section className="rounded-2xl border border-violet-200 bg-violet-50/70 p-6 dark:border-violet-900 dark:bg-violet-950/20">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
              Field Guide
            </p>
            <h2 className="m-0 text-2xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">
              Browse the Full Timeline
            </h2>
            <Link
              href="/field-guide/ai-history"
              className="mt-5 inline-flex items-center rounded-full bg-violet-700 px-4 py-2 text-sm font-semibold text-white no-underline hover:bg-violet-800 dark:bg-violet-500 dark:hover:bg-violet-400"
            >
              Back to History of AI
            </Link>
          </section>
        </div>
      </ContentLayout>
    );
  } catch {
    notFound();
  }
}
