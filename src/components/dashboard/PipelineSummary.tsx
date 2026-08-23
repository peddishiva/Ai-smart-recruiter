import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { PipelineStage } from '@/types';
import { cn } from '@/lib/utils/cn';

interface PipelineSummaryProps {
  stages: PipelineStage[];
}

const toneClasses: Record<PipelineStage['tone'], string> = {
  blue: 'bg-blue-600',
  green: 'bg-emerald-600',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
  slate: 'bg-slate-500',
};

export default function PipelineSummary({ stages }: PipelineSummaryProps) {
  const total = stages.reduce((sum, stage) => sum + stage.count, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>Candidate Pipeline</CardTitle>
            <CardDescription>Demo status counts for the active role.</CardDescription>
          </div>
          <Badge variant="neutral">{total} total</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stages.map((stage) => {
            const width = total === 0 ? 0 : Math.round((stage.count / total) * 100);
            return (
              <div key={stage.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{stage.label}</p>
                    <p className="text-xs text-slate-500">{stage.description}</p>
                  </div>
                  <span className="text-sm font-bold text-slate-950">{stage.count}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-100">
                  <div
                    className={cn('h-2 rounded-full', toneClasses[stage.tone])}
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
