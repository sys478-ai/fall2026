import MarkdownContent from './MarkdownContent';

export interface PatternComicStripItem {
  id: string;
  label: string;
  content: string;
}

interface PatternComicStripProps {
  intro?: string;
  items: PatternComicStripItem[];
}

export default function PatternComicStrip({ intro, items }: PatternComicStripProps) {
  if (items.length === 0) {
    return intro ? <MarkdownContent content={intro} /> : null;
  }

  return (
    <div className="space-y-6">
      {intro && <MarkdownContent content={intro} />}
      <div className="relative min-w-0">
        <div className="pointer-events-none absolute bottom-4 left-0 top-0 z-10 w-8 bg-linear-to-r from-white to-transparent dark:from-black" />
        <div className="pointer-events-none absolute bottom-4 right-0 top-0 z-10 w-8 bg-linear-to-l from-white to-transparent dark:from-black" />
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden pb-4 pr-8 scroll-smooth scrollbar-none [&::-webkit-scrollbar]:hidden">
          {items.map(item => (
            <article
              key={item.id}
              className="min-w-0 w-80 shrink-0 snap-start rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-black sm:w-96"
            >
              <h3 className="m-0! mb-4! text-lg font-semibold leading-tight text-gray-950 dark:text-gray-50">
                {item.label}
              </h3>
              <MarkdownContent
                content={item.content}
                className="[&_blockquote]:mb-0 [&_blockquote]:mt-4 [&_img]:mb-4 [&_img]:aspect-4/3 [&_img]:w-full [&_img]:max-w-none [&_img]:rounded-xl [&_img]:object-cover"
              />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
