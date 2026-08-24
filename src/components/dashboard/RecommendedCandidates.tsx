import Link from 'next/link';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { RecommendedCandidate } from '@/types';
import MatchScore from '@/features/candidates/components/MatchScore';

interface RecommendedCandidatesProps {
  candidates: RecommendedCandidate[];
  allCandidatesHref?: string;
  candidateBaseHref?: string;
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

export default function RecommendedCandidates({
  candidates,
  allCandidatesHref = '/candidates',
  candidateBaseHref = '/candidates',
}: RecommendedCandidatesProps) {
  if (candidates.length === 0) {
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
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <p className="text-sm font-semibold text-slate-950">No recommendations yet</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              This job has no demo applications ready for recommendation. Upload context is
              prepared, but real matching arrives in a later phase.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

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
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="demo">Example analysis</Badge>
            <Button href={allCandidatesHref} variant="secondary" size="sm">
              View all
            </Button>
          </div>
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
                    <Link
                      href={`${candidateBaseHref}/${candidate.id}`}
                      className="text-base font-semibold text-slate-950 hover:text-blue-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      {candidate.name}
                    </Link>
                    <Badge variant={statusVariants[candidate.status]}>
                      {statusLabels[candidate.status]}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{candidate.role}</p>
                  <p className="mt-1 text-xs text-slate-500">{candidate.lastActivity}</p>
                </div>
                <MatchScore score={candidate.matchScore} size="sm" showMeter={false} />
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

              <div className="mt-4 flex flex-col gap-2 rounded-lg bg-slate-50 px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm text-slate-600">
                  Open the explained demo match analysis before making a decision.
                </span>
                <Button href={`${candidateBaseHref}/${candidate.id}`} variant="secondary" size="sm">
                  Review
                </Button>
              </div>
            </article>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
