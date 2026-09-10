'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import {
  COURSE_OVERVIEW_SET_ALL_EVENT,
  readTopicOpenMap,
  writeTopicOpenState,
} from '@/components/CourseScheduleExpandControls';

export default function CourseScheduleTopicSection({
  topicId,
  title,
  dateRange,
  defaultOpen = true,
  children,
}: {
  topicId: number;
  title: string;
  dateRange?: string | null;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    const stored = readTopicOpenMap()[String(topicId)];
    if (typeof stored === 'boolean') {
      setOpen(stored);
    }
  }, [topicId]);

  useEffect(() => {
    function handleSetAll(event: Event) {
      const detail = (event as CustomEvent<{ open: boolean }>).detail;
      if (typeof detail?.open !== 'boolean') return;
      setOpen(detail.open);
    }

    window.addEventListener(COURSE_OVERVIEW_SET_ALL_EVENT, handleSetAll);
    return () => window.removeEventListener(COURSE_OVERVIEW_SET_ALL_EVENT, handleSetAll);
  }, []);

  function toggleOpen() {
    const next = !open;
    setOpen(next);
    writeTopicOpenState(topicId, next);
  }

  return (
    <section>
      <div className="sticky top-0 z-10 py-6 pb-4 -mx-1 border-b border-gray-200 bg-white/95 px-1 backdrop-blur dark:border-gray-800 dark:bg-black/95">
        <button
          type="button"
          onClick={toggleOpen}
          aria-expanded={open}
          className="flex w-full items-center gap-2 py-2.5 text-left text-black no-underline! dark:text-white"
        >
          <ChevronDownIcon
            className={`mt-0.5 h-5 w-5 shrink-0 text-black transition-transform duration-200 dark:text-white ${
              open ? '' : '-rotate-90'
            }`}
            aria-hidden="true"
          />
          <h2 className="mt-0! mb-0! min-w-0 flex-1 text-lg leading-none font-semibold text-black dark:text-white">
            Topic {topicId}. {title}
          </h2>
          {dateRange ? (
            <span className="shrink-0 text-sm font-medium leading-none tabular-nums text-gray-500 dark:text-gray-400">
              {dateRange}
            </span>
          ) : null}
        </button>
      </div>

      {open ? children : null}
    </section>
  );
}
