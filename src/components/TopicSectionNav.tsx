'use client';

import { Children, ReactNode, useEffect, useMemo, useState } from 'react';
import { resolveAssignmentTabIdFromHash } from '@/lib/assignment-series-hash';
import type { ModuleColorClasses } from '@/lib/module-colors';

export interface TopicSectionNavItem {
  id: string;
  label: string;
  count?: number;
}

interface TopicSectionNavProps {
  items: TopicSectionNavItem[];
  children: ReactNode;
  ariaLabel?: string;
  variant?: 'default' | 'plain' | 'stepper';
  layout?: 'tabs' | 'scroll';
  onHashSync?: (hashId: string) => void;
  /** Used by the 'stepper' variant to color the active step with the topic's module accent. */
  moduleColor?: ModuleColorClasses;
}

function resolveTabIdFromHash(hashId: string) {
  if (hashId === 'topic-career') {
    return 'topic-career';
  }

  if (
    hashId === 'read-watch' ||
    hashId.startsWith('topic-work-assignment-') ||
    hashId.startsWith('topic-work-activity-')
  ) {
    if (hashId.includes('career-module')) {
      return 'topic-career';
    }

    return 'topic-class-work';
  }

  return resolveAssignmentTabIdFromHash(hashId);
}

function resolveScrollIdFromHash(hashId: string, itemIds: string[]) {
  if (hashId === 'read-watch') {
    return itemIds.includes('topic-before-class') ? 'topic-before-class' : undefined;
  }

  if (hashId === 'topic-career') {
    return itemIds.includes('topic-career') ? 'topic-career' : undefined;
  }

  if (hashId === 'topic-today') {
    return itemIds.includes('topic-overview') ? 'topic-overview' : undefined;
  }

  if (hashId.startsWith('topic-work-assignment-') || hashId.startsWith('topic-work-activity-')) {
    if (hashId.includes('career-module')) {
      return itemIds.includes('topic-career') ? 'topic-career' : undefined;
    }

    return itemIds.includes('topic-class-work') ? 'topic-class-work' : undefined;
  }

  if (hashId === 'topic-work') {
    if (itemIds.includes('topic-next')) {
      return 'topic-next';
    }

    if (itemIds.includes('topic-class-work')) {
      return 'topic-class-work';
    }
  }

  if (itemIds.includes(hashId)) {
    return hashId;
  }

  return resolveAssignmentTabIdFromHash(hashId);
}

function JumpNav({
  items,
  activeId,
  ariaLabel,
}: {
  items: TopicSectionNavItem[];
  activeId: string;
  ariaLabel: string;
}) {
  return (
    <nav
      className="topic-section-tablist sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-black/95"
      aria-label={ariaLabel}
    >
      <div className="flex overflow-x-auto overflow-y-hidden scrollbar-none [&::-webkit-scrollbar]:hidden">
        {items.map(item => {
          const isActive = activeId === item.id;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative -mb-px shrink-0 whitespace-nowrap border-b px-5 py-3 text-[15px] no-underline transition-colors ${
                isActive
                  ? 'border-gray-950 font-medium text-gray-950 dark:border-gray-50 dark:text-gray-50'
                  : 'border-transparent font-normal text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50'
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export default function TopicSectionNav({
  items,
  children,
  ariaLabel = 'Topic sections',
  variant = 'default',
  layout = 'tabs',
  onHashSync,
  moduleColor,
}: TopicSectionNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id || '');
  const panels = useMemo(() => Children.toArray(children), [children]);
  const itemIds = useMemo(() => items.map(item => item.id), [items]);

  const activateTab = (id: string) => {
    setActiveId(id);

    if (typeof window === 'undefined') {
      return;
    }

    const nextUrl = `${window.location.pathname}${window.location.search}#${id}`;
    window.history.replaceState(null, '', nextUrl);
  };

  useEffect(() => {
    if (!items.some(item => item.id === activeId)) {
      setActiveId(items[0]?.id || '');
    }
  }, [activeId, items]);

  useEffect(() => {
    if (typeof window === 'undefined' || layout !== 'tabs') {
      return;
    }

    const syncActiveTabToHash = () => {
      const hashId = window.location.hash.replace(/^#/, '');
      const resolvedTabId = hashId ? resolveTabIdFromHash(hashId) : undefined;

      if (resolvedTabId && items.some(item => item.id === resolvedTabId)) {
        setActiveId(resolvedTabId);
        onHashSync?.(hashId);
        return;
      }

      if (hashId && items.some(item => item.id === hashId)) {
        setActiveId(hashId);
        onHashSync?.(hashId);
        return;
      }

      if (!hashId && items[0]?.id) {
        setActiveId(items[0].id);
        onHashSync?.('');
        return;
      }

      onHashSync?.(hashId);
    };

    syncActiveTabToHash();
    window.addEventListener('hashchange', syncActiveTabToHash);
    window.addEventListener('beforeprint', syncActiveTabToHash);

    return () => {
      window.removeEventListener('hashchange', syncActiveTabToHash);
      window.removeEventListener('beforeprint', syncActiveTabToHash);
    };
  }, [items, layout, onHashSync]);

  useEffect(() => {
    if (typeof window === 'undefined' || layout !== 'scroll') {
      return;
    }

    const hashId = window.location.hash.replace(/^#/, '');
    const resolvedId = hashId ? resolveScrollIdFromHash(hashId, itemIds) : undefined;

    if (resolvedId && itemIds.includes(resolvedId)) {
      setActiveId(resolvedId);
      onHashSync?.(hashId);
      requestAnimationFrame(() => {
        document.getElementById(resolvedId)?.scrollIntoView({ block: 'start' });
      });
    } else if (items[0]?.id) {
      setActiveId(items[0].id);
    }

    const sections = itemIds
      .map(id => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    // Track every section's latest ratio (not just the ones in the current
    // callback batch) so we always compare across all tabs, not whichever
    // section happened to cross a threshold most recently.
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let bestId: string | undefined;
        let bestRatio = 0;

        itemIds.forEach(id => {
          const ratio = ratios.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        if (bestId) {
          setActiveId(bestId);
        }
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        // Include 0 (and finer steps) so tall sections register as soon as
        // they enter the tracking band, instead of needing 15%+ of their
        // own height inside it before the callback ever fires for them.
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );

    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [itemIds, items, layout, onHashSync]);

  if (items.length === 0) {
    return null;
  }

  if (layout === 'scroll') {
    return (
      <div className="topic-section-nav">
        {items.length > 1 && <JumpNav items={items} activeId={activeId} ariaLabel={ariaLabel} />}
        <div className={items.length > 1 ? 'divide-y divide-gray-200 dark:divide-gray-800' : undefined}>
          {items.map((item, index) => (
            <div key={item.id} className={`topic-section-panel ${items.length > 1 ? 'py-10 first:pt-8 last:pb-0' : ''}`}>
              {panels[index]}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 1) {
    return (
      <div className="topic-section-nav space-y-8">
        <div id={`${items[0].id}-panel`} className="topic-section-panel">
          {panels[0]}
        </div>
      </div>
    );
  }

  return (
    <div className="topic-section-nav space-y-8">
      <div
        className="topic-section-tablist sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-black/95"
        role="tablist"
        aria-label={ariaLabel}
      >
        {variant === 'stepper' ? (
          <div className="flex items-center gap-6 overflow-x-auto overflow-y-hidden scrollbar-none [&::-webkit-scrollbar]:hidden">
            {items.map((item, index) => {
              const isActive = activeId === item.id;

              return (
                <button
                  key={item.id}
                  id={`${item.id}-tab`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${item.id}-panel`}
                  onClick={() => activateTab(item.id)}
                  className="flex shrink-0 items-center gap-2 whitespace-nowrap py-3 text-[15px] transition-colors"
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                      isActive
                        ? `${moduleColor?.stepFill ?? 'bg-gray-900 dark:bg-gray-100'} text-white dark:text-gray-950`
                        : 'bg-gray-100 text-gray-500 dark:bg-gray-900 dark:text-gray-400'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={
                      isActive
                        ? `font-semibold ${moduleColor?.accent ?? 'text-gray-950 dark:text-gray-50'}`
                        : 'font-normal text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50'
                    }
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex overflow-x-auto overflow-y-hidden scrollbar-none [&::-webkit-scrollbar]:hidden">
            {items.map((item, index) => {
              const isActive = activeId === item.id;
              const isPlain = variant === 'plain';

              return (
                <button
                  key={item.id}
                  id={`${item.id}-tab`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${item.id}-panel`}
                  onClick={() => activateTab(item.id)}
                  className={
                    isPlain
                      ? `relative -mb-px shrink-0 whitespace-nowrap border-b px-5 py-3 text-[15px] transition-colors ${
                          isActive
                            ? 'border-gray-950 font-medium text-gray-950 dark:border-gray-50 dark:text-gray-50'
                            : 'border-transparent font-normal text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50'
                        }`
                      : `relative -mb-px flex shrink-0 items-center gap-2 whitespace-nowrap border-b-3 px-4 py-2 text-sm font-semibold transition-colors ${
                          isActive
                            ? 'border-[#0b5d8f] text-[#0b5d8f] dark:border-[#8fc4ee] dark:text-[#8fc4ee]'
                            : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-[#0b5d8f] dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-[#8fc4ee]'
                        }`
                  }
                >
                  {!isPlain && (
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                        isActive
                          ? 'bg-[#0b5d8f]/10 text-[#0b5d8f] dark:bg-[#8fc4ee]/15 dark:text-[#8fc4ee]'
                          : 'bg-gray-100 text-gray-500 dark:bg-gray-900 dark:text-gray-400'
                      }`}
                    >
                      {index + 1}
                    </span>
                  )}
                  <span>
                    {item.label}
                    {typeof item.count === 'number' && <span className="ml-1 opacity-75">({item.count})</span>}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {items.map((item, index) => {
        const isActive = activeId === item.id;

        return (
          <div
            key={item.id}
            id={`${item.id}-panel`}
            role="tabpanel"
            aria-labelledby={`${item.id}-tab`}
            className="topic-section-panel"
            data-active={isActive ? 'true' : 'false'}
            hidden={!isActive}
          >
            {panels[index]}
          </div>
        );
      })}
    </div>
  );
}
