import { getPostData, getQuizData } from '@/lib/markdown';
import MarkdownContent from '@/components/MarkdownContent';
import ContentLayout from '@/components/ContentLayout';
import ResourceQuiz from '@/components/ResourceQuiz';
import QuickLinksNav from '@/components/QuickLinksNav';

export default async function SyllabusPage() {
  const postData = await getPostData('syllabus');
  const {title, excerpt, heading_max_level} = postData;
  const quizData = getQuizData('syllabus');
  
  return (
    <ContentLayout
      variant="detail-with-toc"
      leftNav={<QuickLinksNav />}
      showToc={postData.toc !== false}
      tocMaxLevel={heading_max_level || 2}
      fullWidth
      header={
        <header className="grid gap-6 border-b border-sky-200 bg-sky-50 px-4 py-12 dark:border-sky-900 dark:bg-sky-950/30 md:grid-cols-[8rem_1fr] md:px-16">
          <div className="flex flex-col justify-center border-b border-sky-200 pb-4 dark:border-sky-900 md:border-b-0 md:border-r md:pb-0 md:pr-5">
            <p className="mb-0 text-3xl font-semibold leading-none tracking-tight text-sky-700 dark:text-sky-300">
              Syllabus
            </p>
          </div>
          <div>
            <h1 className="m-0! max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-950 dark:text-gray-50">
              {title}
            </h1>
            {excerpt && (
              <p className="mb-0 mt-5 max-w-4xl text-lg leading-8 text-gray-700 dark:text-gray-300">
                {excerpt}
              </p>
            )}
          </div>
        </header>
      }
    >
      <div className="max-w-4xl pr-8 pt-6">
        <MarkdownContent content={postData.content} />
        
        {/* Quiz */}
        {quizData && (
          <ResourceQuiz key="quiz-syllabus" quizData={quizData} resourceSlug="syllabus" variant="desktop" />
        )}
      </div>
    </ContentLayout>
  );
} 
