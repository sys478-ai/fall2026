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
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import CourseReminder from '@/components/dashboard/CourseReminder';
import { useDarkMode } from '@/hooks/useDarkMode';
import type { TimelineMeeting } from '@/lib/course-dashboard';
import type { DashboardAssignmentInput } from '@/lib/dashboard-assignments';

interface SidebarNavClientProps {
  courseTitle: string;
  meetings: TimelineMeeting[];
  assignments: DashboardAssignmentInput[];
}

const SIDEBAR_COLLAPSED_KEY = 'sidebar-collapsed';

const RESOURCE_NAV_ITEMS = [
  { label: 'Technical Explainers', href: '/field-guide/technical-explainers', hidden: false },
  { label: 'AI Deployment Patterns', href: '/field-guide/deployment-patterns', hidden: true },
  { label: 'Examples', href: '/field-guide/examples', hidden: true },
  { label: 'Ethical Frameworks', href: '/field-guide/ethical-frameworks' },
  { label: 'Theories of Learning', href: '/field-guide/theories-of-learning' },
  { label: 'STS Concepts', href: '/field-guide/sts-concepts', hidden: true },
] as const;

const VISIBLE_RESOURCE_NAV_ITEMS = RESOURCE_NAV_ITEMS.filter(item => !('hidden' in item && item.hidden));

function isResourcePath(path: string) {
  return RESOURCE_NAV_ITEMS.some(item => path === item.href || path.startsWith(`${item.href}/`));
}

function normalizePath(path: string) {
  return path.replace(/^\/fall2026/, '').replace(/\/$/, '') || '/';
}

function sidebarActiveId(path: string) {
  return `sidebar-active-${normalizePath(path).replace(/\//g, '-') || 'home'}`;
}

export default function SidebarNavClient({
  courseTitle,
  meetings,
  assignments,
}: SidebarNavClientProps) {
  const pathname = usePathname();
  const normalizedPath = normalizePath(pathname);
  const isDark = useDarkMode();
  const [mounted, setMounted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(() => isResourcePath(normalizedPath));

  useEffect(() => {
    setMounted(true);
    const savedCollapsed = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    if (savedCollapsed !== null) {
      setCollapsed(savedCollapsed === 'true');
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--app-sidebar-width', collapsed ? '5rem' : '15rem');
  }, [collapsed]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isResourcePath(normalizedPath)) {
      setResourcesOpen(true);
    }
  }, [normalizedPath]);

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
  }, [collapsed, mounted, normalizedPath, resourcesOpen]);

  const activeAssignments = normalizedPath === '/assignments' || normalizedPath.startsWith('/assignments/');
  const activeCourseOverview = normalizedPath === '/topics';
  const activeResources = isResourcePath(normalizedPath);
  const activeSyllabus = normalizedPath === '/' || normalizedPath === '/syllabus';

  const navItems = useMemo(
    () => [
      { label: 'Syllabus', href: '/', icon: DocumentTextIcon, active: activeSyllabus },
      { label: 'Assignments', href: '/assignments', icon: ClipboardDocumentListIcon, active: activeAssignments },
      { label: 'Schedule', href: '/topics', icon: BookOpenIcon, active: activeCourseOverview },
    ],
    [activeAssignments, activeCourseOverview, activeSyllabus]
  );

  function toggleResourcesOpen() {
    if (collapsed) {
      setCollapsed(false);
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, 'false');
      setResourcesOpen(true);
      return;
    }

    setResourcesOpen(prev => !prev);
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
        collapsed ? 'w-20' : 'w-[15rem]'
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
            {renderNavContent('Schedule', BookOpenIcon)}
          </Link>

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
                  {VISIBLE_RESOURCE_NAV_ITEMS.map(item => {
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
