'use client';

import { useState } from 'react';
import MarkdownContent from './MarkdownContent';

export interface PatternCaseTab {
  id: string;
  label: string;
  content: string;
}

interface PatternCaseTabsProps {
  cases: PatternCaseTab[];
}

export default function PatternCaseTabs({ cases }: PatternCaseTabsProps) {
  const [activeId, setActiveId] = useState(cases[0]?.id || '');

  if (cases.length === 0) {
    return null;
  }

  const activeCase = cases.find((item) => item.id === activeId) || cases[0];

  return (
    <div className="min-w-0 space-y-5">
      <div className="relative min-w-0 max-w-full">
        {cases.length > 2 && (
          <>
            <div className="pointer-events-none absolute bottom-px left-0 top-0 z-10 w-6 bg-linear-to-r from-white to-transparent dark:from-black" />
            <div className="pointer-events-none absolute bottom-px right-0 top-0 z-10 w-6 bg-linear-to-l from-white to-transparent dark:from-black" />
          </>
        )}
        <div
          className="flex max-w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden border-b border-gray-200 scrollbar-none touch-pan-x cursor-grab select-none active:cursor-grabbing dark:border-gray-800 [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Pattern case studies"
        >
          {cases.map((item) => {
            const isActive = item.id === activeCase.id;

            return (
              <button
                key={item.id}
                id={`${item.id}-tab`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`${item.id}-panel`}
                onClick={() => {
                  setActiveId(item.id);
                }}
                className={`relative -mb-px max-w-48 shrink-0 snap-start truncate whitespace-nowrap border-b-3 px-4 py-2 text-sm font-semibold transition-colors sm:max-w-none ${
                  isActive
                    ? 'border-[#0b5d8f] text-[#0b5d8f] dark:border-[#8fc4ee] dark:text-[#8fc4ee]'
                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-[#0b5d8f] dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-[#8fc4ee]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {cases.map((item) => {
        const isActive = item.id === activeCase.id;

        return (
          <div
            key={item.id}
            id={`${item.id}-panel`}
            role="tabpanel"
            aria-labelledby={`${item.id}-tab`}
            hidden={!isActive}
          >
            <h3 className="m-0! mb-4! text-2xl font-semibold text-gray-950 dark:text-gray-50">
              {item.label}
            </h3>
            <MarkdownContent content={item.content} />
          </div>
        );
      })}
    </div>
  );
}
