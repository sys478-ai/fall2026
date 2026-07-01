import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostData, getAllPostIds, type PostData } from '@/lib/markdown';
import ContentLayout from '@/components/ContentLayout';
import MarkdownContent from '@/components/MarkdownContent';
import Breadcrumbs from '@/components/Breadcrumbs';
import StatusBanner from '@/components/StatusBanner';
import { splitPatternContentSections } from '@/lib/pattern-content-sections';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function parseExplainerSectionLabel(label: string) {
  const match = label.match(/^(.*?)\s+\[(Required|Optional|Required if Needed)\]\s*$/);

  if (!match) {
    return { title: label, badge: null };
  }

  return {
    title: match[1].trim(),
    badge: match[2],
  };
}

function ExplainerSection({
  label,
  children,
  isFirst = false,
}: {
  label: string;
  children: ReactNode;
  isFirst?: boolean;
}) {
  if (!label.trim()) {
    return <div className="min-w-0 space-y-4">{children}</div>;
  }

  const { title, badge } = parseExplainerSectionLabel(label);
  const badgeClasses =
    badge === 'Optional'
      ? 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300'
      : badge === 'Required if Needed'
        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
        : 'bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-300';

  return (
    <section className={isFirst ? 'space-y-4' : 'space-y-4 pt-4'}>
      <h2 className="m-0 flex flex-wrap items-center gap-3 text-3xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">
        <span>{title}</span>
        {badge && (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${badgeClasses}`}
          >
            {badge}
          </span>
        )}
      </h2>
      <div className="min-w-0 [&_li]:my-2 [&_ol]:pl-5! [&_ul]:pl-5!">{children}</div>
    </section>
  );
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return getAllPostIds('technical-explainers')
    .filter(({ params }) => params.id !== 'index')
    .map(({ params }) => ({ slug: params.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const postData = await getPostData(slug, 'technical-explainers');
    return { title: `${postData.title} — Technical Explainers` };
  } catch {
    return { title: 'Technical Explainer' };
  }
}

export default async function TechnicalExplainerDetailPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const postData = await getPostData(slug, 'technical-explainers');
    const subtitle = (postData as PostData & { subtitle?: string }).subtitle;
    const contentSections = splitPatternContentSections(postData.content);
    const firstLabeledSectionIndex = contentSections.findIndex(section => section.label.trim());

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
              contentType="technical-explainers"
            />
            <div className="space-y-4 py-6">
              <Breadcrumbs
                className="px-4 md:px-16"
                items={[
                  { label: 'Field Guide', href: '/field-guide' },
                  { label: 'Technical Explainers', href: '/field-guide/technical-explainers' },
                  { label: postData.title },
                ]}
              />
              <header className="border-y border-violet-200 bg-violet-50 px-4 py-16 dark:border-violet-900 dark:bg-violet-950/30 md:px-16">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
                  Technical Explainer
                </p>
                <h1 className="m-0! max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-950 dark:text-gray-50">
                  {postData.title}
                </h1>
                {subtitle && (
                  <p className="mb-0 mt-5 max-w-4xl text-lg leading-8 text-gray-700 dark:text-gray-300">{subtitle}</p>
                )}
              </header>
            </div>
          </>
        }
      >
        <div className="space-y-8">
          {contentSections.map((section, index) => (
            <ExplainerSection
              key={`${section.label || 'intro'}-${index}`}
              label={section.label}
              isFirst={index === firstLabeledSectionIndex}
            >
              <MarkdownContent content={section.content} className="technical-explainer-content" />
            </ExplainerSection>
          ))}
          <section className="pt-2">
            <Link
              href="/field-guide/technical-explainers"
              className="inline-flex items-center rounded-full bg-violet-700 px-4 py-2 text-sm font-semibold text-white no-underline hover:bg-violet-800 dark:bg-violet-500 dark:hover:bg-violet-400"
            >
              Back to Technical Explainers
            </Link>
          </section>
        </div>
      </ContentLayout>
    );
  } catch {
    notFound();
  }
}
