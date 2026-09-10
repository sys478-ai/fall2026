'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'course-overview-topic-open';
export const COURSE_OVERVIEW_SET_ALL_EVENT = 'course-overview-set-all';
const COURSE_OVERVIEW_SECTION_CHANGED_EVENT = 'course-overview-section-changed';

export function readTopicOpenMap(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    return parsed as Record<string, boolean>;
  } catch {
    return {};
  }
}

export function writeTopicOpenState(topicId: number, open: boolean) {
  try {
    const next = { ...readTopicOpenMap(), [String(topicId)]: open };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage failures (private mode, quota, etc.).
  }

  // Defer so listeners don't setState during another component's update.
  queueMicrotask(() => {
    window.dispatchEvent(new Event(COURSE_OVERVIEW_SECTION_CHANGED_EVENT));
  });
}

export function setAllTopicsOpen(topicIds: number[], open: boolean) {
  try {
    const next = { ...readTopicOpenMap() };
    topicIds.forEach(id => {
      next[String(id)] = open;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage failures.
  }

  window.dispatchEvent(
    new CustomEvent(COURSE_OVERVIEW_SET_ALL_EVENT, {
      detail: { open },
    })
  );
}

function areAllTopicsOpen(topicIds: number[]) {
  const map = readTopicOpenMap();
  // Sections default to open when no stored value exists.
  return topicIds.every(id => map[String(id)] !== false);
}

export default function CourseScheduleExpandControls({ topicIds }: { topicIds: number[] }) {
  const [allExpanded, setAllExpanded] = useState(true);

  useEffect(() => {
    function syncFromStorage() {
      setAllExpanded(areAllTopicsOpen(topicIds));
    }

    syncFromStorage();
    window.addEventListener(COURSE_OVERVIEW_SET_ALL_EVENT, syncFromStorage);
    window.addEventListener(COURSE_OVERVIEW_SECTION_CHANGED_EVENT, syncFromStorage);
    return () => {
      window.removeEventListener(COURSE_OVERVIEW_SET_ALL_EVENT, syncFromStorage);
      window.removeEventListener(COURSE_OVERVIEW_SECTION_CHANGED_EVENT, syncFromStorage);
    };
  }, [topicIds]);

  function toggleAll() {
    const next = !allExpanded;
    setAllTopicsOpen(topicIds, next);
    setAllExpanded(next);
  }

  return (
    <button
      type="button"
      onClick={toggleAll}
      className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full p-2 text-black transition-all duration-200 hover:bg-gray-200 hover:text-sky-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100"
      aria-expanded={allExpanded}
      aria-label={allExpanded ? 'Collapse all topics' : 'Expand all topics'}
    >
      <span className="relative inline-flex flex-col items-center justify-center">
        {allExpanded ? (
          <>
            <i className="fa-solid fa-chevron-down text-[0.8rem] leading-none" aria-hidden="true" />
            <i className="fa-solid fa-chevron-up -mt-0.5 text-[0.8rem] leading-none" aria-hidden="true" />
          </>
        ) : (
          <>
            <i className="fa-solid fa-chevron-up text-[0.8rem] leading-none" aria-hidden="true" />
            <i className="fa-solid fa-chevron-down -mt-0.5 text-[0.8rem] leading-none" aria-hidden="true" />
          </>
        )}
      </span>
    </button>
  );
}
