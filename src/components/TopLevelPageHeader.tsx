interface TopLevelPageHeaderProps {
  label: string;
  title: string;
  description?: string;
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
  tone = 'sky',
}: TopLevelPageHeaderProps) {
  const classes = toneClasses[tone];

  return (
    <header className={`border-y px-4 py-16 ${classes.border} ${classes.background} md:px-16`}>
      <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.18em] ${classes.accent}`}>{label}</p>
      <h1 className="m-0! max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-950 dark:text-gray-50">
        {title}
      </h1>
      {description && (
        <p className="mb-0 mt-5 max-w-4xl text-lg leading-8 text-gray-700 dark:text-gray-300">{description}</p>
      )}
    </header>
  );
}
