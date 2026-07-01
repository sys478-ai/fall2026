export function resolveTopicCardIdFromHash(hashId: string): string | null {
  const match = hashId.match(/^(?:topics|scenarios)-(.+)$/);
  return match ? match[1] : null;
}

/** @deprecated Use resolveTopicCardIdFromHash */
export const resolveScenarioCardIdFromHash = resolveTopicCardIdFromHash;

export function resolveAssignmentTabIdFromHash(hashId: string): string | undefined {
  if (!hashId) {
    return undefined;
  }

  if (hashId === 'topics' || hashId.startsWith('topics-')) {
    return 'topics';
  }

  // Legacy hashes from before the Topics rename
  if (hashId === 'scenarios' || hashId.startsWith('scenarios-')) {
    return 'topics';
  }

  return undefined;
}
