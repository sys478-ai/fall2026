'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { writeTopicProgressStatus } from '@/lib/topic-progress';
import { triggerConfetti } from '@/lib/utils';

export type TopicWorkItemType =
  | 'reading'
  | 'optional-reading'
  | 'activity'
  | 'assignment'
  | 'due';

export interface TopicWorkItem {
  id: string;
  type: TopicWorkItemType;
  title: string;
  label?: string;
  href?: string;
  meta?: string;
  optional?: boolean;
  syncKeys?: string[];
}

interface TopicWorkListProps {
  id?: string;
  topicSlug: string;
  items: TopicWorkItem[];
}

const TYPE_LABELS: Record<TopicWorkItemType, string> = {
  reading: 'Reading / Video',
  'optional-reading': 'Optional',
  activity: 'Activity',
  assignment: 'Assigned',
  due: 'Due',
};

function storageKey(topicSlug: string, itemId: string) {
  return `topic-work-${topicSlug}-${itemId}`;
}

function readStoredBoolean(key: string) {
  if (typeof window === 'undefined') {
    return false;
  }

  const value = localStorage.getItem(key);
  if (value === null) {
    return false;
  }

  try {
    return JSON.parse(value) === true;
  } catch {
    return value === 'true';
  }
}

export default function TopicWorkList({ id, topicSlug, items }: TopicWorkListProps) {
  const trackedItems = useMemo(() => items.filter(item => !item.optional), [items]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isReady, setIsReady] = useState(false);
  const previousCompleteRef = useRef(false);
  const userInteractionRef = useRef(false);

  const completion = trackedItems.length === 0
    ? 0
    : trackedItems.filter(item => checkedItems[item.id]).length;
  const completionLabel =
    trackedItems.length === 0
      ? 'No required work'
      : completion === trackedItems.length
        ? 'Complete'
        : completion === 0
          ? 'Not started'
          : 'In progress';

  useEffect(() => {
    const nextCheckedItems: Record<string, boolean> = {};

    items.forEach(item => {
      const keys = [storageKey(topicSlug, item.id), ...(item.syncKeys || [])];
      nextCheckedItems[item.id] = keys.some(readStoredBoolean);
    });

    setCheckedItems(nextCheckedItems);
    previousCompleteRef.current =
      trackedItems.length > 0 && trackedItems.every(trackedItem => nextCheckedItems[trackedItem.id]);
    userInteractionRef.current = false;
    setIsReady(true);
  }, [items, topicSlug, trackedItems]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const isComplete =
      trackedItems.length > 0 && trackedItems.every(trackedItem => checkedItems[trackedItem.id]);
    const completedCount = trackedItems.filter(trackedItem => checkedItems[trackedItem.id]).length;
    const progressStatus =
      trackedItems.length === 0 || completedCount === 0 ? 'not-started' : isComplete ? 'complete' : 'partial';

    writeTopicProgressStatus(topicSlug, progressStatus);

    if (userInteractionRef.current && isComplete && !previousCompleteRef.current) {
      triggerConfetti();
    }

    previousCompleteRef.current = isComplete;
    userInteractionRef.current = false;
  }, [checkedItems, isReady, topicSlug, trackedItems]);

  function setItemChecked(item: TopicWorkItem, checked: boolean) {
    const keys = [storageKey(topicSlug, item.id), ...(item.syncKeys || [])];

    keys.forEach(key => {
      localStorage.setItem(key, JSON.stringify(checked));
    });

    userInteractionRef.current = true;
    setCheckedItems(current => ({
      ...current,
      [item.id]: checked,
    }));
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <section id={id} className="scroll-mt-24 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-black">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-200 pb-4 dark:border-gray-800">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#0b5d8f] dark:text-[#8fc4ee]">
            Topic Work
          </p>
          <h2 className="m-0! text-2xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">
            What to do for this topic
          </h2>
        </div>
        <div className="rounded-full border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 dark:border-gray-800 dark:text-gray-300">
          {completion} / {trackedItems.length} complete · {completionLabel}
        </div>
      </div>

      <div className="mt-4 divide-y divide-gray-200 dark:divide-gray-800">
        {items.map(item => {
          const isChecked = checkedItems[item.id] || false;

          return (
            <div key={item.id} className={`flex gap-3 py-4 ${isChecked ? 'opacity-65' : ''}`}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setItemChecked(item, !isChecked)}
                aria-label={`Mark "${item.title}" as ${isChecked ? 'not done' : 'done'}`}
                className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-2 border-gray-300 accent-[#0b5d8f] dark:border-gray-600 dark:accent-[#8fc4ee]"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-gray-200 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gray-600 dark:border-gray-800 dark:text-gray-400">
                    {item.label || TYPE_LABELS[item.type]}
                  </span>
                  {item.meta && (
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {item.meta}
                    </span>
                  )}
                </div>
                <div className={`mt-1 text-base font-medium ${isChecked ? 'line-through' : ''}`}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-gray-950 no-underline hover:text-[#0b5d8f] dark:text-gray-50 dark:hover:text-[#8fc4ee]"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <span className="text-gray-950 dark:text-gray-50">{item.title}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
