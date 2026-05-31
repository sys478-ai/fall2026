'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  Bars3Icon,
  BookOpenIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
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
  resourcesHref: string;
  resourcesCount: number;
  activitiesHref: string;
  activitiesCount: number;
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
  return (path.replace(/^\/fall2026/, '').replace(/\/$/, '')) || '/';
}

function countLabel(count: number) {
  return count > 0 ? `${count}` : '';
}

export default function SidebarNavClient({ courseTitle, modules }: SidebarNavClientProps) {
  const pathname = usePathname();
  const normalizedPath = normalizePath(pathname);
  const isDark = useDarkMode();
  const [mounted, setMounted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modulesOpen, setModulesOpen] = useState(normalizedPath === '/');
  const [openModules, setOpenModules] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(modules.map((module) => [module.id, normalizedPath === '/']))
  );
  const [openTopics, setOpenTopics] = useState<Record<string, boolean>>({});

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

  const activeTaxonomy = normalizedPath.startsWith('/planning/taxonomy');
  const activePatternGuide = normalizedPath.startsWith('/ethical-pattern-recognition-field-guide');
  const activeAssignments = normalizedPath === '/assignments' || normalizedPath.startsWith('/assignments/');
  const activeResources = normalizedPath === '/resources' || normalizedPath.startsWith('/resources/');
  const activeHome = normalizedPath === '/';

  const navItems = useMemo(
    () => [
      { label: 'Home', href: '/', icon: HomeIcon, active: activeHome },
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
    [activeAssignments, activeHome, activePatternGuide, activeResources, activeTaxonomy]
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
      setOpenModules({});
      setOpenTopics({});
    }
  };

  const toggleModules = () => {
    if (collapsed) {
      setCollapsed(false);
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, 'false');
      setModulesOpen(true);
      return;
    }
    setModulesOpen((current) => !current);
  };

  const toggleModule = (moduleId: number) => {
    setOpenModules((current) => ({
      ...current,
      [moduleId]: !current[moduleId],
    }));
  };

  const toggleTopic = (topicId: string) => {
    setOpenTopics((current) => ({
      ...current,
      [topicId]: !current[topicId],
    }));
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
        <Link href="/" className="!no-underline !border-0 min-w-0">
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

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <nav className="space-y-1">
          {navItems.slice(0, 1).map((item) => (
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

          <button
            onClick={toggleModules}
            className={`${baseLinkClass} w-full ${
              activeHome
                ? 'bg-gray-100 font-semibold text-gray-900 dark:bg-gray-900 dark:text-gray-100'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900'
            } ${collapsed ? 'justify-center' : 'justify-between'}`}
          >
            <span className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
              <RectangleGroupIcon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>Modules</span>}
            </span>
            {!collapsed && (
              <ChevronDownIcon className={`h-4 w-4 transition-transform ${modulesOpen ? '' : '-rotate-90'}`} />
            )}
          </button>

          {!collapsed && modulesOpen && (
            <div className="ml-2 mt-1 space-y-1 border-l border-gray-200 pl-3 dark:border-gray-800">
              {modules.map((module) => (
                <div key={module.id} className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Link
                      href={module.href}
                      className="flex-1 rounded-lg px-2 py-1.5 text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900 !no-underline !border-0"
                    >
                      <span className="block truncate">{module.title}</span>
                    </Link>
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="rounded-md p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900"
                      aria-label={`Toggle ${module.title}`}
                    >
                      <ChevronDownIcon
                        className={`h-4 w-4 transition-transform ${openModules[module.id] ? '' : '-rotate-90'}`}
                      />
                    </button>
                  </div>

                  {openModules[module.id] && (
                    <div className="ml-2 space-y-1 border-l border-gray-200 pl-3 dark:border-gray-800">
                      {module.topics.map((topic) => (
                        <div key={topic.id} className="space-y-1">
                          <div className="flex items-start gap-1">
                            <button
                              onClick={() => toggleTopic(topic.id)}
                              className="mt-0.5 rounded-md p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900"
                              aria-label={`Toggle ${topic.title}`}
                            >
                              <ChevronDownIcon
                                className={`h-3.5 w-3.5 transition-transform ${openTopics[topic.id] ? '' : '-rotate-90'}`}
                              />
                            </button>
                            <div className="min-w-0 flex-1">
                              <Link
                                href={topic.contentHref}
                                className="block rounded-lg px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900 !no-underline !border-0"
                              >
                                <span className="block truncate">{topic.title}</span>
                                <span className="block text-xs text-gray-500 dark:text-gray-500">{topic.date}</span>
                              </Link>
                            </div>
                          </div>

                          {openTopics[topic.id] && (
                            <div className="ml-5 space-y-1">
                              <Link
                                href={topic.contentHref}
                                className="flex items-center justify-between rounded-lg px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900 !no-underline !border-0"
                              >
                                <span className="flex items-center gap-2">
                                  <DocumentTextIcon className="h-4 w-4" />
                                  Content
                                </span>
                              </Link>
                              <Link
                                href={topic.resourcesHref}
                                className="flex items-center justify-between rounded-lg px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900 !no-underline !border-0"
                              >
                                <span className="flex items-center gap-2">
                                  <FolderIcon className="h-4 w-4" />
                                  Resources
                                </span>
                                {topic.resourcesCount > 0 && (
                                  <span className="badge neutral">{countLabel(topic.resourcesCount)}</span>
                                )}
                              </Link>
                              <Link
                                href={topic.activitiesHref}
                                className="flex items-center justify-between rounded-lg px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900 !no-underline !border-0"
                              >
                                <span className="flex items-center gap-2">
                                  <ClipboardDocumentListIcon className="h-4 w-4" />
                                  Activities / Labs
                                </span>
                                {topic.activitiesCount > 0 && (
                                  <span className="badge success">{countLabel(topic.activitiesCount)}</span>
                                )}
                              </Link>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {navItems.slice(1).map((item) => (
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
        <Link href="/" className="text-sm font-medium text-gray-900 dark:text-gray-100 !no-underline !border-0">
          {courseTitle}
        </Link>
        <div className="w-10" aria-hidden="true" />
      </div>

      <aside className="hidden md:block md:h-screen md:shrink-0">
        {sidebarInner}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0">{sidebarInner}</div>
        </div>
      )}
    </>
  );
}
