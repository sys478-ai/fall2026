'use client';

import { RefObject, useEffect } from 'react';

export function usePatternCaseTabs(containerRef: RefObject<HTMLElement | null>, content: string) {
  useEffect(() => {
    if (!containerRef.current) return;

    const sliders = containerRef.current.querySelectorAll<HTMLElement>('[data-pattern-case-tabs]');

    const activateTab = (slider: HTMLElement, tabId: string) => {
      slider.querySelectorAll<HTMLButtonElement>('[role="tab"]').forEach(tab => {
        const isActive = tab.dataset.tabId === tabId;
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      slider.querySelectorAll<HTMLElement>('[data-tab-panel]').forEach(panel => {
        panel.hidden = panel.dataset.tabPanel !== tabId;
      });
    };

    const cleanups: Array<() => void> = [];

    sliders.forEach(slider => {
      if (slider.dataset.tabsListenerAdded) return;

      const handleClick = (event: Event) => {
        const target = event.target as HTMLElement;
        const tab = target.closest<HTMLButtonElement>('[role="tab"]');
        if (!tab || !slider.contains(tab) || !tab.dataset.tabId) return;
        activateTab(slider, tab.dataset.tabId);
      };

      slider.addEventListener('click', handleClick);
      slider.dataset.tabsListenerAdded = 'true';

      cleanups.push(() => {
        slider.removeEventListener('click', handleClick);
        slider.dataset.tabsListenerAdded = '';
      });
    });

    return () => {
      cleanups.forEach(cleanup => cleanup());
    };
  }, [containerRef, content]);
}
