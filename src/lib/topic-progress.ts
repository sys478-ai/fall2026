export const TOPIC_PROGRESS_EVENT = 'topic-progress-changed';

export function getTopicCompletionStorageKey(topicSlug: string) {
  return `topic-complete-${topicSlug}`;
}

export function readTopicCompletion(topicSlug: string) {
  if (typeof window === 'undefined') {
    return false;
  }

  const value = localStorage.getItem(getTopicCompletionStorageKey(topicSlug));

  if (value === null) {
    return false;
  }

  try {
    return JSON.parse(value) === true;
  } catch {
    return value === 'true';
  }
}

export function writeTopicCompletion(topicSlug: string, completed: boolean) {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(getTopicCompletionStorageKey(topicSlug), JSON.stringify(completed));
  window.dispatchEvent(
    new CustomEvent(TOPIC_PROGRESS_EVENT, {
      detail: { topicSlug, completed },
    })
  );
}
