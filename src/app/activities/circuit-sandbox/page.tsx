import type { Metadata } from 'next';
import Link from 'next/link';
import CircuitSandbox from '@/components/circuit-sandbox/CircuitSandbox';

export const metadata: Metadata = {
  title: 'Circuit Sandbox',
  description:
    'Build simple boolean circuits with switches, AND/OR/XOR gates, and light bulbs. Wiring and labels save in this browser.',
};

export default function CircuitSandboxPage() {
  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <div className="flex h-9 shrink-0 items-center border-b border-gray-200 bg-gray-50 px-3 dark:border-gray-800 dark:bg-gray-900">
        <Link
          href="/topics"
          className="inline-flex h-7 items-center gap-1 rounded px-2 text-sm font-medium leading-none text-gray-500 no-underline hover:bg-gray-200/80 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          aria-label="Back to schedule"
        >
          <span aria-hidden>‹</span>
          Schedule
        </Link>
      </div>
      <div className="min-h-0 flex-1">
        <CircuitSandbox />
      </div>
    </div>
  );
}
