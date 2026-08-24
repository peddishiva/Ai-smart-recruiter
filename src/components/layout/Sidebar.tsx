'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from 'lucide-react';
import { Badge } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { futureNavItems, primaryNavItems } from './navigation';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:z-20 md:flex md:w-64 md:flex-col">
      <div className="flex h-screen flex-col border-r border-slate-200 bg-white">
        <div className="flex h-16 flex-shrink-0 items-center border-b border-slate-200 px-6">
          <div>
            <h1 className="text-base font-bold text-slate-950">AI Smart Recruiter</h1>
            <p className="text-xs text-slate-500">Recruiter workspace</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto px-4 pb-6 pt-4">
          <nav className="space-y-6" aria-label="Primary navigation">
            <div>
              <p className="px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Workspace
              </p>
              <div className="mt-2 space-y-1">
                {primaryNavItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors',
                        isActive
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                      )}
                    >
                      <item.icon
                        className={cn(
                          'h-5 w-5 flex-shrink-0',
                          isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                        )}
                        aria-hidden="true"
                      />
                      <span className="flex-1">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Coming Next
              </p>
              <div className="mt-2 space-y-1">
                {futureNavItems.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-lg px-3 py-2.5 text-sm text-slate-500"
                    aria-disabled="true"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 flex-shrink-0 text-slate-300" aria-hidden="true" />
                      <span className="min-w-0 flex-1 font-semibold text-slate-600">{item.name}</span>
                      <Badge variant="neutral">{item.phase}</Badge>
                    </div>
                    <p className="ml-8 mt-1 text-xs leading-5 text-slate-500">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </nav>
        </div>

        <div className="flex-shrink-0 border-t border-slate-200 p-4">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-100">
              <User className="h-5 w-5 text-slate-500" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-950">John Doe</p>
              <p className="truncate text-xs text-slate-500">Recruiter</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
