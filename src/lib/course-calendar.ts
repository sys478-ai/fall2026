import { courseCalendar } from '../../content/config/schedule';

type MeetingDayName = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export interface GeneratedMeetingDate {
  date: string;
  dateLabel: string;
  scheduledDay?: number;
  holiday?: {
    title: string;
  };
}

const meetingDayIndexByName: Record<MeetingDayName, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

function parseLocalDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function formatIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatMeetingDate(dateStr: string) {
  const date = parseLocalDate(dateStr);
  const dayAbbr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return `${dayAbbr[date.getDay()]}, ${monthAbbr[date.getMonth()]} ${date.getDate()}`;
}

export function generateCourseMeetingDates(): GeneratedMeetingDate[] {
  const meetingDayIndexes = new Set(
    courseCalendar.meetingDays.map(dayName => meetingDayIndexByName[dayName as MeetingDayName])
  );
  const holidaysByDate = new Map(courseCalendar.holidays.map(holiday => [holiday.date, holiday]));
  const meetingDates: GeneratedMeetingDate[] = [];
  const currentDate = parseLocalDate(courseCalendar.startDate);
  const endDate = parseLocalDate(courseCalendar.endDate);
  let scheduledDay = 1;

  while (currentDate <= endDate) {
    if (meetingDayIndexes.has(currentDate.getDay())) {
      const date = formatIsoDate(currentDate);
      const holiday = holidaysByDate.get(date);

      if (holiday) {
        meetingDates.push({
          date,
          dateLabel: formatMeetingDate(date),
          holiday: { title: holiday.title },
        });
      } else {
        meetingDates.push({
          date,
          dateLabel: formatMeetingDate(date),
          scheduledDay,
        });
        scheduledDay += 1;
      }
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return meetingDates;
}

export function getDateForScheduledDay(scheduledDay: number | string | undefined) {
  const parsedScheduledDay =
    typeof scheduledDay === 'string' ? Number.parseInt(scheduledDay, 10) : scheduledDay;

  if (typeof parsedScheduledDay !== 'number' || Number.isNaN(parsedScheduledDay)) {
    return undefined;
  }

  return generateCourseMeetingDates().find(meetingDate => meetingDate.scheduledDay === parsedScheduledDay)?.date;
}

export function getDueDateForScheduledDay(scheduledDay: number | string | undefined, daysAfter = 6) {
  const scheduledDate = getDateForScheduledDay(scheduledDay);

  if (!scheduledDate) {
    return undefined;
  }

  const dueDate = parseLocalDate(scheduledDate);
  dueDate.setDate(dueDate.getDate() + daysAfter);

  return formatIsoDate(dueDate);
}
