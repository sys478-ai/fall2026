'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ModuleRedirectClient() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/modules');
  }, [router]);

  return (
    <p className="p-8 text-sm text-gray-600 dark:text-gray-400">Redirecting to course schedule…</p>
  );
}
