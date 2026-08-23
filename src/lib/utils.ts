import { getWeekNumber } from './config';

/**
 * Triggers a celebratory confetti animation
 * @param enabled - Whether to enable the confetti (default: true). Useful for conditional triggering.
 */
export function triggerConfetti(enabled: boolean = true): void {
  if (!enabled || typeof window === 'undefined') return;
  
  // Use dynamic import to avoid SSR issues
  import('canvas-confetti').then((confettiModule) => {
    const confetti = confettiModule.default;
    
    // Trigger confetti animation
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Launch confetti from the left
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      
      // Launch confetti from the right
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  });
}

function formatDate(dateString: string): string {
    // Handle the YYYY-MM-DD format from markdown frontmatter
    const date = new Date(dateString + 'T00:00:00');
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' }).substring(0, 2);
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    return `${dayOfWeek}, ${month} ${day}`;
  }

function formatDueTime(time: string): string {
  const match = time.trim().match(/^(\d{1,2}:\d{2})\s*(a\.?m\.?|p\.?m\.?)$/i);

  if (!match) {
    return time.trim();
  }

  const meridiem = /a/i.test(match[2]) ? 'AM' : 'PM';
  return `${match[1]} ${meridiem}`;
}

function formatDueDateTime(dateLabel: string, dueTime?: string): string {
  if (!dueTime) {
    return dateLabel;
  }

  return `${dateLabel} at ${formatDueTime(dueTime)}`;
}

function parseDueTime(time: string): { hours: number; minutes: number } | null {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(a\.?m\.?|p\.?m\.?)$/i);

  if (!match) {
    return null;
  }

  let hours = Number.parseInt(match[1], 10);
  const minutes = Number.parseInt(match[2], 10);
  const isPm = /p/i.test(match[3]);

  if (hours === 12) {
    hours = isPm ? 12 : 0;
  } else if (isPm) {
    hours += 12;
  }

  return { hours, minutes };
}

function parseDueDateTime(dueDateIso: string, dueTime?: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dueDateIso)) {
    return null;
  }

  const [year, month, day] = dueDateIso.split('-').map(Number);
  const parsedTime = parseDueTime(dueTime || DEFAULT_DUE_TIME_LABEL);

  if (!parsedTime) {
    return null;
  }

  return new Date(year, month - 1, day, parsedTime.hours, parsedTime.minutes, 0, 0);
}

export interface DueCountdownParts {
  status: 'remaining' | 'soon' | 'past-due';
  days: number;
  hours: number;
}

function getDueCountdownParts(dueAt: Date, now: Date = new Date()): DueCountdownParts {
  const msRemaining = dueAt.getTime() - now.getTime();

  if (msRemaining <= 0) {
    return { status: 'past-due', days: 0, hours: 0 };
  }

  const totalMinutes = Math.floor(msRemaining / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const status = days === 0 && hours < 24 ? 'soon' : 'remaining';

  return { status, days, hours };
}

function formatDueCountdown(dueAt: Date, now: Date = new Date()): string {
  const { status, days, hours } = getDueCountdownParts(dueAt, now);

  if (status === 'past-due') {
    return 'Deadline passed';
  }

  if (days > 0 && hours > 0) {
    return `${days} ${days === 1 ? 'day' : 'days'}, ${hours} ${hours === 1 ? 'hour' : 'hours'} remaining`;
  }

  if (days > 0) {
    return `${days} ${days === 1 ? 'day' : 'days'} remaining`;
  }

  if (hours > 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} remaining`;
  }

  return 'Less than 1 hour remaining';
}

function formatDueCountdownBadge(parts: DueCountdownParts): string {
  if (parts.status === 'past-due') {
    return 'Deadline passed';
  }

  if (parts.days === 0 && parts.hours === 0) {
    return 'Due in <1h';
  }

  const segments: string[] = [];

  if (parts.days > 0) {
    segments.push(`${parts.days}d`);
  }

  if (parts.hours > 0 || parts.days === 0) {
    segments.push(`${parts.hours}h`);
  }

  return `Due in ${segments.join(' ')}`;
}
  
function getWeek(dateString: string): string {
  return `Week ${getWeekNumber(dateString)}`;
}

/**
 * Offset used when deciding which heading is active in the table of contents.
 */
export const SCROLL_OFFSET_PX = 20;

/**
 * Default due time shown when an assignment doesn't set an explicit due_time.
 */
export const DEFAULT_DUE_TIME_LABEL = '11:59 PM';

export { formatDate, formatDueTime, formatDueDateTime, formatDueCountdown, formatDueCountdownBadge, getDueCountdownParts, parseDueDateTime, getWeek };