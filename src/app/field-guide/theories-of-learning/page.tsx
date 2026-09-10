import type { Metadata } from 'next';
import FieldGuideSectionLayout from '@/components/FieldGuideSectionLayout';
import FieldGuidePreviewIndex from '@/components/FieldGuidePreviewIndex';
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
        <FieldGuidePreviewIndex
          sections={[{ key: 'all', items: cards }]}
          badgeLabel="Theory of Learning"
          linkBasePath="/field-guide/theories-of-learning"
          moreLinkLabel="More theories of learning"
          banner={banner}
          sheetTitleIdPrefix="learning-theory-list-sheet"
        />
      )}
    </FieldGuideSectionLayout>
  );
}
