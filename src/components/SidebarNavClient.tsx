'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  Bars3Icon,
  BookOpenIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  FolderIcon,
  HomeIcon,
  MoonIcon,
  ScaleIcon,
  SunIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useDarkMode } from '@/hooks/useDarkMode';
import { getModuleColorClasses, type ModuleColorToken } from '@/lib/module-colors';
import { readTopicProgressStatus, TOPIC_PROGRESS_EVENT, type TopicProgressStatus } from '@/lib/topic-progress';

interface SidebarTopicItem {
  id: string;
  title: string;
  date: string;
  contentHref: string;
  isNoClass?: boolean;
}

interface SidebarModuleItem {
  id: number;
  title: string;
  color: ModuleColorToken;
  href: string;
  topics: SidebarTopicItem[];
}

interface SidebarNavClientProps {
  courseTitle: string;
  modules: SidebarModuleItem[];
}

const FIELD_GUIDE_ITEMS = [
  { label: 'Recognition Cards', href: '/field-guide/recognition' },
  { label: 'Concept Cards', href: '/field-guide/concepts' },
  { label: 'Examples', href: '/field-guide/examples' },
  { label: 'Ethical Frameworks', href: '/field-guide/frameworks' },
  { label: 'Technical Explainers', href: '/field-guide/technical-explainers' },
  { label: 'History of AI', href: '/field-guide/ai-history' },
];

const SIDEBAR_COLLAPSED_KEY = 'sidebar-collapsed';

function normalizePath(path: string) {
  return path.replace(/^\/fall2026/, '').replace(/\/$/, '') || '/';
}

function getTopicSlugFromHref(href: string) {
  return href.match(/\/topics\/([^/#?]+)/)?.[1] || null;
}

export default function SidebarNavClient({ courseTitle, modules }: SidebarNavClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const normalizedPath = normalizePath(pathname);
  const isDark = useDarkMode();
  const [mounted, setMounted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [topicProgress, setTopicProgress] = useState<Record<string, TopicProgressStatus>>({});
  const [modulesOpen, setModulesOpen] = useState(
    normalizedPath.startsWith('/modules') || normalizedPath.startsWith('/topics')
  );
  const [fieldGuideOpen, setFieldGuideOpen] = useState(normalizedPath.startsWith('/field-guide'));
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
    if (typeof window === 'undefined') {
      return;
    }

    const refreshTopicProgress = () => {
      const nextTopicProgress: Record<string, TopicProgressStatus> = {};

      modules.forEach(module => {
        module.topics.forEach(topic => {
          const topicSlug = getTopicSlugFromHref(topic.contentHref);
          if (topicSlug) {
            nextTopicProgress[topicSlug] = readTopicProgressStatus(topicSlug);
          }
        });
      });

      setTopicProgress(nextTopicProgress);
    };

    const handleTopicProgressChanged = () => {
      refreshTopicProgress();
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key?.startsWith('topic-complete-') || event.key?.startsWith('topic-progress-')) {
        refreshTopicProgress();
      }
    };

    refreshTopicProgress();
    window.addEventListener(TOPIC_PROGRESS_EVENT, handleTopicProgressChanged as EventListener);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener(TOPIC_PROGRESS_EVENT, handleTopicProgressChanged as EventListener);
      window.removeEventListener('storage', handleStorage);
    };
  }, [modules]);

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

  useEffect(() => {
    if (normalizedPath.startsWith('/field-guide')) {
      setFieldGuideOpen(true);
    }
  }, [normalizedPath]);

  const activeTaxonomy = normalizedPath.startsWith('/planning/taxonomy');
  const activePatternGuide = normalizedPath.startsWith('/field-guide');
  const activeAssignments = normalizedPath === '/assignments' || normalizedPath.startsWith('/assignments/');
  const activeBibliography = normalizedPath === '/bibliography';
  const activeResources = normalizedPath === '/resources' || normalizedPath.startsWith('/resources/');
  const activeModules = normalizedPath === '/modules' || normalizedPath.startsWith('/topics/');
  const activeHome = normalizedPath === '/' || normalizedPath === '/syllabus';

  const navItems = useMemo(
    () => [
      { label: 'Home', href: '/', icon: HomeIcon, active: activeHome },
      { label: 'Course Schedule', href: '/modules', icon: CalendarDaysIcon, active: activeModules },
      { label: 'Resources', href: '/resources', icon: BookOpenIcon, active: activeResources },
      { label: 'Bibliography', href: '/bibliography', icon: DocumentTextIcon, active: activeBibliography },
      { label: 'Assignments', href: '/assignments', icon: ClipboardDocumentListIcon, active: activeAssignments },
      {
        label: 'Taxonomy',
        href: '/planning/taxonomy',
        icon: FolderIcon,
        active: activeTaxonomy,
      },
    ],
    [activeAssignments, activeBibliography, activeHome, activeModules, activeResources, activeTaxonomy]
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
      setFieldGuideOpen(false);
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

  const toggleFieldGuide = () => {
    if (collapsed) {
      setCollapsed(false);
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, 'false');
      setFieldGuideOpen(true);
      router.push('/field-guide');
      return;
    }
    if (!fieldGuideOpen) {
      setFieldGuideOpen(true);
      router.push('/field-guide');
      return;
    }
    setFieldGuideOpen(false);
  };

  const toggleModule = (moduleId: number) => {
    setOpenModuleId(current => {
      if (current === moduleId) {
        return null;
      }
      return moduleId;
    });
  };

  const baseLinkClass = 'flex items-center gap-3 px-3 py-2 text-sm transition-colors !no-underline !border-0';
  const activeTopLevelClass = 'bg-slate-200 font-semibold text-slate-950 dark:bg-slate-800 dark:text-slate-50';
  const inactiveTopLevelClass =
    'text-slate-700 hover:font-semibold hover:text-slate-950 dark:text-slate-300 dark:hover:text-slate-100';
  const activeNestedClass =
    'border-l-4 border-b bg-transparent font-semibold';
  const inactiveNestedClass =
    'border-l-4 border-transparent text-slate-700 hover:border-slate-300 hover:font-semibold hover:text-slate-950 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-slate-100';

  function getTopLevelItemClass(item: { active: boolean }) {
    if (!item.active) {
      return inactiveTopLevelClass;
    }

    return activeTopLevelClass;
  }

  function renderNavContent(label: string, Icon: React.ComponentType<React.ComponentProps<'svg'>>) {
    return (
      <>
        <Icon className="h-5 w-5 shrink-0" />
        <span
          className={`min-w-0 truncate transition-[opacity,width] duration-300 ease-in-out ${
            collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
          }`}
        >
          {label}
        </span>
      </>
    );
  }

  const sidebarInner = (
    <div
      className={`flex h-full flex-col border-r border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 ${
        collapsed ? 'w-20' : 'w-80'
      } transition-[width] duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 dark:border-slate-800">
        <Link href="/" className="no-underline! border-0! min-w-0">
          <div className={`font-medium text-slate-900 dark:text-slate-100 ${collapsed ? 'text-sm' : 'text-base'}`}>
            {collapsed ? 'SYS' : courseTitle}
          </div>
        </Link>
        {!mobileOpen && mounted && (
          <button
            onClick={toggleCollapsed}
            className="hidden md:flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:font-semibold hover:text-slate-950 dark:text-slate-300 dark:hover:text-slate-100"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRightIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5 -rotate-90" />}
          </button>
        )}
        {mobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:font-semibold hover:text-slate-950 dark:text-slate-300 dark:hover:text-slate-100 md:hidden"
            aria-label="Close navigation"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4 scrollbar-none [&::-webkit-scrollbar]:hidden">
        <nav className="divide-y divide-slate-200 overflow-hidden border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
          {navItems.slice(0, 1).map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`${baseLinkClass} ${getTopLevelItemClass(item)} ${collapsed ? 'justify-center' : ''}`}
            >
              {renderNavContent(item.label, item.icon)}
            </Link>
          ))}

          <div className="bg-slate-50 dark:bg-slate-950">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={toggleModules}
                aria-expanded={modulesOpen}
                className={`${baseLinkClass} w-full ${
                  activeModules ? activeTopLevelClass : inactiveTopLevelClass
                } ${collapsed ? 'justify-center' : 'justify-between'}`}
              >
                <span className="flex min-w-0 items-center gap-3">
                  {renderNavContent('Course Schedule', CalendarDaysIcon)}
                </span>
                {!collapsed && (
                  <ChevronDownIcon
                    className={`h-4 w-4 shrink-0 text-slate-500 transition-transform dark:text-slate-400 ${
                      modulesOpen ? '' : '-rotate-90'
                    }`}
                  />
                )}
              </button>
            </div>

            {!collapsed && modulesOpen && (
              <div className="border-t border-slate-200/80 bg-slate-100/40 dark:border-slate-800 dark:bg-slate-900/30">
                <div className="divide-y divide-slate-200/70 py-2 dark:divide-slate-800">
                  {modules.map(module => {
                    const isOpen = openModuleId === module.id;
                    const moduleColor = getModuleColorClasses(module.color);

                    return (
                      <section key={module.id} className="bg-slate-50/20 transition-colors dark:bg-transparent">
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() => toggleModule(module.id)}
                            aria-expanded={isOpen}
                            className={`group flex w-full min-w-0 items-center gap-0 pl-6 pr-3 py-2.5 text-left text-sm transition-colors ${
                              isOpen
                                ? 'bg-white font-semibold text-slate-950 dark:bg-black dark:text-slate-50'
                                : 'bg-transparent text-slate-800 hover:font-semibold hover:text-slate-950 dark:text-slate-200 dark:hover:text-slate-100'
                            }`}
                          >
                            <span className="line-clamp-2 min-w-0 ml-5 leading-snug">
                              {module.id}. {module.title}
                            </span>
                            <ChevronDownIcon
                              className={`ml-auto h-3.5 w-3.5 shrink-0 text-slate-500 transition-transform dark:text-slate-400 ${
                                isOpen ? '' : '-rotate-90'
                              }`}
                            />
                          </button>
                        </div>

                        <div
                          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                            isOpen ? 'max-h-168 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="border-t border-slate-200/80 bg-white dark:border-slate-800 dark:bg-black">
                            <div className="divide-y divide-slate-100 pt-0 pb-4 dark:divide-slate-900">
                              {module.topics.map(topic => {
                                const isNoClass = topic.isNoClass === true;
                                const isTopicActive = !isNoClass && normalizePath(topic.contentHref) === normalizedPath;
                                const topicSlug = getTopicSlugFromHref(topic.contentHref);
                                const currentTopicProgress = topicSlug ? topicProgress[topicSlug] : 'not-started';
                                const isCompleted = currentTopicProgress === 'complete';
                                const isPartiallyCompleted = currentTopicProgress === 'partial';
                                const isModuleOverview = topic.date === 'Module overview';
                                const showDate = !isModuleOverview && Boolean(topic.date);
                                const rowClassName = `block py-2 pl-15 pr-6 transition-colors no-underline! ${
                                  isNoClass
                                    ? 'border-l-4 border-transparent text-slate-500 dark:text-slate-500'
                                    : isTopicActive
                                      ? `${activeNestedClass} ${moduleColor.sidebarActive}`
                                      : inactiveNestedClass
                                }`;
                                const rowContent = (
                                  <span className="flex min-w-0 items-start gap-2">
                                    {isNoClass ? (
                                      <span className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                                    ) : isModuleOverview ? (
                                      <i
                                        className="fas fa-book-open mt-0.5 h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400"
                                        aria-label="Module overview"
                                        title="Module overview"
                                      />
                                    ) : isCompleted ? (
                                      <i
                                        className="fa-solid fa-check mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                                        aria-label="Completed"
                                        title="Completed"
                                      />
                                    ) : isPartiallyCompleted ? (
                                      <i
                                        className="fa-solid fa-circle-half-stroke mt-0.5 h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400"
                                        aria-label="Partially completed"
                                        title="Partially completed"
                                      />
                                    ) : (
                                      <i
                                        className="fa-regular fa-circle mt-0.5 h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500"
                                        aria-label="Not completed"
                                        title="Not completed"
                                      />
                                    )}
                                    <span className="min-w-0">
                                      <span className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5">
                                        <span
                                          className={`min-w-0 text-sm leading-snug ${
                                            isTopicActive ? 'font-semibold' : 'font-normal'
                                          }`}
                                        >
                                          {topic.title}
                                        </span>
                                        {!isNoClass && showDate && (
                                          <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-600">
                                            {topic.date}
                                          </span>
                                        )}
                                      </span>
                                      {isNoClass && (
                                        <span className="mt-0.5 block text-xs font-medium text-slate-400 dark:text-slate-600">
                                          No class
                                        </span>
                                      )}
                                    </span>
                                  </span>
                                );

                                if (isNoClass) {
                                  return (
                                    <div key={topic.id} className={rowClassName}>
                                      {rowContent}
                                    </div>
                                  );
                                }

                                return (
                                  <Link
                                    key={topic.id}
                                    href={topic.contentHref}
                                    className={rowClassName}
                                  >
                                    {rowContent}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </div>
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
              className={`${baseLinkClass} ${getTopLevelItemClass(item)} ${collapsed ? 'justify-center' : ''}`}
            >
              {renderNavContent(item.label, item.icon)}
            </Link>
          ))}

          <div className="bg-slate-50 dark:bg-slate-950">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={toggleFieldGuide}
                aria-expanded={fieldGuideOpen}
                className={`${baseLinkClass} w-full ${
                  activePatternGuide ? activeTopLevelClass : inactiveTopLevelClass
                } ${collapsed ? 'justify-center' : 'justify-between'}`}
              >
                <span className="flex min-w-0 items-center gap-3">
                  {renderNavContent('Field Guide', ScaleIcon)}
                </span>
                {!collapsed && (
                  <ChevronDownIcon
                    className={`h-4 w-4 shrink-0 text-slate-500 transition-transform dark:text-slate-400 ${
                      fieldGuideOpen ? '' : '-rotate-90'
                    }`}
                  />
                )}
              </button>
            </div>

            {!collapsed && fieldGuideOpen && (
              <div className="border-t border-slate-200/80 bg-slate-100/40 dark:border-slate-800 dark:bg-slate-900/30">
                <div className="divide-y divide-slate-200/70 py-2 dark:divide-slate-800">
                  {FIELD_GUIDE_ITEMS.map(item => {
                    const isActive =
                      normalizedPath === item.href || normalizedPath.startsWith(item.href + '/');
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block py-2 pl-11 pr-6 text-sm no-underline! transition-colors ${
                          isActive
                            ? 'border-l-4 border-violet-500 font-semibold text-violet-800 dark:border-violet-400 dark:text-violet-200'
                            : inactiveNestedClass
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>

      <div className="border-t border-slate-200 px-3 py-3 dark:border-slate-800">
        <button
          onClick={toggleDarkMode}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-700 hover:font-semibold hover:text-slate-950 dark:text-slate-300 dark:hover:text-slate-100 ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          {isDark ? <SunIcon className="h-5 w-5 shrink-0" /> : <MoonIcon className="h-5 w-5 shrink-0" />}
          <span
            className={`min-w-0 truncate transition-[opacity,width] duration-300 ease-in-out ${
              collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
            }`}
          >
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="md:hidden sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-slate-50 px-4 dark:border-slate-800 dark:bg-slate-950">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:font-semibold hover:text-slate-950 dark:text-slate-300 dark:hover:text-slate-100"
          aria-label="Open navigation"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
        <Link href="/" className="text-sm font-medium text-slate-900 dark:text-slate-100 no-underline! border-0!">
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
