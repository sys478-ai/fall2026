import type { Metadata } from 'next';
import FieldGuideSectionLayout from '@/components/FieldGuideSectionLayout';
import ExamplesFilterIndex from '@/components/ExamplesFilterIndex';
import { getExampleFilterData } from '@/lib/examples';
import { getFieldGuidePreviewItems } from '@/lib/field-guide-preview';
import { getFieldGuideBannerClasses } from '@/lib/field-guide-palettes';

export const metadata: Metadata = {
  title: 'Example Cards – AI Field Guide',
  description: 'Real situations where AI patterns appear.',
};

export default async function ExampleCardsPage() {
  const cards = await getFieldGuidePreviewItems('examples', null);
  const { sectorOptions, familyOptions } = getExampleFilterData();
  const banner = getFieldGuideBannerClasses('examples');

  return (
    <FieldGuideSectionLayout contentDir="examples">
      {() => (
        <ExamplesFilterIndex
          items={cards}
          sectorOptions={sectorOptions}
          familyOptions={familyOptions}
          banner={banner}
        />
      )}
    </FieldGuideSectionLayout>
  );
}
