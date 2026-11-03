/**
 * Reusable markdown snippets.
 *
 * Authoring syntax:
 *
 * {% include design-resources %}
 *
 * Replaces the tag with the contents of `content/snippets/<name>.md`
 * (snippets have no front matter). Snippets may themselves use other custom tags,
 * so this must run before the other preprocessors.
 */

import fs from 'fs';
import path from 'path';

const snippetsDirectory = path.join(process.cwd(), 'content', 'snippets');
const INCLUDE_TAG_REGEX = /\{%\s*include\s+([a-z0-9_-]+)\s*%\}/gi;

export function preprocessIncludeTags(markdown: string): string {
  return markdown.replace(INCLUDE_TAG_REGEX, (_match, name: string) => {
    const snippetPath = path.join(snippetsDirectory, `${name}.md`);
    if (!fs.existsSync(snippetPath)) {
      throw new Error(`Snippet not found: content/snippets/${name}.md`);
    }
    return '\n' + fs.readFileSync(snippetPath, 'utf8').trim() + '\n';
  });
}
