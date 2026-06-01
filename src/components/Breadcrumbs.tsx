import Link from 'next/link';
import type { ReactNode } from 'react';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav className={`mb-4 text-sm ${className}`.trim()} aria-label="Breadcrumb">
      <ol className="m-0! flex list-none flex-wrap items-center gap-x-1 gap-y-2 p-0! text-gray-500 dark:text-gray-400">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li
              key={index}
              className="flex min-w-0 max-w-full items-center gap-x-1"
              aria-current={isCurrent ? 'page' : undefined}
            >
              {index > 0 && (
                <span className="shrink-0 px-1 text-gray-300 dark:text-gray-700" aria-hidden="true">
                  /
                </span>
              )}
              {item.href && !isCurrent ? (
                <Link
                  href={item.href}
                  className="block min-w-0 wrap-break-word rounded-md px-1.5 py-1 font-medium text-gray-600 no-underline hover:bg-gray-100 hover:text-[#0b5d8f] dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-[#8fc4ee]"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`block min-w-0 wrap-break-word rounded-md px-1.5 py-1 ${
                    isCurrent
                      ? 'font-medium text-gray-900 dark:text-gray-100'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
