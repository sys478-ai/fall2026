import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPostData, getAllPosts } from '@/lib/markdown';
import { getExampleThemes } from '@/lib/examples';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContentLayout from '@/components/ContentLayout';
import MarkdownContent from '@/components/MarkdownContent';
import StatusBanner from '@/components/StatusBanner';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const DOMAIN_LABELS: Record<string, string> = {
  'criminal-justice-and-policing': 'Criminal Justice and Policing',
  'healthcare-and-medicine': 'Healthcare and Medicine',
  'labor-and-employment': 'Labor and Employment',
  'housing-and-urban-infrastructure': 'Housing and Urban Infrastructure',
  'immigration-and-borders': 'Immigration and Borders',
  'environment-and-land-use': 'Environment and Land Use',
  education: 'Education',
  'platform-and-consumer': 'Platform and Consumer',
  'public-benefits-and-welfare': 'Public Benefits and Welfare',
};

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return getAllPosts('examples')
    .filter(post => !post.no_render)
    .map(post => ({ slug: post.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostData(slug, 'examples');
    return { title: post.title, description: post.excerpt };
  } catch {
    return {};
  }
}

export default async function ExamplePage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const post = await getPostData(slug, 'examples');
    const domains = (post.domains as string[]) ?? [];
    const contested = (post as typeof post & { contested?: string }).contested;
    const connectedCards =
      (post.connected_cards as Array<{ num: string; section?: string; interpretation: string }>) ?? [];
    const themes = getExampleThemes(connectedCards);

    return (
      <ContentLayout
        variant="detail-with-toc"
        fullWidth
        showToc={false}
        header={
          <>
            <StatusBanner
              status={post.status}
              status_reviewer={post.status_reviewer}
              status_date={post.status_date}
              status_notes={post.status_notes}
              contentType="examples"
            />
            <div className="space-y-4 py-6">
              <Breadcrumbs
                className="px-4 md:px-16"
                items={[
                  { label: 'Field Guide', href: '/field-guide' },
                  { label: 'Examples', href: '/field-guide/examples' },
                  { label: post.title },
                ]}
              />
              <header className="border-y border-violet-200 bg-violet-50 px-4 py-16 dark:border-violet-900 dark:bg-violet-950/30 md:px-16">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
                  Example Card
                </p>
                <h1 className="m-0! max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-950 dark:text-gray-50">
                  {post.title}
                </h1>
                {post.excerpt && (
                  <p className="mb-0 mt-5 max-w-4xl text-lg leading-6 text-gray-700 dark:text-gray-300">
                    {post.excerpt}
                  </p>
                )}
                {domains.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {domains.map(d => (
                      <span
                        key={d}
                        className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-200"
                      >
                        {DOMAIN_LABELS[d] ?? d}
                      </span>
                    ))}
                  </div>
                )}
              </header>
            </div>
          </>
        }
      >
        <div className="space-y-4">
          {contested && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900/50 dark:bg-amber-950/20">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-500">
                Contested
              </p>
              <p className="mb-0 text-sm italic leading-6 text-gray-700 dark:text-gray-300">{contested}</p>
            </div>
          )}
          <section>
            <MarkdownContent content={post.content} />
          </section>

          {themes.length > 0 && (
            <section>
              <h2 className="mb-4 mt-0 border-b-2 border-black pb-2.5 text-2xl font-bold text-black dark:border-gray-100 dark:text-gray-50 md:text-3xl">
                Course themes
              </h2>
              <ol className="list-decimal pl-6 text-base leading-7 text-gray-800 dark:text-gray-200 [&>li:not(:last-child)]:mb-5!">
                {themes.map(theme => (
                  <li key={theme.num}>
                    {theme.title && (
                      <p className="m-0! font-semibold text-gray-950 dark:text-gray-50">
                        {theme.href ? (
                          <Link
                            href={theme.href}
                            className="text-inherit hover:text-violet-700 dark:hover:text-violet-300"
                          >
                            {theme.title}
                          </Link>
                        ) : (
                          theme.title
                        )}
                      </p>
                    )}
                    <p className="m-0! text-base leading-7">{theme.interpretation}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <div>
            <Link
              href="/field-guide/examples"
              className="inline-flex items-center rounded-full bg-violet-700 px-4 py-2 text-sm font-semibold text-white no-underline hover:bg-violet-800 dark:bg-violet-500 dark:hover:bg-violet-400"
            >
              Back to Examples
            </Link>
          </div>
        </div>
      </ContentLayout>
    );
  } catch {
    notFound();
  }
}
