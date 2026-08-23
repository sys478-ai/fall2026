export type AssignmentBadgeKind = 'reading' | 'quiz' | 'discussion' | 'homework' | 'career' | 'lab' | 'reflection';

export const ASSIGNMENT_BADGE_LABELS: Record<AssignmentBadgeKind, string> = {
  reading: 'Reading',
  quiz: 'Quiz',
  discussion: 'Discussion',
  homework: 'Homework',
  career: 'Career Module',
  lab: 'Lab',
  reflection: 'Reflection',
};

export const ASSIGNMENT_BADGE_CLASSES: Record<AssignmentBadgeKind, string> = {
  reading: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  quiz: 'bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-300',
  discussion: 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300',
  homework: 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300',
  career: 'bg-indigo-100 text-indigo-900 dark:bg-indigo-950/60 dark:text-indigo-300',
  lab: 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300',
  reflection: 'bg-teal-100 text-teal-900 dark:bg-teal-950/60 dark:text-teal-300',
};

export const ASSIGNMENT_BADGE_BASE_CLASS =
  'inline-flex shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold tracking-wide';

export const ASSIGNMENT_BADGE_DRAFT_CLASS =
  'bg-gray-100 text-gray-400 dark:bg-gray-800/80 dark:text-gray-500';

export function getAssignmentBadgeClassName(
  kind: AssignmentBadgeKind,
  options: { className?: string; isDraft?: boolean } = {}
) {
  const { className = '', isDraft = false } = options;
  const colorClass = isDraft ? ASSIGNMENT_BADGE_DRAFT_CLASS : ASSIGNMENT_BADGE_CLASSES[kind];

  return `${ASSIGNMENT_BADGE_BASE_CLASS} ${colorClass}${className ? ` ${className}` : ''}`;
}

export function getAssignmentBadgeLabel(kind: AssignmentBadgeKind) {
  return ASSIGNMENT_BADGE_LABELS[kind];
}
