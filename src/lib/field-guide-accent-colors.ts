// Shared per-card accent-color system, used by any field-guide section that wants each
// card to carry its own distinct color (currently ethical-frameworks and
// theories-of-learning). Backs the `.diagnostic-question--{color}` pull-quote blocks
// (src/styles/diagnostic-question.css) and the badge/eyebrow labels on card grids,
// preview sheets, and detail pages.

export type FieldGuideAccent = 'amber' | 'rose' | 'indigo' | 'sky' | 'teal' | 'emerald' | 'orange' | 'violet';

export interface FieldGuideAccentClasses {
  badge: string;
  eyebrow: string;
}

// Tailwind's JIT scanner needs literal class strings present in source – never build
// these by interpolating a color name into a template string.
export const FIELD_GUIDE_ACCENT_CLASSES: Record<FieldGuideAccent, FieldGuideAccentClasses> = {
  amber: {
    badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200',
    eyebrow: 'text-amber-700 dark:text-amber-300',
  },
  rose: {
    badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-200',
    eyebrow: 'text-rose-700 dark:text-rose-300',
  },
  indigo: {
    badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200',
    eyebrow: 'text-indigo-700 dark:text-indigo-300',
  },
  sky: {
    badge: 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-200',
    eyebrow: 'text-sky-700 dark:text-sky-300',
  },
  teal: {
    badge: 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-200',
    eyebrow: 'text-teal-700 dark:text-teal-300',
  },
  emerald: {
    badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200',
    eyebrow: 'text-emerald-700 dark:text-emerald-300',
  },
  orange: {
    badge: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200',
    eyebrow: 'text-orange-700 dark:text-orange-300',
  },
  violet: {
    badge: 'bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-200',
    eyebrow: 'text-violet-700 dark:text-violet-300',
  },
};

export function getFieldGuideAccentClasses(accent: FieldGuideAccent): FieldGuideAccentClasses {
  return FIELD_GUIDE_ACCENT_CLASSES[accent];
}

/** Build a `{id -> accent classes}` lookup from a `{id -> accent}` map, falling back to violet. */
export function makeAccentClassesLookup(accentsById: Record<string, FieldGuideAccent>) {
  return function getAccentClasses(id: string): FieldGuideAccentClasses {
    return FIELD_GUIDE_ACCENT_CLASSES[accentsById[id] ?? 'violet'];
  };
}
