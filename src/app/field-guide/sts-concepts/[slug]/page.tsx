import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostDataBySlug, PostData } from '@/lib/markdown';
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
import { getReadingsForCard, type Reading } from '@/lib/readings';
import StatusBanner from '@/components/StatusBanner';
import { StsConceptSection } from '@/components/sts-concepts';
import { splitPatternContentSections } from '@/lib/pattern-content-sections';
import ScopedScrollReveal from '@/components/ScopedScrollReveal';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function formatGroupLabel(group?: string) {
  if (!group) return undefined;
  return group
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function PatternHeader({ group, title, excerpt }: { group?: string; title: string; excerpt?: string }) {
  return (
    <header className="border-y border-violet-200 bg-violet-50 px-4 py-16 dark:border-violet-900 dark:bg-violet-950/30 md:px-16">
      {group && (
        <div className="mb-4 text-xs font-semibold uppercase tracking-wide">
          <span className="text-violet-700 dark:text-violet-300">{group}</span>
        </div>
      )}
      <h1 className="m-0! max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-950 dark:text-gray-50">
        {title}
      </h1>
      {excerpt && <p className="mb-0 mt-5 max-w-4xl text-lg leading-8 text-gray-700 dark:text-gray-300">{excerpt}</p>}
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

function splitPatternSubsections(content: string): { intro: string; items: PatternComicStripItem[] } {
  const headingRegex = /<h3[^>]*>([\s\S]*?)<\/h3>/gi;
  const items: PatternComicStripItem[] = [];
  let intro = '';
  let currentLabel = '';
  let currentStart = 0;
  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(content)) !== null) {
    const sectionContent = content.slice(currentStart, match.index).trim();
    if (currentLabel && sectionContent)
      items.push({ id: slugifyForId(currentLabel), label: currentLabel, content: sectionContent });
    else if (!currentLabel && sectionContent) intro = sectionContent;
    currentLabel = getPlainTextFromHtml(match[1]);
    currentStart = match.index + match[0].length;
  }
  const finalContent = content.slice(currentStart).trim();
  if (currentLabel && finalContent)
    items.push({ id: slugifyForId(currentLabel), label: currentLabel, content: finalContent });
  else if (!currentLabel && finalContent) intro = finalContent;
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
    if (currentLabel && caseContent)
      cases.push({ id: slugifyForId(currentLabel), label: currentLabel, content: caseContent });
    currentLabel = getPlainTextFromHtml(match[1]);
    currentStart = match.index + match[0].length;
  }
  const finalContent = content.slice(currentStart).trim();
  if (currentLabel && finalContent)
    cases.push({ id: slugifyForId(currentLabel), label: currentLabel, content: finalContent });
  return cases;
}

function stripDuplicateLeadingHeading(content: string, label: string) {
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const duplicateHeadingRegex = new RegExp(`^\\s*<h2[^>]*>\\s*${escapedLabel}\\s*<\\/h2>\\s*`, 'i');

  return content.replace(duplicateHeadingRegex, '');
}

function stripAnyLeadingSectionHeading(content: string) {
  return content.replace(/^\s*<h2[^>]*>[\s\S]*?<\/h2>\s*/i, '');
}

function PatternContentSection({ section }: { section: { label: string; content: string } }) {
  const contentWithoutMatchingHeading = section.label
    ? stripDuplicateLeadingHeading(section.content, section.label)
    : section.content;
  const cleanedContent = stripAnyLeadingSectionHeading(contentWithoutMatchingHeading);
  const caseTabs = section.label === 'Examples' ? splitPatternCaseTabs(cleanedContent) : [];
  const stepGrid = section.label === 'What To Notice' ? splitPatternSubsections(cleanedContent) : null;
  if (stepGrid && stepGrid.items.length > 0) return <PatternComicStrip intro={stepGrid.intro} items={stepGrid.items} />;
  if (caseTabs.length > 0) return <PatternCaseTabs cases={caseTabs} />;
  return <MarkdownContent content={cleanedContent} />;
}

function FieldGuideReturnSection() {
  return (
    <section className="rounded-2xl border border-violet-200 bg-violet-50/70 p-6 dark:border-violet-900 dark:bg-violet-950/20">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
        Field Guide
      </p>
      <h2 className="m-0 text-2xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">Browse STS Concepts</h2>
      <p className="mb-0 mt-3 max-w-3xl text-sm leading-6 text-gray-700 dark:text-gray-300">
        Return to the full list of STS concepts.
      </p>
      <Link
        href="/field-guide/sts-concepts"
        className="mt-5 inline-flex items-center rounded-full bg-violet-700 px-4 py-2 text-sm font-semibold text-white no-underline hover:bg-violet-800 dark:bg-violet-500 dark:hover:bg-violet-400"
      >
        Back to STS Concepts
      </Link>
    </section>
  );
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const posts = getAllPosts('sts-concepts').filter(
    p => p.card_type === 'concept' && p.slug && !p.excluded && p.no_render !== 1
  );
  return posts.map(p => ({ slug: p.slug as string }));
}

export default async function STSConceptPage({ params }: PageProps) {
  const { slug } = await params;
  try {
    const postData = await getPostDataBySlug(slug, 'sts-concepts');
    const relatedTopics = getRelatedTopicsForPattern(postData.id);
    const relatedTaggedContent = getRelatedContentForPattern(postData.id);
    const relatedScheduleItems = await getRelatedScheduleItemsForPattern(postData.id);
    const bibliographyReadings = getReadingsForCard(postData.num ?? '');
    const featuredTopics = (postData as PostData & { featured_topics?: string[] }).featured_topics || [];
    const featuredAssignments = (postData as PostData & { featured_assignments?: string[] }).featured_assignments || [];
    const featuredResources = (postData as PostData & { featured_resources?: string[] }).featured_resources || [];
    const resourceItems = relatedTaggedContent.items.filter(item => item.kind === 'resources');
    const combinedScheduleItems = relatedScheduleItems;
    const postWithGuideMetadata = postData as PostData & { field_guide_section_title?: string; group?: string };
    const groupLabel = postWithGuideMetadata.field_guide_section_title || formatGroupLabel(postWithGuideMetadata.group);
    const patternContentSections = splitPatternContentSections(postData.content);
    const enableScrollReveal = slug === 'anticipatory-governance';

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
              contentType="sts-concepts"
            />
            <div className="space-y-4 py-6">
              <Breadcrumbs
                className="px-4 md:px-16"
                items={[
                  { label: 'Field Guide', href: '/field-guide' },
                  { label: 'STS Concepts', href: '/field-guide/sts-concepts' },
                  { label: postData.title },
                ]}
              />
              <PatternHeader title={postData.title} excerpt={postData.excerpt} group={groupLabel} />
            </div>
          </>
        }
      >
        <div className="space-y-8">
          {enableScrollReveal && <ScopedScrollReveal selector=".sts-concept-section--scroll-reveal" />}
          {patternContentSections.map((section, index) => (
            <StsConceptSection
              key={`${section.label || 'intro'}-${index}`}
              label={section.label}
              className={enableScrollReveal ? 'sts-concept-section--scroll-reveal' : undefined}
            >
              <PatternContentSection section={section} />
            </StsConceptSection>
          ))}

          {bibliographyReadings.length > 0 && (
            <StsConceptSection label="Readings">
              <ul className="list-tight">
                {bibliographyReadings.map((reading: Reading) => (
                  <li key={reading.id}>
                    <a href={reading.url} target="_blank" rel="noopener noreferrer">
                      {reading.title}
                    </a>
                    {reading.authors && (
                      <span className="text-sm text-gray-600 dark:text-gray-400"> — {reading.authors}</span>
                    )}
                    {reading.notes && (
                      <p className="mb-0 mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">{reading.notes}</p>
                    )}
                  </li>
                ))}
              </ul>
            </StsConceptSection>
          )}

          <StsConceptSection label="Related Course Topics">
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
          </StsConceptSection>

          <StsConceptSection label="Related Labs & Activities">
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
          </StsConceptSection>

          <StsConceptSection label="Related Resources & Articles">
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
                No tagged resources or articles are connected yet.
              </p>
            )}
          </StsConceptSection>

          <FieldGuideReturnSection />
        </div>
      </ContentLayout>
    );
  } catch {
    notFound();
  }
}
