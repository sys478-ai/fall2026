import { notFound } from 'next/navigation';
import TeachableLab from '@/components/teachable-machine/TeachableLab';

export function generateStaticParams() {
  return ['a', 'b', 'c'].map(group => ({ group }));
}

export const metadata = { title: 'Image Model Lab | SYS 478' };

export default async function Page({ params }: { params: Promise<{ group: string }> }) {
  const { group } = await params;
  if (group !== 'a' && group !== 'b' && group !== 'c') notFound();
  return <TeachableLab />;
}
