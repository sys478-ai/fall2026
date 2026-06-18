const PROTECTED_BLOCK_ATTRS = ['data-pattern-case-tabs', 'data-sequence'];

function findBalancedDivBlock(html: string, openIndex: number) {
  const openTagEnd = html.indexOf('>', openIndex);
  if (openTagEnd === -1) {
    return null;
  }

  let depth = 1;
  let i = openTagEnd + 1;

  while (i < html.length && depth > 0) {
    const nextOpen = html.slice(i).search(/<div\b/i);
    const nextClose = html.slice(i).search(/<\/div>/i);

    if (nextClose === -1) {
      return null;
    }

    const nextOpenIndex = nextOpen === -1 ? -1 : i + nextOpen;
    const nextCloseIndex = i + nextClose;

    if (nextOpenIndex !== -1 && nextOpenIndex < nextCloseIndex) {
      depth += 1;
      i = nextOpenIndex + 4;
    } else {
      depth -= 1;
      if (depth === 0) {
        return {
          start: openIndex,
          end: nextCloseIndex + 6,
        };
      }
      i = nextCloseIndex + 6;
    }
  }

  return null;
}

function findProtectedRanges(html: string): Array<{ start: number; end: number }> {
  const ranges: Array<{ start: number; end: number }> = [];

  for (const attr of PROTECTED_BLOCK_ATTRS) {
    const openPattern = new RegExp(`<div\\b[^>]*\\b${attr}\\b[^>]*>`, 'gi');
    let match: RegExpExecArray | null;

    openPattern.lastIndex = 0;
    while ((match = openPattern.exec(html)) !== null) {
      const block = findBalancedDivBlock(html, match.index);
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
    currentLabel = getPlainTextFromHtml(match[1]);
    currentStart = match.index + match[0].length;
  }

  const finalContent = content.slice(currentStart).trim();
  if (finalContent) {
    sections.push({ label: currentLabel, content: finalContent });
  }

  return sections;
}
