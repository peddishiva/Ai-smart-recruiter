import Link from 'next/link';
import { BarChart2, FileText, LayoutDashboard, Upload, Users } from 'lucide-react';
import { Badge, Card, CardContent } from '@/components/ui';
import type { Job } from '@/types';
import { cn } from '@/lib/utils/cn';

interface JobWorkspaceNavProps {
  job: Job;
  current: 'details' | 'dashboard' | 'candidates' | 'upload';
}

const futureItems = [
  {
    name: 'Interviews',
    description: 'Coming in a later phase',
    icon: LayoutDashboard,
    phase: 'Phase 5',
  },
  {
    name: 'Analytics',
    description: 'Coming in a later phase',
    icon: BarChart2,
    phase: 'Phase 5',
  },
  {
    name: 'Reports',
    description: 'Coming in a later phase',
    icon: FileText,
    phase: 'Phase 5',
  },
];

export default function JobWorkspaceNav({ job, current }: JobWorkspaceNavProps) {
  const items = [
    {
      id: 'dashboard',
      name: 'Overview',
      description: 'Job-scoped dashboard',
      href: `/jobs/${job.id}/dashboard`,
      icon: LayoutDashboard,
    },
    {
      id: 'candidates',
      name: 'Candidates',
      description: 'Applications for this job',
      href: `/jobs/${job.id}/candidates`,
      icon: Users,
    },
    {
      id: 'upload',
      name: 'Upload Resumes',
      description: 'Queue resumes for this job',
      href: `/jobs/${job.id}/upload`,
      icon: Upload,
    },
  ] as const;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid gap-3 lg:grid-cols-3">
          {items.map((item) => {
            const isActive = current === item.id;

            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'rounded-lg border p-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                  isActive
                    ? 'border-blue-200 bg-blue-50 text-blue-950'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {futureItems.map((item) => (
            <div
              key={item.name}
              className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-slate-500"
              aria-disabled="true"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <item.icon className="h-5 w-5 flex-shrink-0 text-slate-400" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-700">{item.name}</p>
                    <p className="mt-1 text-xs">{item.description}</p>
                  </div>
                </div>
                <Badge variant="neutral">{item.phase}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
