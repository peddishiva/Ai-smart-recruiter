'use client';

import { Bell, Menu, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { getJobById } from '@/data/demo';
import { getJobIdFromPathname } from '@/features/jobs/utils/jobRouting';

interface HeaderProps {
  onMenuClick?: () => void;
}

const pageTitles: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Overview',
    description: 'Default job dashboard',
  },
  '/jobs': {
    title: 'Jobs',
    description: 'Create and manage openings',
  },
  '/jobs/create': {
    title: 'Create Job',
    description: 'Local demo job setup',
  },
  '/upload-resumes': {
    title: 'Upload Resumes',
    description: 'Demo upload workflow',
  },
  '/candidates': {
    title: 'Candidates',
    description: 'Search, filter, and review demo candidates',
  },
  '/reports': {
    title: 'Reports',
    description: 'Demo analytics and exports',
  },
};

const getHeaderPage = (pathname: string) => {
  const jobId = getJobIdFromPathname(pathname);

  if (jobId) {
    const job = getJobById(jobId);
    const jobTitle = job?.title ?? 'Job';

    if (pathname.endsWith('/edit')) {
      return {
        title: 'Edit Job',
        description: jobTitle,
      };
    }

    if (pathname.includes(`/${jobId}/dashboard`)) {
      return {
        title: 'Overview',
        description: `${jobTitle} workspace`,
      };
    }

    if (pathname.includes(`/${jobId}/upload`)) {
      return {
        title: 'Upload Resumes',
        description: `${jobTitle} application queue`,
      };
    }

    if (pathname.includes(`/${jobId}/candidates/`)) {
      return {
        title: 'Candidate Detail',
        description: `${jobTitle} application analysis`,
      };
    }

    if (pathname.includes(`/${jobId}/candidates`)) {
      return {
        title: 'Candidates',
        description: `${jobTitle} applications`,
      };
    }

    return {
      title: 'Job Profile',
      description: jobTitle,
    };
  }

  if (pathname.startsWith('/candidates/') && pathname !== '/candidates') {
    return {
      title: 'Candidate Detail',
      description: 'Explainable demo match analysis',
    };
  }

  return pageTitles[pathname] ?? pageTitles['/'];
};

export default function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const page = getHeaderPage(pathname);

  return (
    <header className="sticky top-0 z-10 h-16 flex-shrink-0 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="flex h-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-blue-500 md:hidden"
            aria-label="Open navigation"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-950">{page.title}</p>
            <p className="hidden truncate text-xs text-slate-500 sm:block">{page.description}</p>
          </div>
        </div>

        <div className="hidden max-w-sm flex-1 sm:block">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </div>
            <input
              id="search"
              name="search"
              className="block w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-3 text-sm text-slate-500 placeholder-slate-400"
              placeholder="Use Candidates filters for search"
              type="search"
              disabled
              aria-label="Candidate search is available on the Candidates page"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Notifications coming in a later phase"
            title="Notifications coming in a later phase"
            disabled
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
            <span className="text-sm font-semibold text-blue-700" aria-label="John Doe">
              JD
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
