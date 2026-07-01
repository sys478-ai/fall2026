import { getPostData } from '@/lib/markdown';
import { generateStaticParamsForContentType, validatePostForRender } from '@/lib/static-params';
import MarkdownContent from '@/components/MarkdownContent';
import ContentLayout from '@/components/ContentLayout';
import QuickLinksNav from '@/components/QuickLinksNav';
import StyleGuideStyles from '@/components/StyleGuideStyles';
import TopLevelPageHeader from '@/components/TopLevelPageHeader';
import Breadcrumbs from '@/components/Breadcrumbs';
import StatusBanner from '@/components/StatusBanner';
import AssignmentSeriesHub from '@/components/assignments/AssignmentSeriesHub';
import AssignmentSeriesClientRedirect from '@/components/assignments/AssignmentSeriesClientRedirect';
import { getDueDateForScheduledDay } from '@/lib/course-calendar';
import {
  buildHw01ChecklistItems,
  getAssignmentSeries,
  getSeriesRedirectTarget,
  loadAssignmentSeriesPosts,
} from '@/lib/assignment-series';
import { notFound } from 'next/navigation';

interface AssignmentPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${dayOfWeek}, ${month}/${day}`;
}

export default async function AssignmentPage({ params }: AssignmentPageProps) {
  try {
    const { slug } = await params;
    const postData = await getPostData(slug, 'assignments');

    if (!validatePostForRender(slug, postData, 'assignments')) {
      notFound();
    }

    const seriesRedirect = getSeriesRedirectTarget(slug, postData);
    if (seriesRedirect) {
      return (
        <ContentLayout
          variant="detail-with-toc"
          leftNav={<QuickLinksNav />}
          showToc={false}
          fullWidth
          header={
            <div className="space-y-4 py-6">
              <Breadcrumbs
                className="px-4 md:px-16"
                items={[
                  { label: 'Assignments', href: '/assignments' },
                  { label: postData.title },
                ]}
              />
              <TopLevelPageHeader
                label={postData.type || 'Assignment'}
                title={postData.title}
                tone="sky"
              />
            </div>
          }
        >
          <div className="assignment-page max-w-4xl px-4 pt-6 md:px-16">
            <AssignmentSeriesClientRedirect href={seriesRedirect} title={postData.title} />
          </div>
        </ContentLayout>
      );
    }

    const { heading_max_level } = postData;
    const isStyleGuideDemo = slug === 'style-guide-demo';
    const isTutorial02 = slug === 'tutorial02';
    const contentType = slug.startsWith('lab') ? 'labs' : slug.startsWith('career') ? 'career-modules' : undefined;
    const dueDate = getDueDateForScheduledDay(postData.scheduled_day) || postData.due_date;

    const isSeriesHub = postData.series_role === 'hub' && postData.assignment_series;
    const series = isSeriesHub ? getAssignmentSeries(postData.assignment_series!) : null;

    if (isSeriesHub && series) {
      const { hubPost, stepPosts, resourcePosts } = await loadAssignmentSeriesPosts(series);

      const checklistItems =
        postData.assignment_series === 'hw01' ? buildHw01ChecklistItems(series.hub.id) : [];

      const navItems = [
        { id: 'overview', label: 'Overview' },
        {
          id: 'topics',
          label: 'Review Your Topic',
        },
        ...series.steps.map(step => ({
          id: step.tabId,
          label: step.series_label || step.title,
        })),
        ...(checklistItems.length > 0 ? [{ id: 'checklist', label: 'Checklist' as const }] : []),
      ];

      const scenarioItems = resourcePosts.map((post, index) => ({
        id: series.resources[index]?.cardId || post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
      }));

      return (
        <ContentLayout
          variant="detail-with-toc"
          leftNav={<QuickLinksNav />}
          showToc={false}
          fullWidth
          contentPadding={false}
          header={
            <>
              <StatusBanner
                section="topicsAndAssignments"
                status={hubPost.status}
                status_reviewer={hubPost.status_reviewer}
                status_date={hubPost.status_date}
                status_notes={hubPost.status_notes}
                contentType={contentType}
              />
              <div className="space-y-4 py-6">
                <Breadcrumbs
                  className="px-4 md:px-16"
                  items={[
                    { label: 'Assignments', href: '/assignments' },
                    { label: hubPost.title },
                  ]}
                />
                <TopLevelPageHeader
                  label={hubPost.type || 'Assignment'}
                  title={hubPost.title}
                  description={hubPost.excerpt}
                  tone="sky"
                />
              </div>
            </>
          }
        >
          <div className="space-y-6 px-4 pb-10 md:px-16">
            {dueDate && (
              <p className="mt-0 text-lg font-bold">
                Due {formatDate(dueDate)} at 11:59pm
              </p>
            )}
            <AssignmentSeriesHub
              navItems={navItems}
              overviewContent={hubPost.content}
              stepContents={stepPosts.map((post, index) => ({
                tabId: series.steps[index]?.tabId || post.id,
                content: post.content,
              }))}
              scenarioItems={scenarioItems}
              checklistItems={checklistItems}
              seriesId={series.id}
            />
          </div>
        </ContentLayout>
      );
    }

    return (
      <ContentLayout
        variant="detail-with-toc"
        leftNav={<QuickLinksNav />}
        showToc={postData.toc !== false}
        tocMaxLevel={heading_max_level || 2}
        fullWidth
        header={
          <>
            <StatusBanner section="topicsAndAssignments" status={postData.status} status_reviewer={postData.status_reviewer} status_date={postData.status_date} status_notes={postData.status_notes} contentType={contentType} />
            <div className="space-y-4 py-6">
              <Breadcrumbs
                className="px-4 md:px-16"
                items={[
                  { label: 'Assignments', href: '/assignments' },
                  { label: postData.title },
                ]}
              />
              <TopLevelPageHeader
                label={postData.type || 'Assignment'}
                title={postData.title}
                description={postData.excerpt}
                tone="sky"
              />
            </div>
          </>
        }
      >
        <div className={`assignment-page max-w-4xl pr-8 pt-6${isTutorial02 ? ' assignment-page-tutorial02' : ''}`}>
          {dueDate && (
            <p className="mt-0 text-lg font-bold">
              Due {formatDate(dueDate)} at 11:59pm
            </p>
          )}
          {isStyleGuideDemo && <StyleGuideStyles />}
          <MarkdownContent content={postData.content} className="[&_a]:underline [&_a]:underline-offset-2" />
        </div>
      </ContentLayout>
    );
  } catch {
    notFound();
  }
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return generateStaticParamsForContentType('assignments');
}
