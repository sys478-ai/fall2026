/**
 * Lightweight helpers to handle Jekyll-style custom tags in markdown.
 *
 * We currently support:
 *   - {% sequence %} / {% step %} / {% endstep %} / {% endsequence %} (see sequence.ts)
 *   - {% collapsible %} / {% collapsible closed %}
 *   - {% flip-cards tone="benefit|harm" %} / {% flip-card %} (see flip-cards.ts)
 *   - {% examples %} (see example-slider.ts)
 *   - {% schedule %} (see schedule-embed.ts)
 *   - {% step-strip %} / {% endstep-strip %} (see step-strip.ts)
 *   - {% no-copy %}
 *   - {: .class #id } (Kramdown-style inline attribute lists)
 *
 * For now, we implement these as a pre-processing step that rewrites tags
 * into HTML comments, which are then consumed by the existing HTML
 * post-processors in `markdown.ts`.
 *
 * This keeps the implementation small while giving you Jekyll-like
 * authoring syntax in your markdown.
 */

/**
 * Replace custom tag syntax in raw markdown with internal HTML comments
 * that the existing HTML post-processors already understand.
 */
export function preprocessMarkdownTags(markdown: string): string {
  let result = markdown;

  // {% collapsible closed %} -> <!-- collapsible closed -->
  result = result.replace(/{%\s*collapsible\s+closed\s*%}/gi, '<!-- collapsible closed -->');

  // {% collapsible %} -> <!-- collapsible -->
  result = result.replace(/{%\s*collapsible\s*%}/gi, '<!-- collapsible -->');

  // {% no-copy %} -> <!-- no-copy-button -->
  result = result.replace(/{%\s*no-copy\s*%}/gi, '<!-- no-copy-button -->');

  // {: .class #id } / {:.class} / {:. class} -> <!-- .class --> (consumed by markdown post-processor)
  // Matches Kramdown-style inline attribute lists on their own line
  result = result.replace(/^\s*\{\:\s*([^}]+)\}\s*$/gm, (_match, attrs: string) => {
    const tokens = attrs.trim().split(/\s+/).filter(Boolean);
    const classes: string[] = [];

    for (const token of tokens) {
      if (token.startsWith('.')) {
        const cls = token.slice(1);
        if (cls) classes.push(cls);
      } else if (token.startsWith('#')) {
        // IDs are ignored by the class comment handler; skip for now
        continue;
      } else {
        // Bare token from quirks like `{:. table-simple}` → ".", "table-simple"
        classes.push(token);
      }
    }

    if (classes.length === 0) {
      return _match;
    }

    return classes.map(cls => `<!-- .${cls} -->`).join('\n');
  });

  return result;
}
