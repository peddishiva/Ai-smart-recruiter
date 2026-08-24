import { Upload } from 'lucide-react';
import { Badge, Button, Card, CardContent, PageHeader } from '@/components/ui';
import type { Candidate, Job } from '@/types';
import CandidateListClient from './CandidateListClient';
import JobWorkspaceNav from '@/features/jobs/components/JobWorkspaceNav';

interface CandidatesWorkspaceProps {
  candidates: Candidate[];
  job: Job;
  candidateBaseHref?: string;
  uploadHref?: string;
  legacy?: boolean;
}

export default function CandidatesWorkspace({
  candidates,
  job,
  candidateBaseHref = '/candidates',
  uploadHref = '/upload-resumes',
  legacy = false,
}: CandidatesWorkspaceProps) {
  const totalCandidates = candidates.length;
  const needsReview = candidates.filter((candidate) =>
    ['new', 'reviewing'].includes(candidate.status)
  ).length;
  const strongMatches = candidates.filter((candidate) => candidate.matchScore >= 90).length;
  const averageScore =
    totalCandidates === 0
      ? 0
      : Math.round(
          candidates.reduce((sum, candidate) => sum + candidate.matchScore, 0) / totalCandidates
        );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Candidate workflow"
          title="Candidates"
          description={`Review independent demo applications for ${job.title}. Candidate records are job-scoped and are not global profiles.`}
          actions={
            <Button
              href={uploadHref}
              variant="secondary"
              icon={<Upload className="h-4 w-4" aria-hidden="true" />}
            >
              Upload resumes
            </Button>
          }
        />

        {!legacy && <JobWorkspaceNav job={job} current="candidates" />}

        <Card>
          <CardContent className="grid gap-4 p-5 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-slate-500">Demo applications</p>
              <p className="mt-1 text-2xl font-bold text-slate-950">{totalCandidates}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Needs attention</p>
              <p className="mt-1 text-2xl font-bold text-slate-950">{needsReview}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Average match</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <p className="text-2xl font-bold text-slate-950">{averageScore}%</p>
                <Badge variant="demo">{strongMatches} strong</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary">Active job</Badge>
              <span className="text-sm font-semibold text-slate-950">{job.title}</span>
              <Badge variant="demo">Demo data</Badge>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Each row is an application for this job. If the same person applies to another job in
              a future phase, that would be a separate application record.
            </p>
          </CardContent>
        </Card>

        <CandidateListClient candidates={candidates} candidateBaseHref={candidateBaseHref} />
      </div>
    </div>
  );
}
