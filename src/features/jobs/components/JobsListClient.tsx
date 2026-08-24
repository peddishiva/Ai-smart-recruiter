'use client';

import { useMemo, useState } from 'react';
import { Briefcase, Search, X } from 'lucide-react';
import { Badge, Button, Card, CardContent, EmptyState } from '@/components/ui';
import type { Job, JobStatus } from '@/types';
import { formatEmploymentType, jobStatusLabels } from '@/data/demo';
import JobStatusBadge from './JobStatusBadge';

interface JobsListClientProps {
  jobs: Job[];
}

type StatusFilter = JobStatus | 'all';

const statusFilters: StatusFilter[] = ['all', 'open', 'draft', 'paused', 'closed'];

const formatDemoDate = (value: string) => {
  const [year, month, day] = value.split('-');
  const monthLabel = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ][Number(month) - 1];

  return `${monthLabel} ${Number(day)}, ${year}`;
};

export default function JobsListClient({ jobs }: JobsListClientProps) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');

  const filteredJobs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesStatus = status === 'all' || job.status === status;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [
          job.title,
          job.department,
          job.location,
          job.description,
          ...job.requiredSkills,
          ...job.preferredSkills,
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [jobs, query, status]);

  const hasFilters = query.trim().length > 0 || status !== 'all';

  const clearFilters = () => {
    setQuery('');
    setStatus('all');
  };

  if (jobs.length === 0) {
    return (
      <EmptyState
        icon={<Briefcase className="h-8 w-8" aria-hidden="true" />}
        title="No demo jobs yet"
        description="Create a job profile to establish the active recruiting context."
        action={
          <Button href="/jobs/create" variant="primary" size="sm">
            Create Job
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <label htmlFor="job-search" className="text-sm font-semibold text-slate-950">
                Search jobs
              </label>
              <div className="relative mt-2">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  id="job-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by title, department, location, or skill"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-10 text-sm text-slate-950 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {query && (
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    aria-label="Clear job search"
                    onClick={() => setQuery('')}
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="job-status" className="text-sm font-semibold text-slate-950">
                Status
              </label>
              <select
                id="job-status"
                value={status}
                onChange={(event) => setStatus(event.target.value as StatusFilter)}
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:w-48"
              >
                {statusFilters.map((option) => (
                  <option key={option} value={option}>
                    {option === 'all' ? 'All statuses' : jobStatusLabels[option]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600">
              Showing {filteredJobs.length} of {jobs.length} demo jobs
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              disabled={!hasFilters}
              className="w-full sm:w-auto"
            >
              Clear filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {filteredJobs.length === 0 ? (
        <EmptyState
          icon={<Briefcase className="h-8 w-8" aria-hidden="true" />}
          title="No jobs found"
          description="Try changing the search or status filter."
          action={
            <Button variant="primary" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {filteredJobs.map((job) => (
            <article
              key={job.id}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <JobStatusBadge status={job.status} />
                    <Badge variant="demo">Demo job</Badge>
                  </div>
                  <h2 className="mt-3 text-lg font-bold text-slate-950">{job.title}</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {job.department} · {job.location} · {formatEmploymentType(job.employmentType)}
                  </p>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                    {job.description}
                  </p>
                </div>
                <p className="text-sm font-semibold text-slate-500">
                  Updated {formatDemoDate(job.updatedAt)}
                </p>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Candidates
                  </p>
                  <p className="mt-1 text-xl font-bold text-slate-950">{job.candidateCount}</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Shortlisted
                  </p>
                  <p className="mt-1 text-xl font-bold text-slate-950">{job.shortlistedCount}</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Interviews
                  </p>
                  <p className="mt-1 text-xl font-bold text-slate-950">{job.interviewCount}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button href={`/jobs/${job.id}`} variant="secondary" size="sm">
                  View Job
                </Button>
                <Button href={`/jobs/${job.id}/dashboard`} variant="primary" size="sm">
                  Open Workspace
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
