import Link from 'next/link';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import taxonomyData from '../../../../content/config/taxonomy.json';
import { getPostData, PostData } from '@/lib/markdown';
import { generateStaticParamsForContentType, validatePostForRender } from '@/lib/static-params';
import {
  getRelatedContentForPattern,
  getRelatedScheduleItemsForPattern,
  getRelatedTopicsForPattern,
} from '@/lib/relations';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContentLayout from '@/components/ContentLayout';
import MarkdownContent from '@/components/MarkdownContent';
import PatternCaseTabs, { type PatternCaseTab } from '@/components/PatternCaseTabs';
import PatternComicStrip, { type PatternComicStripItem } from '@/components/PatternComicStrip';

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

function formatGroupLabel(group?: string) {
  if (!group) {
    return undefined;
  }

  return group
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function PatternHeader({
  scope = 'SYS',
  group,
  title,
  excerpt,
}: {
  scope?: 'SYS' | 'BRAID';
  group?: string;
  title: string;
  excerpt?: string;
}) {
  return (
    <header className="grid gap-6 border-y border-violet-200 bg-violet-50 px-4 py-16 dark:border-violet-900 dark:bg-violet-950/30 md:grid-cols-[8rem_1fr] md:px-16">
      <div className="flex flex-col justify-center border-b border-violet-200 pb-4 dark:border-violet-900 md:border-b-0 md:border-r md:pb-0 md:pr-5">
        <p className="mb-1 text-3xl font-semibold leading-none tracking-tight text-violet-700 dark:text-violet-300">
          {scope}
        </p>
      </div>
      <div>
        {group && (
          <div className="mb-4 text-xs font-semibold uppercase tracking-wide">
            <span className="text-violet-700 dark:text-violet-300">{group}</span>
          </div>
        )}
        <h1 className="m-0! max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-950 dark:text-gray-50">
          {title}
        </h1>
        {excerpt && <p className="mb-0 mt-5 max-w-4xl text-lg leading-8 text-gray-700 dark:text-gray-300">{excerpt}</p>}
      </div>
    </header>
  );
}

function decodeHtmlText(text: string) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x26;/gi, '&')
    .replace(/&#38;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function getPlainTextFromHtml(html: string) {
  return decodeHtmlText(html.replace(/<[^>]+>/g, '').trim());
}

function slugifyForId(value: string) {
  return value
    .toLowerCase()
    .replace(/&amp;/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function splitPatternContentSections(content: string) {
  const headingRegex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  const sections: Array<{ label: string; content: string }> = [];
  let currentLabel = 'Overview';
  let currentStart = 0;
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const sectionContent = content.slice(currentStart, match.index).trim();

    if (sectionContent) {
      sections.push({
        label: currentLabel,
        content: sectionContent,
      });
    }

    currentLabel = getPlainTextFromHtml(match[1]);
    currentStart = match.index + match[0].length;
  }

  const finalContent = content.slice(currentStart).trim();
  if (finalContent) {
    sections.push({
      label: currentLabel,
      content: finalContent,
    });
  }

  return sections;
}

function splitPatternSubsections(content: string): {
  intro: string;
  items: PatternComicStripItem[];
} {
  const headingRegex = /<h3[^>]*>([\s\S]*?)<\/h3>/gi;
  const items: PatternComicStripItem[] = [];
  let intro = '';
  let currentLabel = '';
  let currentStart = 0;
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const sectionContent = content.slice(currentStart, match.index).trim();

    if (currentLabel && sectionContent) {
      items.push({
        id: slugifyForId(currentLabel),
        label: currentLabel,
        content: sectionContent,
      });
    } else if (!currentLabel && sectionContent) {
      intro = sectionContent;
    }

    currentLabel = getPlainTextFromHtml(match[1]);
    currentStart = match.index + match[0].length;
  }

  const finalContent = content.slice(currentStart).trim();
  if (currentLabel && finalContent) {
    items.push({
      id: slugifyForId(currentLabel),
      label: currentLabel,
      content: finalContent,
    });
  } else if (!currentLabel && finalContent) {
    intro = finalContent;
  }

  return { intro, items };
}

function splitPatternCaseTabs(content: string): PatternCaseTab[] {
  const headingRegex = /<h3[^>]*>([\s\S]*?)<\/h3>/gi;
  const cases: PatternCaseTab[] = [];
  let currentLabel = '';
  let currentStart = 0;
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const caseContent = content.slice(currentStart, match.index).trim();

    if (currentLabel && caseContent) {
      cases.push({
        id: slugifyForId(currentLabel),
        label: currentLabel,
        content: caseContent,
      });
    }

    currentLabel = getPlainTextFromHtml(match[1]);
    currentStart = match.index + match[0].length;
  }

  const finalContent = content.slice(currentStart).trim();
  if (currentLabel && finalContent) {
    cases.push({
      id: slugifyForId(currentLabel),
      label: currentLabel,
      content: finalContent,
    });
  }

  return cases;
}

function PatternSection({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="grid gap-8 border-t border-gray-200 pt-7 dark:border-gray-800 md:grid-cols-[8rem_1fr]">
      <div className="border-b border-gray-200 pb-4 dark:border-gray-800 md:border-b-0 md:border-r md:pb-0 md:pr-5">
        <p className="mb-0 text-lg font-semibold text-[#0b5d8f] dark:text-[#8fc4ee]">{label}</p>
      </div>
      <div className="min-w-0 [&_li]:my-2 [&_ol]:pl-5! [&_ul]:pl-5!">{children}</div>
    </section>
  );
}

function PatternContentSection({ section }: { section: { label: string; content: string } }) {
  const caseTabs = section.label === 'Examples' ? splitPatternCaseTabs(section.content) : [];
  const stepGrid = section.label === 'What To Notice' ? splitPatternSubsections(section.content) : null;

  if (stepGrid && stepGrid.items.length > 0) {
    return <PatternComicStrip intro={stepGrid.intro} items={stepGrid.items} />;
  }

  if (caseTabs.length > 0) {
    return <PatternCaseTabs cases={caseTabs} />;
  }

  return <MarkdownContent content={section.content} />;
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

    const taxonomyPattern = taxonomy.ethicalPatterns.find(pattern => pattern.slug === slug);
    if (!taxonomyPattern) {
      notFound();
    }

    const relatedTopics = getRelatedTopicsForPattern(slug);
    const relatedTaggedContent = getRelatedContentForPattern(slug);
    const relatedScheduleItems = await getRelatedScheduleItemsForPattern(slug);

    const featuredTopics = (postData as PostData & { featured_topics?: string[] }).featured_topics || [];
    const featuredAssignments = (postData as PostData & { featured_assignments?: string[] }).featured_assignments || [];
    const featuredResources = (postData as PostData & { featured_resources?: string[] }).featured_resources || [];

    const resourceItems = relatedTaggedContent.items.filter(item => item.kind === 'resources');
    const combinedScheduleItems = relatedScheduleItems;
    const groupLabel = formatGroupLabel(taxonomyPattern.group);
    const patternContentSections = splitPatternContentSections(postData.content);

    return (
      <ContentLayout
        variant="detail-with-toc"
        fullWidth
        showToc={false}
        header={
          <div className="space-y-4 py-6">
            <Breadcrumbs
              className="px-4 md:px-16"
              items={[
                { label: 'Ethical Pattern Recognition Field Guide', href: '/ethical-pattern-recognition-field-guide' },
                { label: postData.title },
              ]}
            />
            <PatternHeader title={postData.title} excerpt={postData.excerpt} group={groupLabel} />
          </div>
        }
      >
        <div className="space-y-8">
          {patternContentSections.map(section => (
            <PatternSection key={section.label} label={section.label}>
              <PatternContentSection section={section} />
            </PatternSection>
          ))}

          <PatternSection label="Related Course Topics">
            {relatedTopics.length > 0 ? (
              <ul className="list-tight">
                {relatedTopics.map(topic => (
                  <li key={topic.meetingSlug}>
                    <Link href={`/topics/${topic.meetingSlug}`}>{topic.meetingTitle}</Link>{' '}
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
          </PatternSection>

          <PatternSection label="Related Labs & Activities">
            {combinedScheduleItems.length > 0 ? (
              <ul className="list-tight">
                {combinedScheduleItems.map(item => {
                  const slugFromHref = item.href.split('/').filter(Boolean).pop() || '';
                  const isFeatured = featuredAssignments.includes(slugFromHref);

                  return (
                    <li key={item.href}>
                      <Link href={item.href}>{item.title}</Link>{' '}
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        ({item.kind === 'assignments' ? 'Lab / Assignment' : 'Activity'} · {item.moduleTitle} ·{' '}
                        {item.meetingTitle})
                      </span>
                      {isFeatured && (
                        <span className="ml-2 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                          Featured
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">No related labs or activities are mapped yet.</p>
            )}
          </PatternSection>

          <PatternSection label="Related Resources & Articles">
            {resourceItems.length > 0 ? (
              <ul className="list-tight">
                {resourceItems.map(item => {
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
                No tagged resources or articles are connected yet. As you add `ethical_patterns` to resource
                frontmatter, they will appear here automatically.
              </p>
            )}
          </PatternSection>
        </div>
      </ContentLayout>
    );
  } catch {
    notFound();
  }
}
