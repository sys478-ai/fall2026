import { getCourseConfig } from './config';

/**
 * Convert a meeting date label like "Tue, Aug 25" or "Tu, Aug 25" to YYYY-MM-DD
 * using the course year from config.
 */
export function parseMeetingDate(meetingDate: string): string | null {
  const year = getCourseConfig().year;

  const monthMap: Record<string, number> = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };

  const match = meetingDate.match(/(\w+), (\w+) (\d+)/);
  if (!match) return null;

  const [, , monthAbbr, day] = match;
  const month = monthMap[monthAbbr];
  if (!month) return null;

  const monthStr = String(month).padStart(2, '0');
  const dayStr = String(parseInt(day, 10)).padStart(2, '0');

  return `${year}-${monthStr}-${dayStr}`;
}

export function formatIsoDateLocal(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Parse YYYY-MM-DD as a local calendar date (noon avoids DST edge cases). */
export function parseIsoDateLocal(dateIso: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateIso)) {
    return null;
  }

  const [year, month, day] = dateIso.split('-').map(Number);
  const date = new Date(year, month - 1, day, 12, 0, 0, 0);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export function formatLongWeekdayDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}
