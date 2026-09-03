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
  LockClosedIcon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import CourseReminder from '@/components/dashboard/CourseReminder';
import { useDarkMode } from '@/hooks/useDarkMode';
import { getFocusMeeting, type TimelineMeeting } from '@/lib/course-dashboard';
import type { DashboardAssignmentInput } from '@/lib/dashboard-assignments';
import { getModuleColorClasses, type ModuleColorToken } from '@/lib/module-colors';

interface SidebarTopicItem {
  id: string;
  title: string;
  date: string;
  contentHref: string;
  isNoClass?: boolean;
  isDraft?: boolean;
}

interface SidebarModuleItem {
  id: number;
  title: string;
  color: ModuleColorToken;
  isDraft?: boolean;
  topics: SidebarTopicItem[];
}

interface SidebarNavClientProps {
  courseTitle: string;
  modules: SidebarModuleItem[];
  meetings: TimelineMeeting[];
  assignments: DashboardAssignmentInput[];
}

const SIDEBAR_COLLAPSED_KEY = 'sidebar-collapsed';

const RESOURCE_NAV_ITEMS = [
  // Temporarily hidden from Resources nav:
  // { label: 'Technical Explainers', href: '/field-guide/technical-explainers' },
  // { label: 'AI Deployment Patterns', href: '/field-guide/deployment-patterns' },
  // { label: 'Examples', href: '/field-guide/examples' },
  { label: 'Ethical Frameworks', href: '/field-guide/ethical-frameworks' },
  { label: 'Theories of Learning', href: '/field-guide/theories-of-learning' },
  // { label: 'STS Concepts', href: '/field-guide/sts-concepts' },
] as const;

const HIDDEN_RESOURCE_PATHS = [
  '/field-guide/technical-explainers',
  '/field-guide/deployment-patterns',
  '/field-guide/examples',
  '/field-guide/sts-concepts',
] as const;

function isResourcePath(path: string) {
  return (
    RESOURCE_NAV_ITEMS.some(item => path === item.href || path.startsWith(`${item.href}/`)) ||
    HIDDEN_RESOURCE_PATHS.some(item => path === item || path.startsWith(`${item}/`))
  );
}

function normalizePath(path: string) {
  return path.replace(/^\/fall2026/, '').replace(/\/$/, '') || '/';
}

function sidebarActiveId(path: string) {
  return `sidebar-active-${normalizePath(path).replace(/\//g, '-') || 'home'}`;
}

export default function SidebarNavClient({
  courseTitle,
  modules,
  meetings,
  assignments,
}: SidebarNavClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const normalizedPath = normalizePath(pathname);
  const isDark = useDarkMode();
  const [mounted, setMounted] = useState(false);
  const [referenceDate, setReferenceDate] = useState<Date | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(() => normalizedPath.startsWith('/meetings/'));
  const [resourcesOpen, setResourcesOpen] = useState(() => isResourcePath(normalizedPath));
  const [expandedModuleIds, setExpandedModuleIds] = useState<number[]>([]);

  useEffect(() => {
    setMounted(true);
    setReferenceDate(new Date());
    const savedCollapsed = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    if (savedCollapsed !== null) {
      setCollapsed(savedCollapsed === 'true');
    }
  }, []);

  const focusMeeting = useMemo(
    () => (referenceDate ? getFocusMeeting(meetings, referenceDate) : null),
    [meetings, referenceDate]
  );
  const focusHref = focusMeeting?.meeting.slug ? `/meetings/${focusMeeting.meeting.slug}` : null;
  const focusPath = focusHref ? normalizePath(focusHref) : null;
  const focusBadgeLabel =
    focusMeeting?.kind === 'today' ? 'Today' : focusMeeting?.kind === 'latest' ? 'Latest' : focusMeeting ? 'Next' : null;

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.style.setProperty('--app-sidebar-width', collapsed ? '5rem' : '16rem');
  }, [collapsed]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (normalizedPath.startsWith('/meetings/')) {
      setScheduleOpen(true);
    }
  }, [normalizedPath]);

  useEffect(() => {
    if (isResourcePath(normalizedPath)) {
      setResourcesOpen(true);
    }
  }, [normalizedPath]);

  useEffect(() => {
    const moduleWithActiveTopic = modules.find(module =>
      module.topics.some(topic => normalizePath(topic.contentHref) === normalizedPath)
    );
    if (!moduleWithActiveTopic) return;

    setExpandedModuleIds([moduleWithActiveTopic.id]);
  }, [modules, normalizedPath]);

  useEffect(() => {
    if (!focusMeeting) return;
    if (normalizedPath.startsWith('/meetings/')) return;

    setExpandedModuleIds([focusMeeting.meeting.moduleId]);
  }, [focusMeeting, normalizedPath]);

  useEffect(() => {
    if (!mounted || collapsed) return;

    const frame = requestAnimationFrame(() => {
      const activeEl = document.getElementById(sidebarActiveId(normalizedPath));
      const navScroller = activeEl?.closest('nav')?.parentElement;
      if (activeEl && navScroller instanceof HTMLElement) {
        const scrollerRect = navScroller.getBoundingClientRect();
        const elRect = activeEl.getBoundingClientRect();
        const isFullyVisible = elRect.top >= scrollerRect.top && elRect.bottom <= scrollerRect.bottom;

        if (!isFullyVisible) {
          activeEl.scrollIntoView({ block: 'nearest' });
        }
      }
    });

    const timeout = window.setTimeout(() => {
      const activeEl = document.getElementById(sidebarActiveId(normalizedPath));
      const navScroller = activeEl?.closest('nav')?.parentElement;
      if (activeEl && navScroller instanceof HTMLElement) {
        const scrollerRect = navScroller.getBoundingClientRect();
        const elRect = activeEl.getBoundingClientRect();
        const isFullyVisible = elRect.top >= scrollerRect.top && elRect.bottom <= scrollerRect.bottom;

        if (!isFullyVisible) {
          activeEl.scrollIntoView({ block: 'nearest' });
        }
      }
    }, 320);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [collapsed, expandedModuleIds, focusPath, mounted, normalizedPath, resourcesOpen, scheduleOpen]);

  const activeAssignments = normalizedPath === '/assignments' || normalizedPath.startsWith('/assignments/');
  const activeCourseOverview = normalizedPath === '/topics';
  const activeTopicsNav = normalizedPath.startsWith('/meetings/');
  const activeResources = isResourcePath(normalizedPath);
  const activeSyllabus = normalizedPath === '/' || normalizedPath === '/syllabus';

  const navItems = useMemo(
    () => [
      { label: 'Syllabus', href: '/', icon: DocumentTextIcon, active: activeSyllabus },
      { label: 'Assignments', href: '/assignments', icon: ClipboardDocumentListIcon, active: activeAssignments },
      { label: 'Course Overview', href: '/topics', icon: BookOpenIcon, active: activeCourseOverview },
    ],
    [activeAssignments, activeCourseOverview, activeSyllabus]
  );

  function handleTopicsClick() {
    if (collapsed) {
      setCollapsed(false);
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, 'false');
    }

    if (scheduleOpen && !collapsed) {
      setScheduleOpen(false);
      return;
    }

    setScheduleOpen(true);

    const focus = getFocusMeeting(meetings, new Date());
    const href = focus?.meeting.slug ? `/meetings/${focus.meeting.slug}` : null;

    if (focus) {
      setExpandedModuleIds([focus.meeting.moduleId]);
    }

    if (href) {
      router.push(href);
    }
  }

  function toggleResourcesOpen() {
    if (collapsed) {
      setCollapsed(false);
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, 'false');
      setResourcesOpen(true);
      return;
    }

    setResourcesOpen(prev => !prev);
  }

  function toggleModuleExpanded(moduleId: number) {
    setExpandedModuleIds(prev => (prev.includes(moduleId) ? [] : [moduleId]));
  }

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
      setScheduleOpen(false);
      setResourcesOpen(false);
    }
  };

  const baseLinkClass = 'flex items-center gap-3 px-3 py-2 text-sm transition-colors !no-underline !border-0';
  const activeTopLevelClass = 'bg-slate-200 font-semibold text-slate-950 dark:bg-slate-800 dark:text-slate-50';
  const inactiveTopLevelClass =
    'text-slate-700 hover:font-semibold hover:text-slate-950 dark:text-slate-300 dark:hover:text-slate-100';
  const activeNestedClass = 'border-l-4 border-b font-semibold';
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
        collapsed ? 'w-20' : 'w-64'
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
          <Link
            href="/"
            id={sidebarActiveId('/')}
            className={`${baseLinkClass} ${getTopLevelItemClass(navItems[0])} ${collapsed ? 'justify-center' : ''}`}
          >
            {renderNavContent('Syllabus', DocumentTextIcon)}
          </Link>

          <Link
            href="/assignments"
            id={sidebarActiveId('/assignments')}
            className={`${baseLinkClass} ${getTopLevelItemClass(navItems[1])} ${collapsed ? 'justify-center' : ''}`}
          >
            {renderNavContent('Assignments', ClipboardDocumentListIcon)}
          </Link>

          <Link
            href="/topics"
            id={sidebarActiveId('/topics')}
            className={`${baseLinkClass} ${getTopLevelItemClass(navItems[2])} ${collapsed ? 'justify-center' : ''}`}
          >
            {renderNavContent('Course Overview', BookOpenIcon)}
          </Link>

          <div className="bg-slate-50 dark:bg-slate-950">
            <button
              type="button"
              onClick={handleTopicsClick}
              aria-expanded={scheduleOpen}
              className={`${baseLinkClass} w-full ${
                activeTopicsNav || scheduleOpen ? activeTopLevelClass : inactiveTopLevelClass
              } ${collapsed ? 'justify-center' : 'justify-between'}`}
            >
              <span className="flex min-w-0 items-center gap-3">
                {renderNavContent('Topics', CalendarDaysIcon)}
              </span>
              {!collapsed && (
                <ChevronDownIcon
                  className={`h-4 w-4 shrink-0 text-slate-500 transition-transform dark:text-slate-400 ${
                    scheduleOpen ? '' : '-rotate-90'
                  }`}
                />
              )}
            </button>

            {!collapsed && scheduleOpen && (
              <div className="border-t border-slate-200/80 bg-slate-100/40 dark:border-slate-800 dark:bg-slate-900/30">
                <div className="divide-y divide-slate-200/70 py-2 dark:divide-slate-800">
                  {modules.map(module => {
                    const isDraft = module.isDraft === true;
                    const isTopicInModule = module.topics.some(
                      topic => normalizePath(topic.contentHref) === normalizedPath
                    );
                    const isOpen = !isDraft && expandedModuleIds.includes(module.id);
                    const moduleColor = getModuleColorClasses(module.color);
                    const moduleHeaderClass = `group flex w-full min-w-0 items-center gap-0 pl-6 pr-3 py-2.5 text-left text-sm no-underline! transition-colors ${
                      isDraft
                        ? 'cursor-default bg-transparent text-slate-500 dark:text-slate-500'
                        : isOpen
                          ? 'bg-white font-semibold text-slate-950 dark:bg-black dark:text-slate-50'
                          : 'bg-transparent text-slate-800 hover:font-semibold hover:text-slate-950 dark:text-slate-200 dark:hover:text-slate-100'
                    }`;

                    return (
                      <section key={module.id} className="bg-slate-50/20 transition-colors dark:bg-transparent">
                        <div className="flex items-center">
                          {isDraft ? (
                            <div className={moduleHeaderClass}>
                              <span className="line-clamp-2 min-w-0 ml-5 leading-snug">
                                {module.id}. {module.title}
                              </span>
                              <LockClosedIcon
                                className="ml-auto h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-slate-500"
                                aria-hidden="true"
                              />
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => toggleModuleExpanded(module.id)}
                              className={moduleHeaderClass}
                              aria-expanded={isOpen}
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
                          )}
                        </div>

                        <div
                          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                            isOpen ? 'max-h-400 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="border-t border-slate-200/80 bg-white dark:border-slate-800 dark:bg-black">
                            <div className="divide-y divide-slate-100 pt-0 pb-4 dark:divide-slate-900">
                              {module.topics.map(topic => {
                                const isNoClass = topic.isNoClass === true;
                                const isDraftTopic = topic.isDraft === true;
                                const isLocked = isNoClass || isDraftTopic;
                                const topicPath = normalizePath(topic.contentHref);
                                const isTopicActive = !isLocked && topicPath === normalizedPath;
                                const isFocusTopic = Boolean(focusPath && topicPath === focusPath);
                                const isTopicOverview =
                                  topic.date === 'Topic overview' || topic.date === 'Module overview';
                                const showDate = !isTopicOverview && Boolean(topic.date);
                                const activeRowId = isTopicActive ? sidebarActiveId(topicPath) : undefined;
                                const rowClassName = `block py-2 pl-6 pr-6 transition-colors no-underline! ${
                                  isLocked
                                    ? 'border-l-4 border-transparent text-slate-500 dark:text-slate-500'
                                    : isTopicActive
                                      ? `${activeNestedClass} ${moduleColor.background} ${moduleColor.sidebarActive}`
                                      : inactiveNestedClass
                                }`;
                                const topicText = (
                                  <>
                                    <span className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5">
                                      <span
                                        className={`min-w-0 text-sm leading-snug ${
                                          isTopicActive ? 'font-semibold' : 'font-normal'
                                        }`}
                                      >
                                        {topic.title}
                                      </span>
                                      {showDate && (
                                        <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-600">
                                          {topic.date}
                                        </span>
                                      )}
                                      {isFocusTopic && focusBadgeLabel && mounted && (
                                        <span className="rounded-full bg-rose-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
                                          {focusBadgeLabel}
                                        </span>
                                      )}
                                    </span>
                                    {isNoClass && (
                                      <span className="mt-0.5 block text-xs font-medium text-slate-400 dark:text-slate-600">
                                        No class
                                      </span>
                                    )}
                                  </>
                                );
                                const rowContent =
                                  isDraftTopic ? (
                                    <span className="flex min-w-0 items-start">
                                      <span className="ml-5 min-w-0">{topicText}</span>
                                      <LockClosedIcon
                                        className="ml-auto mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-slate-500"
                                        aria-hidden="true"
                                        title="Draft"
                                      />
                                    </span>
                                  ) : isTopicOverview ? (
                                    <span className="ml-5 flex min-w-0 items-start gap-2">
                                      <i
                                        className="fas fa-book-open mt-0.5 h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400"
                                        aria-label="Topic overview"
                                        title="Topic overview"
                                      />
                                      <span className="min-w-0">{topicText}</span>
                                    </span>
                                  ) : (
                                    <span className="ml-5 block min-w-0">{topicText}</span>
                                  );

                                if (isLocked) {
                                  return (
                                    <div key={topic.id} id={activeRowId} className={rowClassName}>
                                      {rowContent}
                                    </div>
                                  );
                                }

                                return (
                                  <Link
                                    key={topic.id}
                                    id={activeRowId}
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

          <div className="bg-slate-50 dark:bg-slate-950">
            <button
              type="button"
              onClick={toggleResourcesOpen}
              aria-expanded={resourcesOpen}
              className={`${baseLinkClass} w-full ${
                activeResources ? activeTopLevelClass : inactiveTopLevelClass
              } ${collapsed ? 'justify-center' : 'justify-between'}`}
            >
              <span className="flex min-w-0 items-center gap-3">
                {renderNavContent('Resources', BookOpenIcon)}
              </span>
              {!collapsed && (
                <ChevronDownIcon
                  className={`h-4 w-4 shrink-0 text-slate-500 transition-transform dark:text-slate-400 ${
                    resourcesOpen ? '' : '-rotate-90'
                  }`}
                />
              )}
            </button>

            {!collapsed && resourcesOpen && (
              <div className="border-t border-slate-200/80 bg-slate-100/40 dark:border-slate-800 dark:bg-slate-900/30">
                <div className="divide-y divide-slate-200/70 py-2 dark:divide-slate-800">
                  {RESOURCE_NAV_ITEMS.map(item => {
                    const isItemActive =
                      normalizedPath === item.href || normalizedPath.startsWith(`${item.href}/`);

                    return (
                      <Link
                        key={item.href}
                        id={isItemActive ? sidebarActiveId(item.href) : undefined}
                        href={item.href}
                        className={`block py-2 pl-6 pr-6 text-sm transition-colors no-underline! ${
                          isItemActive
                            ? `${activeNestedClass} bg-white font-semibold text-slate-950 dark:bg-black dark:text-slate-50 border-slate-300 dark:border-slate-600`
                            : inactiveNestedClass
                        }`}
                      >
                        <span className="ml-5 block min-w-0 leading-snug">{item.label}</span>
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
        <CourseReminder meetings={meetings} assignments={assignments} panelPlacement="bottom" />
      </div>

      <div className="pointer-events-none fixed top-4 right-4 z-40 hidden md:block">
        <div className="pointer-events-auto rounded-xl border border-slate-200/80 bg-white/90 p-0.5 shadow-sm backdrop-blur dark:border-slate-700/80 dark:bg-slate-950/90">
          <CourseReminder meetings={meetings} assignments={assignments} panelPlacement="bottom" />
        </div>
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
