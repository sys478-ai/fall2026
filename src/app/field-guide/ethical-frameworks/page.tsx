import type { Metadata } from 'next';
import FieldGuideSectionLayout from '@/components/FieldGuideSectionLayout';
import FieldGuidePreviewIndex from '@/components/FieldGuidePreviewIndex';
import { getFieldGuidePreviewItems } from '@/lib/field-guide-preview';
import { getFieldGuideBannerClasses } from '@/lib/field-guide-palettes';

export const metadata: Metadata = {
  title: 'Ethical Frameworks – AI Field Guide',
  description: "Tools for evaluating what you've found. Use these to move from analysis to judgment.",
};

export default async function EthicalFrameworksPage() {
  const cards = await getFieldGuidePreviewItems('ethical-frameworks', 'ethical-framework');
  const banner = getFieldGuideBannerClasses('ethical-frameworks');

  return (
    <FieldGuideSectionLayout contentDir="ethical-frameworks">
      {() => (
        <FieldGuidePreviewIndex
          sections={[{ key: 'all', items: cards }]}
          badgeLabel="Ethical Framework"
          linkBasePath="/field-guide/ethical-frameworks"
          moreLinkLabel="More theories of ethics"
          banner={banner}
          sheetTitleIdPrefix="ethical-framework-list-sheet"
        />
      )}
    </FieldGuideSectionLayout>
  );
}
