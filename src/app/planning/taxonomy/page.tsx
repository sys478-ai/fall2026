import type { Metadata } from 'next';
import taxonomyData from '../../../../content/config/taxonomy.json';
import ContentLayout from '@/components/ContentLayout';
import PageHeader from '@/components/PageHeader';
import QuickLinksNav from '@/components/QuickLinksNav';

interface TaxonomyEntry {
  slug?: string;
  title: string;
  shortDescription?: string;
  group?: string;
  order?: number;
  dialoguesWith?: string[];
  relatedThemes?: string[];
  description?: string;
  key?: string;
}

interface TaxonomyData {
  version: number;
  description: string;
  suggestedFrontmatter: Record<string, string>;
  themes: TaxonomyEntry[];
  ethicalPatterns: TaxonomyEntry[];
  braidTopics: TaxonomyEntry[];
  careerReadinessTopics: TaxonomyEntry[];
  governanceFrameworks: TaxonomyEntry[];
  relationshipTypes: TaxonomyEntry[];
}

export const metadata: Metadata = {
  title: 'Planning Taxonomy',
  description: 'Planning view for the SYS/BRAID taxonomy.',
  robots: {
    index: false,
    follow: false,
  },
};

const taxonomy = taxonomyData as TaxonomyData;

function groupEntries(entries: TaxonomyEntry[]) {
  const groups = new Map<string, TaxonomyEntry[]>();

  entries.forEach(entry => {
    const key = entry.group ?? 'other';
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(entry);
  });

  return Array.from(groups.entries())
    .map(([group, items]) => ({
      group,
      items: items.sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
    }))
    .sort((a, b) => (a.items[0]?.order ?? 999) - (b.items[0]?.order ?? 999));
}

function formatGroupLabel(group: string) {
  return group
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-1.5 py-0.5 text-[11px] font-medium rounded uppercase bg-gray-50 border border-gray-200 text-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300">
      {children}
    </span>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2 bg-white dark:bg-black">
      <p className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400 m-0">{label}</p>
      <p className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-1 mb-0">{value}</p>
    </div>
  );
}

function TaxonomySection({
  title,
  description,
  groups,
  showDialogues = false,
}: {
  title: string;
  description: string;
  groups: Array<{ group: string; items: TaxonomyEntry[] }>;
  showDialogues?: boolean;
}) {
  return (
    <section className="space-y-4">
      <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 m-0">{title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-0">{description}</p>
      </div>

      <div className="space-y-5">
        {groups.map(({ group, items }) => (
          <div key={group} className="space-y-2">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 m-0">{formatGroupLabel(group)}</h3>
              <Badge>{items.length}</Badge>
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-black">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse my-0">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                        Term
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                        Slug
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                        Description
                      </th>
                      {showDialogues && (
                        <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                          Dialogue
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(entry => (
                      <tr
                        key={entry.slug ?? entry.key ?? entry.title}
                        className="align-top border-b border-gray-200 dark:border-gray-800 last:border-b-0"
                      >
                        <td className="px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {entry.title}
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
                          {entry.slug && <Badge>{entry.slug}</Badge>}
                          {entry.key && <Badge>{entry.key}</Badge>}
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
                          {entry.shortDescription ?? entry.description ?? ''}
                        </td>
                        {showDialogues && (
                          <td className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
                            {entry.dialoguesWith && entry.dialoguesWith.length > 0 ? (
                              <div className="flex flex-wrap gap-1.5">
                                {entry.dialoguesWith.map(item => (
                                  <Badge key={item}>{item}</Badge>
                                ))}
                              </div>
                            ) : (
                              <span className="text-gray-400 dark:text-gray-500">-</span>
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function PlanningTaxonomyPage() {
  const themeGroups = groupEntries(taxonomy.themes);
  const braidGroups = groupEntries(taxonomy.braidTopics);
  const careerGroups = groupEntries(taxonomy.careerReadinessTopics);

  return (
    <ContentLayout variant="list" leftNav={<QuickLinksNav />} fullWidth>
      <div className="space-y-7">
        <PageHeader
          title="Planning Taxonomy"
          excerpt="Temporary planning view for the controlled vocabulary that links course themes, BRAID topics, frameworks, and cross-reference patterns."
        />

        <section className="space-y-3">
          <div className="rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 px-4 py-3">
            <p className="m-0 text-sm text-gray-800 dark:text-gray-200">
              Planning-only vocabulary view. Kept compact for course design work.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-6">
            <SummaryCard label="Course Themes" value={taxonomy.themes.length} />
            <SummaryCard label="Patterns" value={taxonomy.ethicalPatterns.length} />
            <SummaryCard label="BRAID Topics" value={taxonomy.braidTopics.length} />
            <SummaryCard label="Career Topics" value={taxonomy.careerReadinessTopics.length} />
            <SummaryCard label="Frameworks" value={taxonomy.governanceFrameworks.length} />
            <SummaryCard label="Relationship Types" value={taxonomy.relationshipTypes.length} />
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 m-0">Suggested Frontmatter</h2>
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-black">
            <dl className="grid gap-3 md:grid-cols-2 m-0">
              {Object.entries(taxonomy.suggestedFrontmatter).map(([key, value]) => (
                <div key={key}>
                  <dt className="font-mono text-sm text-gray-900 dark:text-gray-100">{key}</dt>
                  <dd className="text-sm text-gray-700 dark:text-gray-300 mt-1 ml-0">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <TaxonomySection
          title="Course Themes"
          description="Broad conceptual lenses for the SYS course. These are the main reusable ideas that can connect multiple labs, readings, and project pages."
          groups={themeGroups}
          showDialogues
        />

        <TaxonomySection
          title="BRAID Topics"
          description="Technical and governance topics specific to the BRAID case study and optional hardware-facing modules."
          groups={braidGroups}
        />

        <TaxonomySection
          title="Career Readiness Topics"
          description="Professional development topics for the required career-readiness strand, kept separate from the conceptual course-theme taxonomy."
          groups={careerGroups}
        />

        <TaxonomySection
          title="Governance Frameworks"
          description="Frameworks to reference when they clarify governance questions without forcing them into every page."
          groups={[
            {
              group: 'frameworks',
              items: taxonomy.governanceFrameworks,
            },
          ]}
        />

        <TaxonomySection
          title="Relationship Types"
          description="First-class page relationships that are stronger than simple tags and useful for course navigation."
          groups={[
            {
              group: 'page-relationships',
              items: taxonomy.relationshipTypes,
            },
          ]}
        />

      </div>
    </ContentLayout>
  );
}
