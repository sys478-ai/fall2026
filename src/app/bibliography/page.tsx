import PageHeader from '@/components/PageHeader';
import ContentLayout from '@/components/ContentLayout';
import QuickLinksNav from '@/components/QuickLinksNav';
import BibliographyListClient from '@/components/bibliography/BibliographyListClient';
import {
  getResourceLinks,
  getResourceLinksConfig,
} from '@/lib/resource-links';

export default function BibliographyPage() {
  const { tagGroups } = getResourceLinksConfig();
  const links = getResourceLinks();

  return (
    <ContentLayout variant="list" leftNav={<QuickLinksNav />}>
      <div className="space-y-6">
        <PageHeader
          title="Bibliography"
          excerpt="Curated readings, articles, and reference links for the course."
        />

        <BibliographyListClient links={links} tagGroups={tagGroups} />
      </div>
    </ContentLayout>
  );
}
