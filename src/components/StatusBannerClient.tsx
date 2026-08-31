'use client';
import { useState } from 'react';

const statusConfig = {
  'in-progress': {
    banner: 'border-blue-300 bg-blue-100 dark:border-blue-800 dark:bg-blue-950/50',
    text: 'text-blue-900 dark:text-blue-200',
    notes: 'text-blue-800 dark:text-blue-300',
    toggle: 'text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100',
    guide: 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950',
    guideText: 'text-blue-950 dark:text-blue-100',
    icon: '🔄',
    label: 'IN PROGRESS',
    message: 'This card is currently being reviewed or revised.',
  },
  unverified: {
    banner: 'border-amber-300 bg-amber-100 dark:border-amber-800 dark:bg-amber-950/50',
    text: 'text-amber-900 dark:text-amber-200',
    notes: 'text-amber-800 dark:text-amber-300',
    toggle: 'text-amber-700 hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-100',
    guide: 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950',
    guideText: 'text-amber-950 dark:text-amber-100',
    icon: '⚠️',
    label: 'DRAFT',
    message: 'This card has not been reviewed for accuracy or completeness.',
  },
} as const;

interface StatusBannerClientProps {
  status: string;
  reviewerLine: string;
  statusNotes?: string;
  guideHtml?: string | null;
}

export default function StatusBannerClient({
  status,
  reviewerLine,
  statusNotes,
  guideHtml,
}: StatusBannerClientProps) {
  const [open, setOpen] = useState(false);
  const cfg = statusConfig[status as keyof typeof statusConfig] ?? statusConfig.unverified;

  return (
    <div className={`border-b px-4 py-3 md:px-16 ${cfg.banner}`}>
      <div className="flex items-center justify-between gap-4">
        <div className={`flex items-center gap-2 text-sm font-medium ${cfg.text}`}>
          <span className="leading-none">{cfg.icon}</span>
          <span>
            <strong>{cfg.label}</strong>
            {' – '}
            {cfg.message}
            {reviewerLine}
          </span>
        </div>
        {guideHtml && (
          <button
            onClick={() => setOpen(o => !o)}
            className={`shrink-0 text-xs font-medium underline underline-offset-2 ${cfg.toggle}`}
          >
            {open ? 'Hide checklist ↑' : 'View checklist ↓'}
          </button>
        )}
      </div>
      {statusNotes && (
        <p className={`mb-0 mt-1 pl-6 text-xs ${cfg.notes}`}>{statusNotes}</p>
      )}
      {guideHtml && open && (
        <div
          className={`prose prose-sm mt-3 max-w-none rounded border px-4 py-3 ${cfg.guide} ${cfg.guideText} prose-headings:font-semibold prose-code:rounded prose-code:bg-black/10 prose-code:px-1 prose-code:py-0.5 prose-code:text-xs dark:prose-code:bg-white/10`}
          dangerouslySetInnerHTML={{ __html: guideHtml }}
        />
      )}
    </div>
  );
}
