import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { demoCandidates } from '@/data/demo';
import CandidateDetailWorkspace from '@/features/candidates/components/CandidateDetailWorkspace';

interface CandidateDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return demoCandidates.map((candidate) => ({
    id: candidate.id,
  }));
}

export async function generateMetadata({
  params,
}: CandidateDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const candidate = demoCandidates.find((item) => item.id === id);

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
  const candidate = demoCandidates.find((item) => item.id === id);

  if (!candidate) {
    notFound();
  }

  return <CandidateDetailWorkspace candidate={candidate} />;
}
