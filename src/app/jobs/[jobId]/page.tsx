import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, Edit3, Upload, Users } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  PageHeader,
} from '@/components/ui';
import { demoJobs, formatEmploymentType, getJobById } from '@/data/demo';
import JobStatusBadge from '@/features/jobs/components/JobStatusBadge';
import JobWorkspaceNav from '@/features/jobs/components/JobWorkspaceNav';

interface JobDetailPageProps {
  params: Promise<{
    jobId: string;
  }>;
}

export function generateStaticParams() {
  return demoJobs.map((job) => ({
    jobId: job.id,
  }));
}

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  const { jobId } = await params;
  const job = getJobById(jobId);

  if (!job) {
    return {
      title: 'Job not found | AI Smart Recruiter',
    };
  }

  return {
    title: `${job.title} | AI Smart Recruiter`,
    description: `${job.title} demo job profile and recruiting context.`,
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { jobId } = await params;
  const job = getJobById(jobId);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Job profile"
          title={job.title}
          description={job.description}
          actions={
            <>
              <Button
                href={`/jobs/${job.id}/edit`}
                variant="secondary"
                icon={<Edit3 className="h-4 w-4" aria-hidden="true" />}
              >
                Edit Job
              </Button>
              <Button
                href={`/jobs/${job.id}/dashboard`}
                variant="primary"
                icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
              >
                Open Workspace
              </Button>
            </>
          }
        />

        <JobWorkspaceNav job={job} current="details" />

        <Card>
          <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <JobStatusBadge status={job.status} />
                <Badge variant="demo">Demo job</Badge>
              </div>
              <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Department
                  </p>
                  <p className="mt-1 font-semibold text-slate-950">{job.department}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Location
                  </p>
                  <p className="mt-1 font-semibold text-slate-950">{job.location}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Employment
                  </p>
                  <p className="mt-1 font-semibold text-slate-950">
                    {formatEmploymentType(job.employmentType)}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Candidates
                </p>
                <p className="mt-1 text-xl font-bold text-slate-950">{job.candidateCount}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Shortlist
                </p>
                <p className="mt-1 text-xl font-bold text-slate-950">{job.shortlistedCount}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Interviews
                </p>
                <p className="mt-1 text-xl font-bold text-slate-950">{job.interviewCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>Responsibilities</CardTitle>
              <CardDescription>What this job profile expects from the hire.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {job.responsibilities.map((responsibility) => (
                  <li key={responsibility} className="text-sm leading-6 text-slate-700">
                    {responsibility}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Workspace Actions</CardTitle>
              <CardDescription>Only implemented routes are enabled.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  href={`/jobs/${job.id}/upload`}
                  variant="secondary"
                  className="w-full"
                  icon={<Upload className="h-4 w-4" aria-hidden="true" />}
                >
                  Upload Resumes
                </Button>
                <Button
                  href={`/jobs/${job.id}/candidates`}
                  variant="secondary"
                  className="w-full"
                  icon={<Users className="h-4 w-4" aria-hidden="true" />}
                >
                  View Candidates
                </Button>
                <Button variant="muted" className="w-full" disabled>
                  Interviews coming in Phase 5
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Required Skills</CardTitle>
              <CardDescription>Used by future matching architecture.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.requiredSkills.map((skill) => (
                  <Badge key={skill} variant="primary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferred Skills</CardTitle>
              <CardDescription>Useful but not mandatory criteria.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.preferredSkills.map((skill) => (
                  <Badge key={skill} variant="neutral">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Requirements</CardTitle>
            <CardDescription>
              Description and structured requirements belong to this one job profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-slate-950">Experience</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {job.experienceRequirement}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-950">Education</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {job.educationRequirement}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-950">Certifications</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {job.certifications.length > 0 ? job.certifications.join(', ') : 'None required'}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-950">Other Criteria</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {job.otherCriteria.length > 0 ? job.otherCriteria.join(' ') : 'No extra criteria'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
