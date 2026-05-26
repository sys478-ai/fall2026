import resourceLinksConfig from '../../content/config/resource-links.json';

export interface ResourceLink {
  id: string;
  title: string;
  url: string;
  authors?: string;
  tags: string[];
  type?: string;
  published?: string;
  notes?: string;
  added?: string;
  draft?: boolean;
}

export interface TagGroup {
  id: string;
  label: string;
  tags: string[];
}

export interface ResourceLinksConfig {
  tagGroups: TagGroup[];
  links: ResourceLink[];
}

export function getResourceLinksConfig(): ResourceLinksConfig {
  return resourceLinksConfig as ResourceLinksConfig;
}

export function getResourceLinks(options?: { includeDrafts?: boolean }): ResourceLink[] {
  const { links } = getResourceLinksConfig();
  const includeDrafts = options?.includeDrafts ?? false;

  return links.filter((link) => includeDrafts || !link.draft);
}

export function getResourceLinkById(id: string): ResourceLink | undefined {
  return getResourceLinksConfig().links.find((link) => link.id === id);
}

export function getAllTags(links: ResourceLink[]): string[] {
  const tagSet = new Set<string>();
  links.forEach((link) => link.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

export function getPrimaryGroupTag(
  link: ResourceLink,
  tagGroups: TagGroup[],
): string | null {
  for (const group of tagGroups) {
    const match = link.tags.find((tag) => group.tags.includes(tag));
    if (match) {
      return match;
    }
  }

  return link.tags[0] ?? null;
}

export function formatTagLabel(tag: string): string {
  return tag
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function formatPublishedDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  if (!year || !month || !day) {
    return date;
  }

  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function linkMatchesTag(link: ResourceLink, tag: string): boolean {
  return link.tags.includes(tag) || link.type === tag;
}
