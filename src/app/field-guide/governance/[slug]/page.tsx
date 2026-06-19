import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostDataBySlug, type PostData } from '@/lib/markdown';
import ContentLayout from '@/components/ContentLayout';
import MarkdownContent from '@/components/MarkdownContent';
import Breadcrumbs from '@/components/Breadcrumbs';
import StatusBanner from '@/components/StatusBanner';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return getAllPosts('governance')
    .filter(post => !post.no_render && !!post.slug)
    .map(post => ({ slug: post.slug as string }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const postData = await getPostDataBySlug(slug, 'governance');
    return { title: `${postData.title} — Governance`, description: postData.excerpt };
  } catch {
    return { title: 'Governance' };
  }
}

export default async function GovernanceDetailPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const postData = await getPostDataBySlug(slug, 'governance');
    const subtitle = (postData as PostData & { subtitle?: string }).subtitle;

    return (
      <ContentLayout
        variant="detail-with-toc"
        fullWidth
        showToc={postData.toc !== false}
        tocMaxLevel={postData.heading_max_level || 2}
        header={
          <>
            <StatusBanner
              status={postData.status}
              status_reviewer={postData.status_reviewer}
              status_date={postData.status_date}
              status_notes={postData.status_notes}
              contentType="governance"
            />
            <div className="space-y-4 py-6">
              <Breadcrumbs
                className="px-4 md:px-16"
                items={[
                  { label: 'Field Guide', href: '/field-guide' },
                  { label: 'Governance', href: '/field-guide/governance' },
                  { label: postData.title },
                ]}
              />
              <header className="border-y border-violet-200 bg-violet-50 px-4 py-16 dark:border-violet-900 dark:bg-violet-950/30 md:px-16">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
                  Governance
                </p>
                <h1 className="m-0! max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-950 dark:text-gray-50">
                  {postData.title}
                </h1>
                {(subtitle || postData.excerpt) && (
                  <p className="mb-0 mt-5 max-w-4xl text-lg leading-8 text-gray-700 dark:text-gray-300">
                    {subtitle ?? postData.excerpt}
                  </p>
                )}
              </header>
            </div>
          </>
        }
      >
        <div className="space-y-8">
          <MarkdownContent content={postData.content} />
          <section className="rounded-2xl border border-violet-200 bg-violet-50/70 p-6 dark:border-violet-900 dark:bg-violet-950/20">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
              Field Guide
            </p>
            <h2 className="m-0 text-2xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">
              Browse Governance Pages
            </h2>
            <p className="mb-0 mt-3 max-w-3xl text-sm leading-6 text-gray-700 dark:text-gray-300">
              Return to the governance section of the field guide.
            </p>
            <Link
              href="/field-guide/governance"
              className="mt-5 inline-flex items-center rounded-full bg-violet-700 px-4 py-2 text-sm font-semibold text-white no-underline hover:bg-violet-800 dark:bg-violet-500 dark:hover:bg-violet-400"
            >
              Back to Governance
            </Link>
          </section>
        </div>
      </ContentLayout>
    );
  } catch {
    notFound();
  }
}
