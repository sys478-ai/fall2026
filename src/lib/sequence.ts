/**
 * Progressive sequence blocks for markdown content.
 *
 * Authoring syntax:
 *
 * {% sequence %}
 * {% step title="Scenario" %}
 * Step content written in normal markdown.
 * {% endstep %}
 * {% step title="Reflect" %}
 * More markdown content.
 * {% endstep %}
 * {% endsequence %}
 *
 * We preprocess the tags into HTML comments so markdown inside each step still
 * renders normally, then postprocess the rendered HTML into a step-by-step UI.
 */

const SEQUENCE_START_REGEX = /\{%\s*sequence\s*%\}/gi;
const SEQUENCE_END_REGEX = /\{%\s*endsequence\s*%\}/gi;
const STEP_START_REGEX = /\{%\s*step\s+([^%]*?)\s*%\}/gi;
const STEP_END_REGEX = /\{%\s*endstep\s*%\}/gi;

const SEQUENCE_BLOCK_REGEX = /<!--\s*sequence\s*-->([\s\S]*?)<!--\s*endsequence\s*-->/gi;
const STEP_BLOCK_REGEX = /<!--\s*step\s+([^>]*)\s*-->([\s\S]*?)<!--\s*endstep\s*-->/gi;

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function stripWrappingParagraphTag(html: string): string {
  const trimmed = html.trim();
  if (/<\/p>\s*<p>/i.test(trimmed)) {
    return trimmed;
  }

  const match = trimmed.match(/^<p>([\s\S]*)<\/p>$/i);

  if (!match) {
    return trimmed;
  }

  return match[1].trim();
}

function parseStepAttributes(attrString: string): { title: string } {
  const titleMatch = attrString.match(/title=["']([^"']+)["']/i);

  if (!titleMatch) {
    throw new Error(`step is missing required title attribute: ${attrString.trim()}`);
  }

  return {
    title: titleMatch[1].trim(),
  };
}

function renderSequenceStep(stepNumber: number, totalSteps: number, title: string, html: string): string {
  return `<section class="sequence-step" data-sequence-step="${stepNumber - 1}" hidden>
  <div class="sequence-step-header">
    <p class="sequence-step-kicker">Step ${stepNumber} of ${totalSteps}</p>
    <h3 class="sequence-step-title">${escapeHtml(title)}</h3>
  </div>
  <div class="sequence-step-content">
    ${html.trim()}
  </div>
</section>`;
}

function renderSequence(block: string): string {
  const steps: Array<{ title: string; html: string }> = [];
  let stepMatch: RegExpExecArray | null;

  STEP_BLOCK_REGEX.lastIndex = 0;
  while ((stepMatch = STEP_BLOCK_REGEX.exec(block)) !== null) {
    const { title } = parseStepAttributes(stepMatch[1]);
    steps.push({
      title,
      html: stripWrappingParagraphTag(stepMatch[2]),
    });
  }

  if (steps.length === 0) {
    throw new Error('sequence block must contain at least one step.');
  }

  const renderedSteps = steps
    .map((step, index) => renderSequenceStep(index + 1, steps.length, step.title, step.html))
    .join('\n');

  return `<div class="sequence" data-sequence data-total-steps="${steps.length}" data-toc-exclude="true">
  <div class="sequence-steps">
${renderedSteps}
  </div>
  <div class="sequence-controls">
    <button type="button" class="sequence-button sequence-button--primary" data-sequence-next>Next</button>
    <button type="button" class="sequence-button sequence-button--secondary" data-sequence-show-all>Show all</button>
  </div>
</div>`;
}

export function preprocessSequenceTags(markdown: string): string {
  return markdown
    .replace(SEQUENCE_START_REGEX, '<!-- sequence -->')
    .replace(SEQUENCE_END_REGEX, '<!-- endsequence -->')
    .replace(STEP_START_REGEX, (_, attrs: string) => `<!-- step ${attrs.trim()} -->`)
    .replace(STEP_END_REGEX, '<!-- endstep -->');
}

export function postprocessSequences(contentHtml: string): string {
  return contentHtml.replace(SEQUENCE_BLOCK_REGEX, (_, block: string) => renderSequence(block));
}
