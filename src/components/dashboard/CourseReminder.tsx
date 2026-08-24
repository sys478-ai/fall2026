'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import {
  getAssignmentsInWindow,
  getCourseTimeline,
  getUpcomingPrepMeetings,
  type TimelineMeeting,
} from '@/lib/course-dashboard';
import type { DashboardAssignmentInput } from '@/lib/dashboard-assignments';
import { formatDate, formatDueCountdown, parseDueDateTime } from '@/lib/utils';

const DUE_SOON_LIMIT = 5;

export default function CourseReminder({
  meetings,
  assignments,
  panelPlacement = 'bottom',
}: {
  meetings: TimelineMeeting[];
  assignments: DashboardAssignmentInput[];
  /** Where the panel opens relative to the bell. */
  panelPlacement?: 'top' | 'bottom';
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const referenceDate = useMemo(() => (mounted ? new Date() : null), [mounted]);
  const timeline = useMemo(
    () => (referenceDate ? getCourseTimeline(meetings, referenceDate) : null),
    [meetings, referenceDate]
  );
  const prepMeetings = useMemo(
    () => (referenceDate ? getUpcomingPrepMeetings(meetings, referenceDate, 2) : []),
    [meetings, referenceDate]
  );
  const dueSoonAll = useMemo(
    () => (referenceDate ? getAssignmentsInWindow(assignments, referenceDate, 14) : []),
    [assignments, referenceDate]
  );
  const dueSoon = dueSoonAll.slice(0, DUE_SOON_LIMIT);
  const dueSoonTotal = dueSoonAll.length;

  const today = timeline?.todayMeeting || null;
  const todayIsOpenClass = Boolean(today && !today.isHoliday && !today.isDraft && today.slug);
  const todayHref = todayIsOpenClass && today?.slug ? `/topics/${today.slug}` : null;
  const showBadge = mounted && (todayIsOpenClass || dueSoonTotal > 0);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const panelPositionClass =
    panelPlacement === 'top' ? 'bottom-full mb-2 right-0' : 'top-full mt-2 right-0';

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(value => !value)}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:font-semibold hover:text-slate-950 dark:text-slate-300 dark:hover:text-slate-100"
        aria-label="What's next"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <BellIcon className="h-5 w-5" />
        {showBadge ? (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-slate-50 dark:ring-slate-950" />
        ) : null}
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="What's next"
          className={`absolute z-50 w-[min(24rem,calc(100vw-2rem))] rounded-xl border border-slate-200 bg-white px-6 pb-6 pt-4 shadow-lg dark:border-slate-700 dark:bg-slate-900 ${panelPositionClass}`}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            What&apos;s next
          </p>

          <div className="divide-y divide-slate-200 text-sm dark:divide-slate-700">
            <section className="pb-4">
              <h4 className="m-0! mb-1 text-base! font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Today
              </h4>
              {todayIsOpenClass && today && todayHref ? (
                <Link
                  href={todayHref}
                  className="font-medium text-[#0b5d8f] no-underline hover:underline dark:text-[#8fc4ee]"
                  onClick={() => setOpen(false)}
                >
                  {today.topicNumber} {today.title}
                </Link>
              ) : (
                <p className="mb-0 text-slate-600 dark:text-slate-400">No class today</p>
              )}
            </section>

            <section className="py-4">
              <h4 className="m-0! mb-1 text-base! font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Upcoming Class Prep / Readings
              </h4>
              {prepMeetings.length === 0 ? (
                <p className="mb-0 text-slate-600 dark:text-slate-400">No upcoming class prep yet.</p>
              ) : (
                <ul className="m-0! list-disc space-y-2 py-0! pl-5! pr-0!">
                  {prepMeetings.map(({ meeting, prepRows, beforeClassHref }) => (
                    <li key={`${meeting.dateIso}-${meeting.slug}`} className="leading-snug">
                      <span className="tabular-nums text-slate-600 dark:text-slate-400">{meeting.dateLabel}</span>
                      {' · '}
                      {beforeClassHref ? (
                        <Link
                          href={beforeClassHref}
                          className="font-medium text-[#0b5d8f] no-underline hover:underline dark:text-[#8fc4ee]"
                          onClick={() => setOpen(false)}
                        >
                          {meeting.topicNumber} {meeting.title}
                        </Link>
                      ) : (
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {meeting.topicNumber} {meeting.title}
                        </span>
                      )}
                      {prepRows[0] ? (
                        <span className="mt-0.5 block text-xs text-slate-400! dark:text-slate-700!">
                          ({prepRows[0].summary})
                        </span>
                      ) : (
                        <span className="mt-0.5 block text-xs text-slate-400! dark:text-slate-700!">
                          No readings or prep listed yet.
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="pt-4">
              <h4 className="m-0! mb-1 text-base! font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Due soon
              </h4>
              {dueSoon.length === 0 ? (
                <p className="mb-0 text-slate-600 dark:text-slate-400">No assignments due in the next 2 weeks.</p>
              ) : (
                <ul className="m-0! list-disc space-y-1.5 py-0! pl-5! pr-0!">
                  {dueSoon.map(item => {
                    const dueAt = parseDueDateTime(item.dueDate, item.dueTime);
                    const countdown =
                      dueAt && referenceDate ? formatDueCountdown(dueAt, referenceDate) : null;

                    return (
                      <li key={item.id} className="leading-snug">
                        <Link
                          href={item.href}
                          className="font-medium text-[#0b5d8f] no-underline hover:underline dark:text-[#8fc4ee]"
                          onClick={() => setOpen(false)}
                        >
                          {item.title}
                        </Link>
                        <span className="mt-0.5 block text-xs tabular-nums text-slate-500 dark:text-slate-400">
                          Due {formatDate(item.dueDate)}
                          {item.dueTime ? ` · ${item.dueTime}` : ''}
                          {countdown ? ` (${countdown})` : ''}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
              {dueSoonTotal > DUE_SOON_LIMIT ? (
                <Link
                  href="/assignments"
                  className="mt-2 inline-block text-xs font-medium text-[#0b5d8f] no-underline hover:underline dark:text-[#8fc4ee]"
                  onClick={() => setOpen(false)}
                >
                  View all ({dueSoonTotal})
                </Link>
              ) : null}
            </section>
          </div>
        </div>
      ) : null}
    </div>
  );
}
