import { Card, CardContent, PageHeader, Skeleton } from '@/components/ui';

export default function CandidatesLoading() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Candidate workflow"
          title="Candidates"
          description="Review and manage candidates across your recruiting pipeline."
        />
        <Card>
          <CardContent className="space-y-4 p-5">
            <Skeleton className="h-11 w-full" />
            <div className="grid gap-4 sm:grid-cols-3">
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
