import Link from 'next/link';
import type { AIHistoryTimelineCard, AIHistoryTimelineEntry } from '@/lib/ai-history-timeline';

function CardChip({ card }: { card: AIHistoryTimelineCard }) {
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

export default function AIHistoryTimeline({
  entries,
  className = '',
  showIntro = false,
}: {
  entries: AIHistoryTimelineEntry[];
  className?: string;
  showIntro?: boolean;
}) {
  return (
    <div className={className}>
      {showIntro && (
        <p className="mb-8 text-base leading-7 text-gray-700 dark:text-gray-300">
          Key moments in AI history, linked to field guide recognition cards. Purple chips link to published cards; gray
          chips are connections to cards not yet published. Case study entries link to full example cards.
        </p>
      )}
      <div className="relative border-l-2 border-violet-200 pl-8 dark:border-violet-900">
        {entries.map((entry, i) => (
          <div key={`${entry.year}-${entry.title}-${i}`} className="relative pb-12 last:pb-0">
            <div
              className="absolute left-[-41px] flex h-5 w-5 items-center justify-center rounded-full border-2 border-violet-400 bg-violet-100 dark:border-violet-600 dark:bg-violet-900"
              aria-hidden="true"
            >
              {entry.contested && <span className="h-1.5 w-1.5 rounded-full bg-violet-400 dark:bg-violet-500" />}
            </div>
            <div className="mb-1 text-sm font-bold text-violet-700 dark:text-violet-300">{entry.year}</div>
            <h2 className="m-0! mb-2 text-xl font-semibold leading-snug text-gray-950 dark:text-gray-50">
              {entry.historySlug ? (
                <Link
                  href={`/field-guide/ai-history/${entry.historySlug}`}
                  className="text-inherit no-underline hover:text-violet-700 dark:hover:text-violet-300"
                >
                  {entry.title}
                </Link>
              ) : (
                entry.title
              )}
            </h2>
            <p className="mb-3 text-base leading-7 text-gray-700 dark:text-gray-300">{entry.description}</p>
            {entry.cards.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {entry.cards.map(card => (
                  <CardChip key={`${entry.year}-${card.label}`} card={card} />
                ))}
              </div>
            )}
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
  );
}
