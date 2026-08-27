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
 * - resources-detail: Content + TOC
 * - detail-with-toc: Content + TOC
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

  const hasToc = (isResourcesDetail || isDetailWithToc) && showToc;
  const contentWidthClass = fullWidth
    ? 'max-w-none'
    : hasToc
      ? 'mx-auto max-w-4xl lg:mx-0 lg:max-w-5xl'
      : 'mx-auto max-w-4xl lg:mx-0';

  return (
    <div className="relative -mx-4 lg:-mx-8 lg:h-screen lg:overflow-hidden">
      <div id="main-content-scroll" className="lg:h-full lg:overflow-y-auto">
        {leftNav && <div className="w-full px-4 pt-4 lg:hidden">{leftNav}</div>}

        {header}

        <div className={contentPadding ? 'px-4 md:px-16 lg:px-16' : ''}>
          <div className={hasToc ? 'lg:grid lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-6' : ''}>
            <div className={contentWidthClass}>
              <div className="space-y-6 py-6">
                {children}
                {showFooter && <Footer />}
              </div>
            </div>

            {hasToc && (
              <aside className="sticky top-[20px] hidden max-h-[calc(100vh-20px)] self-start overflow-y-auto lg:block">
                <TableOfContents maxLevel={tocMaxLevel} />
              </aside>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
