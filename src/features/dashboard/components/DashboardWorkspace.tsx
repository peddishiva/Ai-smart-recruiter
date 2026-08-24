'use client';

import dynamic from 'next/dynamic';
import { Upload } from 'lucide-react';
import {
  getDashboardDataForJob,
  recruiterActivityData,
  scoreDistributionData,
  skillsData,
} from '@/data/demo';
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
import PipelineSummary from '@/components/dashboard/PipelineSummary';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentActivity from '@/components/dashboard/RecentActivity';
import RecommendedCandidates from '@/components/dashboard/RecommendedCandidates';
import SmartAlerts from '@/components/dashboard/SmartAlerts';
import JobWorkspaceNav from '@/features/jobs/components/JobWorkspaceNav';
import { getJobById } from '@/data/demo';

const KpiCard = dynamic(() => import('@/components/dashboard/KpiCard'), { ssr: false });
const SkillsChart = dynamic(() => import('@/components/dashboard/SkillsChart'), { ssr: false });
const ScoreChart = dynamic(() => import('@/components/dashboard/ScoreChart'), { ssr: false });
const ActivityChart = dynamic(() => import('@/components/dashboard/ActivityChart'), { ssr: false });

interface DashboardWorkspaceProps {
  jobId: string;
  legacy?: boolean;
}

export default function DashboardWorkspace({ jobId, legacy = false }: DashboardWorkspaceProps) {
  const data = getDashboardDataForJob(jobId);
  const job = getJobById(data.activeJobContext.id);
  const uploadHref = legacy ? '/upload-resumes' : `/jobs/${data.activeJobContext.id}/upload`;
  const candidatesHref = legacy
    ? '/candidates'
    : `/jobs/${data.activeJobContext.id}/candidates`;
  const candidateBaseHref = candidatesHref;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Recruiter workspace"
          title="Good morning, John"
          description={`Active job: ${data.activeJobContext.title} in ${data.activeJobContext.department}. ${data.activeJobContext.applicants} demo applications are scoped to this job.`}
          actions={
            <Button
              href={uploadHref}
              variant="primary"
              size="lg"
              icon={<Upload className="h-4 w-4" aria-hidden="true" />}
            >
              Upload resumes
            </Button>
          }
        />

        {job && !legacy && <JobWorkspaceNav job={job} current="dashboard" />}

        <Card>
          <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="primary">Active job</Badge>
                <Badge variant="demo">Demo scoped</Badge>
                <span className="text-sm font-semibold text-slate-950">
                  {data.activeJobContext.title}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {data.activeJobContext.location} · {data.activeJobContext.status} ·{' '}
                {data.activeJobContext.updatedAt}. These metrics come from centralized demo data,
                not a backend or real AI pipeline.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:flex">
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Applications
                </p>
                <p className="mt-1 text-xl font-bold text-slate-950">
                  {data.activeJobContext.applicants}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Open roles
                </p>
                <p className="mt-1 text-xl font-bold text-slate-950">
                  {data.activeJobContext.openRoles}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <QuickActions actions={data.quickActionsData} />

        <section aria-labelledby="kpi-summary">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h2 id="kpi-summary" className="text-base font-semibold text-slate-950">
                KPI Summary
              </h2>
              <p className="text-sm text-slate-500">
                Demo recruiting metrics for {data.activeJobContext.title}.
              </p>
            </div>
            <Badge variant="demo">Demo metrics</Badge>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {data.kpiData.map((kpi) => (
              <KpiCard key={kpi.id} {...kpi} />
            ))}
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
          <RecommendedCandidates
            candidates={data.recommendedCandidates}
            allCandidatesHref={candidatesHref}
            candidateBaseHref={candidateBaseHref}
          />
          <PipelineSummary stages={data.pipelineStages} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Smart Alerts</CardTitle>
              <CardDescription>
                Demo attention items that need recruiter follow-up for this job.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SmartAlerts alerts={data.smartAlertsData} />
            </CardContent>
          </Card>
          <RecentActivity items={data.recentActivityData} />
        </div>

        <section aria-labelledby="secondary-analytics">
          <div className="mb-3">
            <h2 id="secondary-analytics" className="text-base font-semibold text-slate-950">
              Secondary Analytics
            </h2>
            <p className="text-sm text-slate-500">
              Supporting demo charts; job-scoped analytics are still future work.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Skills vs Candidate Count</CardTitle>
                <CardDescription>Top skills represented in demo resumes.</CardDescription>
              </CardHeader>
              <CardContent>
                <SkillsChart data={skillsData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Match Score Distribution</CardTitle>
                <CardDescription>Example score ranges from demo data.</CardDescription>
              </CardHeader>
              <CardContent>
                <ScoreChart data={scoreDistributionData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Recruiter Activity</CardTitle>
                <CardDescription>Scheduled and completed demo activity.</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityChart data={recruiterActivityData} />
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
