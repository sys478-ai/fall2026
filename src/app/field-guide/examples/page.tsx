import type { Metadata } from 'next';
import FieldGuideSectionLayout from '@/components/FieldGuideSectionLayout';
import FieldGuidePreviewIndex from '@/components/FieldGuidePreviewIndex';
import { getFieldGuidePreviewItems } from '@/lib/field-guide-preview';
import { getFieldGuideBannerClasses } from '@/lib/field-guide-palettes';

export const metadata: Metadata = {
  title: 'Example Cards – AI Field Guide',
  description: 'Real situations where AI patterns appear.',
};

export default async function ExampleCardsPage() {
  const cards = await getFieldGuidePreviewItems('examples', null);
  const banner = getFieldGuideBannerClasses('examples');

  return (
    <FieldGuideSectionLayout contentDir="examples">
      {() => (
        <FieldGuidePreviewIndex
          sections={[{ key: 'all', items: cards }]}
          badgeLabel="Example"
          linkBasePath="/field-guide/examples"
          moreLinkLabel="More examples"
          banner={banner}
          sheetTitleIdPrefix="example-list-sheet"
        />
      )}
    </FieldGuideSectionLayout>
  );
}
