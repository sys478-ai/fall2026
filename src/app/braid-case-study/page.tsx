import { getPostData } from '@/lib/markdown';
import PageHeader from '@/components/PageHeader';
import MarkdownContent from '@/components/MarkdownContent';
import ContentLayout from '@/components/ContentLayout';
import QuickLinksNav from '@/components/QuickLinksNav';
import Breadcrumbs from '@/components/Breadcrumbs';

export default async function BraidCaseStudyPage() {
  const postData = await getPostData('index', 'braid-case-study');
  const subtitle = (postData as { subtitle?: string }).subtitle;

  return (
    <ContentLayout
      variant="detail-with-toc"
      leftNav={<QuickLinksNav />}
      showToc={postData.toc !== false}
      tocMaxLevel={postData.heading_max_level || 2}
    >
      <Breadcrumbs
        items={[
          { label: 'Syllabus', href: '/' },
          { label: postData.title },
        ]}
      />
      <PageHeader title={postData.title} excerpt={subtitle} />
      <MarkdownContent content={postData.content} />
    </ContentLayout>
  );
}
