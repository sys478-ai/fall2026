'use client';

import { Children, ReactNode, useEffect, useMemo, useState } from 'react';

export interface TopicSectionNavItem {
  id: string;
  label: string;
  count?: number;
}

interface TopicSectionNavProps {
  items: TopicSectionNavItem[];
  children: ReactNode;
}

export default function TopicSectionNav({ items, children }: TopicSectionNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id || '');
  const panels = useMemo(() => Children.toArray(children), [children]);

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
    if (typeof window === 'undefined') {
      return;
    }

    const syncActiveTabToHash = () => {
      const hashId = window.location.hash.replace(/^#/, '');
      if (hashId && items.some(item => item.id === hashId)) {
        setActiveId(hashId);
        return;
      }

      if (!hashId && items[0]?.id) {
        setActiveId(items[0].id);
      }
    };

    syncActiveTabToHash();
    window.addEventListener('hashchange', syncActiveTabToHash);
    window.addEventListener('beforeprint', syncActiveTabToHash);

    return () => {
      window.removeEventListener('hashchange', syncActiveTabToHash);
      window.removeEventListener('beforeprint', syncActiveTabToHash);
    };
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="topic-section-nav space-y-8">
      <div
        className="topic-section-tablist sticky top-0 z-10 border-y border-gray-200 bg-white/95 py-3 backdrop-blur dark:border-gray-800 dark:bg-black/95"
        role="tablist"
        aria-label="Topic sections"
      >
        <div className="flex gap-2 overflow-x-auto">
          {items.map(item => {
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
                className={`shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-[#0b5d8f] bg-[#0b5d8f] text-white dark:border-[#8fc4ee] dark:bg-[#8fc4ee] dark:text-black'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-[#0b5d8f] hover:text-[#0b5d8f] dark:border-gray-800 dark:bg-black dark:text-gray-300 dark:hover:border-[#8fc4ee] dark:hover:text-[#8fc4ee]'
                }`}
              >
                {item.label}
                {typeof item.count === 'number' && (
                  <span className="ml-1 opacity-75">({item.count})</span>
                )}
              </button>
            );
          })}
        </div>
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
