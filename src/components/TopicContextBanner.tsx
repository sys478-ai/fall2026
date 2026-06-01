import Link from 'next/link';

interface TopicContextBannerProps {
  context: {
    moduleId: number;
    moduleTitle: string;
    topicNumber: string;
    topicTitle: string;
    topicHref?: string;
    itemTitle: string;
  } | null;
}

export default function TopicContextBanner({ context }: TopicContextBannerProps) {
  if (!context) {
    return null;
  }

  return (
    <aside className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">
        Part of Module {context.moduleId}: {context.moduleTitle}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="mb-0 font-medium text-gray-950 dark:text-gray-50">
            {context.topicNumber} {context.topicTitle}
          </p>
          <p className="mb-0 mt-1 text-sm text-gray-700 dark:text-gray-300">
            Current item: {context.itemTitle}
          </p>
        </div>
        {context.topicHref && (
          <Link
            href={context.topicHref}
            className="rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm font-medium text-blue-700 no-underline hover:bg-blue-100 dark:border-blue-800 dark:bg-black dark:text-blue-300 dark:hover:bg-blue-950"
          >
            Back to topic
          </Link>
        )}
      </div>
    </aside>
  );
}
