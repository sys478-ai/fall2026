import Link from 'next/link';
import ThemedImage from './ThemedImage';

interface TaxonomyEntry {
  slug?: string;
  title: string;
  subtitle?: string;
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
  placeholderLabel,
}: {
  index: number;
  title: string;
  featuredImage?: string;
  featuredImageDark?: string;
  placeholderLabel?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-44 w-full shrink-0 overflow-hidden md:h-auto md:w-72 lg:w-80 ${patternImageStyles[index % patternImageStyles.length]}`}
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
        <div className="flex h-full w-full items-center justify-center px-6 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
            {placeholderLabel || 'Field Guide'}
          </span>
        </div>
      )}
    </div>
  );
}

export default function RecognitionPatternCards({
  patterns,
  badgeLabel = 'Lens',
  preserveOrder = false,
}: {
  patterns: TaxonomyEntry[];
  badgeLabel?: string;
  preserveOrder?: boolean;
}) {
  const sortedPatterns = preserveOrder
    ? patterns
    : [...patterns].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  return (
    <section id="field-guide" className="space-y-4 max-w-5xl">

      <div className="grid grid-cols-1 gap-6">
        {sortedPatterns.map((pattern, index) => {
          const shouldShowShortDescription =
            pattern.shortDescription &&
            pattern.shortDescription.trim() !== pattern.subtitle?.trim();

          const card = (
            <article
              className={`flex h-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-colors md:min-h-52 md:flex-row dark:bg-black ${patternCardStyles[index % patternCardStyles.length]}`}
            >
              <PatternIllustration
                index={index}
                title={pattern.title}
                featuredImage={pattern.featured_image}
                featuredImageDark={pattern.featured_image_dark}
                placeholderLabel={badgeLabel}
              />

              <div className="flex flex-1 items-center bg-white p-5 text-gray-900 dark:bg-black dark:text-gray-100 md:p-6">
                <div className="max-w-3xl">
                  <h3 className="m-0 flex flex-wrap items-center gap-2 text-lg font-semibold leading-snug text-[#0b5d8f] dark:text-[#8fc4ee]">
                    <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                      {badgeLabel}
                    </span>
                    <span>{pattern.title}</span>
                  </h3>
                  {pattern.subtitle && (
                    <p className="mb-0 mt-1 text-base leading-6 text-gray-800 dark:text-gray-200">
                      {pattern.subtitle}
                    </p>
                  )}
                  {shouldShowShortDescription && (
                    <p className="mb-0 mt-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
                      {pattern.shortDescription}
                    </p>
                  )}
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
              className="group block h-full rounded-xl border-0! text-inherit! no-underline transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b5d8f] dark:focus-visible:outline-[#8fc4ee]"
            >
              {card}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
