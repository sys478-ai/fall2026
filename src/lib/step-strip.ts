/**
 * Horizontal step card strips for markdown content.
 *
 * Authoring syntax:
 *
 * {% step-strip %}
 * Optional intro markdown before the first step.
 *
 * ### 1. First step title
 * Step body markdown (images, paragraphs, etc.).
 *
 * ### 2. Second step title
 * More markdown.
 * {% endstep-strip %}
 *
 * Steps are defined with `###` headings. Content before the first heading
 * becomes intro text above the card row.
 */

import { splitPatternSubsections } from './pattern-content-sections';

const STEP_STRIP_START_REGEX = /\{%\s*step-strip\s*%\}/gi;
const STEP_STRIP_END_REGEX = /\{%\s*endstep-strip\s*%\}/gi;
const STEP_STRIP_BLOCK_REGEX = /<!--\s*step-strip\s*-->([\s\S]*?)<!--\s*endstep-strip\s*-->/gi;

const STEP_STRIP_CARD_CONTENT_CLASS =
  '[&_blockquote]:mb-0 [&_blockquote]:mt-4 [&_img]:mb-4 [&_img]:aspect-4/3 [&_img]:w-full [&_img]:max-w-none [&_img]:rounded-xl [&_img]:object-cover';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderStepStrip(blockHtml: string): string {
  const { intro, items } = splitPatternSubsections(blockHtml);

  if (items.length === 0) {
    return blockHtml.trim();
  }

  const introHtml = intro.trim()
    ? `<div class="step-strip-intro prose prose-lg max-w-none">${intro.trim()}</div>`
    : '';

  const cards = items
    .map(
      item => `<article class="step-strip-card min-w-0 shrink-0 snap-start rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-black w-80 sm:w-96">
  <h3 class="m-0! mb-4! text-lg font-semibold leading-tight text-gray-950 dark:text-gray-50">${escapeHtml(item.label)}</h3>
  <div class="step-strip-card-content prose prose-lg max-w-none ${STEP_STRIP_CARD_CONTENT_CLASS}">${item.content.trim()}</div>
</article>`,
    )
    .join('\n');

  return `<div class="step-strip space-y-6" data-step-strip data-toc-exclude="true">
${introHtml}
<div class="relative min-w-0">
  <div class="pointer-events-none absolute bottom-4 left-0 top-0 z-10 w-8 bg-linear-to-r from-white to-transparent dark:from-black"></div>
  <div class="pointer-events-none absolute bottom-4 right-0 top-0 z-10 w-8 bg-linear-to-l from-white to-transparent dark:from-black"></div>
  <div class="step-strip-track flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden pb-4 pr-8 scrollbar-none [&::-webkit-scrollbar]:hidden">
${cards}
  </div>
</div>
</div>`;
}

export function preprocessStepStripTags(markdown: string): string {
  return markdown
    .replace(STEP_STRIP_START_REGEX, '<!-- step-strip -->')
    .replace(STEP_STRIP_END_REGEX, '<!-- endstep-strip -->');
}

export function postprocessStepStrips(contentHtml: string): string {
  return contentHtml.replace(STEP_STRIP_BLOCK_REGEX, (_, block: string) => renderStepStrip(block));
}
