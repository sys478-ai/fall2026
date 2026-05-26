'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { formatTagLabel } from '@/lib/resource-links';

interface TagFilterMultiselectProps {
  options: string[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagFilterMultiselect({
  options,
  selectedTags,
  onChange,
  placeholder = 'Search tags...',
}: TagFilterMultiselectProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return options
      .filter((tag) => !selectedTags.includes(tag))
      .filter((tag) => {
        if (!normalizedQuery) {
          return true;
        }

        return (
          tag.toLowerCase().includes(normalizedQuery) ||
          formatTagLabel(tag).toLowerCase().includes(normalizedQuery)
        );
      });
  }, [options, query, selectedTags]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, filteredOptions.length]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      return;
    }

    onChange([...selectedTags, tag]);
    setQuery('');
    setIsOpen(true);
    inputRef.current?.focus();
  };

  const removeTag = (tag: string) => {
    onChange(selectedTags.filter((value) => value !== tag));
  };

  const clearAll = () => {
    onChange([]);
    setQuery('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) =>
        filteredOptions.length === 0
          ? 0
          : Math.min(current + 1, filteredOptions.length - 1),
      );
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) => Math.max(current - 1, 0));
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      if (isOpen && filteredOptions[activeIndex]) {
        addTag(filteredOptions[activeIndex]);
      }
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      setIsOpen(false);
      return;
    }

    if (event.key === 'Backspace' && query === '' && selectedTags.length > 0) {
      onChange(selectedTags.slice(0, -1));
    }
  };

  return (
    <div ref={containerRef} className="relative max-w-xl">
      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
        Filter by tag
      </label>

      <div
        className={`min-h-11 flex flex-wrap items-center gap-2 rounded-lg border bg-white dark:bg-gray-900 px-3 py-2 transition-colors ${
          isOpen
            ? 'border-blue-500 ring-2 ring-blue-500/20'
            : 'border-gray-300 dark:border-gray-700'
        }`}
        onClick={() => {
          setIsOpen(true);
          inputRef.current?.focus();
        }}
      >
        {selectedTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 px-2.5 py-1 text-sm"
          >
            {formatTagLabel(tag)}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                removeTag(tag);
              }}
              className="rounded-full p-0.5 hover:bg-blue-200 dark:hover:bg-blue-900"
              aria-label={`Remove ${formatTagLabel(tag)} filter`}
            >
              <XMarkIcon className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-autocomplete="list"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={selectedTags.length === 0 ? placeholder : 'Add another tag...'}
          className="min-w-32 flex-1 border-0 bg-transparent p-0 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none"
        />

        <div className="ml-auto flex items-center gap-1">
          {selectedTags.length > 0 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                clearAll();
              }}
              className="rounded px-2 py-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              Clear
            </button>
          )}
          <ChevronDownIcon
            className={`h-4 w-4 text-gray-400 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Available tags"
          className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg"
        >
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
              {query.trim() ? 'No matching tags' : 'All tags selected'}
            </div>
          ) : (
            filteredOptions.map((tag, index) => (
              <div key={tag} role="option" aria-selected={index === activeIndex}>
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => addTag(tag)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors ${
                    index === activeIndex
                      ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-200'
                      : 'text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <span>{formatTagLabel(tag)}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {tag}
                  </span>
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {selectedTags.length > 0 && (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Showing entries that match all selected tags.
        </p>
      )}
    </div>
  );
}
