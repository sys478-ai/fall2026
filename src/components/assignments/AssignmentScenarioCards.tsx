'use client';

import MarkdownContent from '@/components/MarkdownContent';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export interface AssignmentScenarioCardItem {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
}

interface AssignmentScenarioCardsProps {
  items: AssignmentScenarioCardItem[];
  expandedId: string | null;
  onExpandedChange: (id: string | null) => void;
}

export default function AssignmentScenarioCards({
  items,
  expandedId,
  onExpandedChange,
}: AssignmentScenarioCardsProps) {
  const handleToggle = (id: string) => {
    const nextId = expandedId === id ? null : id;
    onExpandedChange(nextId);

    if (typeof window === 'undefined') {
      return;
    }

    const hash = nextId ? `topics-${nextId}` : 'topics';
    const nextUrl = `${window.location.pathname}${window.location.search}#${hash}`;
    window.history.replaceState(null, '', nextUrl);
  };

  return (
    <div className="assignment-scenario-cards space-y-4">
      <p className="mb-0 text-sm leading-6 text-gray-600 dark:text-gray-400">
        Your group should choose one topic for your analysis. Click a card to read the options within that topic, then
        pick one specific scenario to use in Pass 1.
      </p>

      <div className="grid grid-cols-1 gap-4">
        {items.map((item, index) => {
          const isExpanded = expandedId === item.id;

          return (
            <article
              key={item.id}
              className={`overflow-hidden rounded-2xl border transition-colors ${
                isExpanded
                  ? 'border-sky-300 bg-sky-50/60 dark:border-sky-800 dark:bg-sky-950/20'
                  : 'border-gray-200 bg-white dark:border-gray-800 dark:bg-black'
              }`}
            >
              <button
                type="button"
                onClick={() => handleToggle(item.id)}
                aria-expanded={isExpanded}
                aria-controls={`scenario-panel-${item.id}`}
                className="flex w-full items-start gap-3 px-5 py-4 text-left"
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                    isExpanded
                      ? 'bg-[#0b5d8f]/10 text-[#0b5d8f] dark:bg-[#8fc4ee]/15 dark:text-[#8fc4ee]'
                      : 'bg-gray-100 text-gray-500 dark:bg-gray-900 dark:text-gray-400'
                  }`}
                >
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="m-0! text-base font-semibold leading-snug text-gray-950 dark:text-gray-50">
                    {item.title.replace(/^HW01 Scenario Set:\s*/i, '')}
                  </h3>
                  {item.excerpt && !isExpanded && (
                    <p className="mb-0 mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{item.excerpt}</p>
                  )}
                </div>
                <ChevronDownIcon
                  className={`mt-0.5 h-5 w-5 shrink-0 text-gray-500 transition-transform dark:text-gray-400 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isExpanded && (
                <div
                  id={`scenario-panel-${item.id}`}
                  className="assignment-scenario-panel border-t border-sky-200 px-5 py-4 dark:border-sky-900/50"
                >
                  <MarkdownContent
                    content={item.content}
                    className="assignment-page [&_a]:underline [&_a]:underline-offset-2"
                  />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
