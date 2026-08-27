'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  formatDueCountdownBadge,
  getDueCountdownParts,
  parseDueDateTime,
  type DueCountdownParts,
} from '@/lib/utils';

interface AssignmentDueMetaProps {
  dueDateLabel?: string;
  dueDateIso?: string;
  dueTime?: string;
}

function DueCountdownBadge({ parts }: { parts: DueCountdownParts }) {
  const label = formatDueCountdownBadge(parts);
  const toneClass =
    parts.status === 'past-due'
      ? 'bg-gray-100 text-gray-600 dark:bg-gray-800/80 dark:text-gray-400'
      : parts.status === 'soon'
        ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300'
        : 'bg-indigo-100 text-indigo-900 dark:bg-indigo-950/60 dark:text-indigo-300';

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums ${toneClass}`}
    >
      {label}
    </span>
  );
}

export default function AssignmentDueMeta({
  dueDateLabel,
  dueDateIso,
  dueTime,
}: AssignmentDueMetaProps) {
  const dueAt = useMemo(
    () => (dueDateIso ? parseDueDateTime(dueDateIso, dueTime) : null),
    [dueDateIso, dueTime]
  );
  const [countdownParts, setCountdownParts] = useState<DueCountdownParts | null>(null);

  useEffect(() => {
    if (!dueAt) {
      setCountdownParts(null);
      return;
    }

    const update = () => setCountdownParts(getDueCountdownParts(dueAt));
    update();

    const intervalId = window.setInterval(update, 60_000);
    return () => window.clearInterval(intervalId);
  }, [dueAt]);

  if (!dueDateLabel && !countdownParts) {
    return null;
  }

  return (
    <span className="mt-1 flex flex-wrap items-center gap-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
      {dueDateLabel && <span>Due {dueDateLabel}</span>}
      {countdownParts && <DueCountdownBadge parts={countdownParts} />}
    </span>
  );
}
