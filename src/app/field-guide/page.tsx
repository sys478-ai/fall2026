import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import ContentLayout from '@/components/ContentLayout';
import RecognitionPatternCards from '@/components/RecognitionPatternCards';
import { getAllPosts, type PostData } from '@/lib/markdown';

interface TaxonomyEntry {
  slug?: string;
  title: string;
  subtitle?: string;
  shortDescription?: string;
  group?: string;
  order?: number;
  relatedThemes?: string[];
  featured_image?: string;
  featured_image_dark?: string;
  field_guide_section?: string;
  field_guide_section_title?: string;
  field_guide_section_intro?: string;
  field_guide_section_order?: number;
  field_guide_order?: number;
  field_guide_display_title?: string;
  field_guide_merge_key?: string;
  field_guide_merge_title?: string;
  field_guide_merge_subtitle?: string;
  field_guide_merge_description?: string;
}

interface GuideSection {
  title: string;
  intro: string;
  items: TaxonomyEntry[];
}

const publicDirectory = path.join(process.cwd(), 'public');
const basePath = '/fall2026';

function normalizeFeaturedImagePath(src?: string) {
  if (!src) {
    return undefined;
  }

  if (/^(https?:)?\/\//.test(src) || src.startsWith('data:')) {
    return src;
  }

  return src.startsWith('/') ? src : `/${src}`;
}

function getPublicFilePath(src: string) {
  const pathname = src.split(/[?#]/)[0];
  const publicPathname = pathname.startsWith(`${basePath}/`)
    ? pathname.slice(basePath.length)
    : pathname;
  const filePath = path.join(publicDirectory, publicPathname);
  const relativePath = path.relative(publicDirectory, filePath);

  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    return undefined;
  }

  return filePath;
}

function getDarkFeaturedImagePath(src?: string) {
  const normalizedSrc = normalizeFeaturedImagePath(src);

  if (!normalizedSrc || /^(https?:)?\/\//.test(normalizedSrc) || normalizedSrc.startsWith('data:')) {
    return undefined;
  }

  const [pathname, suffix = ''] = normalizedSrc.split(/([?#].*)/, 2);
  const extension = path.posix.extname(pathname);

  if (!extension) {
    return undefined;
  }

  const darkSrc = `${pathname.slice(0, -extension.length)}.dark${extension}${suffix}`;
  const darkFilePath = getPublicFilePath(darkSrc);

  return darkFilePath && fs.existsSync(darkFilePath) ? darkSrc : undefined;
}

function getPatternsWithMarkdownMetadata(): TaxonomyEntry[] {
  return getAllPosts('ethical-patterns')
    .filter(post => !post.hide_from_list && !post.no_render)
    .map((post: PostData) => ({
      slug: post.id,
      title: post.field_guide_display_title || post.title,
      subtitle: post.excerpt,
      shortDescription: post.description,
      featured_image: normalizeFeaturedImagePath(post.featured_image),
      featured_image_dark: getDarkFeaturedImagePath(post.featured_image),
      field_guide_section: post.field_guide_section,
      field_guide_section_title: post.field_guide_section_title,
      field_guide_section_intro: post.field_guide_section_intro,
      field_guide_section_order: post.field_guide_section_order,
      field_guide_order: post.field_guide_order,
      field_guide_display_title: post.field_guide_display_title,
      field_guide_merge_key: post.field_guide_merge_key,
      field_guide_merge_title: post.field_guide_merge_title,
      field_guide_merge_subtitle: post.field_guide_merge_subtitle,
      field_guide_merge_description: post.field_guide_merge_description,
    }));
}

function getFieldGuideSections(patterns: TaxonomyEntry[]): GuideSection[] {
  const sectionsByKey = new Map<
    string,
    {
      title: string;
      intro: string;
      order: number;
      items: TaxonomyEntry[];
    }
  >();

  patterns.forEach(pattern => {
    const sectionKey = pattern.field_guide_section;
    const sectionTitle = pattern.field_guide_section_title;
    const sectionIntro = pattern.field_guide_section_intro;
    const sectionOrder = pattern.field_guide_section_order;

    if (!sectionKey || !sectionTitle || !sectionIntro || typeof sectionOrder !== 'number') {
      return;
    }

    const existingSection = sectionsByKey.get(sectionKey);
    if (!existingSection) {
      sectionsByKey.set(sectionKey, {
        title: sectionTitle,
        intro: sectionIntro,
        order: sectionOrder,
        items: [],
      });
    }

    sectionsByKey.get(sectionKey)?.items.push(pattern);
  });

  return Array.from(sectionsByKey.entries())
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([, section]) => {
      const groupedItems = new Map<string, TaxonomyEntry[]>();
      const unmergedItems: TaxonomyEntry[] = [];

      section.items
        .sort((a, b) => (a.field_guide_order ?? 999) - (b.field_guide_order ?? 999))
        .forEach(item => {
          if (item.field_guide_merge_key) {
            const items = groupedItems.get(item.field_guide_merge_key) || [];
            items.push(item);
            groupedItems.set(item.field_guide_merge_key, items);
            return;
          }

          unmergedItems.push(item);
        });

      const mergedItems: TaxonomyEntry[] = Array.from(groupedItems.values()).map(items => {
        const base = items.sort((a, b) => (a.field_guide_order ?? 999) - (b.field_guide_order ?? 999))[0];
        return {
          title: base.field_guide_merge_title || base.title,
          subtitle: base.field_guide_merge_subtitle || base.subtitle,
          shortDescription: base.field_guide_merge_description || base.shortDescription,
          featured_image: base.featured_image,
          featured_image_dark: base.featured_image_dark,
          field_guide_order: base.field_guide_order,
        };
      });

      return {
        title: section.title,
        intro: section.intro,
        items: [...unmergedItems, ...mergedItems].sort(
          (a, b) => (a.field_guide_order ?? 999) - (b.field_guide_order ?? 999)
        ),
      };
    });
}

export const metadata: Metadata = {
  title: 'AI in the Wild',
  description: 'A field guide to making sense of AI debates in everyday life.',
};

export default function EthicalPatternRecognitionFieldGuidePage() {
  const patterns = getPatternsWithMarkdownMetadata();
  const sections = getFieldGuideSections(patterns);

  return (
    <ContentLayout
      variant="list"
      fullWidth
      contentPadding={false}
      header={
        <header className="border-y border-violet-200 bg-violet-50 px-4 py-16 dark:border-violet-900 dark:bg-violet-950/30 md:px-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
            Field Guide
          </p>
          <h1 className="m-0! max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-950 dark:text-gray-50">
            AI in the Wild: A Field Guide to Making Sense of AI Debates in Everyday Life
          </h1>
          <p className="mb-0 mt-5 max-w-4xl text-lg leading-8 text-gray-700 dark:text-gray-300">
            Practical tools for noticing patterns, asking better questions, and making sense of how AI shows up in
            everyday systems, institutions, and public debates.
          </p>
        </header>
      }
    >
      <div className="space-y-12">
        <section className="max-w-6xl px-4 md:px-16">
          <p className="mb-0 text-base leading-8 text-gray-700 dark:text-gray-300">
            This field guide is here to help you think more clearly about AI as you encounter it in the world. Each
            section offers a different way of seeing: how systems are built, what they do, how they shape power and
            public life, and how we can respond. The goal is not to give you one fixed opinion about AI, but to give
            you practical tools for noticing patterns, asking better questions, and making sense of the claims,
            controversies, and tradeoffs that surround AI in everyday life.
          </p>
        </section>
        {sections.map(section => (
          <section
            key={section.title}
            className="space-y-5 border-t border-gray-200 px-4 pt-8 dark:border-gray-800 md:px-16"
          >
            <div className="space-y-3">
              <h2 className="m-0 text-5xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">
                {section.title}
              </h2>
              <p className="mb-0 max-w-5xl text-base leading-7 text-gray-700 dark:text-gray-300">{section.intro}</p>
            </div>
            <RecognitionPatternCards patterns={section.items} badgeLabel="Lens" preserveOrder />
          </section>
        ))}
      </div>
    </ContentLayout>
  );
}
