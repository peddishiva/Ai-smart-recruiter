import { Briefcase } from 'lucide-react';
import { Button, PageHeader } from '@/components/ui';
import { demoJobs } from '@/data/demo';
import JobsListClient from '@/features/jobs/components/JobsListClient';

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Create / manage jobs"
          title="Jobs"
          description="Create job profiles, review hiring criteria, and open a job-scoped recruiting workspace. Demo jobs are local data only."
          actions={
            <Button
              href="/jobs/create"
              variant="primary"
              icon={<Briefcase className="h-4 w-4" aria-hidden="true" />}
            >
              Create Job
            </Button>
          }
        />

        <JobsListClient jobs={demoJobs} />
      </div>
    </div>
  );
}
