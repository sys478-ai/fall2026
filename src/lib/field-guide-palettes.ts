export type FieldGuidePalette = 'patterns' | 'sts' | 'examples' | 'frameworks' | 'explainers';

const CONTENT_DIR_PALETTE: Record<string, FieldGuidePalette> = {
  'ai-deployment-patterns': 'patterns',
  'sts-concepts': 'sts',
  examples: 'examples',
  'ethical-frameworks': 'frameworks',
  'technical-explainers': 'explainers',
  governance: 'sts',
};

export interface FieldGuideBannerClasses {
  header: string;
  label: string;
  featured: string;
  featuredLabel: string;
  featuredTitleHover: string;
  featuredArrow: string;
  cardImageBg: string;
  cardLabel: string;
  cardTitleHover: string;
  cardBorderHover: string;
}

const FIELD_GUIDE_BANNER_CLASSES: Record<FieldGuidePalette, FieldGuideBannerClasses> = {
  patterns: {
    header: 'border-y border-slate-200 bg-slate-50 px-4 py-16 dark:border-slate-800 dark:bg-slate-950/30 md:px-16',
    label: 'text-slate-700 dark:text-slate-300',
    featured:
      'group inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 no-underline transition-colors hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950/30 dark:hover:border-slate-700 dark:hover:bg-slate-950/50',
    featuredLabel: 'text-slate-600 dark:text-slate-400',
    featuredTitleHover: 'group-hover:text-slate-800 dark:group-hover:text-slate-200',
    featuredArrow: 'text-slate-500 dark:text-slate-400',
    cardImageBg: 'bg-slate-50 dark:bg-slate-950/30',
    cardLabel: 'text-slate-700 dark:text-slate-300',
    cardTitleHover: 'group-hover:text-slate-800 dark:group-hover:text-slate-200',
    cardBorderHover: 'hover:border-slate-300 dark:hover:border-slate-700',
  },
  sts: {
    header: 'border-y border-violet-200 bg-violet-50 px-4 py-16 dark:border-violet-900 dark:bg-violet-950/30 md:px-16',
    label: 'text-violet-700 dark:text-violet-300',
    featured:
      'group inline-flex items-center gap-3 rounded-xl border border-violet-200 bg-violet-50 px-5 py-4 no-underline transition-colors hover:border-violet-300 hover:bg-violet-100 dark:border-violet-900 dark:bg-violet-950/30 dark:hover:border-violet-800 dark:hover:bg-violet-950/50',
    featuredLabel: 'text-violet-600 dark:text-violet-400',
    featuredTitleHover: 'group-hover:text-violet-700 dark:group-hover:text-violet-300',
    featuredArrow: 'text-violet-500 dark:text-violet-400',
    cardImageBg: 'bg-violet-50 dark:bg-violet-950/30',
    cardLabel: 'text-violet-700 dark:text-violet-300',
    cardTitleHover: 'group-hover:text-violet-700 dark:group-hover:text-violet-300',
    cardBorderHover: 'hover:border-violet-300 dark:hover:border-violet-700',
  },
  examples: {
    header: 'border-y border-amber-200 bg-amber-50 px-4 py-16 dark:border-amber-900 dark:bg-amber-950/30 md:px-16',
    label: 'text-amber-800 dark:text-amber-300',
    featured:
      'group inline-flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 no-underline transition-colors hover:border-amber-300 hover:bg-amber-100 dark:border-amber-900 dark:bg-amber-950/30 dark:hover:border-amber-800 dark:hover:bg-amber-950/50',
    featuredLabel: 'text-amber-700 dark:text-amber-400',
    featuredTitleHover: 'group-hover:text-amber-800 dark:group-hover:text-amber-300',
    featuredArrow: 'text-amber-600 dark:text-amber-400',
    cardImageBg: 'bg-amber-50 dark:bg-amber-950/30',
    cardLabel: 'text-amber-800 dark:text-amber-300',
    cardTitleHover: 'group-hover:text-amber-800 dark:group-hover:text-amber-300',
    cardBorderHover: 'hover:border-amber-300 dark:hover:border-amber-800',
  },
  frameworks: {
    header: 'border-y border-emerald-200 bg-emerald-50 px-4 py-16 dark:border-emerald-900 dark:bg-emerald-950/30 md:px-16',
    label: 'text-emerald-800 dark:text-emerald-300',
    featured:
      'group inline-flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 no-underline transition-colors hover:border-emerald-300 hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950/30 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/50',
    featuredLabel: 'text-emerald-700 dark:text-emerald-400',
    featuredTitleHover: 'group-hover:text-emerald-800 dark:group-hover:text-emerald-300',
    featuredArrow: 'text-emerald-600 dark:text-emerald-400',
    cardImageBg: 'bg-emerald-50 dark:bg-emerald-950/30',
    cardLabel: 'text-emerald-800 dark:text-emerald-300',
    cardTitleHover: 'group-hover:text-emerald-800 dark:group-hover:text-emerald-300',
    cardBorderHover: 'hover:border-emerald-300 dark:hover:border-emerald-800',
  },
  explainers: {
    header: 'border-y border-sky-200 bg-sky-50 px-4 py-16 dark:border-sky-900 dark:bg-sky-950/30 md:px-16',
    label: 'text-sky-800 dark:text-sky-300',
    featured:
      'group inline-flex items-center gap-3 rounded-xl border border-sky-200 bg-sky-50 px-5 py-4 no-underline transition-colors hover:border-sky-300 hover:bg-sky-100 dark:border-sky-900 dark:bg-sky-950/30 dark:hover:border-sky-800 dark:hover:bg-sky-950/50',
    featuredLabel: 'text-sky-700 dark:text-sky-400',
    featuredTitleHover: 'group-hover:text-sky-800 dark:group-hover:text-sky-300',
    featuredArrow: 'text-sky-600 dark:text-sky-400',
    cardImageBg: 'bg-sky-50 dark:bg-sky-950/30',
    cardLabel: 'text-sky-800 dark:text-sky-300',
    cardTitleHover: 'group-hover:text-sky-800 dark:group-hover:text-sky-300',
    cardBorderHover: 'hover:border-sky-300 dark:hover:border-sky-800',
  },
};

export function getFieldGuidePalette(contentDir: string): FieldGuidePalette {
  return CONTENT_DIR_PALETTE[contentDir] ?? 'sts';
}

export function getFieldGuideBannerClasses(contentDir: string): FieldGuideBannerClasses {
  return FIELD_GUIDE_BANNER_CLASSES[getFieldGuidePalette(contentDir)];
}

export function getFieldGuideBannerClassesByPalette(palette: FieldGuidePalette): FieldGuideBannerClasses {
  return FIELD_GUIDE_BANNER_CLASSES[palette];
}
