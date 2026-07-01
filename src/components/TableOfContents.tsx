'use client';

import React, { useEffect, useState } from 'react';
import { SCROLL_OFFSET_PX } from '@/lib/utils';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  maxLevel?: number;
}

export default function TableOfContents({ maxLevel = 2 }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    let lastItemsHash = '';
    let currentHeadings: HTMLElement[] = [];
    let animationFrame: number | null = null;
    const scrollContainer = document.getElementById('main-content-scroll');

    const updateActiveHeading = () => {
      if (currentHeadings.length === 0) {
        return;
      }

      const containerTop = scrollContainer?.getBoundingClientRect().top ?? 0;
      const activationLine = containerTop + SCROLL_OFFSET_PX + 1;
      let activeHeading = currentHeadings[0];

      for (const heading of currentHeadings) {
        if (heading.getBoundingClientRect().top <= activationLine) {
          activeHeading = heading;
        } else {
          break;
        }
      }

      setActiveId(activeHeading.id);
    };

    const scheduleActiveHeadingUpdate = () => {
      if (animationFrame !== null) {
        return;
      }

      animationFrame = requestAnimationFrame(() => {
        animationFrame = null;
        updateActiveHeading();
      });
    };
    
    const performScan = () => {
      // Build selector based on maxLevel
      const headingSelectors = [];
      for (let i = 2; i <= maxLevel; i++) {
        headingSelectors.push(`h${i}`);
      }
      const selector = headingSelectors.join(', ');
      
      // Try to find headings within the main content scroll container first
      // Otherwise fall back to the resources layout container or document
      const resourcesLayout = document.querySelector('[data-resources-layout]');
      const searchRoot = scrollContainer || resourcesLayout || document;
      
      // Find all heading elements within the search root
      const allHeadings = searchRoot.querySelectorAll(selector);
      const headings: Array<{ element: Element; level: number }> = [];
      
      allHeadings.forEach((heading) => {
        const instructorNotesSection = heading.closest('[data-instructor-notes="true"]');
        const tocExcludedSection = heading.closest('[data-toc-exclude="true"]');
        const insideCollapsible = heading.closest('details.mb-4');
        const text = heading.textContent?.trim();
        if (!instructorNotesSection && !tocExcludedSection && !insideCollapsible && text !== 'On This Page') {
          const level = parseInt(heading.tagName.charAt(1));
          headings.push({ element: heading, level });
        }
      });
      
      // Collapsible sections become <details><summary>; include the summary in the TOC
      const collapsibleSummaries = searchRoot.querySelectorAll('details.mb-4 > summary');
      collapsibleSummaries.forEach((summary) => {
        const details = summary.closest('details');
        const instructorNotesSection = details?.closest('[data-instructor-notes="true"]');
        const tocExcludedSection = details?.closest('[data-toc-exclude="true"]');
        if (!instructorNotesSection && !tocExcludedSection && details) {
          const levelMatch = details.className.match(/collapsible-h(\d)/);
          const level = levelMatch ? parseInt(levelMatch[1], 10) : 3;
          if (level <= maxLevel) {
            headings.push({ element: summary, level });
          }
        }
      });
      
      // Sort headings by their position in the document to maintain correct order
      const sortedHeadings = headings.sort((a, b) => {
        const pos = a.element.compareDocumentPosition(b.element);
        if (pos & Node.DOCUMENT_POSITION_FOLLOWING) {
          return -1; // a comes before b
        } else if (pos & Node.DOCUMENT_POSITION_PRECEDING) {
          return 1; // a comes after b
        }
        return 0; // same position (shouldn't happen)
      });
      
      const items: TocItem[] = [];
      const usedIds = new Set<string>();

      sortedHeadings.forEach((headingData, index) => {
        const heading = headingData.element;
        const level = headingData.level;
        let id = heading.id;
        
        if (!id) {
          const baseId = heading.textContent?.toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-') || `heading-${index}`;
          
          id = baseId;
          let counter = 1;
          while (usedIds.has(id)) {
            id = `${baseId}-${counter}`;
            counter++;
          }
          
          heading.id = id;
        }
        
        usedIds.add(id);

        if (level <= maxLevel) {
          items.push({
            id: heading.id,
            text: heading.textContent || '',
            level: level
          });
        }
      });

      // Only update if items actually changed (use hash to avoid expensive JSON.stringify)
      const itemsHash = items.map(item => `${item.id}:${item.text}`).join('|');
      if (itemsHash !== lastItemsHash) {
        lastItemsHash = itemsHash;
        setTocItems(items);
      }

      currentHeadings = sortedHeadings
        .map(headingData => headingData.element)
        .filter((element): element is HTMLElement => element instanceof HTMLElement);
      scheduleActiveHeadingUpdate();
    };
    
    // Initial scan
    performScan();
    
    // Do an early scan after a short delay to catch quiz that loads quickly
    setTimeout(performScan, 500);
    
    // Re-scan periodically to catch dynamically added headings (like quiz)
    // Use a shorter interval for faster detection
    const interval = setInterval(performScan, 1000);
    const scrollTarget = scrollContainer || window;
    scrollTarget.addEventListener('scroll', scheduleActiveHeadingUpdate, { passive: true });
    window.addEventListener('resize', scheduleActiveHeadingUpdate);

    return () => {
      clearInterval(interval);
      scrollTarget.removeEventListener('scroll', scheduleActiveHeadingUpdate);
      window.removeEventListener('resize', scheduleActiveHeadingUpdate);
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [maxLevel]);

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <nav className="" data-toc-exclude="true">
      <div className="pl-4 pt-2">
        <h2 className="text-lg! font-normal! mb-2">On This Page</h2>
        <ul className="list-none! p-0! m-0! space-y-0.5">
          {tocItems.map((item) => {
            // Calculate indentation based on level (h2 = 0, h3 = 4, h4 = 8, etc.)
            const indentClass = item.level === 3 ? 'ml-4' : 
                               item.level === 4 ? 'ml-8' : 
                               item.level === 5 ? 'ml-12' : 
                               item.level === 6 ? 'ml-16' : '';
            
            return (
            <li 
              key={item.id}
              className={indentClass}
            >
              <a
                href={`#${item.id}`}
                className={`block py-0.5 px-2 text-sm font-normal transition-colors whitespace-nowrap overflow-hidden border-0! text-ellipsis rounded toc-link ${
                  activeId === item.id
                    ? 'font-extrabold! text-blue-600 dark:text-blue-100 hover:text-blue-600 dark:hover:text-blue-200'
                    : 'text-gray-500 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-100'
                }`}
                title={item.text}
              >
                {item.text}
              </a>
            </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
