import type { ReactNode } from 'react';
import ContentLayout from '@/components/ContentLayout';
import QuickLinksNav from '@/components/QuickLinksNav';
import Breadcrumbs from '@/components/Breadcrumbs';
import TopLevelPageHeader from '@/components/TopLevelPageHeader';

interface BraidCaseStudyLayoutProps {
  title: string;
  subtitle?: string;
  breadcrumbItems: Array<{ label: string; href?: string }>;
  showToc?: boolean;
  tocMaxLevel?: number;
  showFictionalWatermark?: boolean;
  children: ReactNode;
}

export default function BraidCaseStudyLayout({
  title,
  subtitle,
  breadcrumbItems,
  showToc = true,
  tocMaxLevel = 2,
  showFictionalWatermark = false,
  children,
}: BraidCaseStudyLayoutProps) {
  return (
    <ContentLayout
      variant="detail-with-toc"
      leftNav={<QuickLinksNav />}
      fullWidth
      showToc={showToc}
      tocMaxLevel={tocMaxLevel}
      header={
        <div className="space-y-4 py-6">
          <Breadcrumbs className="px-4 md:px-16" items={breadcrumbItems} />
          <TopLevelPageHeader
            label="BRAID Case Study"
            title={title}
            description={subtitle}
            tone="slate"
          />
        </div>
      }
    >
      <div className={showFictionalWatermark ? 'fictional-document' : undefined}>
        {showFictionalWatermark && (
          <div className="fictional-watermark" aria-hidden="true">
            FICTIONAL
          </div>
        )}
        <div className="fictional-document__content space-y-8">{children}</div>
      </div>
    </ContentLayout>
  );
}
