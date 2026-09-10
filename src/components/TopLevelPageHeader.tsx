import type { ReactNode } from 'react';

interface TopLevelPageHeaderProps {
  label: string;
  title: string;
  description?: string;
  /** Secondary line under the title (e.g. assignment due date). */
  meta?: string;
  /** Optional controls aligned to the right of the header (e.g. Expand all). */
  actions?: ReactNode;
  tone?: 'sky' | 'indigo' | 'violet' | 'slate';
}

const toneClasses = {
  sky: {
    border: 'border-sky-200 dark:border-sky-900',
    background: 'bg-sky-50 dark:bg-sky-950/30',
    accent: 'text-sky-700 dark:text-sky-300',
  },
  indigo: {
    border: 'border-indigo-200 dark:border-indigo-900',
    background: 'bg-indigo-50 dark:bg-indigo-950/30',
    accent: 'text-indigo-700 dark:text-indigo-300',
  },
  violet: {
    border: 'border-violet-200 dark:border-violet-900',
    background: 'bg-violet-50 dark:bg-violet-950/30',
    accent: 'text-violet-700 dark:text-violet-300',
  },
  slate: {
    border: 'border-slate-200 dark:border-slate-800',
    background: 'bg-slate-50 dark:bg-slate-950/40',
    accent: 'text-slate-700 dark:text-slate-300',
  },
};

export default function TopLevelPageHeader({
  label,
  title,
  description,
  meta,
  actions,
  tone = 'sky',
}: TopLevelPageHeaderProps) {
  const classes = toneClasses[tone];

  return (
    <header className={`border-y px-4 py-16 ${classes.border} ${classes.background} md:px-16`}>
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.18em] ${classes.accent}`}>{label}</p>
          <h1 className="m-0! max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-950 dark:text-gray-50">
            {title}
          </h1>
          {description && (
            <p
              className={`mb-1! max-w-4xl text-lg leading-6 text-gray-700 dark:text-gray-300 ${
                meta ? 'mt-4' : 'mt-5'
              }`}
            >
              {description}
            </p>
          )}
          {meta ? (
            <p className={`my-0! text-base font-semibold tabular-nums ${classes.accent}`}>{meta}</p>
          ) : null}
        </div>
        {actions ? <div className="shrink-0 pt-1">{actions}</div> : null}
      </div>
    </header>
  );
}
