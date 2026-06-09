import { getAllPosts, getPostData, type PostData } from './markdown';

export interface TagData {
  id: string;
  title: string;
  description: string;
}

export function getAllTags(): TagData[] {
  return getAllPosts('examples/tags')
    .map(post => ({
      id: post.id,
      title: post.title,
      description: (post.description as string) ?? '',
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getExamplesForTag(tag: string): PostData[] {
  return getAllPosts('examples')
    .filter(post => !post.hide_from_list && !post.no_render)
    .filter(post => ((post.tags as string[] | undefined) ?? []).includes(tag))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export interface ExampleForCard {
  slug: string;
  title: string;
  excerpt?: string;
  domains: string[];
  content: string;
  interpretation: string;
}

export async function getExamplesForCard(cardNum: string, section?: string): Promise<ExampleForCard[]> {
  const allExamples = getAllPosts('examples');

  const matches = allExamples.filter(example => {
    const connected = example.connected_cards as Array<{ num: string; section?: string }> | undefined;
    return connected?.some(c => c.num === cardNum && (!section || !c.section || c.section === section)) ?? false;
  });

  return Promise.all(
    matches.map(async example => {
      const postData = await getPostData(example.id, 'examples');
      const connected = example.connected_cards as Array<{ num: string; section?: string; interpretation: string }> | undefined;
      const connection = connected?.find(c => c.num === cardNum && (!section || !c.section || c.section === section));

      return {
        slug: example.id,
        title: example.title,
        excerpt: example.excerpt,
        domains: (example.domains as string[]) ?? [],
        content: postData.content,
        interpretation: connection?.interpretation ?? '',
      };
    })
  );
}
