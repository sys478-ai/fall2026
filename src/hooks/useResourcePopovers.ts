'use client';

import { RefObject, useEffect } from 'react';

export interface ResourcePopoverDetail {
  title: string;
  href: string;
  html: string;
  badgeLabel: string;
  moreLinkLabel: string;
  headerClass: string;
  labelClass: string;
  moreLinkClass: string;
  trigger: HTMLElement;
}

declare global {
  interface WindowEventMap {
    'resource-popover:open': CustomEvent<ResourcePopoverDetail>;
  }
}

/** Wires up `[data-resource-popover]` buttons baked into markdown content
 * (see `src/lib/resource-popover.ts`) so a click dispatches a
 * `resource-popover:open` event carrying everything the sheet needs (same
 * header badge, banner theme, content, and footer link as
 * `FieldGuideCardPreview`). The `ResourcePopover` component mounted in the
 * root layout listens for that event and renders the actual sheet – this
 * hook is only the bridge from static, dangerouslySetInnerHTML'd markup to
 * the live React tree. */
export function useResourcePopovers(containerRef: RefObject<HTMLElement | null>, content: string) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const triggers = container.querySelectorAll<HTMLButtonElement>('[data-resource-popover]');

    function handleClick(event: Event) {
      const trigger = event.currentTarget as HTMLButtonElement;
      const template = trigger.nextElementSibling;
      if (!(template instanceof HTMLTemplateElement)) return;

      window.dispatchEvent(
        new CustomEvent('resource-popover:open', {
          detail: {
            title: trigger.dataset.resourceTitle ?? '',
            href: trigger.dataset.resourceHref ?? '',
            html: template.innerHTML,
            badgeLabel: trigger.dataset.resourceBadge ?? '',
            moreLinkLabel: trigger.dataset.resourceMoreLabel ?? '',
            headerClass: trigger.dataset.resourceHeaderClass ?? '',
            labelClass: trigger.dataset.resourceLabelClass ?? '',
            moreLinkClass: trigger.dataset.resourceMoreClass ?? '',
            trigger,
          },
        })
      );
    }

    triggers.forEach(trigger => trigger.addEventListener('click', handleClick));

    return () => {
      triggers.forEach(trigger => trigger.removeEventListener('click', handleClick));
    };
  }, [containerRef, content]);
}
