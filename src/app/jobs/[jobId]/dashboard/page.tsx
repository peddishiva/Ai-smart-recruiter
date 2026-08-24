import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { demoJobs, getJobById } from '@/data/demo';
import DashboardWorkspace from '@/features/dashboard/components/DashboardWorkspace';

interface JobDashboardPageProps {
  params: Promise<{
    jobId: string;
  }>;
}

export function generateStaticParams() {
  return demoJobs.map((job) => ({
    jobId: job.id,
  }));
}

export async function generateMetadata({ params }: JobDashboardPageProps): Promise<Metadata> {
  const { jobId } = await params;
  const job = getJobById(jobId);

  return {
    title: job ? `${job.title} dashboard | AI Smart Recruiter` : 'Job dashboard',
  };
}

export default async function JobDashboardPage({ params }: JobDashboardPageProps) {
  const { jobId } = await params;
  const job = getJobById(jobId);

  if (!job) {
    notFound();
  }

  return <DashboardWorkspace jobId={job.id} />;
}
