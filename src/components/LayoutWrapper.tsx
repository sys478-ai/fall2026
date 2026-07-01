"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  useEffect(() => {
    const mainElement = document.querySelector('main');
    const htmlElement = document.documentElement;
    const normalizedPath = pathname.replace(/^\/fall2026/, '') || '/';
    
    if (mainElement) {
      // Determine layout type based on pathname
      const isResourcesDetail = normalizedPath.startsWith('/resources/') && normalizedPath !== '/resources';
      const isDetailWithToc = normalizedPath === '/' ||
                              normalizedPath === '/syllabus' ||
                              normalizedPath === '/braid-case-study' ||
                              (normalizedPath.startsWith('/assignments/') && normalizedPath !== '/assignments') ||
                              (normalizedPath.startsWith('/activities/') && normalizedPath !== '/activities') ||
                              (normalizedPath.startsWith('/exams/') && normalizedPath !== '/exams') ||
                              (normalizedPath.startsWith('/topics/') && normalizedPath !== '/topics') ||
                              (normalizedPath.startsWith('/field-guide/') && normalizedPath !== '/field-guide') ||
                              normalizedPath === '/repos-hidden';
      const isListPage = normalizedPath === '/modules' ||
                        normalizedPath === '/assignments' || 
                        normalizedPath === '/activities' || 
                        normalizedPath === '/resources' ||
                        normalizedPath === '/bibliography' ||
                        normalizedPath === '/planning/taxonomy' ||
                        normalizedPath === '/planning/review-status' ||
                        normalizedPath === '/field-guide' ||
                        normalizedPath === '/exams';
      
      // Apply appropriate data attributes and classes
      // All pages using ContentLayout need html overflow hidden for scrollable containers
      if (isResourcesDetail) {
        mainElement.setAttribute('data-layout', 'resources-detail');
        htmlElement.classList.add('content-layout-page');
      } else if (isDetailWithToc) {
        mainElement.setAttribute('data-layout', 'detail-with-toc');
        htmlElement.classList.add('content-layout-page');
      } else if (isListPage) {
        mainElement.setAttribute('data-layout', 'list');
        htmlElement.classList.add('content-layout-page');
      } else {
        mainElement.removeAttribute('data-layout');
        htmlElement.classList.remove('content-layout-page');
      }
    }
  }, [pathname]);

  return <>{children}</>;
}
