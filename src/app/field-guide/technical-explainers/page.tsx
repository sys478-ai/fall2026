import type { Metadata } from 'next';
import Link from 'next/link';
import FieldGuideSectionLayout from '@/components/FieldGuideSectionLayout';
import FieldGuideCardPreview from '@/components/FieldGuideCardPreview';
import { getFieldGuidePreviewItems } from '@/lib/field-guide-preview';
import { getFieldGuideBannerClasses } from '@/lib/field-guide-palettes';

export const metadata: Metadata = {
  title: 'Technical Explainers – AI Field Guide',
  description: 'Enough technical understanding to ask better critical questions.',
};

export default async function TechnicalExplainersPage() {
  const cards = await getFieldGuidePreviewItems('technical-explainers', 'technical-explainer');
  const banner = getFieldGuideBannerClasses('technical-explainers');

  return (
    <FieldGuideSectionLayout contentDir="technical-explainers">
      {() => (
        <section className="space-y-5 border-t border-gray-200 px-4 pt-8 dark:border-gray-800 md:px-16">
          <FieldGuideCardPreview
            items={cards}
            badgeLabel="Technical Explainer"
            linkBasePath="/field-guide/technical-explainers"
            moreLinkLabel="More technical explainers"
            banner={banner}
            sheetTitleId="technical-explainer-list-sheet-title"
          />
          <p className="mb-0 border-t border-gray-200 pt-6 text-sm dark:border-gray-800">
            <Link href="/field-guide/ai-history" className={`font-semibold ${banner.moreLink}`}>
              History of AI timeline →
            </Link>
          </p>
        </section>
      )}
    </FieldGuideSectionLayout>
  );
}
