'use client';

import { useMemo, useState } from 'react';
import FieldGuidePreviewIndex from '@/components/FieldGuidePreviewIndex';
import type { FieldGuidePreviewItem } from '@/components/FieldGuideCardPreview';
import type { FieldGuideBannerClasses } from '@/lib/field-guide-palettes';

export interface ExamplesFilterOption {
  value: string;
  label: string;
  count: number;
}

interface ExamplesFilterIndexProps {
  items: FieldGuidePreviewItem[];
  sectorOptions: ExamplesFilterOption[];
  familyOptions: ExamplesFilterOption[];
  banner: FieldGuideBannerClasses;
}

const SELECT_CLASS =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200 dark:border-gray-700 dark:bg-black dark:text-gray-100 dark:focus:ring-violet-900';

export default function ExamplesFilterIndex({ items, sectorOptions, familyOptions, banner }: ExamplesFilterIndexProps) {
  const [sector, setSector] = useState('');
  const [family, setFamily] = useState('');

  const filtered = useMemo(
    () =>
      items.filter(
        item =>
          (!sector || item.filterSectors?.includes(sector)) && (!family || item.filterFamilies?.includes(family))
      ),
    [items, sector, family]
  );

  const isFiltered = sector !== '' || family !== '';

  const toolbar = (
    <div className="flex flex-wrap items-end gap-x-4 gap-y-3">
      <div className="w-full sm:w-56">
        <label htmlFor="examples-filter-sector" className="mb-1 block text-sm font-semibold text-gray-800 dark:text-gray-200">
          Sector
        </label>
        <select
          id="examples-filter-sector"
          value={sector}
          onChange={event => setSector(event.target.value)}
          className={SELECT_CLASS}
        >
          <option value="">All sectors</option>
          {sectorOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label} ({option.count})
            </option>
          ))}
        </select>
      </div>
      <div className="w-full sm:w-72">
        <label htmlFor="examples-filter-family" className="mb-1 block text-sm font-semibold text-gray-800 dark:text-gray-200">
          Pattern family
        </label>
        <select
          id="examples-filter-family"
          value={family}
          onChange={event => setFamily(event.target.value)}
          className={SELECT_CLASS}
        >
          <option value="">All pattern families</option>
          {familyOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label} ({option.count})
            </option>
          ))}
        </select>
      </div>
      {isFiltered && (
        <button
          type="button"
          onClick={() => {
            setSector('');
            setFamily('');
          }}
          className="cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-50 dark:text-violet-300 dark:hover:bg-violet-950/40"
        >
          Clear filters
        </button>
      )}
    </div>
  );

  const summary = (
    <p className="m-0 text-sm text-gray-600 dark:text-gray-400" aria-live="polite">
      Showing {filtered.length} of {items.length} examples
    </p>
  );

  return (
    <FieldGuidePreviewIndex
      sections={[{ key: 'all', items: filtered }]}
      badgeLabel="Example"
      linkBasePath="/field-guide/examples"
      moreLinkLabel="More examples"
      banner={banner}
      sheetTitleIdPrefix="example-list-sheet"
      toolbar={toolbar}
      summary={summary}
      emptyState={
        <p className="px-4 py-10 text-base text-gray-700 dark:text-gray-300 md:px-16">
          No examples match both filters. Try clearing one of them.
        </p>
      }
    />
  );
}
