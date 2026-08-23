import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { RecommendedCandidate } from '@/types';

interface RecommendedCandidatesProps {
  candidates: RecommendedCandidate[];
}

const statusLabels: Record<RecommendedCandidate['status'], string> = {
  new: 'New',
  reviewing: 'Reviewing',
  shortlisted: 'Shortlisted',
  rejected: 'Rejected',
  interview: 'Interview',
  hired: 'Hired',
};

const statusVariants: Record<
  RecommendedCandidate['status'],
  'neutral' | 'primary' | 'success' | 'warning' | 'danger'
> = {
  new: 'primary',
  reviewing: 'warning',
  shortlisted: 'success',
  rejected: 'danger',
  interview: 'neutral',
  hired: 'success',
};

export default function RecommendedCandidates({ candidates }: RecommendedCandidatesProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle>AI Recommended Candidates</CardTitle>
            <CardDescription>
              Demo match summaries that explain who appears strongest and why.
            </CardDescription>
          </div>
          <Badge variant="demo">Example analysis</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {candidates.map((candidate) => (
            <article
              key={candidate.id}
              className="rounded-lg border border-slate-200 bg-white p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-slate-950">{candidate.name}</h3>
                    <Badge variant={statusVariants[candidate.status]}>
                      {statusLabels[candidate.status]}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{candidate.role}</p>
                  <p className="mt-1 text-xs text-slate-500">{candidate.lastActivity}</p>
                </div>
                <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                  <Badge variant="score">{candidate.matchScore}%</Badge>
                  <span className="text-xs font-medium text-slate-500">Demo match</span>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-700">{candidate.summaryReason}</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">{candidate.evidence}</p>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Strengths
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {candidate.topSkills.map((skill) => (
                      <Badge key={skill} variant="success">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Gaps to Check
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {candidate.gaps.map((gap) => (
                      <Badge key={gap} variant="warning">
                        {gap}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
                Candidate detail review is coming in Phase 2.
              </div>
            </article>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
