'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { formatIsoDateLocal } from '@/lib/meeting-dates';

/** Shared yellow highlight class for “today / due tonight” cues (styles in globals.css). */
export const SCHEDULE_TODAY_HIGHLIGHT_CLASS = 'today-highlight';

export default function CourseScheduleMeetingRow({
  dateIso,
  className,
  children,
}: {
  dateIso?: string | null;
  className?: string;
  children: ReactNode;
}) {
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    if (!dateIso) {
      setIsToday(false);
      return;
    }
    setIsToday(dateIso === formatIsoDateLocal(new Date()));
  }, [dateIso]);

  return (
    <li className={[className, isToday ? SCHEDULE_TODAY_HIGHLIGHT_CLASS : ''].filter(Boolean).join(' ')}>
      {children}
    </li>
  );
}
