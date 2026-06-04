import MarkdownContent from './MarkdownContent';

export interface HorizontalCardStripItem {
  id: string;
  label: string;
  content: string;
}

interface HorizontalCardStripProps {
  intro?: string;
  items: HorizontalCardStripItem[];
  cardClassName?: string;
  cardLayoutClassName?: string;
  cardContentClassName?: string;
}

export default function HorizontalCardStrip({
  intro,
  items,
  cardClassName,
  cardLayoutClassName,
  cardContentClassName,
}: HorizontalCardStripProps) {
  if (items.length === 0) {
    return intro ? <MarkdownContent content={intro} /> : null;
  }

  return (
    <div className="space-y-6">
      {intro && <MarkdownContent content={intro} />}
      <div className="relative min-w-0">
        <div className="pointer-events-none absolute bottom-4 left-0 top-0 z-10 w-8 bg-linear-to-r from-white to-transparent dark:from-black" />
        <div className="pointer-events-none absolute bottom-4 right-0 top-0 z-10 w-8 bg-linear-to-l from-white to-transparent dark:from-black" />
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden pb-4 pr-8 scrollbar-none [&::-webkit-scrollbar]:hidden">
          {items.map(item => (
            <article
              key={item.id}
              className={`min-w-0 shrink-0 snap-start rounded-2xl border border-gray-200 shadow-sm dark:border-gray-800 ${cardLayoutClassName || 'w-80 p-4 sm:w-96'} ${cardClassName || 'bg-white dark:bg-black'}`}
            >
              <h3 className="m-0! mb-4! text-lg font-semibold leading-tight text-gray-950 dark:text-gray-50">
                {item.label}
              </h3>
              <MarkdownContent content={item.content} className={cardContentClassName} />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
