import { Upload } from 'lucide-react';
import { Badge, Button, Card, CardContent, PageHeader } from '@/components/ui';
import { demoCandidates } from '@/data/demo';
import CandidateListClient from '@/features/candidates/components/CandidateListClient';

export default function CandidatesPage() {
  const totalCandidates = demoCandidates.length;
  const needsReview = demoCandidates.filter((candidate) =>
    ['new', 'reviewing'].includes(candidate.status)
  ).length;
  const strongMatches = demoCandidates.filter((candidate) => candidate.matchScore >= 90).length;
  const averageScore = Math.round(
    demoCandidates.reduce((sum, candidate) => sum + candidate.matchScore, 0) / totalCandidates
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Candidate workflow"
          title="Candidates"
          description="Review and manage candidates across your recruiting pipeline."
          actions={
            <Button
              href="/upload-resumes"
              variant="secondary"
              icon={<Upload className="h-4 w-4" aria-hidden="true" />}
            >
              Upload resumes
            </Button>
          }
        />

        <Card>
          <CardContent className="grid gap-4 p-5 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-slate-500">Demo candidates</p>
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

        <CandidateListClient candidates={demoCandidates} />
      </div>
    </div>
  );
}
