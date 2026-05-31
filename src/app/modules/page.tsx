import ContentLayout from '@/components/ContentLayout';
import PageHeader from '@/components/PageHeader';
import { getTopicModules } from '@/lib/topic-config';
import Link from 'next/link';
import { getModuleAnchorId } from '@/lib/navigation-helpers';

const moduleAccentStyles = [
  {
    border: 'border-blue-200 dark:border-blue-900',
    bg: 'bg-blue-50/70 dark:bg-blue-950/30',
    pill: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  },
  {
    border: 'border-emerald-200 dark:border-emerald-900',
    bg: 'bg-emerald-50/70 dark:bg-emerald-950/30',
    pill: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  },
  {
    border: 'border-amber-200 dark:border-amber-900',
    bg: 'bg-amber-50/70 dark:bg-amber-950/30',
    pill: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  },
  {
    border: 'border-rose-200 dark:border-rose-900',
    bg: 'bg-rose-50/70 dark:bg-rose-950/30',
    pill: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
  },
  {
    border: 'border-violet-200 dark:border-violet-900',
    bg: 'bg-violet-50/70 dark:bg-violet-950/30',
    pill: 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200',
  },
  {
    border: 'border-cyan-200 dark:border-cyan-900',
    bg: 'bg-cyan-50/70 dark:bg-cyan-950/30',
    pill: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
  },
];

export default function ModulesPage() {
  const modules = getTopicModules();

  return (
    <ContentLayout variant="list" fullWidth>
      <div className="space-y-7">
        <PageHeader
          title="Modules"
          excerpt="A semester overview of the six core modules, their main questions, and the topic sequence inside each one."
        />

        <section className="grid gap-5 lg:grid-cols-2">
          {modules.map((module, index) => {
            const accent = moduleAccentStyles[index % moduleAccentStyles.length];
            const patternCount = module.ethicalPatterns.length + (module.recognitionPatternNotes?.length || 0);

            return (
              <article
                key={module.slug}
                className={`rounded-2xl border p-5 shadow-sm ${accent.border} ${accent.bg}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-600 dark:text-gray-400">
                      Module {module.id}
                    </p>
                    <h2 className="m-0 text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {module.title}
                    </h2>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${accent.pill}`}>
                    {module.meetings.length} topics
                  </span>
                </div>

                <p className="mb-0 mt-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
                  {module.unitFocus}
                </p>

                {module.braidElsiArc && (
                  <p className="mb-0 mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">BRAID / ELSI arc:</span>{' '}
                    {module.braidElsiArc}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${accent.pill}`}>
                    {patternCount} recognition patterns
                  </span>
                  <span className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-black/40 dark:text-gray-300">
                    {module.themes.length} linked themes
                  </span>
                </div>

                <div className="mt-5 rounded-xl border border-white/80 bg-white/80 p-4 dark:border-gray-800 dark:bg-black/40">
                  <h3 className="m-0 text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">
                    Topics
                  </h3>
                  <ul className="mt-3 space-y-2 pl-5">
                    {module.meetings.map((meeting) => (
                      <li key={meeting.slug} className="text-sm text-gray-700 dark:text-gray-300">
                        <Link
                          href={`/topics/${meeting.slug}`}
                          className="text-inherit no-underline hover:underline"
                        >
                          {meeting.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`/#${getModuleAnchorId(module.id)}`}
                    className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white no-underline hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  >
                    View in schedule
                  </Link>
                  <Link
                    href="/"
                    className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 no-underline hover:bg-gray-50 dark:border-gray-700 dark:bg-black dark:text-gray-100 dark:hover:bg-gray-900"
                  >
                    Return to course home
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </ContentLayout>
  );
}
