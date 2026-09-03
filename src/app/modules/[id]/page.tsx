import { getAllModuleMarkdownMetadata } from '@/lib/module-markdown';
import ModuleIdRedirectClient from './ModuleRedirectClient';

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  return getAllModuleMarkdownMetadata().map(module => ({
    id: String(module.id),
  }));
}

export default function LegacyModuleRedirectPage() {
  return <ModuleIdRedirectClient />;
}
