import type { Metadata } from 'next';
import FieldGuideSectionLayout from '@/components/FieldGuideSectionLayout';
import FieldGuideFlipCards from '@/components/FieldGuideFlipCards';
import { FieldGuideViewProvider, FieldGuideCardSection, FieldGuideCompactSection } from '@/components/FieldGuideView';
import { getAllPosts, type PostData } from '@/lib/markdown';
import { normalizeFeaturedImagePath, getDarkFeaturedImagePath } from '@/lib/featured-image';

interface ConceptEntry {
  slug?: string;
  num?: string;
  title: string;
  subtitle?: string;
  card_type?: string;
  order?: number;
  field_guide_order?: number;
  field_guide_group?: string;
  field_guide_group_title?: string;
  field_guide_group_intro?: string;
  field_guide_group_order?: number;
  featured_image?: string;
  featured_image_dark?: string;
  iconClass?: string;
}

interface GuideSection {
  title: string;
  intro: string;
  items: ConceptEntry[];
}

const STS_CONCEPT_ICONS: Record<string, string> = {
  'sts-data-production': 'fa-solid fa-database',
  'sts-classification-produces-world': 'fa-solid fa-sitemap',
  'sts-features-as-values': 'fa-solid fa-sliders',
  'sts-situated-knowledge': 'fa-solid fa-location-dot',
  'sts-framing-shapes-governance': 'fa-solid fa-quote-left',
  'sts-sociotechnical': 'fa-solid fa-users-gear',
  'sts-materiality': 'fa-solid fa-mountain-sun',
  'sts-systems-are-reactive': 'fa-solid fa-arrows-rotate',
  'sts-sociotechnical-imaginaries': 'fa-solid fa-masks-theater',
  'sts-path-dependency': 'fa-solid fa-road',
  'sts-governance': 'fa-solid fa-gavel',
  'sts-knowledge-and-power': 'fa-solid fa-key',
  'sts-normal-is-constructed': 'fa-solid fa-ruler-horizontal',
};

function getConceptCards(): ConceptEntry[] {
  return getAllPosts('sts-concepts')
    .filter(post => !post.hide_from_list && !post.no_render && post.card_type === 'concept')
    .map((post: PostData) => ({
      slug: post.slug ? `sts-concepts/${post.slug}` : post.id,
      num: post.num,
      title: post.title,
      subtitle: post.excerpt,
      card_type: post.card_type,
      order: post.field_guide_order ?? post.order,
      field_guide_order: post.field_guide_order,
      field_guide_group: post.field_guide_group,
      field_guide_group_title: post.field_guide_group_title,
      field_guide_group_intro: post.field_guide_group_intro,
      field_guide_group_order: post.field_guide_group_order,
      featured_image: normalizeFeaturedImagePath(post.featured_image),
      featured_image_dark: getDarkFeaturedImagePath(post.featured_image),
      iconClass: STS_CONCEPT_ICONS[post.id] ?? 'fa-solid fa-lightbulb',
    }));
}

function getGroupedSections(cards: ConceptEntry[]): GuideSection[] {
  const sectionsByKey = new Map<string, { title: string; intro: string; order: number; items: ConceptEntry[] }>();

  cards.forEach(card => {
    const { field_guide_group: key, field_guide_group_title: title, field_guide_group_intro: intro, field_guide_group_order: order } = card;
    if (!key || !title || !intro || typeof order !== 'number') return;
    if (!sectionsByKey.get(key)) sectionsByKey.set(key, { title, intro, order, items: [] });
    sectionsByKey.get(key)?.items.push(card);
  });

  return Array.from(sectionsByKey.entries())
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([, section]) => ({
      title: section.title,
      intro: section.intro,
      items: section.items.sort((a, b) => (a.field_guide_order ?? 999) - (b.field_guide_order ?? 999)),
    }));
}

export const metadata: Metadata = {
  title: 'STS Concepts — AI Field Guide',
  description: 'The STS frameworks and theoretical foundations underlying the field guide recognition patterns.',
};

export default function STSConceptsPage() {
  const cards = getConceptCards();
  const sections = getGroupedSections(cards);

  return (
    <FieldGuideSectionLayout contentDir="sts-concepts">
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
                    <FieldGuideFlipCards
                      items={section.items}
                      preserveOrder
                      columns={columns}
                      palette="sts"
                      badgeLabel="Concept"
                      linkLabel="Open concept →"
                      iconClass="fa-solid fa-lightbulb"
                    />
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
