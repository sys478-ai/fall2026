export const MODULE_COLOR_TOKENS = [
  'indigo',
  'sky',
  'emerald',
  'amber',
  'rose',
  'violet',
  'teal',
  'orange',
] as const;

export type ModuleColorToken = (typeof MODULE_COLOR_TOKENS)[number];

export interface ModuleColorClasses {
  background: string;
  border: string;
  accent: string;
  sidebarActive: string;
}

export const DEFAULT_MODULE_COLOR: ModuleColorToken = 'indigo';

const MODULE_COLOR_CLASSES: Record<ModuleColorToken, ModuleColorClasses> = {
  indigo: {
    background: 'bg-indigo-50 dark:bg-indigo-950/30',
    border: 'border-indigo-200 dark:border-indigo-900',
    accent: 'text-indigo-700 dark:text-indigo-300',
    sidebarActive:
      'border-l-indigo-400 border-b-indigo-200 text-indigo-950 dark:border-l-indigo-500 dark:border-b-indigo-900 dark:text-indigo-100',
  },
  sky: {
    background: 'bg-sky-50 dark:bg-sky-950/30',
    border: 'border-sky-200 dark:border-sky-900',
    accent: 'text-sky-700 dark:text-sky-300',
    sidebarActive:
      'border-l-sky-400 border-b-sky-200 text-sky-950 dark:border-l-sky-500 dark:border-b-sky-900 dark:text-sky-100',
  },
  emerald: {
    background: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-200 dark:border-emerald-900',
    accent: 'text-emerald-700 dark:text-emerald-300',
    sidebarActive:
      'border-l-emerald-400 border-b-emerald-200 text-emerald-950 dark:border-l-emerald-500 dark:border-b-emerald-900 dark:text-emerald-100',
  },
  amber: {
    background: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-900',
    accent: 'text-amber-700 dark:text-amber-300',
    sidebarActive:
      'border-l-amber-400 border-b-amber-200 text-amber-950 dark:border-l-amber-500 dark:border-b-amber-900 dark:text-amber-100',
  },
  rose: {
    background: 'bg-rose-50 dark:bg-rose-950/30',
    border: 'border-rose-200 dark:border-rose-900',
    accent: 'text-rose-700 dark:text-rose-300',
    sidebarActive:
      'border-l-rose-400 border-b-rose-200 text-rose-950 dark:border-l-rose-500 dark:border-b-rose-900 dark:text-rose-100',
  },
  violet: {
    background: 'bg-violet-50 dark:bg-violet-950/30',
    border: 'border-violet-200 dark:border-violet-900',
    accent: 'text-violet-700 dark:text-violet-300',
    sidebarActive:
      'border-l-violet-400 border-b-violet-200 text-violet-950 dark:border-l-violet-500 dark:border-b-violet-900 dark:text-violet-100',
  },
  teal: {
    background: 'bg-teal-50 dark:bg-teal-950/30',
    border: 'border-teal-200 dark:border-teal-900',
    accent: 'text-teal-700 dark:text-teal-300',
    sidebarActive:
      'border-l-teal-400 border-b-teal-200 text-teal-950 dark:border-l-teal-500 dark:border-b-teal-900 dark:text-teal-100',
  },
  orange: {
    background: 'bg-orange-50 dark:bg-orange-950/30',
    border: 'border-orange-200 dark:border-orange-900',
    accent: 'text-orange-700 dark:text-orange-300',
    sidebarActive:
      'border-l-orange-400 border-b-orange-200 text-orange-950 dark:border-l-orange-500 dark:border-b-orange-900 dark:text-orange-100',
  },
};

export function isModuleColorToken(value: unknown): value is ModuleColorToken {
  return typeof value === 'string' && MODULE_COLOR_TOKENS.includes(value as ModuleColorToken);
}

export function getDefaultModuleColorToken(moduleId: number): ModuleColorToken {
  return MODULE_COLOR_TOKENS[(moduleId - 1) % MODULE_COLOR_TOKENS.length] || DEFAULT_MODULE_COLOR;
}

export function getModuleColorClasses(color?: string | null): ModuleColorClasses {
  return MODULE_COLOR_CLASSES[isModuleColorToken(color) ? color : DEFAULT_MODULE_COLOR];
}
