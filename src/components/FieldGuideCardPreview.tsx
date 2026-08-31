'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getFieldGuideContentClassFromBasePath, type FieldGuideBannerClasses } from '@/lib/field-guide-palettes';

export interface FieldGuidePreviewItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  contentHtml: string;
}

interface FieldGuideCardPreviewProps {
  intro?: string;
  items: FieldGuidePreviewItem[];
  badgeLabel: string;
  linkBasePath: string;
  moreLinkLabel: string;
  banner: FieldGuideBannerClasses;
  sheetTitleId: string;
}

// Keep in sync with the `duration-300` Tailwind classes below – Tailwind's class
// scanner needs literal class names, so this can't be interpolated into the JSX.
const TRANSITION_MS = 300;

const MORE_LINK_BASE = 'inline-flex items-center gap-1 text-sm font-semibold';

function normalizePath(path: string): string {
  return path.replace(/^\/fall2026/, '').replace(/\/$/, '') || '/';
}

export default function FieldGuideCardPreview({
  intro,
  items,
  badgeLabel,
  linkBasePath,
  moreLinkLabel,
  banner,
  sheetTitleId,
}: FieldGuideCardPreviewProps) {
  const pathname = usePathname();
  const isOnSectionPage = normalizePath(pathname) === normalizePath(linkBasePath);
  const contentClass = getFieldGuideContentClassFromBasePath(linkBasePath);
  const [activeItem, setActiveItem] = useState<FieldGuidePreviewItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openSheet(item: FieldGuidePreviewItem, trigger: HTMLButtonElement) {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    triggerRef.current = trigger;
    setActiveItem(item);
    requestAnimationFrame(() => setIsOpen(true));
  }

  function closeSheet() {
    setIsOpen(false);
    closeTimeoutRef.current = setTimeout(() => setActiveItem(null), TRANSITION_MS);
    triggerRef.current?.focus();
    triggerRef.current = null;
  }

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeSheet();
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <div className="space-y-6">
      {intro && <p className="mb-0 max-w-3xl text-base leading-7 text-gray-700 dark:text-gray-300">{intro}</p>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(item => (
          <button
            key={item.id}
            type="button"
            onClick={event => openSheet(item, event.currentTarget)}
            className={`group flex flex-col items-start gap-2 rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-colors dark:border-gray-800 dark:bg-black ${banner.previewCardHover}`}
          >
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${banner.previewBadge}`}>{badgeLabel}</span>
            <span className={`text-lg font-semibold text-gray-950 dark:text-gray-50 ${banner.previewTitleHover}`}>
              {item.title}
            </span>
            <span className="text-sm leading-6 text-gray-600 dark:text-gray-400">{item.subtitle}</span>
          </button>
        ))}
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
        onClick={closeSheet}
      />

      {/* Side sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={sheetTitleId}
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 right-0 z-50 flex w-full flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-out dark:bg-gray-950 lg:w-3/4 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {activeItem && (
          <>
            <div className={`flex items-start justify-between gap-4 ${banner.sheetHeader}`}>
              <div>
                <p className={`mb-1 text-xs font-semibold uppercase tracking-widest ${banner.label}`}>{badgeLabel}</p>
                <h2 id={sheetTitleId} className="m-0 text-2xl font-semibold text-gray-950 dark:text-gray-50">
                  {activeItem.title}
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeSheet}
                className="shrink-0 rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 px-6 py-6">
              <div
                className={`prose prose-lg max-w-none dark:prose-invert ${contentClass}`}
                dangerouslySetInnerHTML={{ __html: activeItem.contentHtml }}
              />
            </div>

            <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-800">
              {isOnSectionPage ? (
                <button
                  type="button"
                  onClick={closeSheet}
                  className={`${MORE_LINK_BASE} ${banner.moreLink} cursor-pointer bg-transparent p-0`}
                >
                  {moreLinkLabel} →
                </button>
              ) : (
                <Link href={linkBasePath} className={`${MORE_LINK_BASE} ${banner.moreLink}`}>
                  {moreLinkLabel} →
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
