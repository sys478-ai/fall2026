/**
 * Example slider blocks for field guide card markdown.
 *
 * Authoring syntax:
 *
 * {% examples %}
 *
 * Inserts a tabbed slider of example cards linked to the current card via
 * `connected_cards` in each example's frontmatter. Place the tag anywhere in
 * the markdown body.
 *
 * Optional attributes:
 * - `section="sts-concepts"` — override the field guide section used to match
 *   connected_cards (defaults to the content subdirectory being rendered).
 */

import { getExamplesForCard, type ExampleForCard } from './examples';

const EXAMPLE_SLIDER_TAG_REGEX = /\{%\s*examples(\s[^%]*?)?\s*%\}/gi;
const EXAMPLE_SLIDER_COMMENT_REGEX = /<!--\s*example-slider(?:\s+([^>]*))?\s*-->/gi;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function parseSliderAttributes(attrString?: string): { section?: string } {
  if (!attrString?.trim()) {
    return {};
  }

  const sectionMatch = attrString.match(/section=["']([^"']+)["']/i);
  return {
    section: sectionMatch?.[1]?.trim(),
  };
}

function renderInterpretationBox(interpretation: string): string {
  if (!interpretation) {
    return '';
  }

  return `<div class="mt-5 rounded-lg border border-violet-200 bg-violet-50 p-4 dark:border-violet-800 dark:bg-violet-950/30"><p class="mb-1 text-xs font-semibold uppercase tracking-widest text-violet-700 dark:text-violet-400">How this connects</p><p class="mb-0 text-sm leading-6 text-gray-800 dark:text-gray-200">${escapeHtml(interpretation)}</p></div>`;
}

function renderExampleSlider(examples: ExampleForCard[]): string {
  if (examples.length === 0) {
    return '';
  }

  const fadeEdges =
    examples.length > 2
      ? `<div class="pointer-events-none absolute bottom-px left-0 top-0 z-10 w-6 bg-linear-to-r from-white to-transparent dark:from-black"></div><div class="pointer-events-none absolute bottom-px right-0 top-0 z-10 w-6 bg-linear-to-l from-white to-transparent dark:from-black"></div>`
      : '';

  const tabButtons = examples
    .map((example, index) => {
      const selected = index === 0 ? 'true' : 'false';
      return `<button type="button" id="${example.slug}-tab" role="tab" aria-selected="${selected}" aria-controls="${example.slug}-panel" data-tab-id="${escapeHtml(example.slug)}" class="pattern-case-tabs__tab">${escapeHtml(example.title)}</button>`;
    })
    .join('\n');

  const panels = examples
    .map((example, index) => {
      const hidden = index === 0 ? '' : ' hidden';
      return `<div id="${example.slug}-panel" role="tabpanel" aria-labelledby="${example.slug}-tab" data-tab-panel="${escapeHtml(example.slug)}" class="pattern-case-tabs__panel"${hidden}>
  <h3 class="m-0! mb-4! text-2xl font-semibold text-gray-950 dark:text-gray-50">${escapeHtml(example.title)}</h3>
  <div class="prose prose-lg max-w-none">${example.content}${renderInterpretationBox(example.interpretation)}</div>
</div>`;
    })
    .join('\n');

  return `<div class="pattern-case-tabs min-w-0 space-y-5" data-pattern-case-tabs data-toc-exclude="true">
  <div class="relative min-w-0 max-w-full">
    ${fadeEdges}
    <div class="pattern-case-tabs__tablist" role="tablist" aria-label="Example case studies">
${tabButtons}
    </div>
  </div>
${panels}
</div>`;
}

export function preprocessExampleSliderTags(markdown: string): string {
  return markdown.replace(EXAMPLE_SLIDER_TAG_REGEX, (_, attrString: string | undefined) => {
    const attrs = attrString?.trim();
    return attrs ? `<!-- example-slider ${attrs} -->` : '<!-- example-slider -->';
  });
}

export async function injectExampleSliders(
  contentHtml: string,
  cardNum: string,
  defaultSection: string,
): Promise<string> {
  const matches: Array<{ index: number; length: number; section?: string }> = [];
  let match: RegExpExecArray | null;

  EXAMPLE_SLIDER_COMMENT_REGEX.lastIndex = 0;
  while ((match = EXAMPLE_SLIDER_COMMENT_REGEX.exec(contentHtml)) !== null) {
    const { section } = parseSliderAttributes(match[1]);
    matches.push({
      index: match.index,
      length: match[0].length,
      section,
    });
  }

  if (matches.length === 0) {
    return contentHtml;
  }

  let result = contentHtml;
  for (let i = matches.length - 1; i >= 0; i--) {
    const { index, length, section } = matches[i];
    const examples = await getExamplesForCard(cardNum, section || defaultSection);
    const sliderHtml = renderExampleSlider(examples);
    result = result.slice(0, index) + sliderHtml + result.slice(index + length);
  }

  return result;
}
