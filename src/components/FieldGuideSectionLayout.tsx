import ContentLayout from '@/components/ContentLayout';
import ThemedImage from '@/components/ThemedImage';
import { getPostData, type PostData } from '@/lib/markdown';
import { normalizeFeaturedImagePath, getDarkFeaturedImagePath } from '@/lib/featured-image';

interface Props {
  contentDir: 'recognition-guide' | 'concept-guide' | 'examples' | 'ethic-guide' | 'technical-explainers';
  children: (columns: 1 | 2) => React.ReactNode;
}

export default async function FieldGuideSectionLayout({ contentDir, children }: Props) {
  const indexPost = await getPostData('index', contentDir);
  const title = (indexPost as PostData & { title?: string }).title ?? '';
  const subtitle = (indexPost as PostData & { subtitle?: string }).subtitle;
  const sectionLabel = (indexPost as PostData & { section_label?: string }).section_label ?? 'Field Guide';
  const rawImage = (indexPost as PostData & { featured_image?: string }).featured_image;
  const imageSrc = normalizeFeaturedImagePath(rawImage);
  const imageDarkSrc = getDarkFeaturedImagePath(rawImage);
  const rawColumns = (indexPost as PostData & { card_columns?: number }).card_columns;
  const columns: 1 | 2 = rawColumns === 2 ? 2 : 1;

  return (
    <ContentLayout
      variant="list"
      fullWidth
      contentPadding={false}
      header={
        <>
          <header className="border-y border-violet-200 bg-violet-50 px-4 py-16 dark:border-violet-900 dark:bg-violet-950/30 md:px-16">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
              {sectionLabel}
            </p>
            <h1 className="m-0! max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-950 dark:text-gray-50">
              {title}
            </h1>
            {subtitle && (
              <p className="mb-0 mt-5 max-w-4xl text-lg leading-8 text-gray-700 dark:text-gray-300">{subtitle}</p>
            )}
          </header>
          {imageSrc && (
            <div className="relative shrink-0">
              <ThemedImage
                src={imageSrc}
                darkSrc={imageDarkSrc}
                className="w-full my-8"
                style={{
                  WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 25%, rgba(0, 0, 0, 0.55) 55%, transparent 78%)',
                  maskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 25%, rgba(0, 0, 0, 0.55) 55%, transparent 78%)',
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-white dark:to-black"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-t from-transparent to-white dark:to-black"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-l from-transparent to-white dark:to-black"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-r from-transparent to-white dark:to-black"
              />
            </div>
          )}
        </>
      }
    >
      <div className="space-y-12">
        {indexPost.content && (
          //   <section className="max-w-6xl px-4 md:px-16 grid grid-cols-1 gap-6 md:grid-cols-[3fr_3fr]">
          //     <div
          //       className="mb-0 text-gray-700 leading-8 dark:text-gray-300 prose prose-gray dark:prose-invert max-w-none"
          //       dangerouslySetInnerHTML={{ __html: indexPost.content }}
          //     />
          //     {imageSrc && (
          //       <div className="shrink-0">
          //         <ThemedImage src={imageSrc} darkSrc={imageDarkSrc} className="rounded-xl w-full" />
          //       </div>
          //     )}
          //   </section>
          <section className="max-w-6xl px-4 md:px-16">
            {/* {imageSrc && (
              <div className="shrink-0">
                <ThemedImage src={imageSrc} darkSrc={imageDarkSrc} className="rounded-xl w-full mb-8" />
              </div>
            )} */}
            <div
              className="mb-0 text-gray-700 leading-8 dark:text-gray-300 prose prose-gray dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: indexPost.content }}
            />
          </section>
        )}
        {children(columns)}
      </div>
    </ContentLayout>
  );
}
