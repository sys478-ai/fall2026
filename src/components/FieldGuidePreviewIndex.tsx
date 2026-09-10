'use client';

import FieldGuideCardPreview, { type FieldGuidePreviewItem } from '@/components/FieldGuideCardPreview';
import { FieldGuideViewProvider, useFieldGuideView } from '@/components/FieldGuideView';
import type { AIHistoryTimelineEntry } from '@/lib/ai-history-timeline';
import type { FieldGuideBannerClasses } from '@/lib/field-guide-palettes';

export interface FieldGuidePreviewIndexSection {
  key: string;
  title?: string;
  intro?: string;
  items: FieldGuidePreviewItem[];
}

interface FieldGuidePreviewIndexProps {
  sections: FieldGuidePreviewIndexSection[];
  badgeLabel: string;
  linkBasePath: string;
  moreLinkLabel: string;
  banner: FieldGuideBannerClasses;
  sheetTitleIdPrefix: string;
  aiHistoryEntries?: AIHistoryTimelineEntry[];
}

function FieldGuidePreviewSections({
  sections,
  badgeLabel,
  linkBasePath,
  moreLinkLabel,
  banner,
  sheetTitleIdPrefix,
  aiHistoryEntries,
}: FieldGuidePreviewIndexProps) {
  const view = useFieldGuideView();

  return (
    <>
      {sections.map(section => {
        const preview = (
          <FieldGuideCardPreview
            items={section.items}
            badgeLabel={badgeLabel}
            linkBasePath={linkBasePath}
            moreLinkLabel={moreLinkLabel}
            banner={banner}
            sheetTitleId={`${sheetTitleIdPrefix}-${section.key}`}
            aiHistoryEntries={aiHistoryEntries}
            viewMode={view}
          />
        );

        if (view === 'compact') {
          const hasLabel = Boolean(section.title);
          return (
            <div
              key={section.key}
              className="border-t border-gray-200 px-4 pt-8 pb-6 dark:border-gray-800 md:px-16"
            >
              <div className={`grid gap-6 ${hasLabel ? 'grid-cols-1 md:grid-cols-[2fr_3fr]' : 'grid-cols-1'}`}>
                {hasLabel ? (
                  <div className="md:pr-6">
                    <h2 className="m-0! text-lg font-semibold text-gray-950 dark:text-gray-50">
                      {section.title}
                    </h2>
                    {section.intro ? (
                      <p className="mb-0 mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                        {section.intro}
                      </p>
                    ) : null}
                  </div>
                ) : null}
                <div>{preview}</div>
              </div>
            </div>
          );
        }

        return (
          <section
            key={section.key}
            className="space-y-5 border-t border-gray-200 px-4 pt-8 dark:border-gray-800 md:px-16"
          >
            {(section.title || section.intro) && (
              <div className="space-y-3">
                {section.title ? (
                  <h2 className="m-0 text-5xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">
                    {section.title}
                  </h2>
                ) : null}
                {section.intro ? (
                  <p className="mb-0 max-w-5xl text-base leading-7 text-gray-700 dark:text-gray-300">
                    {section.intro}
                  </p>
                ) : null}
              </div>
            )}
            {preview}
          </section>
        );
      })}
    </>
  );
}

export default function FieldGuidePreviewIndex(props: FieldGuidePreviewIndexProps) {
  return (
    <FieldGuideViewProvider>
      <FieldGuidePreviewSections {...props} />
    </FieldGuideViewProvider>
  );
}
