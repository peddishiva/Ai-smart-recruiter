import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { demoJobs, getCandidatesForJob, getJobById } from '@/data/demo';
import CandidatesWorkspace from '@/features/candidates/components/CandidatesWorkspace';

interface JobCandidatesPageProps {
  params: Promise<{
    jobId: string;
  }>;
}

export function generateStaticParams() {
  return demoJobs.map((job) => ({
    jobId: job.id,
  }));
}

export async function generateMetadata({ params }: JobCandidatesPageProps): Promise<Metadata> {
  const { jobId } = await params;
  const job = getJobById(jobId);

  return {
    title: job ? `${job.title} candidates | AI Smart Recruiter` : 'Candidates',
  };
}

export default async function JobCandidatesPage({ params }: JobCandidatesPageProps) {
  const { jobId } = await params;
  const job = getJobById(jobId);

  if (!job) {
    notFound();
  }

  return (
    <CandidatesWorkspace
      candidates={getCandidatesForJob(job.id)}
      job={job}
      candidateBaseHref={`/jobs/${job.id}/candidates`}
      uploadHref={`/jobs/${job.id}/upload`}
    />
  );
}
