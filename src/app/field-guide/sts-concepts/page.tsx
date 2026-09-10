import type { Metadata } from 'next';
import FieldGuideSectionLayout from '@/components/FieldGuideSectionLayout';
import FieldGuidePreviewIndex from '@/components/FieldGuidePreviewIndex';
import { getFieldGuidePreviewSections } from '@/lib/field-guide-preview';
import { getFieldGuideBannerClasses } from '@/lib/field-guide-palettes';

export const metadata: Metadata = {
  title: 'STS Concepts – AI Field Guide',
  description: 'The STS frameworks and theoretical foundations underlying the field guide recognition patterns.',
};

export default async function STSConceptsPage() {
  const sections = await getFieldGuidePreviewSections('sts-concepts', 'concept');
  const banner = getFieldGuideBannerClasses('sts-concepts');

  return (
    <FieldGuideSectionLayout contentDir="sts-concepts">
      {() => (
        <FieldGuidePreviewIndex
          sections={sections}
          badgeLabel="Concept"
          linkBasePath="/field-guide/sts-concepts"
          moreLinkLabel="More STS concepts"
          banner={banner}
          sheetTitleIdPrefix="sts-concept-sheet"
        />
      )}
    </FieldGuideSectionLayout>
  );
}
