import { redirect } from 'next/navigation';
import { getAllPostIds } from '@/lib/markdown';

interface CareerModulePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return getAllPostIds('assignments')
    .map(({ params }) => params.id)
    .filter(slug => /^career-module\d+$/.test(slug))
    .map(slug => ({ slug }));
}

export default async function CareerModulePage({ params }: CareerModulePageProps) {
  const { slug } = await params;
  redirect(`/assignments/${slug}`);
}
