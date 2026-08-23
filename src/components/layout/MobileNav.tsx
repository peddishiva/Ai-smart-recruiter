'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { futureNavItems, primaryNavItems } from './navigation';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
      <button
        type="button"
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
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Close navigation"
            onClick={onClose}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile navigation">
          <p className="px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Workspace
          </p>
          <div className="mt-2 space-y-1">
            {primaryNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href ?? '#'}
                  onClick={onClose}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-colors',
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
            Coming Next
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
