import Link from 'next/link';
import ContentLayout from '@/components/ContentLayout';
import TopLevelPageHeader from '@/components/TopLevelPageHeader';
import { getModuleColorClasses } from '@/lib/module-colors';
import { getTopicModules } from '@/lib/topic-config';

export default function ModulesPage() {
  const modules = getTopicModules();

  return (
    <ContentLayout
      variant="list"
      fullWidth
      header={
        <TopLevelPageHeader
          label="Course Schedule"
          title="Modules"
          description="A semester overview of the course modules, their main questions, and the topic sequence inside each one."
          tone="indigo"
        />
      }
    >
      <div className="space-y-7">
        <section className="grid gap-8 lg:grid-cols-2">
          {modules.map(module => {
            const patternCount = module.ethicalPatterns.length + (module.recognitionPatternNotes?.length || 0);
            const moduleColor = getModuleColorClasses(module.color);

            return (
              <article
                key={module.slug}
                className={`rounded-2xl border p-5 shadow-sm ${moduleColor.background} ${moduleColor.border}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className={`mb-2 text-xs font-semibold uppercase tracking-[0.18em] ${moduleColor.accent}`}>
                      Module {module.id}
                    </p>
                    <h2 className="m-0 text-2xl font-bold text-gray-900 dark:text-gray-100">
                      <Link
                        href={`/topics/${module.slug}`}
                        className="text-gray-900 no-underline hover:text-[#0b5d8f] dark:text-gray-100 dark:hover:text-[#8fc4ee]"
                      >
                        {module.title}
                      </Link>
                    </h2>
                  </div>
                  <span className="rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 dark:border-gray-800 dark:text-gray-300">
                    {module.meetings.length + 1} topics
                  </span>
                </div>

                <p className="mb-0 mt-4 text-sm leading-6 text-gray-700 dark:text-gray-300">{module.unitFocus}</p>

                {module.braidElsiArc && (
                  <p className="mb-0 mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">BRAID / ELSI Connection:</span>{' '}
                    {module.braidElsiArc}
                  </p>
                )}

                {/* <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 dark:border-gray-800 dark:text-gray-300">
                    {patternCount} recognition patterns
                  </span>
                  <span className="rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 dark:border-gray-800 dark:text-gray-300">
                    {module.themes.length} linked themes
                  </span>
                </div> */}

                {/* <Link
                  href={`/topics/${module.slug}`}
                  className="mt-5 inline-flex rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-900 no-underline transition-colors hover:border-[#0b5d8f] hover:text-[#0b5d8f] dark:border-gray-800 dark:text-gray-100 dark:hover:border-[#8fc4ee] dark:hover:text-[#8fc4ee]"
                >
                  View module overview
                </Link> */}
              </article>
            );
          })}
        </section>
      </div>
    </ContentLayout>
  );
}
