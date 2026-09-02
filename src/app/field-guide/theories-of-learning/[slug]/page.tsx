import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostData, getAllPostIds, type PostData } from '@/lib/markdown';
import ContentLayout from '@/components/ContentLayout';
import MarkdownContent from '@/components/MarkdownContent';
import Breadcrumbs from '@/components/Breadcrumbs';
import StatusBanner from '@/components/StatusBanner';
import { getFieldGuideBannerClasses, getFieldGuideContentClass } from '@/lib/field-guide-palettes';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return getAllPostIds('theories-of-learning')
    .filter(({ params }) => params.id !== 'index')
    .map(({ params }) => ({ slug: params.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const postData = await getPostData(slug, 'theories-of-learning');
    return { title: `${postData.title} – Theories of Learning` };
  } catch {
    return { title: 'Theories of Learning' };
  }
}

export default async function LearningTheoryDetailPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const postData = await getPostData(slug, 'theories-of-learning');
    const subtitle = (postData as PostData & { subtitle?: string }).subtitle;
    const banner = getFieldGuideBannerClasses('theories-of-learning');

    return (
      <ContentLayout
        variant="detail-with-toc"
        fullWidth
        showToc={false}
        header={
          <>
            <StatusBanner status={postData.status} status_reviewer={postData.status_reviewer} status_date={postData.status_date} status_notes={postData.status_notes} contentType="theories-of-learning" />
            <div className="space-y-4 py-6">
              <Breadcrumbs
                className="px-4 md:px-16"
                items={[
                  { label: 'Field Guide', href: '/field-guide' },
                  { label: 'Theories of Learning', href: '/field-guide/theories-of-learning' },
                  { label: postData.title },
                ]}
              />
              <header className={banner.header}>
                <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.18em] ${banner.label}`}>
                  Theory of Learning
                </p>
                <h1 className="m-0! max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-950 dark:text-gray-50">
                  {postData.title}
                </h1>
                {subtitle && (
                  <p className="mb-0 mt-5 max-w-4xl text-lg leading-6 text-gray-700 dark:text-gray-300">{subtitle}</p>
                )}
              </header>
            </div>
          </>
        }
      >
        <div className="space-y-8">
          <MarkdownContent content={postData.content} className={getFieldGuideContentClass('theories-of-learning')} />
          <section className="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-6 dark:border-indigo-900 dark:bg-indigo-950/20">
            <p className={`mb-2 text-xs font-semibold uppercase tracking-[0.18em] ${banner.label}`}>
              Field Guide
            </p>
            <h2 className="m-0 text-2xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">
              Browse Theories of Learning
            </h2>
            <p className="mb-0 mt-3 max-w-3xl text-sm leading-6 text-gray-700 dark:text-gray-300">
              Return to the full list of learning theories to compare different accounts.
            </p>
            <Link
              href="/field-guide/theories-of-learning"
              className="mt-5 inline-flex items-center rounded-full bg-indigo-700 px-4 py-2 text-sm font-semibold text-white no-underline hover:bg-indigo-800 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              Back to Theories of Learning
            </Link>
          </section>
        </div>
      </ContentLayout>
    );
  } catch {
    notFound();
  }
}
