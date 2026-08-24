'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui';
import { DEFAULT_JOB_ID, formatEmploymentType, getJobById } from '@/data/demo';
import JobStatusBadge from './JobStatusBadge';
import JobSwitcher from './JobSwitcher';
import { getJobIdFromPathname } from '../utils/jobRouting';

export default function JobContextBar() {
  const pathname = usePathname();
  const activeJobId = getJobIdFromPathname(pathname) ?? DEFAULT_JOB_ID;
  const activeJob = getJobById(activeJobId) ?? getJobById(DEFAULT_JOB_ID);

  if (!activeJob) {
    return null;
  }

  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary">Active job</Badge>
            <JobStatusBadge status={activeJob.status} />
            <span className="text-sm font-semibold text-slate-950">{activeJob.title}</span>
          </div>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            {activeJob.department} · {activeJob.location} ·{' '}
            {formatEmploymentType(activeJob.employmentType)}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <JobSwitcher
            className="w-full sm:w-64"
            ariaLabel="Switch active job from context bar"
          />
          <Link
            href={`/jobs/${activeJob.id}`}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            View job
          </Link>
        </div>
      </div>
    </div>
  );
}
