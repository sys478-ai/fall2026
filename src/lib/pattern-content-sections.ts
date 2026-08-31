interface ProtectedBlockSpec {
  tag: 'div' | 'section';
  attr: string;
}

const PROTECTED_BLOCKS: ProtectedBlockSpec[] = [
  { tag: 'div', attr: 'data-pattern-case-tabs' },
  { tag: 'div', attr: 'data-sequence' },
  { tag: 'section', attr: 'data-footnotes' },
];

function findBalancedTagBlock(html: string, openIndex: number, tagName: string) {
  const openTagEnd = html.indexOf('>', openIndex);
  if (openTagEnd === -1) {
    return null;
  }

  const openPattern = new RegExp(`<${tagName}\\b`, 'gi');
  const closeTag = `</${tagName}>`;
  const closePattern = new RegExp(closeTag, 'gi');
  let depth = 1;
  let i = openTagEnd + 1;

  while (i < html.length && depth > 0) {
    const slice = html.slice(i);
    const nextOpenMatch = slice.match(openPattern);
    const nextCloseMatch = slice.match(closePattern);

    if (!nextCloseMatch) {
      return null;
    }

    const nextOpenIndex = nextOpenMatch ? i + slice.indexOf(nextOpenMatch[0]) : -1;
    const nextCloseIndex = i + slice.indexOf(nextCloseMatch[0]);

    if (nextOpenIndex !== -1 && nextOpenMatch && nextOpenIndex < nextCloseIndex) {
      depth += 1;
      i = nextOpenIndex + nextOpenMatch[0].length;
    } else {
      depth -= 1;
      if (depth === 0) {
        return {
          start: openIndex,
          end: nextCloseIndex + closeTag.length,
        };
      }
      i = nextCloseIndex + closeTag.length;
    }
  }

  return null;
}

function findBalancedDivBlock(html: string, openIndex: number) {
  return findBalancedTagBlock(html, openIndex, 'div');
}

function findProtectedRanges(html: string): Array<{ start: number; end: number }> {
  const ranges: Array<{ start: number; end: number }> = [];

  for (const { tag, attr } of PROTECTED_BLOCKS) {
    const openPattern = new RegExp(`<${tag}\\b[^>]*\\b${attr}\\b[^>]*>`, 'gi');
    let match: RegExpExecArray | null;

    openPattern.lastIndex = 0;
    while ((match = openPattern.exec(html)) !== null) {
      const block = findBalancedTagBlock(html, match.index, tag);
      if (block) {
        ranges.push(block);
      }
    }
  }

  return ranges.sort((a, b) => a.start - b.start);
}

function isInsideProtectedRange(index: number, ranges: Array<{ start: number; end: number }>): boolean {
  return ranges.some(range => index >= range.start && index < range.end);
}

function decodeHtmlText(text: string) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x26;/gi, '&')
    .replace(/&#38;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function getPlainTextFromHtml(html: string) {
  return decodeHtmlText(html.replace(/<[^>]+>/g, '').trim());
}

function getHeadingLabelFromHtml(html: string) {
  const htmlWithBadgeMarkers = html.replace(
    /<span\b[^>]*class=(["'])[^"']*\bbadge\b[^"']*\1[^>]*>([\s\S]*?)<\/span>/gi,
    (_match, _quote, badgeText) => ` [${getPlainTextFromHtml(badgeText)}]`
  );

  return getPlainTextFromHtml(htmlWithBadgeMarkers);
}

function slugifyForId(value: string) {
  return value
    .toLowerCase()
    .replace(/&amp;/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface PatternSubsectionItem {
  id: string;
  label: string;
  content: string;
}

export function contentHasStepStrip(content: string): boolean {
  return /\bdata-step-strip\b/i.test(content);
}

export function splitPatternSubsections(content: string): { intro: string; items: PatternSubsectionItem[] } {
  const headingRegex = /<h3[^>]*>([\s\S]*?)<\/h3>/gi;
  const items: PatternSubsectionItem[] = [];
  let intro = '';
  let currentLabel = '';
  let currentStart = 0;
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const sectionContent = content.slice(currentStart, match.index).trim();
    if (currentLabel && sectionContent) {
      items.push({ id: slugifyForId(currentLabel), label: currentLabel, content: sectionContent });
    } else if (!currentLabel && sectionContent) {
      intro = sectionContent;
    }
    currentLabel = getHeadingLabelFromHtml(match[1]);
    currentStart = match.index + match[0].length;
  }

  const finalContent = content.slice(currentStart).trim();
  if (currentLabel && finalContent) {
    items.push({ id: slugifyForId(currentLabel), label: currentLabel, content: finalContent });
  } else if (!currentLabel && finalContent) {
    intro = finalContent;
  }

  return { intro, items };
}

export function splitPatternContentSections(content: string) {
  const protectedRanges = findProtectedRanges(content);
  const headingRegex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  const sections: Array<{ label: string; content: string }> = [];
  let currentLabel = '';
  let currentStart = 0;
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    if (isInsideProtectedRange(match.index, protectedRanges)) {
      continue;
    }

    const sectionContent = content.slice(currentStart, match.index).trim();
    if (sectionContent) {
      sections.push({ label: currentLabel, content: sectionContent });
    }
    currentLabel = getHeadingLabelFromHtml(match[1]);
    currentStart = match.index + match[0].length;
  }

  const finalContent = content.slice(currentStart).trim();
  if (finalContent) {
    sections.push({ label: currentLabel, content: finalContent });
  }

  return sections;
}
