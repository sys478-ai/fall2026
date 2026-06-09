import type { Metadata } from 'next';
import Link from 'next/link';
import ContentLayout from '@/components/ContentLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllPosts, type PostData } from '@/lib/markdown';

export const metadata: Metadata = {
  title: 'History of AI — AI Field Guide',
  description:
    'An interactive timeline of AI from Turing to today, linking key moments to field guide recognition cards.',
};

interface TimelineCard {
  label: string;
  href?: string;
}

interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  contested?: string;
  cards: TimelineCard[];
  exampleSlug?: string;
}

type PostWithExtras = PostData & {
  year?: string | number;
  contested?: string;
  timeline_cards?: TimelineCard[];
  show_in_timeline?: boolean;
};

function getTimelineEntries(): TimelineEntry[] {
  const toEntry = (post: PostData, exampleSlug?: string): TimelineEntry => {
    const p = post as PostWithExtras;
    return {
      year: String(p.year ?? ''),
      title: p.title,
      description: String(p.excerpt ?? ''),
      contested: p.contested,
      cards: p.timeline_cards ?? [],
      exampleSlug,
    };
  };

  const historyPosts = getAllPosts('ai-history').filter(p => !p.hide_from_list);
  const examplePosts = getAllPosts('examples').filter(p => !!(p as PostWithExtras).show_in_timeline);

  return [...historyPosts.map(p => toEntry(p)), ...examplePosts.map(p => toEntry(p, p.id))].sort(
    (a, b) => parseInt(a.year, 10) - parseInt(b.year, 10)
  );
}

function CardChip({ card }: { card: TimelineCard }) {
  const base = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium no-underline transition-colors';
  if (card.href) {
    return (
      <Link
        href={card.href}
        className={`${base} bg-violet-100 text-violet-800 hover:bg-violet-200 dark:bg-violet-900/50 dark:text-violet-200 dark:hover:bg-violet-800/60`}
      >
        {card.label}
      </Link>
    );
  }
  return <span className={`${base} bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500`}>{card.label}</span>;
}

export default function AIHistoryPage() {
  const entries = getTimelineEntries();

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
          <p className="mb-0 mt-5 max-w-4xl text-lg leading-8 text-gray-700 dark:text-gray-300">
            Key moments in AI history, linked to field guide recognition cards. Purple chips link to published cards;
            gray chips are connections to cards not yet published. Case study entries link to full example cards.
          </p>
        </header>
      }
    >
      <div className="px-4 py-12 md:px-16">
        <div className="max-w-4xl">
          <div className="relative border-l-2 border-violet-200 pl-8 dark:border-violet-900">
            {entries.map((entry, i) => (
              <div key={i} className="relative pb-12 last:pb-0">
                <div
                  className="absolute left-[-41px] flex h-5 w-5 items-center justify-center rounded-full border-2 border-violet-400 bg-violet-100 dark:border-violet-600 dark:bg-violet-900"
                  aria-hidden="true"
                >
                  {entry.contested && <span className="h-1.5 w-1.5 rounded-full bg-violet-400 dark:bg-violet-500" />}
                </div>
                <div className="mb-1 text-sm font-bold text-violet-700 dark:text-violet-300">{entry.year}</div>
                <h2 className="m-0! mb-2 text-xl font-semibold leading-snug text-gray-950 dark:text-gray-50">
                  {entry.title}
                </h2>
                <p className="mb-3 text-base leading-7 text-gray-700 dark:text-gray-300">{entry.description}</p>
                {entry.exampleSlug && (
                  <div className="mt-4">
                    <Link
                      href={`/field-guide/examples/${entry.exampleSlug}`}
                      className="group/example inline-flex items-center gap-2 rounded-md border border-violet-200 bg-violet-50/60 px-3.5 py-2 text-sm font-semibold text-violet-800 no-underline transition-colors hover:border-violet-300 hover:bg-violet-100 dark:border-violet-800/70 dark:bg-violet-950/25 dark:text-violet-200 dark:hover:border-violet-700 dark:hover:bg-violet-900/35"
                    >
                      <span>View Full Example</span>
                      <span
                        aria-hidden="true"
                        className="text-base leading-none transition-transform group-hover/example:translate-x-0.5"
                      >
                        →
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
