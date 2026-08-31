export type FieldGuidePalette = 'patterns' | 'sts' | 'examples' | 'frameworks' | 'explainers' | 'learning';

const CONTENT_DIR_PALETTE: Record<string, FieldGuidePalette> = {
  'ai-deployment-patterns': 'patterns',
  'sts-concepts': 'sts',
  examples: 'examples',
  'ethical-frameworks': 'frameworks',
  'technical-explainers': 'explainers',
  governance: 'sts',
  'theories-of-learning': 'learning',
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
  previewBadge: string;
  sheetHeader: string;
  previewCardHover: string;
  previewTitleHover: string;
  moreLink: string;
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
    previewBadge: 'bg-slate-100 text-slate-800 dark:bg-slate-900/50 dark:text-slate-200',
    sheetHeader: 'border-b border-slate-200 bg-slate-50 px-6 py-5 dark:border-slate-800 dark:bg-slate-950/30',
    previewCardHover: 'hover:border-slate-300 hover:bg-slate-50/50 dark:hover:border-slate-700 dark:hover:bg-slate-950/20',
    previewTitleHover: 'group-hover:text-slate-800 dark:group-hover:text-slate-200',
    moreLink: 'text-slate-700 no-underline hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100',
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
    previewBadge: 'bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-200',
    sheetHeader: 'border-b border-violet-200 bg-violet-50 px-6 py-5 dark:border-violet-900 dark:bg-violet-950/30',
    previewCardHover: 'hover:border-violet-300 hover:bg-violet-50/50 dark:hover:border-violet-700 dark:hover:bg-violet-950/20',
    previewTitleHover: 'group-hover:text-violet-700 dark:group-hover:text-violet-300',
    moreLink: 'text-violet-700 no-underline hover:text-violet-800 dark:text-violet-300 dark:hover:text-violet-200',
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
    previewBadge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200',
    sheetHeader: 'border-b border-amber-200 bg-amber-50 px-6 py-5 dark:border-amber-900 dark:bg-amber-950/30',
    previewCardHover: 'hover:border-amber-300 hover:bg-amber-50/50 dark:hover:border-amber-800 dark:hover:bg-amber-950/20',
    previewTitleHover: 'group-hover:text-amber-800 dark:group-hover:text-amber-300',
    moreLink: 'text-amber-800 no-underline hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-200',
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
    previewBadge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200',
    sheetHeader: 'border-b border-emerald-200 bg-emerald-50 px-6 py-5 dark:border-emerald-900 dark:bg-emerald-950/30',
    previewCardHover: 'hover:border-emerald-300 hover:bg-emerald-50/50 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/20',
    previewTitleHover: 'group-hover:text-emerald-800 dark:group-hover:text-emerald-300',
    moreLink: 'text-emerald-800 no-underline hover:text-emerald-900 dark:text-emerald-300 dark:hover:text-emerald-200',
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
    previewBadge: 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-200',
    sheetHeader: 'border-b border-sky-200 bg-sky-50 px-6 py-5 dark:border-sky-900 dark:bg-sky-950/30',
    previewCardHover: 'hover:border-sky-300 hover:bg-sky-50/50 dark:hover:border-sky-800 dark:hover:bg-sky-950/20',
    previewTitleHover: 'group-hover:text-sky-800 dark:group-hover:text-sky-300',
    moreLink: 'text-sky-800 no-underline hover:text-sky-900 dark:text-sky-300 dark:hover:text-sky-200',
  },
  learning: {
    header: 'border-y border-indigo-200 bg-indigo-50 px-4 py-16 dark:border-indigo-900 dark:bg-indigo-950/30 md:px-16',
    label: 'text-indigo-700 dark:text-indigo-300',
    featured:
      'group inline-flex items-center gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-4 no-underline transition-colors hover:border-indigo-300 hover:bg-indigo-100 dark:border-indigo-900 dark:bg-indigo-950/30 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/50',
    featuredLabel: 'text-indigo-600 dark:text-indigo-400',
    featuredTitleHover: 'group-hover:text-indigo-700 dark:group-hover:text-indigo-300',
    featuredArrow: 'text-indigo-500 dark:text-indigo-400',
    cardImageBg: 'bg-indigo-50 dark:bg-indigo-950/30',
    cardLabel: 'text-indigo-700 dark:text-indigo-300',
    cardTitleHover: 'group-hover:text-indigo-700 dark:group-hover:text-indigo-300',
    cardBorderHover: 'hover:border-indigo-300 dark:hover:border-indigo-700',
    previewBadge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200',
    sheetHeader: 'border-b border-indigo-200 bg-indigo-50 px-6 py-5 dark:border-indigo-900 dark:bg-indigo-950/30',
    previewCardHover: 'hover:border-indigo-300 hover:bg-indigo-50/50 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/20',
    previewTitleHover: 'group-hover:text-indigo-700 dark:group-hover:text-indigo-300',
    moreLink: 'text-indigo-700 no-underline hover:text-indigo-800 dark:text-indigo-300 dark:hover:text-indigo-200',
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

const FIELD_GUIDE_CONTENT_CLASS: Partial<Record<string, string>> = {
  'ethical-frameworks': 'field-guide-content--frameworks',
  'theories-of-learning': 'field-guide-content--learning',
  'technical-explainers': 'field-guide-content--explainers technical-explainer-content',
};

export function getFieldGuideContentClass(contentDir: string): string {
  return FIELD_GUIDE_CONTENT_CLASS[contentDir] ?? '';
}

export function getFieldGuideContentClassFromBasePath(linkBasePath: string): string {
  if (linkBasePath.includes('/ethical-frameworks')) {
    return 'field-guide-content--frameworks';
  }
  if (linkBasePath.includes('/theories-of-learning')) {
    return 'field-guide-content--learning';
  }
  if (linkBasePath.includes('/technical-explainers')) {
    return 'field-guide-content--explainers technical-explainer-content';
  }
  return '';
}
