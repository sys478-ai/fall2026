'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AssignmentSeriesClientRedirectProps {
  href: string;
  title: string;
}

export default function AssignmentSeriesClientRedirect({ href, title }: AssignmentSeriesClientRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    router.replace(href);
  }, [href, router]);

  return (
    <p className="text-sm leading-6 text-gray-700 dark:text-gray-300">
      Redirecting to {title}. If you are not redirected automatically,{' '}
      <Link href={href} className="font-semibold text-[#0b5d8f] no-underline hover:underline dark:text-[#8fc4ee]">
        open the assignment here
      </Link>
      .
    </p>
  );
}
