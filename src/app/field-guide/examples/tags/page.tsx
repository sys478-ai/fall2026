import type { Metadata } from 'next';
import Link from 'next/link';
import ContentLayout from '@/components/ContentLayout';
import { getAllTags } from '@/lib/examples';

export const metadata: Metadata = {
  title: 'Browse by Topic — AI Field Guide',
  description: 'Browse example cases by topic.',
};

export default function TagsIndexPage() {
  const tags = getAllTags();

  return (
    <ContentLayout
      variant="list"
      fullWidth
      contentPadding={false}
      header={
        <header className="border-y border-violet-200 bg-violet-50 px-4 py-16 dark:border-violet-900 dark:bg-violet-950/30 md:px-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
            <Link href="/field-guide/examples" className="hover:underline">← Examples</Link>
          </p>
          <h1 className="m-0! max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-950 dark:text-gray-50">
            Browse by Topic
          </h1>
        </header>
      }
    >
      <div className="px-4 py-10 md:px-16">
        <div className="max-w-5xl grid gap-4 grid-cols-1 md:grid-cols-2">
          {tags.map(tag => (
            <Link
              key={tag.id}
              href={`/field-guide/examples/tags/${tag.id}`}
              className="group block rounded-xl border border-gray-200 bg-white p-5 no-underline shadow-sm transition-colors hover:border-violet-300 hover:bg-violet-50/50 dark:border-gray-800 dark:bg-black dark:hover:border-violet-700 dark:hover:bg-violet-950/20"
            >
              <h2 className="m-0 text-base font-semibold text-[#0b5d8f] group-hover:text-violet-700 dark:text-[#8fc4ee] dark:group-hover:text-violet-300">
                {tag.title}
              </h2>
              {tag.description && (
                <p className="mb-0 mt-1 text-sm leading-6 text-gray-700 dark:text-gray-300">{tag.description}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </ContentLayout>
  );
}
