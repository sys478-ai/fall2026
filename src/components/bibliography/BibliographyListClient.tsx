'use client';

import { useMemo, useState } from 'react';
import {
  formatPublishedDate,
  formatTagLabel,
  linkMatchesTag,
  ResourceLink,
  TagGroup,
} from '@/lib/resource-links';
import TagFilterMultiselect from '@/components/bibliography/TagFilterMultiselect';

interface BibliographyListClientProps {
  links: ResourceLink[];
  tagGroups: TagGroup[];
}

function getAllAvailableTags(links: ResourceLink[], tagGroups: TagGroup[]): string[] {
  const tagSet = new Set<string>();

  tagGroups.forEach((group) => {
    group.tags.forEach((tag) => tagSet.add(tag));
  });

  links.forEach((link) => {
    link.tags.forEach((tag) => tagSet.add(tag));
    if (link.type) {
      tagSet.add(link.type);
    }
  });

  return Array.from(tagSet).sort();
}

export default function BibliographyListClient({
  links,
  tagGroups,
}: BibliographyListClientProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(
    () => getAllAvailableTags(links, tagGroups),
    [links, tagGroups],
  );

  const filteredLinks = useMemo(() => {
    let result = links;

    if (selectedTags.length > 0) {
      result = links.filter((link) =>
        selectedTags.every((tag) => linkMatchesTag(link, tag)),
      );
    }

    return [...result].sort((a, b) => a.title.localeCompare(b.title));
  }, [links, selectedTags]);

  if (links.length === 0) {
    return (
      <p className="text-gray-600 dark:text-gray-400">
        No bibliography entries yet.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <TagFilterMultiselect
        options={allTags}
        selectedTags={selectedTags}
        onChange={setSelectedTags}
        placeholder="Search tags..."
      />

      {filteredLinks.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No entries match the selected tags.
        </p>
      ) : (
        <div className="space-y-4">
          {filteredLinks.map((link) => {
            const metadata = [
              link.authors,
              link.type ? formatTagLabel(link.type) : null,
              link.published ? formatPublishedDate(link.published) : null,
            ].filter(Boolean);

            return (
            <article
              key={link.id}
              className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-white dark:bg-gray-900"
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                {link.title}
              </a>
              {metadata.length > 0 && (
                <p className="text-sm text-gray-600 dark:text-gray-400 m-0 mt-2">
                  {metadata.join(' · ')}
                </p>
              )}
              {link.notes && (
                <p className="text-sm text-gray-700 dark:text-gray-300 m-0 mt-2">
                  {link.notes}
                </p>
              )}
              <div className="flex flex-wrap gap-2 mt-3">
                {link.tags.map((tag) => (
                  <span
                    key={`${link.id}-${tag}`}
                    className="px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {formatTagLabel(tag)}
                  </span>
                ))}
              </div>
            </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
