import Link from 'next/link';
import { SearchX } from 'lucide-react';
import { Button, EmptyState, PageHeader } from '@/components/ui';

export default function JobCandidateNotFound() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Candidate analysis"
          title="Candidate not found"
          description="This demo application does not exist for the selected job context."
        />
        <EmptyState
          icon={<SearchX className="h-8 w-8" aria-hidden="true" />}
          title="No application found"
          description="Return to the job candidates list and choose an existing demo application."
          action={
            <Button href="/jobs" variant="primary" size="sm">
              Back to Jobs
            </Button>
          }
        />
        <Link
          href="/"
          className="inline-flex rounded-lg text-sm font-semibold text-slate-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          Return to dashboard
        </Link>
      </div>
    </div>
  );
}
