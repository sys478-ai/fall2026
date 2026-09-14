import type { Metadata } from 'next';
import FieldGuideSectionLayout from '@/components/FieldGuideSectionLayout';
import FieldGuidePreviewIndex from '@/components/FieldGuidePreviewIndex';
import { getAIHistoryTimelineEntries } from '@/lib/ai-history-timeline';
import { getFieldGuidePreviewItems } from '@/lib/field-guide-preview';
import { getFieldGuideBannerClasses } from '@/lib/field-guide-palettes';

export const metadata: Metadata = {
  title: 'Technical Explainers – AI Field Guide',
  description: 'Enough technical understanding to ask better critical questions.',
};

export default async function TechnicalExplainersPage() {
  const cards = await getFieldGuidePreviewItems('technical-explainers', 'technical-explainer');
  const banner = getFieldGuideBannerClasses('technical-explainers');
  const aiHistoryEntries = cards.some(card => card.sheetEmbed === 'ai-history')
    ? await getAIHistoryTimelineEntries()
    : [];

  return (
    <FieldGuideSectionLayout contentDir="technical-explainers">
      {() => (
        <FieldGuidePreviewIndex
          sections={[{ key: 'all', items: cards }]}
          badgeLabel="Technical Explainer"
          linkBasePath="/field-guide/technical-explainers"
          moreLinkLabel="More technical explainers"
          banner={banner}
          sheetTitleIdPrefix="technical-explainer-list-sheet"
          aiHistoryEntries={aiHistoryEntries}
        />
      )}
    </FieldGuideSectionLayout>
  );
}
