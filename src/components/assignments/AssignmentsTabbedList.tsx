'use client';

import Link from 'next/link';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@/lib/utils';

interface AssignmentData {
  id: string;
  num?: string;
  title: string;
  excerpt?: string;
  date?: string;
  due_date?: string;
  type?: string;
  assigned?: string;
  notes?: string;
  draft?: number;
  external_url?: string;
  external_type?: string;
  excluded?: boolean;
  no_render?: number;
  hide_from_list?: number;
  series_summary?: string;
}

interface AssignmentsTabbedListProps {
  items: AssignmentData[];
}

const ASSIGNMENT_TAGS = ['reflection', 'lab', 'homework', 'career'] as const;

type AssignmentTag = (typeof ASSIGNMENT_TAGS)[number];

function getAssignmentTag(item: AssignmentData): AssignmentTag {
  const raw = (item.external_type || item.type || '').toLowerCase().trim();

  if (raw === 'career' || raw === 'career module' || item.id.startsWith('career-module')) {
    return 'career';
  }

  if (raw === 'lab' || item.id.startsWith('lab')) {
    return 'lab';
  }

  if (raw === 'reflection' || item.id.startsWith('reflection')) {
    return 'reflection';
  }

  return 'homework';
}

function getTagLabel(tag: AssignmentTag) {
  return tag.charAt(0).toUpperCase() + tag.slice(1);
}

function getDaysLeftLabel(dueDate?: string) {
  if (!dueDate) {
    return '';
  }

  const dueDateObj = new Date(`${dueDate}T23:59:59`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dueDateObj.setHours(0, 0, 0, 0);

  const diffTime = dueDateObj.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return 'Overdue';
  }

  if (diffDays === 0) {
    return 'Due today';
  }

  if (diffDays === 1) {
    return '1 day left';
  }

  return `${diffDays} days left`;
}

function isDraft(item: AssignmentData) {
  return item.draft === 1;
}

function getHref(item: AssignmentData) {
  return item.external_url || `/assignments/${item.id}`;
}

export default function AssignmentsTabbedList({ items }: AssignmentsTabbedListProps) {
  return (
    <table className="m-0 w-full max-w-5xl border-collapse text-left">
      <thead>
        <tr className="border-b border-gray-200 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500 dark:border-gray-800 dark:text-gray-400">
          <th className="w-[6.5rem] px-2 py-2 font-semibold">Due</th>
          <th className="w-[7.5rem] px-2 py-2 font-semibold">Type</th>
          <th className="px-2 py-2 font-semibold">Assignment</th>
          <th className="hidden w-[8.5rem] px-2 py-2 text-right font-semibold sm:table-cell">Days left</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
        {items.map(item => {
          const draft = isDraft(item);
          const href = getHref(item);
          const tag = getAssignmentTag(item);
          const daysLeftLabel = getDaysLeftLabel(item.due_date);
          const titleContent = <span>{item.title}</span>;

          return (
            <tr key={item.id} className="align-top">
              <td className="whitespace-nowrap px-2 py-3 text-sm text-gray-600 dark:text-gray-400">
                {item.due_date ? formatDate(item.due_date) : 'TBD'}
              </td>
              <td className="px-2 py-3">
                <span className="inline-flex rounded-full border border-gray-200 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gray-700 dark:border-gray-800 dark:text-gray-300">
                  {getTagLabel(tag)}
                </span>
              </td>
              <td className="px-2 py-3">
                {item.notes && (
                  <div className="mb-1">
                    <span className="text-xs text-gray-500 dark:text-gray-500">({item.notes})</span>
                  </div>
                )}

                {draft ? (
                  <span className="flex items-start gap-2 text-md text-gray-500 dark:text-gray-500">
                    <LockClosedIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    {titleContent}
                  </span>
                ) : item.external_url ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-md text-[#0b5d8f] no-underline hover:underline dark:text-[#8fc4ee]"
                  >
                    {titleContent}
                    <span className="ml-1 text-xs">↗</span>
                  </a>
                ) : (
                  <Link
                    href={href}
                    className="block text-md text-[#0b5d8f] no-underline hover:underline dark:text-[#8fc4ee]"
                  >
                    {titleContent}
                  </Link>
                )}

                {item.excerpt && (
                  <p className="mb-0 mt-0.5 text-md font-normal leading-5 text-gray-500 dark:text-gray-500">
                    {item.excerpt}
                  </p>
                )}

                {item.series_summary && (
                  <p className="mb-0 mt-1 text-sm font-medium leading-5 text-[#0b5d8f] dark:text-[#8fc4ee]">
                    {item.series_summary}
                  </p>
                )}
              </td>
              <td className="hidden px-2 py-3 text-right text-xs font-medium leading-5 whitespace-nowrap text-gray-500 sm:table-cell dark:text-gray-500">
                {daysLeftLabel}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
