import { getCourseConfig } from '@/lib/config';
import { getAdminGuide } from '@/lib/admin-guides';
import StatusBannerClient from './StatusBannerClient';

interface StatusBannerProps {
  section?: 'fieldGuide' | 'topicsAndAssignments';
  status?: 'verified' | 'in-progress' | 'unverified' | string;
  status_reviewer?: string;
  status_date?: string;
  status_notes?: string;
  contentType?: string;
}

function toDateString(v: unknown): string | undefined {
  if (!v) return undefined;
  if (v instanceof Date) return (v as Date).toISOString().slice(0, 10);
  return String(v);
}

function reviewerLine(status_reviewer?: string, status_date?: string): string {
  if (status_reviewer && status_date) return ` Last reviewed by ${status_reviewer} on ${status_date}.`;
  if (status_reviewer) return ` Last reviewed by ${status_reviewer}.`;
  if (status_date) return ` Last reviewed on ${status_date}.`;
  return '';
}

export default async function StatusBanner({
  section = 'fieldGuide',
  status = 'unverified',
  status_reviewer,
  status_date,
  status_notes,
  contentType,
}: StatusBannerProps) {
  const { statusBanners } = getCourseConfig();
  if (!statusBanners[section]) return null;

  const dateStr = toDateString(status_date);

  if (status === 'verified') {
    return (
      <div className="border-b border-green-300 bg-green-100 px-4 py-3 dark:border-green-800 dark:bg-green-950/50 md:px-16">
        <div className="flex items-center gap-2 text-sm font-medium text-green-900 dark:text-green-200">
          <span className="leading-none">✅</span>
          <span>
            <strong>VERIFIED</strong>
            {' – '}
            This card has been reviewed for accuracy and completeness.
            {reviewerLine(status_reviewer, dateStr)}
          </span>
        </div>
        {status_notes && (
          <p className="mb-0 mt-1 pl-6 text-xs text-green-800 dark:text-green-300">{status_notes}</p>
        )}
      </div>
    );
  }

  const guideHtml = contentType ? await getAdminGuide(contentType) : null;

  return (
    <StatusBannerClient
      status={status}
      reviewerLine={reviewerLine(status_reviewer, dateStr)}
      statusNotes={status_notes}
      guideHtml={guideHtml}
    />
  );
}
