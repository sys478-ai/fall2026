// Groups a flat reading list into runs of "pick one" alternatives, marked via
// `pick_one: true` in topic frontmatter. Consecutive `pickOne` readings are
// collapsed into a single group; everything else stays a standalone entry.
export type ReadingGroup<T> = { kind: 'single'; reading: T } | { kind: 'pick-one'; options: T[] };

export function groupReadingsByPickOne<T extends { pickOne?: boolean }>(readings: T[]): ReadingGroup<T>[] {
  const groups: ReadingGroup<T>[] = [];
  let currentGroup: T[] | null = null;

  for (const reading of readings) {
    if (reading.pickOne) {
      if (!currentGroup) {
        currentGroup = [];
        groups.push({ kind: 'pick-one', options: currentGroup });
      }
      currentGroup.push(reading);
    } else {
      currentGroup = null;
      groups.push({ kind: 'single', reading });
    }
  }

  return groups;
}
