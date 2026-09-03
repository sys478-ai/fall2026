import { getAllPosts } from '@/lib/markdown';
import { getTopics } from '@/lib/topics';
import { getCourseConfig } from '@/lib/config';
import Link from 'next/link';
import ContentLayout from '@/components/ContentLayout';
import QuickLinksNav from '@/components/QuickLinksNav';

interface CardRow {
  id: string;
  title: string;
  href: string;
  status: string;
  priority: string;
  status_reviewer?: string;
  status_date?: string;
  status_notes?: string;
}

interface Section {
  label: string;
  priority: 'high' | 'medium' | 'low';
  rows: CardRow[];
}

function toDateString(v: unknown): string | undefined {
  if (!v) return undefined;
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v);
}

function statusOrder(s: string) {
  if (s === 'verified') return 0;
  if (s === 'in-progress') return 1;
  return 2;
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'verified') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-950/50 dark:text-green-300">
        ✅ verified
      </span>
    );
  }
  if (status === 'in-progress') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
        🔄 in-progress
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
      ⚠️ unverified
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  if (priority === 'high') {
    return (
      <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700 dark:bg-red-950/50 dark:text-red-300">
        high
      </span>
    );
  }
  if (priority === 'medium') {
    return (
      <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
        medium
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500 dark:bg-gray-800 dark:text-gray-400">
      low
    </span>
  );
}

function SectionTable({ section }: { section: Section }) {
  const counts = section.rows.reduce(
    (acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-3">
        <h2 className="text-xl font-semibold text-gray-950 dark:text-gray-50">{section.label}</h2>
        <PriorityBadge priority={section.priority} />
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {section.rows.length} total
          {counts['verified'] ? ` · ${counts['verified']} verified` : ''}
          {counts['in-progress'] ? ` · ${counts['in-progress']} in-progress` : ''}
          {counts['unverified'] ? ` · ${counts['unverified']} unverified` : ''}
        </span>
      </div>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-left dark:border-gray-800">
            <th className="py-2 pr-4 font-semibold text-gray-600 dark:text-gray-400">Status</th>
            <th className="py-2 pr-4 font-semibold text-gray-600 dark:text-gray-400">Priority</th>
            <th className="py-2 pr-4 font-semibold text-gray-600 dark:text-gray-400">Title</th>
            <th className="py-2 pr-4 font-semibold text-gray-600 dark:text-gray-400">Reviewer</th>
            <th className="py-2 pr-4 font-semibold text-gray-600 dark:text-gray-400">Date</th>
            <th className="py-2 font-semibold text-gray-600 dark:text-gray-400">Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-900">
          {section.rows.map(row => (
            <tr key={row.id} className="align-top">
              <td className="py-2 pr-4 whitespace-nowrap">
                <StatusBadge status={row.status} />
              </td>
              <td className="py-2 pr-4 whitespace-nowrap">
                <PriorityBadge priority={row.priority} />
              </td>
              <td className="py-2 pr-4">
                <Link href={row.href} className="text-blue-600 hover:underline dark:text-blue-400">
                  {row.title}
                </Link>
              </td>
              <td className="py-2 pr-4 text-gray-600 dark:text-gray-400">{row.status_reviewer || ''}</td>
              <td className="py-2 pr-4 whitespace-nowrap text-gray-600 dark:text-gray-400">{row.status_date || ''}</td>
              <td className="py-2 text-gray-600 dark:text-gray-400">{row.status_notes || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function ReviewStatusPage() {
  const config = getCourseConfig();
  const scheduledTopics = await getTopics();

  function makeRows(posts: ReturnType<typeof getAllPosts>, hrefFn: (id: string) => string): CardRow[] {
    return posts
      .filter(p => p.id !== 'index')
      .map(p => ({
        id: p.id,
        title: p.title,
        href: hrefFn(p.id),
        status: (p.status as string) || 'unverified',
        priority: (p.priority as string) || 'low',
        status_reviewer: p.status_reviewer,
        status_date: toDateString(p.status_date),
        status_notes: p.status_notes,
      }))
      .sort((a, b) => statusOrder(a.status) - statusOrder(b.status) || a.title.localeCompare(b.title));
  }

  const topicStatusByFileId = new Map(
    getAllPosts('topics').map(p => [p.id, p])
  );
  const topicRows: CardRow[] = scheduledTopics
    .flatMap(module => module.meetings)
    .filter(m => m.slug && m.topicContentId)
    .map(m => {
      const p = topicStatusByFileId.get(m.topicContentId!);
      return {
        id: m.slug!,
        title: m.topic,
        href: `/meetings/${m.slug}`,
        status: (p?.status as string) || 'unverified',
        priority: (p?.priority as string) || 'low',
        status_reviewer: p?.status_reviewer,
        status_date: toDateString(p?.status_date),
        status_notes: p?.status_notes,
      };
    })
    .sort((a, b) => statusOrder(a.status) - statusOrder(b.status) || a.title.localeCompare(b.title));

  const allAssignments = getAllPosts('assignments').filter(p => p.id !== 'index');
  const labRows = makeRows(allAssignments.filter(p => p.id.startsWith('lab')), id => `/assignments/${id}`);
  const careerRows = makeRows(allAssignments.filter(p => p.id.startsWith('career')), id => `/assignments/${id}`);

  const sections: Section[] = [
    {
      label: 'Ethical Frameworks',
      priority: 'high',
      rows: makeRows(getAllPosts('ethical-frameworks'), id => `/field-guide/ethical-frameworks/${id}`),
    },
    {
      label: 'AI Deployment Patterns',
      priority: 'high',
      rows: makeRows(getAllPosts('ai-deployment-patterns'), id => {
        const slug = getAllPosts('ai-deployment-patterns').find(p => p.id === id)?.slug as string | undefined;
        return slug ? `/field-guide/deployment-patterns/${slug}` : `/field-guide/deployment-patterns`;
      }),
    },
    {
      label: 'Examples',
      priority: 'high',
      rows: makeRows(getAllPosts('examples'), id => `/field-guide/examples/${id}`),
    },
    {
      label: 'Technical Explainers',
      priority: 'high',
      rows: makeRows(getAllPosts('technical-explainers'), id => `/field-guide/technical-explainers/${id}`),
    },
    {
      label: 'STS Concepts',
      priority: 'medium',
      rows: makeRows(getAllPosts('sts-concepts'), id => {
        const slug = getAllPosts('sts-concepts').find(p => p.id === id)?.slug as string | undefined;
        return slug ? `/field-guide/sts-concepts/${slug}` : `/field-guide/sts-concepts`;
      }),
    },
    {
      label: 'Labs',
      priority: 'medium',
      rows: labRows,
    },
    {
      label: 'Topics',
      priority: 'low',
      rows: topicRows,
    },
    {
      label: 'Career Modules',
      priority: 'low',
      rows: careerRows,
    },
  ];

  const totalAll = sections.reduce((n, s) => n + s.rows.length, 0);
  const totalVerified = sections.reduce((n, s) => n + s.rows.filter(r => r.status === 'verified').length, 0);
  const totalInProgress = sections.reduce((n, s) => n + s.rows.filter(r => r.status === 'in-progress').length, 0);
  const totalUnverified = sections.reduce((n, s) => n + s.rows.filter(r => r.status === 'unverified').length, 0);

  return (
    <ContentLayout variant="list" leftNav={<QuickLinksNav />} fullWidth>
      <div className="mb-10 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          Internal – Planning
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">
          Content Review Status
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {totalAll} pages total · {totalVerified} verified · {totalInProgress} in-progress · {totalUnverified} unverified
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          Status banners: field guide <strong>{config.statusBanners.fieldGuide ? 'ON' : 'OFF'}</strong>
          {' · '}topics &amp; assignments <strong>{config.statusBanners.topicsAndAssignments ? 'ON' : 'OFF'}</strong>
          {' · '}
          Toggle in <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">content/config/course.json</code>
        </p>
      </div>

      <div className="space-y-12">
        {sections.map(section => (
          <SectionTable key={section.label} section={section} />
        ))}
      </div>
    </ContentLayout>
  );
}
