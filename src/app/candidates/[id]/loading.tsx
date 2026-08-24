import { Card, CardContent, PageHeader, Skeleton } from '@/components/ui';

export default function CandidateDetailLoading() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Candidate analysis"
          title="Loading candidate"
          description="Preparing the demo candidate workspace."
        />
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Card>
            <CardContent className="space-y-4 p-5">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4 p-5">
              <Skeleton className="h-24" />
              <Skeleton className="h-32" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
