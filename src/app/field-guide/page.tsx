import type { Metadata } from 'next';
import Link from 'next/link';
import ContentLayout from '@/components/ContentLayout';
import { getPostData, type PostData } from '@/lib/markdown';

export const metadata: Metadata = {
  title: 'Resources – AI & Society',
  description: 'Tools for noticing, analyzing, and making sense of AI in everyday life.',
};

// Keep in sync with the visible Resources items in SidebarNavClient.
const sections: { label: string; href: string; contentDir?: string }[] = [
  { label: 'Technical Explainers', href: '/field-guide/technical-explainers', contentDir: 'technical-explainers' },
  { label: 'AI Deployment Patterns', href: '/field-guide/deployment-patterns', contentDir: 'ai-deployment-patterns' },
  { label: 'Examples', href: '/field-guide/examples', contentDir: 'examples' },
  { label: 'Ethical Frameworks', href: '/field-guide/ethical-frameworks', contentDir: 'ethical-frameworks' },
  { label: 'Theories of Learning', href: '/field-guide/theories-of-learning', contentDir: 'theories-of-learning' },
  { label: 'Symposium Research & Design Tips', href: '/field-guide/symposium-tips' },
];

export default async function ResourcesLandingPage() {
  const posts = await Promise.all(
    sections.map(section => (section.contentDir ? getPostData('index', section.contentDir) : null))
  );

  return (
    <ContentLayout
      variant="list"
      fullWidth
      contentPadding={false}
      header={
        <header className="border-y border-gray-200 bg-gray-50 px-4 py-16 dark:border-gray-800 dark:bg-gray-950/30 md:px-16">
          <h1 className="m-0! max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-950 dark:text-gray-50">
            Resources
          </h1>
          <p className="mb-0 mt-5 max-w-4xl text-lg leading-6 text-gray-700 dark:text-gray-300">
            Tools for noticing patterns, asking better questions, and making sense of AI in everyday life.
          </p>
        </header>
      }
    >
      <div className="grid max-w-5xl grid-cols-1 gap-4 px-4 py-12 md:px-16">
        {sections.map((section, index) => {
          const subtitle = (posts[index] as (PostData & { subtitle?: string }) | null)?.subtitle;

          return (
            <Link
              key={section.href}
              href={section.href}
              className="block rounded-xl border border-gray-200 bg-white p-5 no-underline shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-black md:p-6"
            >
              <h2 className="m-0! text-lg font-semibold leading-snug text-gray-950 dark:text-gray-50">
                {section.label}
              </h2>
              {subtitle && (
                <p className="mb-0! mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{subtitle}</p>
              )}
            </Link>
          );
        })}
      </div>
    </ContentLayout>
  );
}
