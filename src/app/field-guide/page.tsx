import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import taxonomyData from '../../../content/config/taxonomy.json';
import ContentLayout from '@/components/ContentLayout';
import RecognitionPatternCards from '@/components/RecognitionPatternCards';
import { getAllPosts } from '@/lib/markdown';

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

interface TaxonomyData {
  ethicalPatterns: TaxonomyEntry[];
}

const taxonomy = taxonomyData as TaxonomyData;
const publicDirectory = path.join(process.cwd(), 'public');
const basePath = '/fall2026';

function normalizeFeaturedImagePath(src?: string) {
  if (!src) {
    return undefined;
  }

  if (/^(https?:)?\/\//.test(src) || src.startsWith('data:')) {
    return src;
  }

  return src.startsWith('/') ? src : `/${src}`;
}

function getPublicFilePath(src: string) {
  const pathname = src.split(/[?#]/)[0];
  const publicPathname = pathname.startsWith(`${basePath}/`)
    ? pathname.slice(basePath.length)
    : pathname;
  const filePath = path.join(publicDirectory, publicPathname);
  const relativePath = path.relative(publicDirectory, filePath);

  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    return undefined;
  }

  return filePath;
}

function getDarkFeaturedImagePath(src?: string) {
  const normalizedSrc = normalizeFeaturedImagePath(src);

  if (!normalizedSrc || /^(https?:)?\/\//.test(normalizedSrc) || normalizedSrc.startsWith('data:')) {
    return undefined;
  }

  const [pathname, suffix = ''] = normalizedSrc.split(/([?#].*)/, 2);
  const extension = path.posix.extname(pathname);

  if (!extension) {
    return undefined;
  }

  const darkSrc = `${pathname.slice(0, -extension.length)}.dark${extension}${suffix}`;
  const darkFilePath = getPublicFilePath(darkSrc);

  return darkFilePath && fs.existsSync(darkFilePath) ? darkSrc : undefined;
}

function getPatternsWithMarkdownMetadata(): TaxonomyEntry[] {
  const patternMetadataBySlug = new Map(
    getAllPosts('ethical-patterns').map(post => [
      post.id,
      {
        featured_image: normalizeFeaturedImagePath(post.featured_image),
        featured_image_dark: getDarkFeaturedImagePath(post.featured_image),
      },
    ])
  );

  return taxonomy.ethicalPatterns.map(pattern => ({
    ...pattern,
    ...(pattern.slug ? patternMetadataBySlug.get(pattern.slug) : undefined),
  }));
}

export const metadata: Metadata = {
  title: 'Field Guide',
  description: 'A field guide to recurring ethical recognition patterns across AI systems, labs, and governance cases.',
};

export default function EthicalPatternRecognitionFieldGuidePage() {
  const patterns = getPatternsWithMarkdownMetadata();

  return (
    <ContentLayout
      variant="list"
      fullWidth
      header={
        <header className="border-y border-violet-200 bg-violet-50 px-4 py-16 dark:border-violet-900 dark:bg-violet-950/30 md:px-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
            Field Guide
          </p>
          <h1 className="m-0! max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-950 dark:text-gray-50">
            Field Guide
          </h1>
          <p className="mb-0 mt-5 max-w-4xl text-lg leading-8 text-gray-700 dark:text-gray-300">
            A standalone reference for the recurring patterns students can practice noticing across technical systems,
            social consequences, and governance debates.
          </p>
        </header>
      }
    >
      <div className="space-y-7">
        <RecognitionPatternCards patterns={patterns} />
      </div>
    </ContentLayout>
  );
}
