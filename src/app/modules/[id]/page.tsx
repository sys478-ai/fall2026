import { getAllModuleMarkdownMetadata } from '@/lib/module-markdown';
import ModuleRedirectClient from './ModuleRedirectClient';

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  return getAllModuleMarkdownMetadata().map(module => ({
    id: String(module.id),
  }));
}

export default function ModuleRedirectPage() {
  return <ModuleRedirectClient />;
}
