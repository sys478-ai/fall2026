import courseConfig from '../../content/config/course.json';
import navConfig from '../../content/config/nav.json';

export interface CourseConfig {
  courseNumber: string;
  courseName: string;
  semester: string;
  year: number;
  semesterStartDate: string;
  title: string;
  description: string;
}

export interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

export function getCourseConfig(): CourseConfig {
  return courseConfig as CourseConfig;
}

export function getSemesterStartDate(): Date {
  const { semesterStartDate } = getCourseConfig();
  return new Date(`${semesterStartDate}T00:00:00`);
}

/** Week 1 begins on semesterStartDate (YYYY-MM-DD). */
export function getWeekNumber(dateString: string): number {
  const startDate = getSemesterStartDate();
  const currentDate = new Date(`${dateString}T00:00:00`);
  const timeDiff = currentDate.getTime() - startDate.getTime();
  const weeksDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7)) + 1;
  return weeksDiff;
}

export function getNavConfig(): NavItem[] {
  return navConfig as NavItem[];
}
