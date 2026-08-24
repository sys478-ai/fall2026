'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/** Static-export friendly redirect: /syllabus → / */
export default function SyllabusRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <p className="p-8 text-sm text-gray-600 dark:text-gray-400">
      Redirecting to syllabus…
    </p>
  );
}
