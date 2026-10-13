import Link from 'next/link';

export interface AssignmentNeighbor {
  slug: string;
  title: string;
}

interface AssignmentPrevNextProps {
  prev?: AssignmentNeighbor | null;
  next?: AssignmentNeighbor | null;
}

const BUTTON_BASE =
  'group flex min-w-0 flex-1 flex-col rounded-xl border border-gray-200 bg-white p-4 no-underline shadow-sm transition-colors hover:border-sky-300 hover:bg-sky-50/60 dark:border-gray-800 dark:bg-black dark:hover:border-sky-700 dark:hover:bg-sky-950/20';

/** Previous / next buttons for assignments that are steps in a sequence
 * (set `prev_assignment` / `next_assignment` to assignment slugs in frontmatter). */
export default function AssignmentPrevNext({ prev, next }: AssignmentPrevNextProps) {
  if (!prev && !next) return null;

  return (
    <nav aria-label="Assignment navigation" className="mt-10 flex flex-col gap-4 sm:flex-row">
      {prev ? (
        <Link href={`/assignments/${prev.slug}`} className={`${BUTTON_BASE} items-start text-left`}>
          <span className="text-xs font-semibold uppercase tracking-widest text-sky-700 dark:text-sky-300">
            &larr; Previous
          </span>
          <span className="mt-1 text-base font-semibold text-gray-950 dark:text-gray-50">{prev.title}</span>
        </Link>
      ) : (
        <span className="hidden flex-1 sm:block" />
      )}
      {next ? (
        <Link href={`/assignments/${next.slug}`} className={`${BUTTON_BASE} items-end text-right`}>
          <span className="text-xs font-semibold uppercase tracking-widest text-sky-700 dark:text-sky-300">
            Next &rarr;
          </span>
          <span className="mt-1 text-base font-semibold text-gray-950 dark:text-gray-50">{next.title}</span>
        </Link>
      ) : (
        <span className="hidden flex-1 sm:block" />
      )}
    </nav>
  );
}
