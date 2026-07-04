import { getPostData } from '@/lib/markdown';
import MarkdownContent from '@/components/MarkdownContent';
import BraidCaseStudyLayout from '@/components/braid-case-study/BraidCaseStudyLayout';

export default async function BraidCaseStudyPage() {
  const postData = await getPostData('index', 'braid-case-study');
  const subtitle = (postData as { subtitle?: string }).subtitle;

  return (
    <BraidCaseStudyLayout
      title={postData.title}
      subtitle={subtitle}
      breadcrumbItems={[
        { label: 'Syllabus', href: '/' },
        { label: postData.title },
      ]}
      showToc={postData.toc !== false}
      tocMaxLevel={postData.heading_max_level || 2}
    >
      <MarkdownContent content={postData.content} />
    </BraidCaseStudyLayout>
  );
}
