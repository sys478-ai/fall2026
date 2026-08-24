import Link from 'next/link';
import AssignmentTypeBadge from '@/components/assignments/AssignmentTypeBadge';
import {
  ASSIGNMENT_BADGE_BASE_CLASS,
  ASSIGNMENT_BADGE_CLASSES,
  type AssignmentBadgeKind,
} from '@/lib/assignment-badges';
import type { DashboardPrepRow, NextTimeCategory } from '@/lib/prep-materials';

const NEXT_TIME_CATEGORY_LABELS: Record<NextTimeCategory, string> = {
  prep: 'Class prep',
  assignments: 'Assignments',
};

const NEXT_TIME_CATEGORY_CLASSES: Record<NextTimeCategory, string> = {
  prep: ASSIGNMENT_BADGE_CLASSES.reading,
  assignments: ASSIGNMENT_BADGE_CLASSES.homework,
};

const NEXT_TIME_DETAILS_BUTTON_CLASS =
  'inline-flex items-center rounded-lg border border-[#0b5d8f]/35 bg-transparent px-2.5 py-1 text-sm font-medium text-[#0b5d8f] no-underline transition-colors hover:bg-[#0b5d8f]/10 dark:border-[#8fc4ee]/35 dark:text-[#8fc4ee] dark:hover:bg-[#8fc4ee]/10';

function NextTimeCategoryTag({
  category,
  assignmentBadgeKind,
}: {
  category: NextTimeCategory;
  assignmentBadgeKind?: AssignmentBadgeKind;
}) {
  if (category === 'assignments' && assignmentBadgeKind) {
    return <AssignmentTypeBadge kind={assignmentBadgeKind} />;
  }

  return (
    <span className={`${ASSIGNMENT_BADGE_BASE_CLASS} ${NEXT_TIME_CATEGORY_CLASSES[category]}`}>
      {NEXT_TIME_CATEGORY_LABELS[category]}
    </span>
  );
}

function NextTimeDetailsLink({ href, linkText = 'View' }: { href: string; linkText?: string }) {
  return (
    <Link href={href} className={`${NEXT_TIME_DETAILS_BUTTON_CLASS} gap-1.5`}>
      <i aria-hidden="true" className="fas fa-link text-xs" />
      {linkText}
    </Link>
  );
}

export default function NextTimeChecklist({
  rows,
  heading = 'Before next class',
  showHeading = true,
  className = '',
}: {
  rows: DashboardPrepRow[];
  heading?: string;
  showHeading?: boolean;
  className?: string;
}) {
  if (rows.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 text-base leading-7 text-gray-800 dark:text-gray-200 ${className}`.trim()}>
      {showHeading ? (
        <h2 className="mt-0 mb-0 text-xl font-semibold tracking-tight text-gray-950 md:text-2xl dark:text-gray-50">
          {heading}
        </h2>
      ) : null}
      <table className="next-time-checklist w-auto! min-w-xl max-w-full border-collapse text-left">
        <tbody>
          {rows.map(row => (
            <tr key={row.key}>
              <td className="whitespace-nowrap align-top">
                <NextTimeCategoryTag
                  category={row.category}
                  assignmentBadgeKind={row.assignmentBadgeKind}
                />
              </td>
              <td className="wrap-break-word align-top text-gray-800 dark:text-gray-200">{row.summary}</td>
              <td className="whitespace-nowrap text-right align-top">
                {row.href ? (
                  <NextTimeDetailsLink href={row.href} />
                ) : (
                  <span className="text-sm text-gray-500 dark:text-gray-400">Not yet available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
