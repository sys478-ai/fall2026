import Link from 'next/link';

interface TaxonomyEntry {
  slug?: string;
  title: string;
  shortDescription?: string;
  group?: string;
  order?: number;
  relatedThemes?: string[];
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

const patternImageMap: Record<string, { src: string; position: string }> = {
  'ai-systems-are-socio-technical-systems': {
    src: '/fall2026/images/taxonomy-patterns/recognition-patterns-sheet.png',
    position: '0% 0%',
  },
  'classification-is-not-neutral': {
    src: '/fall2026/images/taxonomy-patterns/recognition-patterns-sheet.png',
    position: '100% 0%',
  },
  'data-is-produced-not-found': {
    src: '/fall2026/images/taxonomy-patterns/recognition-patterns-sheet.png',
    position: '0% 100%',
  },
  'thresholds-distribute-harm': {
    src: '/fall2026/images/taxonomy-patterns/recognition-patterns-sheet.png',
    position: '100% 100%',
  },
};

function formatGroupLabel(group: string) {
  return group
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function PatternIllustration({ index, slug }: { index: number; slug?: string }) {
  const imageConfig = slug ? patternImageMap[slug] : undefined;

  if (imageConfig) {
    return (
      <div
        aria-hidden="true"
        className={`relative min-h-36 w-28 shrink-0 overflow-hidden sm:w-40 ${patternImageStyles[index % patternImageStyles.length]}`}
        style={{
          backgroundImage: `url(${imageConfig.src})`,
          backgroundSize: '200% 200%',
          backgroundPosition: imageConfig.position,
          backgroundRepeat: 'no-repeat',
        }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`relative min-h-36 w-28 shrink-0 overflow-hidden sm:w-40 ${patternImageStyles[index % patternImageStyles.length]}`}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="50" y="18" width="62" height="42" rx="6" fill="#ffd966" transform="rotate(-6 50 18)" />
        <path d="M77 30L94 41L78 53L77 30Z" fill="white" stroke="#0b5d8f" strokeWidth="4" strokeLinejoin="round" />
        <circle cx="39" cy="91" r="10" fill="white" stroke="#0b5d8f" strokeWidth="4" />
        <circle cx="62" cy="86" r="12" fill="white" stroke="black" strokeWidth="4" />
        <circle cx="91" cy="79" r="12" fill="white" stroke="black" strokeWidth="4" />
        <circle cx="117" cy="90" r="8" fill="white" stroke="black" strokeWidth="4" />
        <path d="M24 127C26 111 34 102 46 102C58 102 66 111 68 127H24Z" fill="#2f80d7" />
        <path d="M45 127C48 107 60 97 75 97C90 97 101 107 104 127H45Z" fill="#c72026" />
        <path d="M82 127C84 106 96 94 111 94C126 94 137 106 140 127H82Z" fill="#ffd966" />
        <path d="M108 127C110 114 118 107 128 107C138 107 146 114 148 127H108Z" fill="#8c6aa8" />
        <rect x="57" y="126" width="48" height="14" fill="#2f80d7" opacity="0.18" />
        <path d="M37 35C22 49 18 64 23 80" stroke="#0b5d8f" strokeWidth="5" strokeLinecap="round" opacity="0.45" />
        <path d="M119 42C134 47 143 58 145 73" stroke="#0b5d8f" strokeWidth="5" strokeLinecap="round" opacity="0.45" />
      </svg>
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
    <section id="ethical-pattern-recognition-field-guide" className="space-y-4">
      <div className="border-b border-gray-200 pb-2 dark:border-gray-800">
        <h2 className="m-0 text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
        <p className="mb-0 mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {sortedPatterns.map((pattern, index) => (
          <article
            key={pattern.slug ?? pattern.title}
            className={`flex overflow-hidden rounded-xl border bg-white shadow-sm dark:bg-black ${patternCardStyles[index % patternCardStyles.length]}`}
          >
            <PatternIllustration index={index} slug={pattern.slug} />

            <div className="flex-1 bg-white p-4 text-gray-900 dark:bg-black dark:text-gray-100">
              <div className="flex items-start justify-between gap-3">
                <h3 className="m-0 text-lg font-semibold leading-snug text-[#0b5d8f] dark:text-[#8fc4ee]">
                  {pattern.slug ? (
                    <Link
                      href={`/ethical-pattern-recognition-field-guide/${pattern.slug}`}
                      className="!border-0 !text-inherit no-underline hover:underline"
                    >
                      {pattern.title}
                    </Link>
                  ) : (
                    pattern.title
                  )}
                </h3>
                {pattern.order && (
                  <span className="shrink-0 rounded-full bg-white/70 px-2 py-0.5 text-xs font-semibold text-gray-700 ring-1 ring-black/5 dark:bg-black/25 dark:text-gray-200 dark:ring-white/10">
                    {pattern.order}
                  </span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {pattern.group && (
                  <span className="rounded-full bg-white/70 px-2 py-0.5 text-xs font-medium text-gray-700 ring-1 ring-black/5 dark:bg-black/25 dark:text-gray-200 dark:ring-white/10">
                    {formatGroupLabel(pattern.group)}
                  </span>
                )}
                {pattern.relatedThemes?.map((theme) => (
                  <span
                    key={theme}
                    className="rounded-full bg-white/50 px-2 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-black/5 dark:bg-black/20 dark:text-gray-300 dark:ring-white/10"
                  >
                    {theme}
                  </span>
                ))}
              </div>

              {pattern.slug && (
                <div className="mt-4">
                  <Link
                    href={`/ethical-pattern-recognition-field-guide/${pattern.slug}`}
                    className="text-sm font-medium text-[#0b5d8f] no-underline hover:underline dark:text-[#8fc4ee]"
                  >
                    Open field guide
                  </Link>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
