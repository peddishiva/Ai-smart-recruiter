'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Briefcase } from 'lucide-react';
import { DEFAULT_JOB_ID, demoJobs, getJobById } from '@/data/demo';
import { cn } from '@/lib/utils/cn';
import { buildJobSwitchPath, getJobIdFromPathname } from '../utils/jobRouting';

interface JobSwitcherProps {
  className?: string;
  label?: string;
  ariaLabel?: string;
  onSwitched?: () => void;
}

export default function JobSwitcher({
  className,
  label = 'Active job',
  ariaLabel = 'Switch active job context',
  onSwitched,
}: JobSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const activeJobId = getJobIdFromPathname(pathname) ?? DEFAULT_JOB_ID;
  const activeJob = getJobById(activeJobId) ?? getJobById(DEFAULT_JOB_ID);

  return (
    <label className={cn('block min-w-0', className)}>
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <span className="relative block">
        <Briefcase
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <select
          value={activeJob?.id ?? DEFAULT_JOB_ID}
          onChange={(event) => {
            router.push(buildJobSwitchPath(pathname, event.target.value));
            onSwitched?.();
          }}
          className="h-10 w-full min-w-0 rounded-lg border border-slate-200 bg-white pl-9 pr-9 text-sm font-semibold text-slate-950 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={ariaLabel}
        >
          {demoJobs.map((job) => (
            <option key={job.id} value={job.id}>
              {job.title}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}
