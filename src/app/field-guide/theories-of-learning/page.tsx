import type { Metadata } from 'next';
import FieldGuideSectionLayout from '@/components/FieldGuideSectionLayout';
import FieldGuideCardPreview from '@/components/FieldGuideCardPreview';
import { getFieldGuidePreviewItems } from '@/lib/field-guide-preview';
import { getFieldGuideBannerClasses } from '@/lib/field-guide-palettes';

export const metadata: Metadata = {
  title: 'Theories of Learning – AI Field Guide',
  description:
    'How humans actually learn, across biological, psychological, sociocultural, and sociopolitical lenses – a reference for testing what AI systems mean when they say they "learn."',
};

export default async function TheoriesOfLearningPage() {
  const cards = await getFieldGuidePreviewItems('theories-of-learning', 'learning-theory');
  const banner = getFieldGuideBannerClasses('theories-of-learning');

  return (
    <FieldGuideSectionLayout contentDir="theories-of-learning">
      {() => (
        <section className="space-y-5 border-t border-gray-200 px-4 pt-8 dark:border-gray-800 md:px-16">
          <FieldGuideCardPreview
            items={cards}
            badgeLabel="Theory of Learning"
            linkBasePath="/field-guide/theories-of-learning"
            moreLinkLabel="More theories of learning"
            banner={banner}
            sheetTitleId="learning-theory-list-sheet-title"
          />
        </section>
      )}
    </FieldGuideSectionLayout>
  );
}
