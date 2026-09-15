import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostData, type PostData } from '@/lib/markdown';
import ContentLayout from '@/components/ContentLayout';
import MarkdownContent from '@/components/MarkdownContent';
import Breadcrumbs from '@/components/Breadcrumbs';

interface PageProps {
  params: Promise<{ slug: string }>;
}

type AIHistoryPost = PostData & {
  year?: string | number;
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
        </div>
      </ContentLayout>
    );
  } catch {
    notFound();
  }
}
