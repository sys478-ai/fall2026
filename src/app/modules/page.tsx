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
                    <h2 className="m-0 text-2xl font-bold text-gray-900 dark:text-gray-100">{module.title}</h2>
                  </div>
                  <span className="rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 dark:border-gray-800 dark:text-gray-300">
                    {module.meetings.length} topics
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
              </article>
            );
          })}
        </section>
      </div>
    </ContentLayout>
  );
}
