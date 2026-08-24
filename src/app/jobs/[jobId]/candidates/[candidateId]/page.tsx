import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { demoCandidates, getCandidateForJob, getJobById } from '@/data/demo';
import CandidateDetailWorkspace from '@/features/candidates/components/CandidateDetailWorkspace';

interface JobCandidateDetailPageProps {
  params: Promise<{
    jobId: string;
    candidateId: string;
  }>;
}

export function generateStaticParams() {
  return demoCandidates.map((candidate) => ({
    jobId: candidate.jobId,
    candidateId: candidate.id,
  }));
}

export async function generateMetadata({
  params,
}: JobCandidateDetailPageProps): Promise<Metadata> {
  const { jobId, candidateId } = await params;
  const job = getJobById(jobId);
  const candidate = getCandidateForJob(jobId, candidateId);

  if (!job || !candidate) {
    return {
      title: 'Candidate not found | AI Smart Recruiter',
    };
  }

  return {
    title: `${candidate.name} for ${job.title} | AI Smart Recruiter`,
    description: `${candidate.name} demo match analysis for ${job.title}.`,
  };
}

export default async function JobCandidateDetailPage({
  params,
}: JobCandidateDetailPageProps) {
  const { jobId, candidateId } = await params;
  const job = getJobById(jobId);
  const candidate = getCandidateForJob(jobId, candidateId);

  if (!job || !candidate) {
    notFound();
  }

  return (
    <CandidateDetailWorkspace
      candidate={candidate}
      backHref={`/jobs/${job.id}/candidates`}
      backLabel={`Back to ${job.title} Candidates`}
      jobTitle={job.title}
    />
  );
}
