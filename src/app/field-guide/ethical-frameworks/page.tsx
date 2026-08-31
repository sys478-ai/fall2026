import type { Metadata } from 'next';
import FieldGuideSectionLayout from '@/components/FieldGuideSectionLayout';
import FieldGuideCardPreview from '@/components/FieldGuideCardPreview';
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
        <section className="space-y-5 border-t border-gray-200 px-4 pt-8 dark:border-gray-800 md:px-16">
          <FieldGuideCardPreview
            items={cards}
            badgeLabel="Ethical Framework"
            linkBasePath="/field-guide/ethical-frameworks"
            moreLinkLabel="More theories of ethics"
            banner={banner}
            sheetTitleId="ethical-framework-list-sheet-title"
          />
        </section>
      )}
    </FieldGuideSectionLayout>
  );
}
