import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContentLayout from '@/components/ContentLayout';
import MarkdownContent from '@/components/MarkdownContent';
import TopLevelPageHeader from '@/components/TopLevelPageHeader';
import { getPostData } from '@/lib/markdown';
import { getAllModuleMarkdownMetadata, getModuleMarkdownById } from '@/lib/module-markdown';
import { getTopics } from '@/lib/topics';

interface ModulePageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  return getAllModuleMarkdownMetadata().map(module => ({
    id: String(module.id),
  }));
}

function getHeaderTone(color: string): 'sky' | 'indigo' | 'violet' | 'slate' {
  if (color === 'sky' || color === 'indigo' || color === 'violet') {
    return color;
  }

  return 'slate';
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { id } = await params;
  const moduleId = Number.parseInt(id, 10);

  if (!Number.isInteger(moduleId)) {
    notFound();
  }

  const module = getModuleMarkdownById(moduleId);
  if (!module) {
    notFound();
  }

  const [postData, topics] = await Promise.all([getPostData(module.contentId, 'modules'), getTopics()]);
  const scheduledModule = topics.find(topic => topic.id === module.id);

  return (
    <ContentLayout
      variant="detail-with-toc"
      showToc={false}
      fullWidth
      header={
        <div className="space-y-4 py-6">
          <Breadcrumbs
            className="px-4 md:px-16"
            items={[
              { label: 'Course Schedule', href: '/modules' },
              { label: `${module.id}. ${module.title}` },
            ]}
          />
          <TopLevelPageHeader
            label={`Module ${module.id}`}
            title={module.title}
            description={module.excerpt || postData.excerpt}
            tone={getHeaderTone(module.color)}
          />
        </div>
      }
    >
      <div className="max-w-4xl space-y-10">
        <MarkdownContent content={postData.content} />

        {scheduledModule && scheduledModule.meetings.length > 0 && (
          <section>
            <h2 className="mt-0 mb-4 text-xl font-semibold text-gray-950 dark:text-gray-50">Meetings</h2>
            <ol className="m-0 list-none divide-y divide-gray-200 p-0 dark:divide-gray-800">
              {scheduledModule.meetings.map((meeting, index) => {
                const isNoClass = meeting.holiday === true;
                const isDraft = meeting.draft === 1;
                const href =
                  meeting.slug && !isNoClass && !isDraft ? `/topics/${meeting.slug}` : undefined;

                return (
                  <li key={meeting.slug || `${module.id}-${index}`} className="flex items-baseline gap-4 py-2.5">
                    <span className="w-24 shrink-0 text-sm text-gray-600 dark:text-gray-400">{meeting.date}</span>
                    <span className="min-w-0">
                      {href ? (
                        <Link
                          href={href}
                          className="text-[#0b5d8f] no-underline hover:text-[#08486e] dark:text-[#8fc4ee] dark:hover:text-[#b6d9f5]"
                        >
                          {meeting.topic}
                        </Link>
                      ) : (
                        <span className="text-gray-700 dark:text-gray-300">{meeting.topic}</span>
                      )}
                      {isNoClass && (
                        <span className="mt-0.5 block text-xs font-medium text-gray-400 dark:text-gray-600">
                          No class
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ol>
          </section>
        )}
      </div>
    </ContentLayout>
  );
}
