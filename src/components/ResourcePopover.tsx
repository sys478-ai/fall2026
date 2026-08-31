'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { ResourcePopoverDetail } from '@/hooks/useResourcePopovers';

// Keep in sync with the `duration-300` Tailwind classes below – same
// convention as FieldGuideCardPreview's side sheet.
const TRANSITION_MS = 300;

/** Global popover host for `{% resource section/slug %}Label{% endresource %}`
 * buttons baked into markdown content (see `src/lib/resource-popover.ts` and
 * `src/hooks/useResourcePopovers.ts`). Mounted once in the root layout so any
 * page's content can open it. Renders the exact same right-side sheet as
 * `FieldGuideCardPreview` (backdrop, slide-in from the right, badge + title
 * header in the section's banner theme, full content, "More <section>"
 * footer link, Escape/backdrop close, focus management, scroll lock), so a
 * resource looks identical whether it's opened from a field guide grid or
 * from a button inside markdown content. */
export default function ResourcePopover() {
  const [detail, setDetail] = useState<ResourcePopoverDetail | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleOpen(event: WindowEventMap['resource-popover:open']) {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      triggerRef.current = event.detail.trigger;
      setDetail(event.detail);
      requestAnimationFrame(() => setIsOpen(true));
    }

    window.addEventListener('resource-popover:open', handleOpen);
    return () => window.removeEventListener('resource-popover:open', handleOpen);
  }, []);

  function close() {
    setIsOpen(false);
    closeTimeoutRef.current = setTimeout(() => setDetail(null), TRANSITION_MS);
    triggerRef.current?.focus();
    triggerRef.current = null;
  }

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') close();
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
    <>
      {/* Backdrop – always mounted (parked invisible) so there is a "closed"
          frame in the DOM for the browser to transition from. A component
          that only mounts on first use never gets that frame, so the very
          first open snaps instead of sliding. */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
        onClick={close}
      />

      {/* Side sheet – likewise always mounted; only the content inside is
          conditional on `detail`, matching FieldGuideCardPreview. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={detail ? 'resource-popover-title' : undefined}
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 right-0 z-50 flex w-full flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-out dark:bg-gray-950 lg:w-3/4 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {detail && (
          <>
            <div className={`flex items-start justify-between gap-4 ${detail.headerClass}`}>
              <div>
                <p className={`mb-1 text-xs font-semibold uppercase tracking-widest ${detail.labelClass}`}>
                  {detail.badgeLabel}
                </p>
                <h2 id="resource-popover-title" className="m-0 text-2xl font-semibold text-gray-950 dark:text-gray-50">
                  {detail.title}
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
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
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: detail.html }}
              />
            </div>

            <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-800">
              <Link href={detail.href} className={`inline-flex items-center gap-1 text-sm font-semibold ${detail.moreLinkClass}`}>
                {detail.moreLinkLabel} →
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
