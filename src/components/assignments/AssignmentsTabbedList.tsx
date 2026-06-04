'use client';

import Link from 'next/link';
import { useState } from 'react';
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
}

interface AssignmentsTabbedListProps {
  items: AssignmentData[];
}

type AssignmentTab = 'ai-ethics' | 'career';

function titleCase(value: string) {
  if (value.toLowerCase() === 'assignment') {
    return 'Homework';
  }

  return value.replace(/\b\w/g, char => char.toUpperCase());
}

function getTypeLabel(item: AssignmentData) {
  const type = item.external_type || item.type || 'assignment';
  return titleCase(type);
}

function getAssignmentLabel(item: AssignmentData) {
  const typeLabel = getTypeLabel(item);
  return item.num ? `${typeLabel} ${item.num}` : typeLabel;
}

function getDisplayTitle(item: AssignmentData) {
  return item.title || getAssignmentLabel(item);
}

function getAssignmentTitleParts(item: AssignmentData) {
  const title = getDisplayTitle(item);
  const prefix = getAssignmentLabel(item);
  const normalizedTitle = title.toLowerCase();
  const normalizedPrefix = prefix.toLowerCase();

  if (normalizedTitle === normalizedPrefix) {
    return { prefix, title: '' };
  }

  if (normalizedTitle.startsWith(`${normalizedPrefix}:`)) {
    return {
      prefix,
      title: title.slice(prefix.length + 1).trim(),
    };
  }

  return { prefix, title };
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

function isCareerModule(item: AssignmentData) {
  const type = (item.external_type || item.type || '').toLowerCase();
  return type === 'career module' || item.id.startsWith('career-module');
}

function isDraft(item: AssignmentData) {
  return item.draft === 1;
}

function getHref(item: AssignmentData) {
  return item.external_url || `/assignments/${item.id}`;
}

export default function AssignmentsTabbedList({ items }: AssignmentsTabbedListProps) {
  const [activeTab, setActiveTab] = useState<AssignmentTab>('ai-ethics');

  const tabs: Array<{ id: AssignmentTab; label: string; description: string; items: AssignmentData[] }> = [
    {
      id: 'ai-ethics',
      label: 'AI & Ethics Assignments',
      description: 'Labs and applied assignments connected to AI mechanisms, ethics, and governance.',
      items: items.filter(item => !isCareerModule(item)),
    },
    {
      id: 'career',
      label: 'Career Modules',
      description: 'Career-readiness assignments that support professional reflection and final project work.',
      items: items.filter(isCareerModule),
    },
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab) || tabs[0];

  return (
    <section className="space-y-5">
      <div
        className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-800"
        role="tablist"
        aria-label="Assignment categories"
      >
        {tabs.map(tab => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`-mb-px border-b-3 px-3 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? 'border-[#0b5d8f] text-[#0b5d8f] dark:border-[#8fc4ee] dark:text-[#8fc4ee]'
                  : 'border-transparent text-gray-600 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-100'
              }`}
            >
              {tab.label}
              <span className="ml-1 opacity-70">({tab.items.length})</span>
            </button>
          );
        })}
      </div>

      <div>
        <p className="mb-3 mt-0 text-sm leading-6 text-gray-600 dark:text-gray-400">{activeTabData.description}</p>

        <ol className="m-0 divide-y divide-gray-200 p-0! dark:divide-gray-800">
          {activeTabData.items.map(item => {
            const draft = isDraft(item);
            const href = getHref(item);
            const titleParts = getAssignmentTitleParts(item);
            const daysLeftLabel = getDaysLeftLabel(item.due_date);
            const careerModule = isCareerModule(item);
            const badgeContent = (
              <span className="inline-flex rounded-full border border-gray-200 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gray-700 dark:border-gray-800 dark:text-gray-300">
                {titleParts.prefix}
              </span>
            );
            const titleContent = <span>{titleParts.title || getDisplayTitle(item)}</span>;

            return (
              <li
                key={item.id}
                className="grid! max-w-5xl items-start gap-6 px-2 py-3 grid-cols-[5rem_9.5rem_minmax(0,1fr)_10rem]"
              >
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="min-w-0">
                    <span className="block whitespace-nowrap">{item.due_date ? formatDate(item.due_date) : 'TBD'}</span>
                  </span>
                </span>

                <span className="pt-0.5">{badgeContent}</span>

                <div className="flex min-w-0 gap-3">
                  <div className="min-w-0">
                    {(item.notes || draft) && (
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        {item.notes && <span className="text-xs text-gray-500 dark:text-gray-500">({item.notes})</span>}
                        {draft && <span className="text-xs font-medium text-gray-500 dark:text-gray-500">Draft</span>}
                      </div>
                    )}

                    {draft ? (
                      <span className="block text-md text-gray-950 dark:text-gray-50">{titleContent}</span>
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
                      <p
                        className={`mb-0 mt-0.5 text-md font-normal leading-5 ${
                          careerModule ? 'text-gray-300 dark:text-gray-700' : 'text-gray-500 dark:text-gray-500'
                        }`}
                      >
                        {item.excerpt}
                      </p>
                    )}
                  </div>
                </div>

                <span className="justify-self-end whitespace-nowrap text-right text-xs font-medium leading-5 text-gray-500 dark:text-gray-500">
                  {daysLeftLabel}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
