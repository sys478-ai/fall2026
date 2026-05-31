import Link from 'next/link';
import { notFound } from 'next/navigation';
import taxonomyData from '../../../../content/config/taxonomy.json';
import { getPostData, PostData } from '@/lib/markdown';
import { generateStaticParamsForContentType, validatePostForRender } from '@/lib/static-params';
import { getRelatedContentForPattern, getRelatedScheduleItemsForPattern, getRelatedTopicsForPattern } from '@/lib/relations';
import { getTopics } from '@/lib/topics';
import { getMeetingAnchorId, getModuleAnchorId } from '@/lib/navigation-helpers';
import ContentLayout from '@/components/ContentLayout';
import MarkdownContent from '@/components/MarkdownContent';
import PageHeader from '@/components/PageHeader';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface TaxonomyEntry {
  slug?: string;
  title: string;
  group?: string;
  relatedThemes?: string[];
}

interface TaxonomyData {
  themes: Array<{ slug: string; title: string }>;
  ethicalPatterns: TaxonomyEntry[];
}

const taxonomy = taxonomyData as TaxonomyData;

function getThemeLabel(slug: string) {
  return taxonomy.themes.find((theme) => theme.slug === slug)?.title || slug;
}

function formatGroupLabel(group?: string) {
  if (!group) {
    return undefined;
  }

  return group
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return generateStaticParamsForContentType('ethical-patterns');
}

export default async function EthicalPatternPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const postData = await getPostData(slug, 'ethical-patterns');

    if (!validatePostForRender(slug, postData, 'ethical-patterns')) {
      notFound();
    }

    const taxonomyPattern = taxonomy.ethicalPatterns.find((pattern) => pattern.slug === slug);
    if (!taxonomyPattern) {
      notFound();
    }

    const relatedTopics = getRelatedTopicsForPattern(slug);
    const relatedTaggedContent = getRelatedContentForPattern(slug);
    const relatedScheduleItems = await getRelatedScheduleItemsForPattern(slug);
    const scheduledTopics = await getTopics();

    const topicHrefBySlug = new Map<string, string>();
    scheduledTopics.forEach((module) => {
      const moduleHref = `/#${getModuleAnchorId(module.id)}`;
      module.meetings.forEach((meeting, index) => {
        if (meeting.slug) {
          topicHrefBySlug.set(meeting.slug, `/#${getMeetingAnchorId(module.id, index, meeting.topic)}`);
        }
      });

      topicHrefBySlug.set(module.slug || `module-${module.id}`, moduleHref);
    });

    const featuredTopics = (postData as PostData & { featured_topics?: string[] }).featured_topics || [];
    const featuredAssignments = (postData as PostData & { featured_assignments?: string[] }).featured_assignments || [];
    const featuredResources = (postData as PostData & { featured_resources?: string[] }).featured_resources || [];

    const themeSlugs = (postData.themes || taxonomyPattern.relatedThemes || []).filter(Boolean);
    const resourceItems = relatedTaggedContent.items.filter((item) => item.kind === 'resources');
    const combinedScheduleItems = relatedScheduleItems;

    return (
      <ContentLayout variant="detail-with-toc" fullWidth>
        <div className="space-y-8">
          <div className="mb-4">
            <Link
              href="/ethical-pattern-recognition-field-guide"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Ethical Pattern Recognition Field Guide
            </Link>
            {' > '}
            <span className="text-gray-900 dark:text-gray-100">{postData.title}</span>
          </div>

          <PageHeader title={postData.title} excerpt={postData.excerpt} group={formatGroupLabel(taxonomyPattern.group)} />

          <div className="flex flex-wrap gap-2">
            {themeSlugs.map((themeSlug) => (
              <span
                key={themeSlug}
                className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
              >
                {getThemeLabel(themeSlug)}
              </span>
            ))}
          </div>

          <MarkdownContent content={postData.content} />

          <section className="space-y-4">
            <h2>Related Topics</h2>
            {relatedTopics.length > 0 ? (
              <ul className="list-tight">
                {relatedTopics.map((topic) => (
                  <li key={topic.meetingSlug}>
                    <Link href={topicHrefBySlug.get(topic.meetingSlug) || '/'}>
                      {topic.meetingTitle}
                    </Link>{' '}
                    <span className="text-sm text-gray-600 dark:text-gray-400">({topic.moduleTitle})</span>
                    {featuredTopics.includes(topic.meetingSlug) && (
                      <span className="ml-2 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        Featured
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">No related topics are mapped yet.</p>
            )}
          </section>

          <section className="space-y-4">
            <h2>Related Labs And Activities</h2>
            {combinedScheduleItems.length > 0 ? (
              <div className="space-y-3">
                {combinedScheduleItems.map((item) => {
                  const slugFromHref = item.href.split('/').filter(Boolean).pop() || '';
                  const isFeatured = featuredAssignments.includes(slugFromHref);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-xl border border-gray-200 bg-white p-4 no-underline transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-black dark:hover:bg-gray-900"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="m-0 text-base font-semibold text-gray-900 dark:text-gray-100">
                            {item.title}
                          </h3>
                          <p className="mb-0 mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {item.moduleTitle} · {item.meetingTitle}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                            {item.kind === 'assignments' ? 'Lab / Assignment' : 'Activity'}
                          </span>
                          {isFeatured && (
                            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">No related labs or activities are mapped yet.</p>
            )}
          </section>

          <section className="space-y-4">
            <h2>Related Resources And Articles</h2>
            {resourceItems.length > 0 ? (
              <ul className="list-tight">
                {resourceItems.map((item) => {
                  const slugFromHref = item.href.split('/').filter(Boolean).pop() || '';
                  return (
                    <li key={item.href}>
                      <Link href={item.href}>{item.title}</Link>
                      {featuredResources.includes(slugFromHref) && (
                        <span className="ml-2 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                          Featured
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No tagged resources or articles are connected yet. As you add `ethical_patterns` to resource frontmatter,
                they will appear here automatically.
              </p>
            )}
          </section>
        </div>
      </ContentLayout>
    );
  } catch {
    notFound();
  }
}
