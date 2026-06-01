import { getTopics } from './topics';

function normalizeHref(href: string) {
  return href.replace(/^\/fall2026/, '').replace(/\/$/, '');
}

function getMeetingTopicNumber(moduleId: number, meetingIndex: number) {
  return `${moduleId}.${meetingIndex + 2}`;
}

function hrefMatches(url: string | undefined, targetHref: string) {
  return Boolean(url && normalizeHref(url) === normalizeHref(targetHref));
}

export async function getTopicContextForHref(targetHref: string) {
  const topics = await getTopics();

  for (const topic of topics) {
    for (const [meetingIndex, meeting] of topic.meetings.entries()) {
      const activity = (meeting.activities || []).find(item => hrefMatches(item.url, targetHref));
      if (activity) {
        return {
          moduleId: topic.id,
          moduleTitle: topic.title,
          topicNumber: getMeetingTopicNumber(topic.id, meetingIndex),
          topicTitle: meeting.topic,
          topicHref: meeting.slug ? `/topics/${meeting.slug}` : undefined,
          itemTitle: activity.title,
        };
      }

      const assignedItems = Array.isArray(meeting.assigned)
        ? meeting.assigned
        : meeting.assigned
          ? [meeting.assigned]
          : [];

      const dueItems = Array.isArray(meeting.due)
        ? meeting.due
        : meeting.due
          ? [meeting.due]
          : [];

      const assignment = [...assignedItems, ...dueItems].find(item =>
        typeof item === 'object' && hrefMatches(item.url, targetHref)
      );

      if (typeof assignment === 'object') {
        return {
          moduleId: topic.id,
          moduleTitle: topic.title,
          topicNumber: getMeetingTopicNumber(topic.id, meetingIndex),
          topicTitle: meeting.topic,
          topicHref: meeting.slug ? `/topics/${meeting.slug}` : undefined,
          itemTitle: assignment.titleShort ? `${assignment.titleShort}: ${assignment.title}` : assignment.title,
        };
      }
    }
  }

  return null;
}
