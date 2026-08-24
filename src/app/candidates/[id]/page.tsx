import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { DEFAULT_JOB_ID, demoCandidates, getCandidateForJob, getCandidatesForJob, getJobById } from '@/data/demo';
import CandidateDetailWorkspace from '@/features/candidates/components/CandidateDetailWorkspace';

interface CandidateDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return getCandidatesForJob(DEFAULT_JOB_ID).map((candidate) => ({
    id: candidate.id,
  }));
}

export async function generateMetadata({
  params,
}: CandidateDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const candidate = getCandidateForJob(DEFAULT_JOB_ID, id);

  if (!candidate) {
    return {
      title: 'Candidate not found | AI Smart Recruiter',
    };
  }

  return {
    title: `${candidate.name} | AI Smart Recruiter`,
    description: `${candidate.name} demo match analysis for ${candidate.role}.`,
  };
}

export default async function CandidateDetailPage({ params }: CandidateDetailPageProps) {
  const { id } = await params;
  const candidate = getCandidateForJob(DEFAULT_JOB_ID, id);

  if (!candidate) {
    const jobScopedCandidate = demoCandidates.find((item) => item.id === id);

    if (jobScopedCandidate) {
      redirect(`/jobs/${jobScopedCandidate.jobId}/candidates/${jobScopedCandidate.id}`);
    }

    notFound();
  }

  const job = getJobById(candidate.jobId);

  return <CandidateDetailWorkspace candidate={candidate} jobTitle={job?.title} />;
}
