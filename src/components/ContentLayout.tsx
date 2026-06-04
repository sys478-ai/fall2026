"use client";

import { ReactNode } from 'react';
import TableOfContents from './TableOfContents';
import Footer from './Footer';

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
  
  // All pages use full-height scrollable containers
  const hasToc = (isResourcesDetail || isDetailWithToc) && showToc;
  
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
          <div className={`${fullWidth ? 'max-w-none' : 'max-w-4xl mx-auto'} ${contentPadding ? 'px-4 md:px-16' : ''}`}>
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
