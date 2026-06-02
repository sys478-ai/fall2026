export const TOPIC_PROGRESS_EVENT = 'topic-progress-changed';

export type TopicProgressStatus = 'not-started' | 'partial' | 'complete';

export function getTopicCompletionStorageKey(topicSlug: string) {
  return `topic-complete-${topicSlug}`;
}

export function getTopicProgressStorageKey(topicSlug: string) {
  return `topic-progress-${topicSlug}`;
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

export function readTopicProgressStatus(topicSlug: string): TopicProgressStatus {
  if (typeof window === 'undefined') {
    return 'not-started';
  }

  const value = localStorage.getItem(getTopicProgressStorageKey(topicSlug));

  if (value === 'partial' || value === 'complete' || value === 'not-started') {
    return value;
  }

  return readTopicCompletion(topicSlug) ? 'complete' : 'not-started';
}

export function writeTopicProgressStatus(topicSlug: string, status: TopicProgressStatus) {
  if (typeof window === 'undefined') {
    return;
  }

  const completed = status === 'complete';
  localStorage.setItem(getTopicProgressStorageKey(topicSlug), status);
  localStorage.setItem(getTopicCompletionStorageKey(topicSlug), JSON.stringify(completed));
  window.dispatchEvent(
    new CustomEvent(TOPIC_PROGRESS_EVENT, {
      detail: { topicSlug, completed, status },
    })
  );
}

export function writeTopicCompletion(topicSlug: string, completed: boolean) {
  if (typeof window === 'undefined') {
    return;
  }

  writeTopicProgressStatus(topicSlug, completed ? 'complete' : 'not-started');
}
