import { getPostData, getQuizData } from '@/lib/markdown';
import MarkdownContent from '@/components/MarkdownContent';
import ContentLayout from '@/components/ContentLayout';
import ResourceQuiz from '@/components/ResourceQuiz';
import QuickLinksNav from '@/components/QuickLinksNav';
import TopLevelPageHeader from '@/components/TopLevelPageHeader';

export default async function SyllabusPageContent() {
  const postData = await getPostData('syllabus');
  const { title, excerpt, heading_max_level } = postData;
  const quizData = getQuizData('syllabus');

  return (
    <ContentLayout
      variant="detail-with-toc"
      leftNav={<QuickLinksNav />}
      showToc={postData.toc !== false}
      tocMaxLevel={heading_max_level || 2}
      fullWidth
      header={<TopLevelPageHeader label="Syllabus" title={title} description={excerpt} tone="sky" />}
    >
      <div className="max-w-4xl pr-8 pt-6">
        <MarkdownContent content={postData.content} />

        {quizData && <ResourceQuiz key="quiz-syllabus" quizData={quizData} resourceSlug="syllabus" variant="desktop" />}
      </div>
    </ContentLayout>
  );
}
