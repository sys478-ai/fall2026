import ContentLayout from '@/components/ContentLayout';
import QuickLinksNav from '@/components/QuickLinksNav';
import TopLevelPageHeader from '@/components/TopLevelPageHeader';
import BibliographyListClient from '@/components/bibliography/BibliographyListClient';
import {
  getResourceLinks,
  getResourceLinksConfig,
} from '@/lib/resource-links';

export default function BibliographyPage() {
  const { tagGroups } = getResourceLinksConfig();
  const links = getResourceLinks();

  return (
    <ContentLayout
      variant="list"
      leftNav={<QuickLinksNav />}
      header={
        <TopLevelPageHeader
          label="Bibliography"
          title="Bibliography"
          description="Curated readings, articles, and reference links for the course."
          tone="slate"
        />
      }
    >
      <div className="space-y-6">
        <BibliographyListClient links={links} tagGroups={tagGroups} />
      </div>
    </ContentLayout>
  );
}
