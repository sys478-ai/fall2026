'use client';

import { usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import ConditionalFooter from '@/components/ConditionalFooter';
import LayoutWrapper from '@/components/LayoutWrapper';

function normalizePath(path: string) {
  return path.replace(/^\/fall2026/, '').replace(/\/$/, '') || '/';
}

/** Immersive tool pages that skip the course sidebar / syllabus shell. */
export function isStandaloneToolPath(path: string) {
  const normalized = normalizePath(path);
  return normalized === '/activities/circuit-sandbox' || normalized === '/activities/teachable-machine' || normalized.startsWith('/activities/teachable-machine/');
}

export default function AppShell({
  navigation,
  children,
}: {
  navigation: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const standalone = isStandaloneToolPath(pathname);

  useEffect(() => {
    if (!standalone) return;
    const mainElement = document.querySelector('main');
    mainElement?.removeAttribute('data-layout');
    document.documentElement.classList.remove('content-layout-page');
  }, [standalone]);

  if (standalone) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <div className="min-h-screen md:flex">
      {navigation}
      <div className="min-w-0 flex-1">
        <LayoutWrapper>
          <main>{children}</main>
        </LayoutWrapper>
        <ConditionalFooter />
      </div>
    </div>
  );
}
