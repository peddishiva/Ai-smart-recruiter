import Link from 'next/link';
import { SearchX } from 'lucide-react';
import { Button, EmptyState, PageHeader } from '@/components/ui';

export default function JobNotFound() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Job workspace"
          title="Job not found"
          description="This demo job does not exist in the current local dataset."
        />
        <EmptyState
          icon={<SearchX className="h-8 w-8" aria-hidden="true" />}
          title="No job found"
          description="Choose an existing demo job from the Jobs page."
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
