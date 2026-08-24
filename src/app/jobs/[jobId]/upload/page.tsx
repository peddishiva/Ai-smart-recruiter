import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { demoJobs, getJobById } from '@/data/demo';
import UploadResumesWorkspace from '@/features/uploads/components/UploadResumesWorkspace';

interface JobUploadPageProps {
  params: Promise<{
    jobId: string;
  }>;
}

export function generateStaticParams() {
  return demoJobs.map((job) => ({
    jobId: job.id,
  }));
}

export async function generateMetadata({ params }: JobUploadPageProps): Promise<Metadata> {
  const { jobId } = await params;
  const job = getJobById(jobId);

  return {
    title: job ? `Upload resumes for ${job.title} | AI Smart Recruiter` : 'Upload resumes',
  };
}

export default async function JobUploadPage({ params }: JobUploadPageProps) {
  const { jobId } = await params;
  const job = getJobById(jobId);

  if (!job) {
    notFound();
  }

  return <UploadResumesWorkspace job={job} />;
}
