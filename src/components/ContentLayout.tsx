"use client";

import { ReactNode, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import TableOfContents from './TableOfContents';
import Footer from './Footer';
import { scrollToAnchor } from '@/lib/utils';

interface ResourcePage {
  slug: string;
  title: string;
  group: string;
  group_order: number;
  order: number;
}

interface ContentLayoutProps {
  children: ReactNode;
  variant: 'resources-detail' | 'detail-with-toc' | 'list';
  header?: ReactNode; // Full-width content header rendered above the padded content area
  leftNav?: ReactNode; // For resources detail pages
  showToc?: boolean;
  tocMaxLevel?: number;
  resourcePages?: ResourcePage[]; // For resources detail pages
  showFooter?: boolean; // Whether to show footer inside content area
  fullWidth?: boolean; // Allow dense planning/index pages to use the full content area
  contentPadding?: boolean; // Whether to apply default inner content padding
}

/**
 * Shared layout component that ensures consistent content positioning across all pages.
 * 
 * Layout variants:
 * - resources-detail: Content + TOC (256px fixed right)
 * - detail-with-toc: Content + TOC (256px fixed right)
 * - list: Content (no TOC)
 */
export default function ContentLayout({
  children,
  variant,
  header,
  leftNav,
  showToc = true,
  tocMaxLevel = 2,
  showFooter = true,
  fullWidth = false,
  contentPadding = true,
}: ContentLayoutProps) {
  const isResourcesDetail = variant === 'resources-detail';
  const isDetailWithToc = variant === 'detail-with-toc';
  const pathname = usePathname();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // All pages use full-height scrollable containers
  const hasToc = (isResourcesDetail || isDetailWithToc) && showToc;
  
  // Handle anchor link clicks and initial hash on page load
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const scrollContainer = scrollContainerRef.current || document.getElementById('main-content-scroll');
    if (!scrollContainer) return;
    
    // Handle initial hash on page load
    const handleInitialHash = () => {
      const hash = window.location.hash.slice(1); // Remove #
      if (hash) {
        // Wait for content to be ready (similar to scroll restoration)
        let lastScrollHeight = 0;
        let stableCount = 0;
        
        const checkAndScroll = () => {
          const scrollHeight = scrollContainer.scrollHeight;
          
          if (scrollHeight < 200) {
            requestAnimationFrame(checkAndScroll);
            return;
          }
          
          // Check if scroll height has stabilized
          if (scrollHeight === lastScrollHeight) {
            stableCount++;
            if (stableCount >= 2) {
              // Content is stable, scroll to anchor
              scrollToAnchor(hash, { behavior: 'auto' }); // Use 'auto' for initial load to avoid animation
              return;
            }
          } else {
            lastScrollHeight = scrollHeight;
            stableCount = 0;
          }
          
          requestAnimationFrame(checkAndScroll);
        };
        
        // Start checking after initial render
        requestAnimationFrame(checkAndScroll);
      }
    };
    
    // Handle initial hash after a short delay to ensure content is loaded
    const initialHashTimeout = setTimeout(handleInitialHash, 100);
    
    // Handle anchor link clicks - use document-level delegation to catch all clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;
      
      if (!anchor) return;
      
      // Skip TOC links FIRST (they have their own handlers)
      if (anchor.classList.contains('toc-link')) {
        return;
      }
      
      // Only handle links within the scroll container
      if (!scrollContainer.contains(anchor)) {
        return;
      }
      
      // Skip if default was already prevented by another handler
      if (e.defaultPrevented) return;
      
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || !href.startsWith('#')) return;
      
      const targetId = href.slice(1); // Remove #
      if (!targetId) return;
      
      // Check if target element exists
      const targetElement = document.getElementById(targetId);
      if (!targetElement) {
        return;
      }
      
      e.preventDefault();
      e.stopPropagation();
      scrollToAnchor(targetId);
    };
    
    // Use document-level event delegation to catch all clicks, then filter by container
    // This ensures we catch clicks even if content is rendered after the listener is attached
    document.addEventListener('click', handleAnchorClick, true);
    
    return () => {
      clearTimeout(initialHashTimeout);
      document.removeEventListener('click', handleAnchorClick, true);
    };
  }, [pathname]);
  
  return (
    <div className="relative lg:h-screen lg:overflow-hidden -mx-4 lg:-mx-8">
      {/* Mobile: Stacked layout */}
      <div className="lg:hidden">
        {leftNav && (
          <div className="w-full px-4 pt-4">
            {leftNav}
          </div>
        )}
        <div className="w-full">
          {header}
          <div className={`${fullWidth ? 'max-w-none' : 'max-w-4xl mx-auto'} ${contentPadding ? 'px-16' : ''}`}>
            <div className="space-y-6 py-6">
              {children}
              {showFooter && <Footer />}
            </div>
          </div>
        </div>
      </div>
      
      {/* Desktop: Content column with optional right TOC */}
      <div className="hidden lg:flex h-full">
        <div 
          ref={scrollContainerRef}
          id="main-content-scroll"
          className="flex-1 min-w-0 overflow-y-auto"
        >
          {header}
          <div className={contentPadding ? 'px-16' : ''}>
            <div className={hasToc ? 'grid grid-cols-[minmax(0,1fr)_17.25rem] gap-6' : ''}>
              <div className={fullWidth ? 'max-w-none' : 'max-w-4xl'}>
                <div className="space-y-6 py-6">
                  {children}
                  {showFooter && <Footer />}
                </div>
              </div>
              {hasToc && (
                <aside
                  className="sticky top-[20px] self-start max-h-[calc(100vh-20px)] overflow-y-auto"
                >
                  <TableOfContents maxLevel={tocMaxLevel} />
                </aside>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
