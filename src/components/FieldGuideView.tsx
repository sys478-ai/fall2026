'use client';

import { createContext, useContext, useState } from 'react';
import Link from 'next/link';

type View = 'card' | 'compact';
const ViewContext = createContext<View>('card');

export function FieldGuideViewProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<View>('compact');
  const base = 'px-3 py-1.5 text-sm transition-colors';
  const active = 'bg-gray-100 font-semibold text-gray-900 dark:bg-gray-800 dark:text-gray-50';
  const inactive = 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200';

  return (
    <ViewContext.Provider value={view}>
      <div className="flex justify-end px-4 md:px-16 mb-4">
        <div className="flex overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
          <button onClick={() => setView('card')} className={`${base} ${view === 'card' ? active : inactive}`}>
            Cards
          </button>
          <button
            onClick={() => setView('compact')}
            className={`${base} border-l border-gray-200 dark:border-gray-700 ${view === 'compact' ? active : inactive}`}
          >
            Compact
          </button>
        </div>
      </div>
      {children}
    </ViewContext.Provider>
  );
}

export function FieldGuideCardSection({ children }: { children: React.ReactNode }) {
  const view = useContext(ViewContext);
  return view === 'card' ? <>{children}</> : null;
}

export function FieldGuideCompactSection({
  label,
  description,
  cards,
}: {
  label?: string;
  description?: string;
  cards: { title: string; subtitle?: string; href?: string }[];
}) {
  const view = useContext(ViewContext);
  if (view !== 'compact') return null;

  const hasLabel = Boolean(label);

  return (
    <div className="border-t border-gray-200 px-4 pt-8 pb-6 dark:border-gray-800 md:px-16">
      <div className={`grid gap-6 ${hasLabel ? 'grid-cols-1 md:grid-cols-[2fr_3fr]' : 'grid-cols-1'}`}>
        {hasLabel && (
          <div className="md:pr-6">
            <h2 className="m-0! text-lg font-semibold text-gray-950 dark:text-gray-50">{label}</h2>
            {description && (
              <p className="mb-0 mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{description}</p>
            )}
          </div>
        )}
        <div>
          <table className="w-full text-sm border-0!">
            <tbody>
              {cards.map((card, i) => (
                <tr key={i} className={i > 0 ? 'border-t border-gray-100 dark:border-gray-900' : ''}>
                  <td className="py-2.5 pr-6 text-gray-600 dark:text-gray-400 align-top">
                    <h3 className="m-0! text-base font-medium!">
                      {card.href ? (
                        <Link href={card.href} className="hover:underline">
                          {card.title}
                        </Link>
                      ) : (
                        card.title
                      )}
                    </h3>
                    {card.subtitle ?? ''}
                  </td>
                  <td className="py-2.5 text-right align-top whitespace-nowrap">
                    {card.href && (
                      <Link
                        href={card.href}
                        className="text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-200"
                        aria-label={`View ${card.title}`}
                      >
                        →
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
