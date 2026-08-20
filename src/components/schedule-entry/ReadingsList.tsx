'use client'

import { Reading } from './types';
import { groupReadingsByPickOne } from '@/lib/reading-groups';

interface ReadingsListProps {
  readings: Reading[];
  isOptional?: boolean;
  title: string;
  meetingKey: string;
  checklist: {
    isChecked: (key: string) => boolean;
    toggleChecked: (key: string) => void;
  };
  enableChecklist: boolean;
  isDark: boolean;
}

function ReadingItemRow({
  reading,
  itemKey,
  checklist,
  enableChecklist,
  isDark,
}: {
  reading: Reading;
  itemKey: string;
  checklist: ReadingsListProps['checklist'];
  enableChecklist: boolean;
  isDark: boolean;
}) {
  const isChecked = enableChecklist ? checklist.isChecked(itemKey) : false;

  return (
    <div className="flex items-start gap-2">
      <input
        type="checkbox"
        aria-label={`Mark reading "${reading.citation}" as ${isChecked ? 'unread' : 'read'}`}
        checked={isChecked}
        onChange={() => enableChecklist && checklist.toggleChecked(itemKey)}
        disabled={!enableChecklist}
        onClick={(e) => e.stopPropagation()}
        className="mt-1 w-4 h-4 rounded border-2 border-gray-300 dark:border-gray-600 accent-blue-600 dark:accent-blue-400 cursor-pointer flex-shrink-0"
        style={isDark ? {
          backgroundColor: isChecked ? '#3b82f6' : '#1f2937',
          borderColor: isChecked ? '#3b82f6' : '#4b5563'
        } : undefined}
      />
      <div className={`flex-1 ${isChecked ? '!line-through opacity-60' : ''}`}>
        {reading.citation} {" "}
        {reading.url && (
          <a href={reading.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline" onClick={(e) => e.stopPropagation()}>
            Link
          </a>
        )}
        {reading.notes && (
          <div className="text-sm italic text-gray-500 dark:text-gray-400" style={isDark ? { color: '#9ca3af' } : undefined}>
            {reading.notes}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ReadingsList({
  readings,
  isOptional,
  title,
  meetingKey,
  checklist,
  enableChecklist,
  isDark,
}: ReadingsListProps) {
  if (readings.length === 0) {
    return null;
  }

  const readingKind = isOptional ? 'optional-reading' : 'reading';

  return (
    <div className="mb-6">
      <strong className="text-gray-700 dark:text-gray-300" style={isDark ? { color: '#d1d5db' } : undefined}>{title}</strong>
      <ol className="!list-none !pl-4">
        {groupReadingsByPickOne(readings).map((group, groupIndex) =>
          group.kind === 'single' ? (
            <li key={groupIndex} className="mb-0 text-gray-700 dark:text-gray-300">
              <ReadingItemRow
                reading={group.reading}
                itemKey={`${meetingKey}-${readingKind}-${groupIndex}`}
                checklist={checklist}
                enableChecklist={enableChecklist}
                isDark={isDark}
              />
            </li>
          ) : (
            <li key={groupIndex} className="mb-0 text-gray-700 dark:text-gray-300">
              Pick one
              <ol className="!list-none !pl-4">
                {group.options.map((reading, optionIndex) => (
                  <li key={optionIndex} className="mb-0 text-gray-700 dark:text-gray-300">
                    <ReadingItemRow
                      reading={reading}
                      itemKey={`${meetingKey}-${readingKind}-${groupIndex}-${optionIndex}`}
                      checklist={checklist}
                      enableChecklist={enableChecklist}
                      isDark={isDark}
                    />
                  </li>
                ))}
              </ol>
            </li>
          )
        )}
      </ol>
    </div>
  );
}
