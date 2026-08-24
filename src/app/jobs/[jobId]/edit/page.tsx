import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/ui';
import { demoJobs, getJobById } from '@/data/demo';
import JobForm from '@/features/jobs/components/JobForm';

interface EditJobPageProps {
  params: Promise<{
    jobId: string;
  }>;
}

export function generateStaticParams() {
  return demoJobs.map((job) => ({
    jobId: job.id,
  }));
}

export async function generateMetadata({ params }: EditJobPageProps): Promise<Metadata> {
  const { jobId } = await params;
  const job = getJobById(jobId);

  if (!job) {
    return {
      title: 'Edit job | AI Smart Recruiter',
    };
  }

  return {
    title: `Edit ${job.title} | AI Smart Recruiter`,
  };
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  const { jobId } = await params;
  const job = getJobById(jobId);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Job setup"
          title={`Edit ${job.title}`}
          description="Update the local demo job profile. Changes stay on this page and are not persisted to a backend."
        />

        <JobForm mode="edit" initialJob={job} />
      </div>
    </div>
  );
}
