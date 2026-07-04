import { getAllPosts, type PostData } from '@/lib/markdown';

export interface BraidCaseStudyNavItem {
  id: string;
  title: string;
  href: string;
  order: number;
}

function getNavTitle(post: PostData): string {
  const navLabel = (post as PostData & { nav_label?: string }).nav_label;
  if (navLabel) {
    return navLabel;
  }

  return post.title.replace(/^Case Brief:\s*/i, '').trim();
}

export function getBraidCaseStudyNavItems(): BraidCaseStudyNavItem[] {
  return getAllPosts('braid-case-study')
    .filter(post => post.id !== 'index')
    .filter(post => !post.excluded && post.no_render !== 1)
    .filter(post => post.hide_from_list !== 1)
    .map(post => ({
      id: post.id,
      title: getNavTitle(post),
      href: `/braid-case-study/${post.id}`,
      order: typeof post.order === 'number' ? post.order : 999,
    }))
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}
