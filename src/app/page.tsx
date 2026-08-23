'use client';

import dynamic from 'next/dynamic';
import { Upload } from 'lucide-react';
import {
  activeJobContext,
  kpiData,
  pipelineStages,
  recentActivityData,
  recommendedCandidates,
  recruiterActivityData,
  scoreDistributionData,
  skillsData,
  smartAlertsData,
} from '@/data/demo';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, PageHeader } from '@/components/ui';
import PipelineSummary from '@/components/dashboard/PipelineSummary';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentActivity from '@/components/dashboard/RecentActivity';
import RecommendedCandidates from '@/components/dashboard/RecommendedCandidates';
import SmartAlerts from '@/components/dashboard/SmartAlerts';

// Dynamically import components with no SSR
const KpiCard = dynamic(() => import('@/components/dashboard/KpiCard'), { ssr: false });
const SkillsChart = dynamic(() => import('@/components/dashboard/SkillsChart'), { ssr: false });
const ScoreChart = dynamic(() => import('@/components/dashboard/ScoreChart'), { ssr: false });
const ActivityChart = dynamic(() => import('@/components/dashboard/ActivityChart'), { ssr: false });

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Recruiter workspace"
          title="Good morning, John"
          description={`Active job: ${activeJobContext.title} in ${activeJobContext.department}. ${activeJobContext.applicants} demo applicants are available for review.`}
          actions={
            <Button
              href="/upload-resumes"
              variant="primary"
              size="lg"
              icon={<Upload className="h-4 w-4" aria-hidden="true" />}
            >
              Upload resumes
            </Button>
          }
        />

        <Card>
          <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="primary">Active job</Badge>
                <span className="text-sm font-semibold text-slate-950">
                  {activeJobContext.title}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {activeJobContext.location} · {activeJobContext.openRoles} open roles ·{' '}
                {activeJobContext.updatedAt}. Candidate and job detail workflows are coming in
                later phases.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:flex">
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Applicants
                </p>
                <p className="mt-1 text-xl font-bold text-slate-950">
                  {activeJobContext.applicants}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Open roles
                </p>
                <p className="mt-1 text-xl font-bold text-slate-950">
                  {activeJobContext.openRoles}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <QuickActions />

        <section aria-labelledby="kpi-summary">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h2 id="kpi-summary" className="text-base font-semibold text-slate-950">
                KPI Summary
              </h2>
              <p className="text-sm text-slate-500">Demo recruiting metrics for the active role.</p>
            </div>
            <Badge variant="demo">Demo metrics</Badge>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpiData.map((kpi) => (
            <KpiCard key={kpi.id} {...kpi} />
          ))}
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
          <RecommendedCandidates candidates={recommendedCandidates} />
          <PipelineSummary stages={pipelineStages} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Smart Alerts</CardTitle>
              <CardDescription>Demo attention items that need recruiter follow-up.</CardDescription>
            </CardHeader>
            <CardContent>
              <SmartAlerts alerts={smartAlertsData} />
            </CardContent>
          </Card>
          <RecentActivity items={recentActivityData} />
        </div>

        <section aria-labelledby="secondary-analytics">
          <div className="mb-3">
            <h2 id="secondary-analytics" className="text-base font-semibold text-slate-950">
              Secondary Analytics
            </h2>
            <p className="text-sm text-slate-500">
              Supporting demo charts; candidate decisions stay above the fold.
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
                <CardTitle>Resume Score Distribution</CardTitle>
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
