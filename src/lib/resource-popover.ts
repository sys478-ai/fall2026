/**
 * Resource popover buttons for markdown content.
 *
 * Authoring syntax:
 *
 * {% resource ethical-frameworks/ef-rawlsian %}Rawlsian{% endresource %}
 *
 * Turns the wrapped label into a button that pops open the referenced
 * content item (loaded from `content/<section>/<slug>.md`) in the same
 * right-side sheet used by the field guide preview tabs (`FieldGuideCardPreview`),
 * without navigating away from the page – same banner theme, badge, content
 * styling, and "More <section>" footer link, just triggerable from any
 * markdown content instead of only from a preview grid. Works for any
 * content directory `getPostData` can read (ethical-frameworks, sts-concepts,
 * deployment-patterns, recognition, examples, ...).
 *
 * Place the tag anywhere in the markdown body, inline or on its own line.
 *
 * Card grid (same preview cards as a field-guide section page):
 *
 * {% field-guide-cards theories-of-learning tl-biological,tl-constructivism,tl-sociocultural,tl-sociopolitical %}
 */

import { getPostData } from './markdown';
import { getFieldGuideContentClass, getFieldGuideBannerClasses } from './field-guide-palettes';

const RESOURCE_TAG_REGEX = /\{%\s*resource\s+([a-z0-9_-]+)\/([a-z0-9_-]+)\s*%\}([\s\S]*?)\{%\s*endresource\s*%\}/gi;
const RESOURCE_COMMENT_REGEX =
  /<!--\s*resource-popover\s+section="([^"]+)"\s+slug="([^"]+)"\s+label="([^"]*)"\s*-->/gi;
const FIELD_GUIDE_CARDS_TAG_REGEX =
  /\{%\s*field-guide-cards\s+([a-z0-9_-]+)\s+([a-z0-9_,\s-]+)\s*%\}/gi;
const FIELD_GUIDE_CARDS_COMMENT_REGEX =
  /(?:<p>\s*)?<!--\s*field-guide-cards\s+section="([^"]+)"\s+slugs="([^"]+)"\s*-->(?:\s*<\/p>)?/gi;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** "ethical-framework" -> "Ethical Framework". Used to derive the sheet's
 * badge label from a card's `card_type` (or the section name, if a card
 * doesn't set one) the same way each field guide page hardcodes its own
 * `badgeLabel` prop today. */
function titleCaseFromSlug(slug: string): string {
  return slug
    .split(/[-_]/)
    .filter(Boolean)
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

/** Rewrites `{% resource section/slug %}Label{% endresource %}` into a stable
 * HTML comment before remark runs, so the label survives GFM/smartypants and
 * remark's raw-HTML passthrough untouched (comments are inline-safe in
 * CommonMark, so this works mid-paragraph as well as on its own line). */
export function preprocessResourcePopoverTags(markdown: string): string {
  return markdown.replace(RESOURCE_TAG_REGEX, (_, section: string, slug: string, label: string) => {
    return `<!-- resource-popover section="${section}" slug="${slug}" label="${encodeURIComponent(label.trim())}" -->`;
  });
}

/** Rewrites `{% field-guide-cards section slug,slug %}` into a comment before remark. */
export function preprocessFieldGuideCardTags(markdown: string): string {
  return markdown.replace(FIELD_GUIDE_CARDS_TAG_REGEX, (_, section: string, slugs: string) => {
    const cleaned = slugs
      .split(',')
      .map(slug => slug.trim())
      .filter(Boolean)
      .join(',');
    return `<!-- field-guide-cards section="${section}" slugs="${cleaned}" -->`;
  });
}

async function getResourcePopoverParts(section: string, slug: string, label?: string) {
  const resource = await getPostData(slug, section);
  const banner = getFieldGuideBannerClasses(section);
  const cardType = (resource as { card_type?: string }).card_type;
  const sectionTitle =
    (resource as { field_guide_section_title?: string }).field_guide_section_title ?? titleCaseFromSlug(section);
  const subtitle = (resource as { subtitle?: string }).subtitle ?? '';
  const title = escapeHtml(resource.title ?? label ?? slug);
  const href = `/field-guide/${section}/${slug}`;
  const badgeLabel = escapeHtml(cardType ? titleCaseFromSlug(cardType) : titleCaseFromSlug(section));
  const moreLinkLabel = escapeHtml(`More ${sectionTitle}`);
  const contentClass = getFieldGuideContentClass(section);
  const body = contentClass
    ? `<div class="${contentClass}">${resource.content ?? ''}</div>`
    : (resource.content ?? '');

  const dataAttrs =
    `data-resource-popover data-resource-title="${title}" data-resource-href="${href}" ` +
    `data-resource-badge="${badgeLabel}" data-resource-more-label="${moreLinkLabel}" ` +
    `data-resource-header-class="${escapeHtml(banner.sheetHeader)}" ` +
    `data-resource-label-class="${escapeHtml(banner.label)}" ` +
    `data-resource-more-class="${escapeHtml(banner.moreLink)}"`;

  return { title, badgeLabel, subtitle: escapeHtml(subtitle), body, dataAttrs, banner };
}

/** Post-render pass: finds `<!-- resource-popover ... -->` comments left by
 * `preprocessResourcePopoverTags`, loads each referenced resource, and
 * replaces the comment with a trigger button plus an inert `<template>`
 * holding everything the sheet needs to render itself identically to
 * `FieldGuideCardPreview` (templates aren't rendered until cloned via JS,
 * which is how real HTML gets smuggled through `dangerouslySetInnerHTML`
 * safely). */
export async function injectResourcePopovers(contentHtml: string): Promise<string> {
  const matches: Array<{ index: number; length: number; section: string; slug: string; label: string }> = [];
  let match: RegExpExecArray | null;

  RESOURCE_COMMENT_REGEX.lastIndex = 0;
  while ((match = RESOURCE_COMMENT_REGEX.exec(contentHtml)) !== null) {
    matches.push({
      index: match.index,
      length: match[0].length,
      section: match[1],
      slug: match[2],
      label: decodeURIComponent(match[3]),
    });
  }

  if (matches.length === 0) {
    return contentHtml;
  }

  let result = contentHtml;
  for (let i = matches.length - 1; i >= 0; i--) {
    const { index, length, section, slug, label } = matches[i];
    const parts = await getResourcePopoverParts(section, slug, label);
    const triggerClass =
      'resource-popover-trigger inline cursor-pointer border-0 bg-transparent p-0 underline decoration-dotted ' +
      'decoration-1 underline-offset-2 hover:decoration-solid [color:inherit] [font:inherit]';

    const html =
      `<button type="button" class="${triggerClass}" ${parts.dataAttrs}>` +
      `${escapeHtml(label)}</button>` +
      `<template data-resource-popover-body>${parts.body}</template>`;

    result = result.slice(0, index) + html + result.slice(index + length);
  }

  return result;
}

/** Post-render pass for `{% field-guide-cards %}`. Renders the same card grid
 * as `FieldGuideCardPreview`; each card opens the shared resource sheet. */
export async function injectFieldGuideCards(contentHtml: string): Promise<string> {
  const matches: Array<{ index: number; length: number; section: string; slugs: string[] }> = [];
  let match: RegExpExecArray | null;

  FIELD_GUIDE_CARDS_COMMENT_REGEX.lastIndex = 0;
  while ((match = FIELD_GUIDE_CARDS_COMMENT_REGEX.exec(contentHtml)) !== null) {
    matches.push({
      index: match.index,
      length: match[0].length,
      section: match[1],
      slugs: match[2]
        .split(',')
        .map(slug => slug.trim())
        .filter(Boolean),
    });
  }

  if (matches.length === 0) {
    return contentHtml;
  }

  let result = contentHtml;
  for (let i = matches.length - 1; i >= 0; i--) {
    const { index, length, section, slugs } = matches[i];
    const cards = await Promise.all(slugs.map(slug => getResourcePopoverParts(section, slug)));
    const gridClass = 'not-prose my-6 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2';
    const cardClass =
      'group flex h-full w-full flex-col items-start gap-2 rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-colors dark:border-gray-800 dark:bg-black';

    const html =
      `<div class="${gridClass}">` +
      cards
        .map(card => {
          const hover = card.banner.previewCardHover;
          const badge = card.banner.previewBadge;
          const titleHover = card.banner.previewTitleHover;
          return (
            `<div class="h-full">` +
            `<button type="button" class="${cardClass} ${hover}" ${card.dataAttrs}>` +
            `<span class="rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge}">${card.badgeLabel}</span>` +
            `<span class="text-lg font-semibold text-gray-950 dark:text-gray-50 ${titleHover}">${card.title}</span>` +
            (card.subtitle
              ? `<span class="flex-1 text-sm leading-6 text-gray-600 dark:text-gray-400">${card.subtitle}</span>`
              : '') +
            `</button>` +
            `<template data-resource-popover-body>${card.body}</template>` +
            `</div>`
          );
        })
        .join('') +
      `</div>`;

    result = result.slice(0, index) + html + result.slice(index + length);
  }

  return result;
}
