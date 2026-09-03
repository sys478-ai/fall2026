export function slugifyForId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getModuleAnchorId(moduleId: number): string {
  return `topic-${moduleId}`;
}

export function getMeetingAnchorId(moduleId: number, meetingIndex: number, meetingTopic: string): string {
  return `topic-${moduleId}-meeting-${meetingIndex + 1}-${slugifyForId(meetingTopic)}`;
}
