import type { Metadata } from 'next';
import FieldGuideSectionLayout from '@/components/FieldGuideSectionLayout';
import FieldGuidePreviewIndex from '@/components/FieldGuidePreviewIndex';
import { getFieldGuidePreviewSections } from '@/lib/field-guide-preview';
import { getFieldGuideBannerClasses } from '@/lib/field-guide-palettes';

export const metadata: Metadata = {
  title: 'AI Deployment Patterns – AI Field Guide',
  description: 'Recurring patterns in how AI systems are deployed in the world.',
};

export default async function DeploymentPatternsPage() {
  const sections = await getFieldGuidePreviewSections('ai-deployment-patterns', 'recognition');
  const banner = getFieldGuideBannerClasses('ai-deployment-patterns');

  return (
    <FieldGuideSectionLayout contentDir="ai-deployment-patterns">
      {() => (
        <FieldGuidePreviewIndex
          sections={sections}
          badgeLabel="Pattern"
          linkBasePath="/field-guide/deployment-patterns"
          moreLinkLabel="More deployment patterns"
          banner={banner}
          sheetTitleIdPrefix="deployment-pattern-sheet"
        />
      )}
    </FieldGuideSectionLayout>
  );
}
