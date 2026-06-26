/**
 * Flip card grids for markdown content.
 *
 * Authoring syntax:
 *
 * {% flip-cards tone="benefit" %}
 * {% flip-card icon="fa-eye" title="Privacy Loss" %}
 * Front-side prompt or question.
 *
 * ---
 *
 * Back-side explanation. Use blank lines for multiple paragraphs.
 * {% endflip-card %}
 * {% endflip-cards %}
 *
 * - `icon` accepts `fa-eye` or a full Font Awesome class list (`fa-solid fa-eye`).
 * - `tone` on the grid: `benefit` (light green), `harm` (light orange), or omit for default violet.
 * - Front and back are separated by a line containing only `---`.
 */

const FLIP_CARD_BLOCK_REGEX =
  /\{%\s*flip-cards(\s[^%]*?)?\s*%\}([\s\S]*?)\{%\s*endflip-cards\s*%\}/gi;
const FLIP_CARD_REGEX =
  /\{%\s*flip-card\s+([^%]*?)\s*%\}([\s\S]*?)\{%\s*endflip-card\s*%\}/gi;

const VALID_TONES = new Set(['benefit', 'harm', 'default']);

const FRONT_BACK_DELIMITER = /^\s*---\s*$/m;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeHtmlAttribute(text: string): string {
  return escapeHtml(text).replace(/'/g, '&#39;');
}

function sanitizeHref(rawHref: string): string {
  const href = rawHref.trim();

  if (
    href.startsWith('/') ||
    href.startsWith('./') ||
    href.startsWith('../') ||
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('#')
  ) {
    return href;
  }

  return '#';
}

function formatInlineText(text: string): string {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let result = '';
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    const [fullMatch, label, href] = match;
    const prefix = text.slice(lastIndex, match.index);
    result += escapeHtml(prefix);
    result += `<a href="${escapeHtmlAttribute(sanitizeHref(href))}">${escapeHtml(label.trim())}</a>`;
    lastIndex = match.index + fullMatch.length;
  }

  result += escapeHtml(text.slice(lastIndex));

  return result
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function parseFlipCardsAttributes(attrString?: string): { tone: string } {
  if (!attrString?.trim()) {
    return { tone: 'default' };
  }

  const toneMatch = attrString.match(/tone=["']([^"']+)["']/i);
  const tone = toneMatch?.[1]?.trim().toLowerCase() || 'default';

  if (!VALID_TONES.has(tone)) {
    throw new Error(`flip-cards tone must be benefit, harm, or default. Got: ${tone}`);
  }

  return { tone };
}

function parseFlipCardAttributes(attrString: string): { icon: string; title: string } {
  const iconMatch = attrString.match(/icon=["']([^"']+)["']/i);
  const titleMatch = attrString.match(/title=["']([^"']+)["']/i);

  if (!titleMatch) {
    throw new Error(`flip-card is missing required title attribute: ${attrString.trim()}`);
  }

  const rawIcon = iconMatch?.[1]?.trim() || 'fa-circle-question';
  const iconClass = rawIcon.includes('fa-') && rawIcon.includes(' ')
    ? rawIcon
    : `fa-solid ${rawIcon.startsWith('fa-') ? rawIcon : `fa-${rawIcon}`}`;

  return {
    icon: iconClass,
    title: titleMatch[1].trim(),
  };
}

function splitFrontBack(content: string): { front: string; back: string } {
  const match = content.match(FRONT_BACK_DELIMITER);
  if (!match || match.index === undefined) {
    throw new Error('flip-card content must include a line with only --- between front and back.');
  }

  return {
    front: content.slice(0, match.index).trim(),
    back: content.slice(match.index + match[0].length).trim(),
  };
}

function formatCardText(text: string): string {
  const paragraphs = text.split(/\n\s*\n+/).map(part => part.trim()).filter(Boolean);
  if (paragraphs.length === 0) {
    return '';
  }

  return paragraphs.map(paragraph => `<p>${formatInlineText(paragraph)}</p>`).join('');
}

function renderFlipCard(icon: string, title: string, front: string, back: string): string {
  const safeTitle = escapeHtml(title);
  const frontHtml = formatCardText(front);
  const backHtml = formatCardText(back);

  return `<div class="flip-card" aria-label="${safeTitle} — click to flip">
  <div class="flip-card-inner">
    <div class="flip-card-front">
      <div class="flip-card-icon"><i class="${escapeHtml(icon)}" aria-hidden="true"></i></div>
      <h3>${safeTitle}</h3>
      ${frontHtml}
      <span class="flip-card-hint">Click to flip</span>
    </div>
    <div class="flip-card-back">
      <h3>${safeTitle}</h3>
      ${backHtml}
    </div>
  </div>
</div>`;
}

function renderFlipCardGrid(block: string, attrString?: string): string {
  const { tone } = parseFlipCardsAttributes(attrString);
  const cards: string[] = [];
  let cardMatch: RegExpExecArray | null;

  FLIP_CARD_REGEX.lastIndex = 0;
  while ((cardMatch = FLIP_CARD_REGEX.exec(block)) !== null) {
    const { icon, title } = parseFlipCardAttributes(cardMatch[1]);
    const { front, back } = splitFrontBack(cardMatch[2]);
    cards.push(renderFlipCard(icon, title, front, back));
  }

  if (cards.length === 0) {
    throw new Error('flip-cards block must contain at least one flip-card.');
  }

  const toneClass = tone === 'default' ? '' : ` flip-card-grid--${tone}`;

  return `<div class="flip-card-grid${toneClass}" data-toc-exclude="true">\n${cards.join('\n')}\n</div>`;
}

export function preprocessFlipCards(markdown: string): string {
  return markdown.replace(
    FLIP_CARD_BLOCK_REGEX,
    (_, attrString: string | undefined, block: string) => renderFlipCardGrid(block, attrString),
  );
}
