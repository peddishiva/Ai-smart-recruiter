import { PageHeader } from '@/components/ui';
import JobForm from '@/features/jobs/components/JobForm';

export default function CreateJobPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Job setup"
          title="Create Job"
          description="Create one job profile that contains both the job description and structured requirements. Demo saves are not persisted."
        />

        <JobForm mode="create" />
      </div>
    </div>
  );
}
