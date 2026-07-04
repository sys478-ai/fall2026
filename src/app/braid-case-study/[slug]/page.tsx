import { getPostData, getAllPostIds, type PostData } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import MarkdownContent from '@/components/MarkdownContent';
import BraidCaseStudyLayout from '@/components/braid-case-study/BraidCaseStudyLayout';

interface BraidCaseStudyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return getAllPostIds('braid-case-study')
    .filter(({ params }) => params.id !== 'index')
    .map(({ params }) => ({ slug: params.id }));
}

export default async function BraidCaseStudyDetailPage({ params }: BraidCaseStudyDetailPageProps) {
  const { slug } = await params;

  if (slug === 'index') {
    notFound();
  }

  try {
    const postData = await getPostData(slug, 'braid-case-study');
    const subtitle = (postData as { subtitle?: string }).subtitle;
    const caseParent = (postData as PostData & { case_parent?: string }).case_parent;
    const showFictionalWatermark =
      (postData as PostData & { fictional_watermark?: boolean }).fictional_watermark === true;

    if (postData.excluded || postData.no_render === 1) {
      notFound();
    }

    const breadcrumbItems: Array<{ label: string; href?: string }> = [
      { label: 'Syllabus', href: '/' },
      { label: 'BRAID Case Study', href: '/braid-case-study' },
    ];

    if (caseParent) {
      try {
        const parentData = await getPostData(caseParent, 'braid-case-study');
        const parentLabel =
          (parentData as PostData & { nav_label?: string }).nav_label || parentData.title;

        breadcrumbItems.push({
          label: parentLabel,
          href: `/braid-case-study/${caseParent}`,
        });
      } catch {
        // Parent case missing; continue without intermediate breadcrumb.
      }
    }

    breadcrumbItems.push({ label: postData.title });

    return (
      <BraidCaseStudyLayout
        title={postData.title}
        subtitle={subtitle}
        breadcrumbItems={breadcrumbItems}
        showToc={postData.toc !== false}
        tocMaxLevel={postData.heading_max_level || 2}
        showFictionalWatermark={showFictionalWatermark}
      >
        <MarkdownContent content={postData.content} />
      </BraidCaseStudyLayout>
    );
  } catch {
    notFound();
  }
}
