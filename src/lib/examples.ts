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

export interface ExampleFilterOption {
  value: string;
  label: string;
  count: number;
}

export interface ExampleFilterData {
  /** Keyed by example id: the sector tags and pattern families it belongs to. */
  byExample: Record<string, { sectors: string[]; families: string[] }>;
  sectorOptions: ExampleFilterOption[];
  familyOptions: ExampleFilterOption[];
}

// Example frontmatter uses zero-padded card numbers ('08') while pattern files use '8'.
function normalizeCardNum(num: unknown): string {
  const raw = String(num ?? '').trim();
  const parsed = Number(raw);
  return raw !== '' && Number.isFinite(parsed) ? String(parsed) : raw;
}

function humanizeSlug(slug: string): string {
  return slug
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

type CardSource = 'ai-deployment-patterns' | 'sts-concepts' | 'governance';

interface CardRef {
  source: CardSource;
  num: string;
  title: string;
  /** Site-relative path (no base path). */
  href: string;
  /** Deployment-pattern family key (deployment patterns only). */
  family?: string;
  familyLabel?: string;
}

type CardIndex = Record<CardSource, Map<string, CardRef>>;

interface ConnectedCardEntry {
  num: string;
  section?: string;
  interpretation: string;
}

// Deployment patterns, STS concepts, and governance cards reuse the same numbers, so a
// connected card must be resolved within the right section (see resolveConnectedCard).
function buildCardIndex(): CardIndex {
  const index: CardIndex = {
    'ai-deployment-patterns': new Map(),
    'sts-concepts': new Map(),
    governance: new Map(),
  };

  (['ai-deployment-patterns', 'sts-concepts', 'governance'] as const).forEach(source => {
    getAllPosts(source)
      .filter(post => post.num !== undefined && post.num !== null && String(post.num).trim() !== '')
      .filter(post => source !== 'ai-deployment-patterns' || (post.card_type === 'recognition' && !post.excluded && post.no_render !== 1))
      .forEach(post => {
        const extras = post as PostData & { slug?: string; field_guide_group?: string; subtheme_title?: string };
        const urlSlug = extras.slug || post.id;
        const folder =
          source === 'ai-deployment-patterns'
            ? 'deployment-patterns'
            : post.field_guide_section || source;
        const num = normalizeCardNum(post.num);
        index[source].set(num, {
          source,
          num,
          title: post.title,
          href: `/field-guide/${folder}/${urlSlug}`,
          family: extras.field_guide_group,
          familyLabel: extras.subtheme_title,
        });
      });
  });

  return index;
}

/** Finds the card an example's `connected_cards` entry points at.
 * - `section: ai-deployment-patterns` -> deployment patterns only.
 * - `section: sts-concepts` -> STS concepts, then governance (card 26 lives there).
 * - no section -> deployment patterns first, then STS concepts, then governance. */
function resolveConnectedCard(index: CardIndex, num: unknown, section?: string): CardRef | undefined {
  const order: CardSource[] =
    section === 'ai-deployment-patterns'
      ? ['ai-deployment-patterns']
      : section === 'sts-concepts'
        ? ['sts-concepts', 'governance']
        : section === 'governance'
          ? ['governance']
          : ['ai-deployment-patterns', 'sts-concepts', 'governance'];

  const key = normalizeCardNum(num);
  for (const source of order) {
    const match = index[source].get(key);
    if (match) return match;
  }
  return undefined;
}

/** Sector (tag) and deployment-pattern-family membership for every example, plus the
 * option lists for the Examples page filters. */
export function getExampleFilterData(): ExampleFilterData {
  const tagTitles = new Map(getAllTags().map(tag => [tag.id, tag.title]));
  const index = buildCardIndex();

  const familyMeta = new Map<string, { label: string; order: number }>();
  index['ai-deployment-patterns'].forEach(card => {
    if (!card.family) return;
    const order = Number(card.num);
    const existing = familyMeta.get(card.family);
    familyMeta.set(card.family, {
      label: existing?.label || card.familyLabel || humanizeSlug(card.family),
      order: Math.min(existing?.order ?? Infinity, Number.isFinite(order) ? order : Infinity),
    });
  });

  const byExample: ExampleFilterData['byExample'] = {};
  const sectorCounts = new Map<string, number>();
  const familyCounts = new Map<string, number>();

  getAllPosts('examples')
    .filter(post => !post.hide_from_list && !post.no_render && !post.excluded)
    .forEach(post => {
      const sectors = Array.from(new Set((post.tags as string[] | undefined) ?? []));
      const connected = (post.connected_cards as ConnectedCardEntry[] | undefined) ?? [];
      const families = Array.from(
        new Set(
          connected
            .map(entry => resolveConnectedCard(index, entry.num, entry.section))
            .filter((card): card is CardRef => card?.source === 'ai-deployment-patterns')
            .map(card => card.family)
            .filter((group): group is string => Boolean(group))
        )
      );
      byExample[post.id] = { sectors, families };
      sectors.forEach(value => sectorCounts.set(value, (sectorCounts.get(value) ?? 0) + 1));
      families.forEach(value => familyCounts.set(value, (familyCounts.get(value) ?? 0) + 1));
    });

  const sectorOptions = Array.from(sectorCounts, ([value, count]) => ({
    value,
    label: tagTitles.get(value) ?? humanizeSlug(value),
    count,
  })).sort((a, b) => a.label.localeCompare(b.label));

  const familyOptions = Array.from(familyCounts, ([value, count]) => ({
    value,
    label: familyMeta.get(value)?.label ?? humanizeSlug(value),
    count,
  })).sort(
    (a, b) => (familyMeta.get(a.value)?.order ?? 0) - (familyMeta.get(b.value)?.order ?? 0)
  );

  return { byExample, sectorOptions, familyOptions };
}

export interface ExampleTheme {
  num: string;
  title?: string;
  /** Site-relative path (no base path), when the card page is known. */
  href?: string;
  interpretation: string;
}

/** Resolves an example's `connected_cards` to course themes (card title + link + interpretation). */
export function getExampleThemes(connected: ConnectedCardEntry[] | undefined): ExampleTheme[] {
  if (!connected || connected.length === 0) return [];

  const index = buildCardIndex();
  return connected.map(({ num, section, interpretation }) => {
    const match = resolveConnectedCard(index, num, section);
    return { num, title: match?.title, href: match?.href, interpretation };
  });
}

export interface ExampleForCard {
  slug: string;
  title: string;
  excerpt?: string;
  domains: string[];
  content: string;
  interpretation: string;
}

/** Examples whose connected card is this card. `section` is the card's content section
 * (e.g. 'ai-deployment-patterns'); an entry only matches when it resolves to that section. */
export async function getExamplesForCard(cardNum: string, section?: string): Promise<ExampleForCard[]> {
  const index = buildCardIndex();
  const wanted = normalizeCardNum(cardNum);

  const findConnection = (connected: ConnectedCardEntry[] | undefined) =>
    connected?.find(entry => {
      if (normalizeCardNum(entry.num) !== wanted) return false;
      if (!section) return true;
      return resolveConnectedCard(index, entry.num, entry.section)?.source === section;
    });

  const matches = getAllPosts('examples').filter(example =>
    Boolean(findConnection(example.connected_cards as ConnectedCardEntry[] | undefined))
  );

  return Promise.all(
    matches.map(async example => {
      const postData = await getPostData(example.id, 'examples');
      const connection = findConnection(example.connected_cards as ConnectedCardEntry[] | undefined);

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
