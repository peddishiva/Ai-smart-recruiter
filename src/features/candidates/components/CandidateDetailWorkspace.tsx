'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
  MapPin,
  UserCheck,
  UserX,
} from 'lucide-react';
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
import type { Candidate, CandidateStatus, EvidenceCategory } from '@/types';
import CandidateStatusBadge from './CandidateStatusBadge';
import MatchScore from './MatchScore';

interface CandidateDetailWorkspaceProps {
  candidate: Candidate;
  backHref?: string;
  backLabel?: string;
  jobTitle?: string;
}

const evidenceLabels: Record<EvidenceCategory, string> = {
  skills: 'Skills',
  experience: 'Experience',
  education: 'Education',
  impact: 'Impact',
  risk: 'Risk',
};

const evidenceVariants: Record<
  EvidenceCategory,
  'neutral' | 'primary' | 'success' | 'warning' | 'danger'
> = {
  skills: 'primary',
  experience: 'neutral',
  education: 'neutral',
  impact: 'success',
  risk: 'warning',
};

export default function CandidateDetailWorkspace({
  candidate,
  backHref = '/candidates',
  backLabel = 'Back to Candidates',
  jobTitle,
}: CandidateDetailWorkspaceProps) {
  const [status, setStatus] = useState<CandidateStatus>(candidate.status);
  const statusChanged = status !== candidate.status;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {backLabel}
        </Link>

        <PageHeader
          eyebrow="Candidate analysis"
          title={candidate.name}
          description={candidate.resumeSummary}
          actions={
            <>
              <Button
                variant="primary"
                icon={<UserCheck className="h-4 w-4" aria-hidden="true" />}
                onClick={() => setStatus('shortlisted')}
                disabled={status === 'shortlisted'}
              >
                Shortlist
              </Button>
              <Button
                variant="outline"
                icon={<UserX className="h-4 w-4" aria-hidden="true" />}
                onClick={() => setStatus('rejected')}
                disabled={status === 'rejected'}
              >
                Reject
              </Button>
            </>
          }
        />

        <Card>
          <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_auto] lg:items-start">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <CandidateStatusBadge status={status} />
                <Badge variant="demo">Demo analysis</Badge>
                {jobTitle && <Badge variant="primary">{jobTitle}</Badge>}
                {statusChanged && <Badge variant="warning">Local demo update</Badge>}
              </div>
              <h2 className="mt-3 text-xl font-bold text-slate-950">{candidate.role}</h2>
              <div className="mt-3 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" aria-hidden="true" />
                  <span>{candidate.location}</span>
                </div>
                <div className="flex items-start gap-2">
                  <UserCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" aria-hidden="true" />
                  <span>{candidate.experienceSummary}</span>
                </div>
                <div className="flex items-start gap-2">
                  <GraduationCap className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" aria-hidden="true" />
                  <span>{candidate.education}</span>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-500">
                Status actions are local demo interactions only. This application record belongs to
                one job context and does not call a backend or persist outside this page.
              </p>
            </div>
            <MatchScore score={candidate.matchScore} size="lg" className="lg:min-w-72" />
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Card>
            <CardHeader>
              <CardTitle>Why This Score?</CardTitle>
              <CardDescription>
                Structured demo evidence behind the match score for the active job.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">
                  Skills: {candidate.matchAnalysis.requiredSkillsMatched} /{' '}
                  {candidate.matchAnalysis.requiredSkillsTotal} required
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {candidate.matchAnalysis.summary}
                </p>
              </div>

              <div className="mt-5 space-y-4">
                {candidate.matchAnalysis.scoreBreakdown.map((item) => {
                  const percent = Math.round((item.score / item.maxScore) * 100);

                  return (
                    <div key={item.id}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-semibold text-slate-950">{item.label}</h3>
                          <p className="mt-1 text-sm leading-5 text-slate-500">
                            {item.description}
                          </p>
                        </div>
                        <span className="text-sm font-bold text-slate-950">
                          {item.score} / {item.maxScore}
                        </span>
                      </div>
                      <div
                        className="mt-2 h-2 rounded-full bg-slate-100"
                        aria-label={`${item.label} score ${item.score} out of ${item.maxScore}`}
                      >
                        <div
                          className="h-2 rounded-full bg-blue-600"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendation</CardTitle>
              <CardDescription>Demo recruiter decision guidance.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h3 className="text-base font-semibold text-blue-950">
                  {candidate.matchAnalysis.recommendation.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-blue-900">
                  {candidate.matchAnalysis.recommendation.reason}
                </p>
                <p className="mt-3 text-sm font-semibold text-blue-950">
                  Next step: {candidate.matchAnalysis.recommendation.nextStep}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Matched Skills</CardTitle>
              <CardDescription>Skills from the demo profile that support the match.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3 sm:grid-cols-2">
                {candidate.matchAnalysis.matchedSkills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Missing or Weaker Areas</CardTitle>
              <CardDescription>Areas to validate before making a real hiring decision.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[...candidate.matchAnalysis.missingSkills, ...candidate.matchAnalysis.weakerAreas].map(
                  (gap) => (
                    <li key={gap} className="flex items-start gap-2 text-sm leading-6 text-slate-700">
                      <AlertTriangle className="mt-1 h-4 w-4 flex-shrink-0 text-amber-600" aria-hidden="true" />
                      <span>{gap}</span>
                    </li>
                  )
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <Card>
            <CardHeader>
              <CardTitle>Strengths</CardTitle>
              <CardDescription>Positive signals from the demo analysis.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {candidate.matchAnalysis.strengths.map((strength) => (
                  <li key={strength} className="flex items-start gap-2 text-sm leading-6 text-slate-700">
                    <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>

              <h3 className="mt-6 text-sm font-semibold text-slate-950">Gaps / Risks</h3>
              <ul className="mt-3 space-y-3">
                {candidate.matchAnalysis.gaps.map((gap) => (
                  <li key={gap} className="flex items-start gap-2 text-sm leading-6 text-slate-700">
                    <AlertTriangle className="mt-1 h-4 w-4 flex-shrink-0 text-amber-600" aria-hidden="true" />
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Supporting Evidence</CardTitle>
              <CardDescription>
                Factual demo evidence, not direct resume quotations or real AI output.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidate.matchAnalysis.evidence.map((item) => (
                  <article key={item.id} className="rounded-lg border border-slate-200 bg-white p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={evidenceVariants[item.category]}>
                        {evidenceLabels[item.category]}
                      </Badge>
                      <h3 className="text-sm font-semibold text-slate-950">{item.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
                  </article>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
