'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui';
import { DEFAULT_JOB_ID } from '@/data/demo';
import { cn } from '@/lib/utils/cn';
import JobSwitcher from '@/features/jobs/components/JobSwitcher';
import { getJobIdFromPathname, isPathActive } from '@/features/jobs/utils/jobRouting';
import { futureNavItems, getJobWorkspaceNavItems, topLevelNavItems } from './navigation';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const activeJobId = getJobIdFromPathname(pathname) ?? DEFAULT_JOB_ID;
  const jobWorkspaceNavItems = getJobWorkspaceNavItems(activeJobId);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return;
      }

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => !element.hasAttribute('aria-hidden'));

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-50 md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <button
        type="button"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full bg-slate-950/40"
        aria-label="Close navigation"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 left-0 flex w-[min(20rem,calc(100vw-2rem))] flex-col bg-white shadow-xl">
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
          <div>
            <p className="text-sm font-bold text-slate-950">AI Smart Recruiter</p>
            <p className="text-xs text-slate-500">Recruiter workspace</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Close navigation"
            onClick={onClose}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile navigation">
          <div className="px-3 pb-4">
            <JobSwitcher onSwitched={onClose} />
          </div>

          <p className="px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Main
          </p>
          <div className="mt-2 space-y-1">
            {topLevelNavItems.map((item) => {
              const isActive =
                item.href === '/jobs' ? isPathActive(pathname, item.href) : pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <p className="mt-6 px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Job Workspace
          </p>
          <div className="mt-2 space-y-1">
            {jobWorkspaceNavItems.map((item) => {
              const isActive = isPathActive(pathname, item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <p className="mt-6 px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Coming Later
          </p>
          <div className="mt-2 space-y-1">
            {futureNavItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between gap-3 rounded-lg px-3 py-3 text-sm text-slate-500"
                aria-disabled="true"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-700">{item.name}</p>
                    <p className="truncate text-xs text-slate-500">{item.description}</p>
                  </div>
                </div>
                <Badge variant="neutral">{item.phase}</Badge>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
