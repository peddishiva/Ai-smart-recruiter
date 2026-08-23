import { Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { ActivityItem } from '@/types';
import { cn } from '@/lib/utils/cn';

interface RecentActivityProps {
  items: ActivityItem[];
}

const toneClasses: Record<ActivityItem['tone'], string> = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
  slate: 'bg-slate-100 text-slate-600',
};

export default function RecentActivity({ items }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Demo workspace updates that affect recruiter follow-up.</CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex gap-3">
              <div
                className={cn(
                  'mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full',
                  toneClasses[item.tone]
                )}
              >
                <Clock className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                  <span className="text-xs font-medium text-slate-500">{item.time}</span>
                </div>
                <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
