/**
 * Embeddable course schedule for markdown pages.
 *
 * Authoring syntax:
 *
 * {% schedule %}
 *
 * Place the tag anywhere in markdown. On the syllabus page, it renders the
 * module/meeting schedule list. On other pages the marker is inert.
 */

export const SCHEDULE_EMBED_COMMENT = '<!-- schedule-embed -->';

const SCHEDULE_TAG_REGEX = /\{%\s*schedule\s*%\}/gi;
const SCHEDULE_EMBED_REGEX = /<!--\s*schedule-embed\s*-->/gi;

export type ScheduleContentPart =
  | { type: 'markdown'; content: string }
  | { type: 'schedule' };

export function preprocessScheduleTags(markdown: string): string {
  return markdown.replace(SCHEDULE_TAG_REGEX, SCHEDULE_EMBED_COMMENT);
}

export function splitContentOnScheduleEmbed(content: string): ScheduleContentPart[] {
  const parts: ScheduleContentPart[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  SCHEDULE_EMBED_REGEX.lastIndex = 0;
  while ((match = SCHEDULE_EMBED_REGEX.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'markdown', content: content.slice(lastIndex, match.index) });
    }
    parts.push({ type: 'schedule' });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push({ type: 'markdown', content: content.slice(lastIndex) });
  }

  return parts.length > 0 ? parts : [{ type: 'markdown', content }];
}
