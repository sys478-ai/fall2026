'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function LegacyTopicToMeetingRedirectClient() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    const id = params?.id;
    if (id) {
      router.replace(`/meetings/${id}`);
      return;
    }
    router.replace('/topics');
  }, [params, router]);

  return (
    <p className="p-8 text-sm text-gray-600 dark:text-gray-400">Redirecting to meeting…</p>
  );
}
