import type { Metadata } from 'next';
import taxonomyData from '../../../content/config/taxonomy.json';
import ContentLayout from '@/components/ContentLayout';
import PageHeader from '@/components/PageHeader';
import RecognitionPatternCards from '@/components/RecognitionPatternCards';

interface TaxonomyEntry {
  slug?: string;
  title: string;
  shortDescription?: string;
  group?: string;
  order?: number;
  relatedThemes?: string[];
}

interface TaxonomyData {
  ethicalPatterns: TaxonomyEntry[];
}

const taxonomy = taxonomyData as TaxonomyData;

export const metadata: Metadata = {
  title: 'Ethical Pattern Recognition Field Guide',
  description: 'A field guide to recurring ethical recognition patterns across AI systems, labs, and governance cases.',
};

export default function EthicalPatternRecognitionFieldGuidePage() {
  return (
    <ContentLayout variant="list" fullWidth>
      <div className="space-y-7">
        <PageHeader
          title="Ethical Pattern Recognition Field Guide"
          excerpt="A standalone reference for the recurring patterns students can practice noticing across technical systems, social consequences, and governance debates."
        />

        <section className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-900 dark:bg-blue-950">
          <p className="m-0 text-sm text-gray-800 dark:text-gray-200">
            Use these patterns as reusable prompts for discussion, writing, labs, and project framing. They are meant to travel across cases rather than belong to only one unit.
          </p>
        </section>

        <RecognitionPatternCards patterns={taxonomy.ethicalPatterns} />
      </div>
    </ContentLayout>
  );
}
