'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { label: 'Recognition Cards', href: '/field-guide/recognition' },
  { label: 'Concept Cards', href: '/field-guide/concepts' },
  { label: 'Example Cards', href: '/field-guide/examples' },
  { label: 'Ethical Frameworks', href: '/field-guide/frameworks' },
  { label: 'Technical Explainers', href: '/field-guide/technical-explainers' },
  { label: 'History of AI', href: '/field-guide/ai-history' },
];

export default function FieldGuideNav() {
  const pathname = usePathname();
  const normalizedPath = pathname.startsWith('/fall2026') ? pathname.slice('/fall2026'.length) : pathname;

  return (
    <nav className="mt-8 flex flex-wrap gap-2" aria-label="Field guide sections">
      {TABS.map(tab => {
        const isActive = normalizedPath === tab.href || normalizedPath.startsWith(tab.href + '/');

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={[
              'rounded-full px-4 py-1.5 text-sm font-semibold no-underline transition-colors',
              isActive
                ? 'bg-violet-700 text-white dark:bg-violet-500'
                : 'bg-violet-100 text-violet-800 hover:bg-violet-200 dark:bg-violet-900/50 dark:text-violet-200 dark:hover:bg-violet-800/60',
            ].join(' ')}
            aria-current={isActive ? 'page' : undefined}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
