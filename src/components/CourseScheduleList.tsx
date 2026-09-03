import Link from 'next/link';
import type { ReactElement } from 'react';
import { getReadingsForTopic } from '@/lib/readings';
import { groupReadingsByPickOne } from '@/lib/reading-groups';
import { getTopics } from '@/lib/topics';
import { DEFAULT_DUE_TIME_LABEL, formatDueTime } from '@/lib/utils';

type ScheduleTopics = Awaited<ReturnType<typeof getTopics>>;
type ScheduleMeeting = ScheduleTopics[number]['meetings'][number];

interface ScheduleListItem {
  label: string;
  href?: string;
  external?: boolean;
  pickOne?: boolean;
  notes?: string;
  dueTime?: string;
  showDefaultDueTime?: boolean;
}

const ROW_COLS =
  'items-start gap-x-4 gap-y-1 px-2 py-2.5 grid-cols-[6.5rem_minmax(0,1fr)] lg:grid-cols-[7rem_minmax(12rem,1.2fr)_minmax(14rem,1.15fr)_7rem]';
const ROW_GRID = `grid ${ROW_COLS}`;

function getMeetingTopicNumber(topicId: number, meetingIndex: number) {
  return `${topicId}.${meetingIndex + 1}`;
}

function getCompactRelatedItemLabel(label: string, href?: string) {
  const trimmedLabel = label.trim();
  const labelMatch = trimmedLabel.match(/^(Lab|Career Module|HW|Homework|Tutorial|Project)\s+([A-Za-z0-9]+)/i);

  if (labelMatch) {
    const rawType = labelMatch[1].toLowerCase();
    const itemType =
      rawType === 'lab'
        ? 'Lab'
        : rawType === 'career module'
          ? 'Career Module'
          : rawType === 'hw' || rawType === 'homework'
            ? 'HW'
            : rawType === 'tutorial'
              ? 'Tutorial'
              : 'Project';
    return `${itemType} ${labelMatch[2]}`;
  }

  const slug = href?.split('/').filter(Boolean).pop() || '';
  const labSlugMatch = slug.match(/^lab0*([0-9]+[a-z]?)/i);
  if (labSlugMatch) {
    return `Lab ${labSlugMatch[1]}`;
  }

  const careerSlugMatch = slug.match(/^career-module0*([0-9]+)/i);
  if (careerSlugMatch) {
    return `Career Module ${careerSlugMatch[1]}`;
  }

  const hwSlugMatch = slug.match(/^hw0*([0-9]+)/i);
  if (hwSlugMatch) {
    return `HW ${hwSlugMatch[1]}`;
  }

  return trimmedLabel;
}

function addListItem(
  items: Map<string, ScheduleListItem>,
  label: string,
  href?: string,
  pickOne?: boolean,
  notes?: string,
  dueTime?: string,
  showDefaultDueTime?: boolean
) {
  const normalizedLabel = label.trim();
  if (!normalizedLabel) return;

  const key = href || normalizedLabel.toLowerCase();
  if (!items.has(key)) {
    items.set(key, {
      label: normalizedLabel,
      href,
      external: Boolean(href && /^https?:\/\//i.test(href)),
      pickOne,
      notes: notes?.trim() || undefined,
      dueTime: dueTime?.trim() || undefined,
      showDefaultDueTime,
    });
  }
}

function toAssignmentArray(value: ScheduleMeeting['assigned'] | ScheduleMeeting['due']) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function getDueItems(meeting: ScheduleMeeting): ScheduleListItem[] {
  const items = new Map<string, ScheduleListItem>();

  toAssignmentArray(meeting.assigned).forEach(item => {
    if (typeof item === 'string') return;
    if (item.draft === 1) return;

    const normalizedType = item.type?.toLowerCase();
    if (normalizedType !== 'lab' && normalizedType !== 'career module') {
      return;
    }

    addListItem(
      items,
      getCompactRelatedItemLabel(item.titleShort || item.title, item.url),
      item.url,
      undefined,
      undefined,
      item.dueTime
    );
  });

  toAssignmentArray(meeting.due).forEach(item => {
    if (typeof item === 'string') {
      addListItem(items, item);
      return;
    }

    if (item.draft === 1) return;
    addListItem(
      items,
      getCompactRelatedItemLabel(item.titleShort || item.title, item.url),
      item.url,
      undefined,
      undefined,
      item.dueTime,
      true
    );
  });

  return Array.from(items.values());
}

function getCitationText(citation: string | ReactElement) {
  if (typeof citation === 'string') {
    return citation.trim();
  }

  return '';
}

function stripTrailingUrl(citation: string) {
  return citation.replace(/\s*https?:\/\/\S+\s*$/i, '').trim();
}

function getAssignedReadings(meeting: ScheduleMeeting): ScheduleListItem[] {
  const items = new Map<string, ScheduleListItem>();

  (meeting.readings || []).forEach(reading => {
    const label = stripTrailingUrl(getCitationText(reading.citation));
    if (!label) return;
    addListItem(items, label, reading.url, reading.pickOne, reading.notes);
  });

  getReadingsForTopic(meeting.scheduledDay).forEach(reading => {
    const label = stripTrailingUrl(reading.title.trim());
    if (!label) return;
    addListItem(items, label, reading.url || undefined, undefined, reading.notes);
  });

  return Array.from(items.values());
}

const LINK_CLASS =
  'text-[#0b5d8f] underline decoration-[#0b5d8f] underline-offset-2 dark:text-[#8fc4ee] dark:decoration-[#8fc4ee]';

function ScheduleReadingItem({ item }: { item: ScheduleListItem }) {
  return (
    <span className="text-sm leading-5 text-gray-700 dark:text-gray-300">
      {item.label}
      {item.href && (
        <>
          {' '}
          <Link
            href={item.href}
            className={LINK_CLASS}
            {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            Link
          </Link>
        </>
      )}
      {item.notes && <div className="text-sm italic text-gray-500 dark:text-gray-400">{item.notes}</div>}
    </span>
  );
}

function getScheduleDueTimeLabel(item: ScheduleListItem) {
  if (item.dueTime) {
    return formatDueTime(item.dueTime);
  }

  if (item.showDefaultDueTime) {
    return DEFAULT_DUE_TIME_LABEL;
  }

  return null;
}

function ScheduleItemLink({ item, className }: { item: ScheduleListItem; className: string }) {
  const dueTimeLabel = getScheduleDueTimeLabel(item);

  if (!item.href) {
    return (
      <span className={`${className} text-gray-700 dark:text-gray-300`}>
        {item.label}
        {dueTimeLabel ? (
          <span className="mt-0.5 block text-xs tabular-nums text-gray-500 dark:text-gray-400">{dueTimeLabel}</span>
        ) : null}
      </span>
    );
  }

  return (
    <span className="block">
      <Link
        href={item.href}
        className={`${className} ${LINK_CLASS}`}
        {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {item.label}
      </Link>
      {dueTimeLabel ? (
        <span className="mt-0.5 block text-xs tabular-nums text-gray-500 dark:text-gray-400">{dueTimeLabel}</span>
      ) : null}
    </span>
  );
}

function ReadingsHeaderLabel({ className }: { className?: string }) {
  return (
    <span className={className}>
      Readings (due before class)
    </span>
  );
}

export default function CourseScheduleList({ topics }: { topics: ScheduleTopics }) {
  return (
    <div className="space-y-8">
      {topics.map(topic => (
        <section key={topic.id}>
          <div className="border-b border-gray-200 pt-1 pb-2 dark:border-gray-800">
            <h2 className="m-0 text-lg font-semibold text-gray-950 dark:text-gray-50">
              Topic {topic.id}. {topic.title}
            </h2>
          </div>

          <div className={`hidden ${ROW_COLS} border-b border-gray-200 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500 dark:border-gray-800 dark:text-gray-400 lg:grid`}>
            <span>Date</span>
            <span>Topic</span>
            <ReadingsHeaderLabel />
            <span>Due</span>
          </div>

          <ol className="m-0 list-none divide-y divide-gray-200 p-0! dark:divide-gray-800">
            {topic.meetings.map((meeting, index) => {
              const isNoClass = meeting.holiday === true;
              const isScheduleOnly = meeting.scheduleOnly === true;
              const topicNumber =
                isNoClass || isScheduleOnly ? null : getMeetingTopicNumber(topic.id, index);
              const topicTitle = topicNumber ? `${topicNumber} ${meeting.topic}` : meeting.topic;
              const topicHref =
                meeting.slug && !isNoClass && !isScheduleOnly && meeting.draft !== 1
                  ? `/meetings/${meeting.slug}`
                  : undefined;
              const readings = isNoClass || isScheduleOnly ? [] : getAssignedReadings(meeting);
              const dueItems = isNoClass ? [] : getDueItems(meeting);

              return (
                <li key={`${topic.id}-${meeting.slug || index}`} className={ROW_GRID}>
                  <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">{meeting.date}</span>
                  <div className="min-w-0">
                    {topicHref ? (
                        <>
                            <Link href={topicHref} className="no-underline group">
                                <span className="inline-block pb-px text-md leading-snug font-medium text-[#0b5d8f] group-hover:text-[#08486e] dark:text-[#8fc4ee] dark:group-hover:text-[#b6d9f5]">
                                {topicTitle}
                                </span>
                            </Link>
                            {meeting.subtitle && (
                            <span className="mt-0.5 block text-sm leading-5 text-gray-500 dark:text-gray-500">
                                {meeting.subtitle}
                            </span>
                            )}
                        </>
                      
                    ) : (
                      <>
                        <span className="block text-md font-medium text-gray-950 dark:text-gray-100">
                          {topicTitle}
                        </span>
                        {isNoClass && (
                          <span className="mt-0.5 block text-md font-medium text-gray-500 dark:text-gray-500">
                            No class
                          </span>
                        )}
                        {/* {isScheduleOnly && (
                          <span className="mt-0.5 block text-sm leading-5 text-gray-500 dark:text-gray-500">
                            --
                          </span>
                        )} */}
                        {!isNoClass && !isScheduleOnly && meeting.subtitle && (
                          <span className="mt-0.5 block text-sm leading-5 text-gray-500 dark:text-gray-500">
                            {meeting.subtitle}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <div className="col-span-2 min-w-0 lg:col-span-1">
                    {readings.length > 0 && (
                      <div>
                        <ReadingsHeaderLabel className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-gray-500 lg:hidden dark:text-gray-400" />
                        <ul className="m-0! mb-0! list-disc space-y-1 pl-5!">
                          {groupReadingsByPickOne(readings).map((group, groupIndex) =>
                            group.kind === 'single' ? (
                              <li key={`${group.reading.href || group.reading.label}`} className="text-sm leading-5 mb-2!">
                                <ScheduleReadingItem item={group.reading} />
                              </li>
                            ) : (
                              <li key={`pick-one-${groupIndex}`} className="text-sm leading-5 mb-2!">
                                Pick one
                                <ul className="m-0! mt-1 list-disc space-y-1 pl-5!">
                                  {group.options.map(item => (
                                    <li key={`${item.href || item.label}`} className="text-sm leading-5 mb-2!">
                                      <ScheduleReadingItem item={item} />
                                    </li>
                                  ))}
                                </ul>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="col-span-2 min-w-0 lg:col-span-1">
                    {dueItems.length > 0 && (
                      <div className="space-y-1">
                        <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-gray-500 lg:hidden dark:text-gray-400">
                          Due
                        </span>
                        {dueItems.map(item => (
                          <ScheduleItemLink
                            key={`${item.href || item.label}`}
                            item={item}
                            className="block text-sm font-normal"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
