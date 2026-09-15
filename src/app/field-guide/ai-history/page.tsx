import type { Metadata } from 'next';
import ContentLayout from '@/components/ContentLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIHistoryTimeline from '@/components/AIHistoryTimeline';
import { getAIHistoryTimelineEntries } from '@/lib/ai-history-timeline';

export const metadata: Metadata = {
  title: 'History of AI – AI Field Guide',
  description:
    'An interactive timeline of AI from Turing to today, linking key moments to field guide recognition cards.',
};

export default async function AIHistoryPage() {
  const entries = await getAIHistoryTimelineEntries();

  return (
    <ContentLayout
      variant="list"
      fullWidth
      contentPadding={false}
      header={
        <header className="border-y border-violet-200 bg-violet-50 px-4 py-16 dark:border-violet-900 dark:bg-violet-950/30 md:px-16">
          <Breadcrumbs
            className="mb-6"
            items={[
              { label: 'Field Guide', href: '/field-guide' },
              { label: 'Technical Explainers', href: '/field-guide/technical-explainers' },
              { label: 'History of AI' },
            ]}
          />
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
            Field Guide
          </p>
          <h1 className="m-0! max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-950 dark:text-gray-50">
            History of AI
          </h1>
          <p className="mb-0 mt-5 max-w-4xl text-lg leading-6 text-gray-700 dark:text-gray-300">
            Key moments in AI history. Case study entries open full example cards.
          </p>
        </header>
      }
    >
      <div className="px-4 py-12 md:px-16">
        <div className="max-w-4xl">
          <AIHistoryTimeline entries={entries} />
        </div>
      </div>
    </ContentLayout>
  );
}
