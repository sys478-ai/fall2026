import { getAllTopicMarkdownMetadata } from '@/lib/topic-markdown';
import LegacyTopicToMeetingRedirectClient from './ModuleRedirectClient';

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  return getAllTopicMarkdownMetadata()
    .filter(topic => !topic.retired)
    .map(topic => ({
      id: topic.slug,
    }));
}

export default function LegacyTopicRedirectPage() {
  return <LegacyTopicToMeetingRedirectClient />;
}
