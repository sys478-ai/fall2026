import Link from 'next/link';
import ThemedImage from './ThemedImage';

interface TaxonomyEntry {
  slug?: string;
  title: string;
  shortDescription?: string;
  group?: string;
  order?: number;
  relatedThemes?: string[];
  featured_image?: string;
  featured_image_dark?: string;
}

const patternCardStyles = [
  'border-[#0b5d8f]/25 dark:border-[#2f80d7]/50',
  'border-[#ffd966]/70 dark:border-[#ffd966]/50',
  'border-[#c72026]/25 dark:border-[#c72026]/50',
  'border-[#2f80d7]/25 dark:border-[#2f80d7]/50',
  'border-[#8c6aa8]/30 dark:border-[#8c6aa8]/60',
  'border-[#e8e5df] dark:border-[#e8e5df]/30',
];

const patternImageStyles = [
  'bg-[#f3f3f0] dark:bg-[#10283b]',
  'bg-[#fff1b8] dark:bg-[#3a2f13]',
  'bg-[#f9e7e5] dark:bg-[#3a1719]',
  'bg-[#eaf3fb] dark:bg-[#10283b]',
  'bg-[#eee7f3] dark:bg-[#251f31]',
  'bg-white dark:bg-[#111827]',
];

function PatternIllustration({
  index,
  title,
  featuredImage,
  featuredImageDark,
}: {
  index: number;
  title: string;
  featuredImage?: string;
  featuredImageDark?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-44 w-full shrink-0 overflow-hidden sm:h-52 ${patternImageStyles[index % patternImageStyles.length]}`}
    >
      {featuredImage ? (
        <ThemedImage
          src={featuredImage}
          darkSrc={featuredImageDark}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          title={`${title} illustration`}
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center">???</div>
      )}
    </div>
  );
}

export default function RecognitionPatternCards({
  patterns,
  title = 'Ethical Recognition Patterns',
  description = 'Short recurring patterns students can learn to notice across AI systems, labs, and governance cases.',
}: {
  patterns: TaxonomyEntry[];
  title?: string;
  description?: string;
}) {
  const sortedPatterns = [...patterns].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  return (
    <section id="field-guide" className="space-y-4">

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {sortedPatterns.map((pattern, index) => {
          const card = (
            <article
              className={`flex h-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-colors dark:bg-black ${patternCardStyles[index % patternCardStyles.length]}`}
            >
              <PatternIllustration
                index={index}
                title={pattern.title}
                featuredImage={pattern.featured_image}
                featuredImageDark={pattern.featured_image_dark}
              />

              <div className="flex-1 bg-white p-4 text-gray-900 dark:bg-black dark:text-gray-100">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="m-0 text-lg font-semibold leading-snug text-[#0b5d8f] dark:text-[#8fc4ee]">
                    {pattern.title}
                  </h3>
                </div>
              </div>
            </article>
          );

          if (!pattern.slug) {
            return <div key={pattern.title}>{card}</div>;
          }

          return (
            <Link
              key={pattern.slug}
              href={`/field-guide/${pattern.slug}`}
              className="group block h-full rounded-xl border-0! text-inherit! no-underline transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b5d8f] dark:focus-visible:outline-[#8fc4ee]"
            >
              {card}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
