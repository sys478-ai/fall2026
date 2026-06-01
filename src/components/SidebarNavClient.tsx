'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  Bars3Icon,
  BookOpenIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon,
  FolderIcon,
  HomeIcon,
  MoonIcon,
  RectangleGroupIcon,
  SparklesIcon,
  SunIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useDarkMode } from '@/hooks/useDarkMode';

interface SidebarTopicItem {
  id: string;
  title: string;
  date: string;
  contentHref: string;
}

interface SidebarModuleItem {
  id: number;
  title: string;
  href: string;
  topics: SidebarTopicItem[];
}

interface SidebarNavClientProps {
  courseTitle: string;
  modules: SidebarModuleItem[];
}

const SIDEBAR_COLLAPSED_KEY = 'sidebar-collapsed';

function normalizePath(path: string) {
  return path.replace(/^\/fall2026/, '').replace(/\/$/, '') || '/';
}

export default function SidebarNavClient({ courseTitle, modules }: SidebarNavClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const normalizedPath = normalizePath(pathname);
  const isDark = useDarkMode();
  const [mounted, setMounted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modulesOpen, setModulesOpen] = useState(
    normalizedPath === '/' || normalizedPath.startsWith('/modules') || normalizedPath.startsWith('/topics')
  );
  const [openModuleId, setOpenModuleId] = useState<number | null>(() => {
    const activeModule = modules.find(module =>
      module.topics.some(topic => normalizePath(topic.contentHref) === normalizedPath)
    );
    return activeModule?.id ?? modules[0]?.id ?? null;
  });

  useEffect(() => {
    setMounted(true);
    const savedCollapsed = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    if (savedCollapsed !== null) {
      setCollapsed(savedCollapsed === 'true');
    }
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.style.setProperty('--app-sidebar-width', collapsed ? '5rem' : '18rem');
  }, [collapsed]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const activeModule = modules.find(module =>
      module.topics.some(topic => normalizePath(topic.contentHref) === normalizedPath)
    );

    if (activeModule) {
      setOpenModuleId(activeModule.id);
      setModulesOpen(true);
    }
  }, [modules, normalizedPath]);

  const activeTaxonomy = normalizedPath.startsWith('/planning/taxonomy');
  const activePatternGuide = normalizedPath.startsWith('/ethical-pattern-recognition-field-guide');
  const activeAssignments = normalizedPath === '/assignments' || normalizedPath.startsWith('/assignments/');
  const activeResources = normalizedPath === '/resources' || normalizedPath.startsWith('/resources/');
  const activeModules = normalizedPath === '/modules' || normalizedPath.startsWith('/topics/');
  const activeHome = normalizedPath === '/syllabus';

  const navItems = useMemo(
    () => [
      { label: 'Home', href: '/syllabus', icon: HomeIcon, active: activeHome },
      { label: 'Modules', href: '/modules', icon: RectangleGroupIcon, active: activeModules },
      { label: 'Resources', href: '/resources', icon: BookOpenIcon, active: activeResources },
      { label: 'Assignments', href: '/assignments', icon: ClipboardDocumentListIcon, active: activeAssignments },
      {
        label: 'Taxonomy',
        href: '/planning/taxonomy',
        icon: FolderIcon,
        active: activeTaxonomy,
      },
      {
        label: 'Ethical Pattern Recognition Field Guide',
        href: '/ethical-pattern-recognition-field-guide',
        icon: SparklesIcon,
        active: activePatternGuide,
      },
    ],
    [activeAssignments, activeHome, activeModules, activePatternGuide, activeResources, activeTaxonomy]
  );

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleCollapsed = () => {
    const newValue = !collapsed;
    setCollapsed(newValue);
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(newValue));

    if (newValue) {
      setModulesOpen(false);
      setOpenModuleId(null);
    }
  };

  const toggleModules = () => {
    if (collapsed) {
      setCollapsed(false);
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, 'false');
      setModulesOpen(true);
      setOpenModuleId(modules[0]?.id ?? null);
      router.push('/modules');
      return;
    }

    if (!modulesOpen) {
      if (openModuleId === null) {
        setOpenModuleId(modules[0]?.id ?? null);
      }
      setModulesOpen(true);
      router.push('/modules');
      return;
    }

    setModulesOpen(false);
  };

  const toggleModule = (moduleId: number) => {
    setOpenModuleId(current => {
      if (current === moduleId) {
        return null;
      }
      return moduleId;
    });
  };

  const baseLinkClass =
    'flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors !no-underline !border-0';

  function renderNavContent(label: string, Icon: React.ComponentType<React.ComponentProps<'svg'>>) {
    return (
      <>
        <Icon className="h-5 w-5 shrink-0" />
        {!collapsed && <span className="truncate">{label}</span>}
      </>
    );
  }

  const sidebarInner = (
    <div
      className={`flex h-full flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-black ${
        collapsed ? 'w-20' : 'w-72'
      } transition-[width] duration-200`}
    >
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 dark:border-gray-800">
        <Link href="/" className="no-underline! border-0! min-w-0">
          <div className={`font-medium text-gray-900 dark:text-gray-100 ${collapsed ? 'text-sm' : 'text-base'}`}>
            {collapsed ? 'SYS' : courseTitle}
          </div>
        </Link>
        {!mobileOpen && mounted && (
          <button
            onClick={toggleCollapsed}
            className="hidden md:flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRightIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5 -rotate-90" />}
          </button>
        )}
        {mobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900 md:hidden"
            aria-label="Close navigation"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 scrollbar-none [&::-webkit-scrollbar]:hidden">
        <nav className="space-y-1">
          {navItems.slice(0, 1).map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`${baseLinkClass} ${
                item.active
                  ? 'bg-gray-100 font-semibold text-gray-900 dark:bg-gray-900 dark:text-gray-100'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              {renderNavContent(item.label, item.icon)}
            </Link>
          ))}

          <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
            <div className="flex items-center gap-1 p-1">
              <button
                type="button"
                onClick={toggleModules}
                aria-expanded={modulesOpen}
                className={`${baseLinkClass} w-full ${
                  activeModules
                    ? 'bg-gray-100 font-semibold text-gray-900 dark:bg-gray-900 dark:text-gray-100'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900'
                } ${collapsed ? 'justify-center' : 'justify-between'}`}
              >
                <span className="flex min-w-0 items-center gap-3">
                  {renderNavContent('Modules', RectangleGroupIcon)}
                </span>
                {!collapsed && (
                  <ChevronDownIcon
                    className={`h-4 w-4 shrink-0 text-gray-500 transition-transform dark:text-gray-400 ${
                      modulesOpen ? '' : '-rotate-90'
                    }`}
                  />
                )}
              </button>
            </div>

            {!collapsed && modulesOpen && (
              <div className="border-y border-gray-100 py-2 dark:border-gray-900">
                <div className="space-y-1">
                  {modules.map(module => {
                    const isOpen = openModuleId === module.id;

                    return (
                      <section
                        key={module.id}
                        className={`border transition-colors ${
                          isOpen
                            ? 'border-white dark:border-[#2f80d7]/25'
                            : 'border-transparent bg-transparent hover:bg-slate-50 dark:hover:bg-gray-950/30'
                        }`}
                      >
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() => toggleModule(module.id)}
                            aria-expanded={isOpen}
                            className={`group flex w-full min-w-0 items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] font-medium transition-colors ${
                              isOpen
                                ? 'text-[#0b5d8f] dark:text-[#8fc4ee]'
                                : 'text-gray-800 hover:text-[#0b5d8f] dark:text-gray-200 dark:hover:text-[#8fc4ee]'
                            }`}
                          >
                            <span
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                                isOpen
                                  ? 'bg-[#0b5d8f] text-white dark:bg-[#2f80d7]'
                                  : 'bg-gray-100 text-gray-600 group-hover:bg-[#0b5d8f]/10 group-hover:text-[#0b5d8f] dark:bg-gray-900 dark:text-gray-400 dark:group-hover:text-[#8fc4ee]'
                              }`}
                            >
                              {module.id}
                            </span>
                            <span className="line-clamp-2 min-w-0 leading-snug">{module.title}</span>
                            <ChevronDownIcon
                              className={`ml-auto h-3.5 w-3.5 shrink-0 text-gray-500 transition-transform dark:text-gray-400 ${
                                isOpen ? '' : '-rotate-90'
                              }`}
                            />
                          </button>
                        </div>

                        {isOpen && (
                          <div className="ml-4 mr-1 mt-1 border-l border-[#0b5d8f]/20 pb-3 pl-3 dark:border-[#2f80d7]/35">
                            <div className="space-y-0.5">
                              {module.topics.map(topic => {
                                const isTopicActive = normalizePath(topic.contentHref) === normalizedPath;

                                return (
                                  <Link
                                    key={topic.id}
                                    href={topic.contentHref}
                                    className={`relative block rounded-md px-2.5 py-1.5 transition-colors no-underline! border-0! ${
                                      isTopicActive
                                        ? 'bg-white text-[#0b5d8f] shadow-sm ring-1 ring-[#0b5d8f]/15 dark:bg-black dark:text-[#8fc4ee] dark:ring-[#2f80d7]/30'
                                        : 'text-gray-700 hover:bg-white/80 hover:text-[#0b5d8f] dark:text-gray-300 dark:hover:bg-black/30 dark:hover:text-[#8fc4ee]'
                                    }`}
                                  >
                                    <span
                                      className={`absolute left-[-17px] top-3 h-2 w-2 rounded-full ${
                                        isTopicActive
                                          ? 'bg-[#0b5d8f] dark:bg-[#2f80d7]'
                                          : 'bg-[#0b5d8f]/20 dark:bg-[#2f80d7]/35'
                                      }`}
                                    />
                                    <span className="min-w-0">
                                      <span
                                        className={`block line-clamp-2 text-[13px] leading-snug ${
                                          isTopicActive ? 'font-semibold' : 'font-normal'
                                        }`}
                                      >
                                        {topic.title}
                                      </span>
                                      <span className="mt-0.5 block text-[11px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-500">
                                        {topic.date}
                                      </span>
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </section>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {navItems.slice(2).map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`${baseLinkClass} ${
                item.active
                  ? 'bg-gray-100 font-semibold text-gray-900 dark:bg-gray-900 dark:text-gray-100'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              {renderNavContent(item.label, item.icon)}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-gray-200 px-3 py-3 dark:border-gray-800">
        <button
          onClick={toggleDarkMode}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900 ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          {isDark ? <SunIcon className="h-5 w-5 shrink-0" /> : <MoonIcon className="h-5 w-5 shrink-0" />}
          {!collapsed && <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="md:hidden sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-black">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
          aria-label="Open navigation"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
        <Link href="/" className="text-sm font-medium text-gray-900 dark:text-gray-100 no-underline! border-0!">
          {courseTitle}
        </Link>
        <div className="w-10" aria-hidden="true" />
      </div>

      <aside className="hidden md:block md:h-screen md:shrink-0">{sidebarInner}</aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0">{sidebarInner}</div>
        </div>
      )}
    </>
  );
}
