import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import gfm from 'remark-gfm';
import html from 'remark-html';
import ContentLayout from '@/components/ContentLayout';
import QuickLinksNav from '@/components/QuickLinksNav';

async function getInventoryHtml(): Promise<string> {
  const filePath = path.join(process.cwd(), 'content', 'config', 'playlist-inventory.md');
  const raw = fs.readFileSync(filePath, 'utf8');
  const result = await remark().use(gfm).use(html, { sanitize: false }).process(raw);
  return result.toString();
}

export default async function PlaylistInventoryPage() {
  const contentHtml = await getInventoryHtml();

  return (
    <ContentLayout variant="list" leftNav={<QuickLinksNav />} fullWidth>
      <div className="mb-8 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          Internal — Planning
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">
          Playlist Inventory
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Suggested resource assignments per topic. Edit{' '}
          <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">
            content/config/playlist-inventory.md
          </code>{' '}
          to update.
        </p>
      </div>

      <div
        className="prose prose-sm max-w-none dark:prose-invert
          prose-h2:mt-8 prose-h2:text-lg prose-h2:font-semibold
          prose-h3:mt-5 prose-h3:text-base prose-h3:font-medium prose-h3:text-gray-700 dark:prose-h3:text-gray-300
          prose-ul:my-1 prose-li:my-0
          prose-code:rounded prose-code:bg-gray-100 prose-code:px-1 prose-code:text-xs dark:prose-code:bg-gray-800
          prose-table:text-xs prose-th:py-1 prose-td:py-1
          prose-hr:my-8"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </ContentLayout>
  );
}
