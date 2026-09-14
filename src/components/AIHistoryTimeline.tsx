'use client';

import Link from 'next/link';
import type { AIHistoryExampleSheet, AIHistoryTimelineEntry } from '@/lib/ai-history-timeline';

function openExampleSheet(sheet: AIHistoryExampleSheet, trigger: HTMLElement) {
  window.dispatchEvent(
    new CustomEvent('resource-popover:open', {
      detail: {
        title: sheet.title,
        href: sheet.href,
        html: sheet.html,
        badgeLabel: sheet.badgeLabel,
        moreLinkLabel: sheet.moreLinkLabel,
        headerClass: sheet.headerClass,
        labelClass: sheet.labelClass,
        moreLinkClass: sheet.moreLinkClass,
        trigger,
      },
    })
  );
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
          Key moments in AI history. Case study entries open example cards in a side sheet.
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
            {entry.exampleSheet && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={event => openExampleSheet(entry.exampleSheet!, event.currentTarget)}
                  className="group/example inline-flex cursor-pointer items-center gap-2 rounded-md border border-violet-200 bg-violet-50/60 px-3.5 py-2 text-sm font-semibold text-violet-800 transition-colors hover:border-violet-300 hover:bg-violet-100 dark:border-violet-800/70 dark:bg-violet-950/25 dark:text-violet-200 dark:hover:border-violet-700 dark:hover:bg-violet-900/35"
                >
                  <span>View Full Example</span>
                  <span
                    aria-hidden="true"
                    className="text-base leading-none transition-transform group-hover/example:translate-x-0.5"
                  >
                    →
                  </span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
