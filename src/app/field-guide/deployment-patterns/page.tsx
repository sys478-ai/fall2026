import type { Metadata } from 'next';
import FieldGuideSectionLayout from '@/components/FieldGuideSectionLayout';
import RecognitionPatternCards from '@/components/RecognitionPatternCards';
import { FieldGuideViewProvider, FieldGuideCardSection, FieldGuideCompactSection } from '@/components/FieldGuideView';
import { getAllPosts, type PostData } from '@/lib/markdown';
import { normalizeFeaturedImagePath, getDarkFeaturedImagePath } from '@/lib/featured-image';

interface TaxonomyEntry {
  slug?: string;
  num?: string;
  title: string;
  subtitle?: string;
  shortDescription?: string;
  featured_image?: string;
  featured_image_dark?: string;
  field_guide_section?: string;
  field_guide_section_title?: string;
  field_guide_section_intro?: string;
  field_guide_section_order?: number;
  field_guide_group?: string;
  field_guide_group_title?: string;
  field_guide_group_intro?: string;
  field_guide_group_order?: number;
  field_guide_order?: number;
  field_guide_display_title?: string;
  field_guide_merge_key?: string;
  field_guide_merge_title?: string;
  field_guide_merge_subtitle?: string;
  field_guide_merge_description?: string;
  card_type?: string;
  order?: number;
}

interface GuideSection {
  title: string;
  intro: string;
  items: TaxonomyEntry[];
}

function getPatternsWithMarkdownMetadata(): TaxonomyEntry[] {
  return getAllPosts('ai-deployment-patterns')
    .filter(post => !post.hide_from_list && !post.no_render && post.card_type === 'recognition')
    .map((post: PostData) => ({
      slug: post.slug ? `deployment-patterns/${post.slug}` : undefined,
      num: post.num,
      title: post.field_guide_display_title || post.title,
      subtitle: post.excerpt,
      shortDescription: post.description,
      order: post.order ?? post.field_guide_order,
      featured_image: normalizeFeaturedImagePath(post.featured_image),
      featured_image_dark: getDarkFeaturedImagePath(post.featured_image),
      field_guide_section: post.field_guide_section,
      field_guide_section_title: post.field_guide_section_title,
      field_guide_section_intro: post.field_guide_section_intro,
      field_guide_section_order: post.field_guide_section_order,
      field_guide_group: post.field_guide_group,
      field_guide_group_title: post.field_guide_group_title,
      field_guide_group_intro: post.field_guide_group_intro,
      field_guide_group_order: post.field_guide_group_order,
      field_guide_order: post.field_guide_order,
      field_guide_display_title: post.field_guide_display_title,
      field_guide_merge_key: post.field_guide_merge_key,
      field_guide_merge_title: post.field_guide_merge_title,
      field_guide_merge_subtitle: post.field_guide_merge_subtitle,
      field_guide_merge_description: post.field_guide_merge_description,
      card_type: post.card_type,
    }));
}

function getFieldGuideSections(patterns: TaxonomyEntry[]): GuideSection[] {
  const sectionsByKey = new Map<string, { title: string; intro: string; order: number; items: TaxonomyEntry[] }>();

  patterns.forEach(pattern => {
    const { field_guide_group: key, field_guide_group_title: title, field_guide_group_intro: intro, field_guide_group_order: order } = pattern;
    if (!key || !title || !intro || typeof order !== 'number') return;
    if (!sectionsByKey.get(key)) sectionsByKey.set(key, { title, intro, order, items: [] });
    sectionsByKey.get(key)?.items.push(pattern);
  });

  return Array.from(sectionsByKey.entries())
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([, section]) => {
      const groupedItems = new Map<string, TaxonomyEntry[]>();
      const unmergedItems: TaxonomyEntry[] = [];

      section.items
        .sort((a, b) => (parseInt(a.num ?? '') || 999) - (parseInt(b.num ?? '') || 999))
        .forEach(item => {
          if (item.field_guide_merge_key) {
            const existing = groupedItems.get(item.field_guide_merge_key) || [];
            existing.push(item);
            groupedItems.set(item.field_guide_merge_key, existing);
          } else {
            unmergedItems.push(item);
          }
        });

      const mergedItems: TaxonomyEntry[] = Array.from(groupedItems.values()).map(items => {
        const base = items.sort((a, b) => (parseInt(a.num ?? '') || 999) - (parseInt(b.num ?? '') || 999))[0];
        const nums = items
          .map(item => item.num)
          .filter((n): n is string => Boolean(n))
          .sort((a, b) => Number(a) - Number(b));
        const mergedNum = nums.length > 1 && nums[0] !== nums[nums.length - 1]
          ? `${nums[0]}-${nums[nums.length - 1]}`
          : nums[0];
        return {
          num: mergedNum,
          title: base.field_guide_merge_title || base.title,
          subtitle: base.field_guide_merge_subtitle || base.subtitle,
          shortDescription: base.field_guide_merge_description || base.shortDescription,
          order: base.order ?? base.field_guide_order,
          featured_image: base.featured_image,
          featured_image_dark: base.featured_image_dark,
          field_guide_order: base.field_guide_order,
        };
      });

      return {
        title: section.title,
        intro: section.intro,
        items: [...unmergedItems, ...mergedItems].sort(
          (a, b) => (parseInt(a.num ?? '') || 999) - (parseInt(b.num ?? '') || 999)
        ),
      };
    });
}

export const metadata: Metadata = {
  title: 'AI Deployment Patterns — AI Field Guide',
  description: 'Recurring patterns in how AI systems are deployed in the world.',
};

export default function DeploymentPatternsPage() {
  const patterns = getPatternsWithMarkdownMetadata();
  const sections = getFieldGuideSections(patterns);

  return (
    <FieldGuideSectionLayout contentDir="ai-deployment-patterns">
      {(columns) => (
        <div>
          <FieldGuideViewProvider>
            {sections.map(section => (
              <div key={section.title}>
                <FieldGuideCardSection>
                  <section className="space-y-5 border-t border-gray-200 px-4 pt-8 dark:border-gray-800 md:px-16">
                    <div className="space-y-3">
                      <h2 className="m-0 text-5xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">
                        {section.title}
                      </h2>
                      <p className="mb-0 max-w-5xl text-base leading-7 text-gray-700 dark:text-gray-300">{section.intro}</p>
                    </div>
                    <RecognitionPatternCards patterns={section.items} badgeLabel="Pattern" preserveOrder columns={columns} />
                  </section>
                </FieldGuideCardSection>
                <FieldGuideCompactSection
                  label={section.title}
                  description={section.intro}
                  cards={section.items.map(item => ({
                    title: item.title,
                    subtitle: item.subtitle,
                    href: item.slug ? `/field-guide/${item.slug}` : undefined,
                  }))}
                />
              </div>
            ))}
          </FieldGuideViewProvider>
        </div>
      )}
    </FieldGuideSectionLayout>
  );
}
