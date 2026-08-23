import {
  getAssignmentBadgeClassName,
  getAssignmentBadgeLabel,
  type AssignmentBadgeKind,
} from '@/lib/assignment-badges';

export default function AssignmentTypeBadge({
  kind,
  className,
  isDraft = false,
}: {
  kind: AssignmentBadgeKind;
  className?: string;
  isDraft?: boolean;
}) {
  return (
    <span className={getAssignmentBadgeClassName(kind, { className, isDraft })}>
      {getAssignmentBadgeLabel(kind)}
    </span>
  );
}
