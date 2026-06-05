import { getAllPosts, getPostData } from './markdown';

export interface ExampleForCard {
  slug: string;
  title: string;
  excerpt?: string;
  domains: string[];
  content: string;
  interpretation: string;
}

export async function getExamplesForCard(cardNum: string): Promise<ExampleForCard[]> {
  const allExamples = getAllPosts('examples');

  const matches = allExamples.filter(example => {
    const connected = example.connected_cards as Array<{ num: string }> | undefined;
    return connected?.some(c => c.num === cardNum) ?? false;
  });

  return Promise.all(
    matches.map(async example => {
      const postData = await getPostData(example.id, 'examples');
      const connected = example.connected_cards as Array<{ num: string; interpretation: string }> | undefined;
      const connection = connected?.find(c => c.num === cardNum);

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
