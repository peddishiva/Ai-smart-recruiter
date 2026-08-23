import { Info } from 'lucide-react';
import { Badge } from '@/components/ui';

export function DemoBanner() {
  return (
    <div className="border-b border-blue-100 bg-blue-50/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 text-sm text-blue-950 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 flex-shrink-0 text-blue-700" aria-hidden="true" />
          <Badge variant="demo">Demo data</Badge>
        </div>
        <p className="leading-6">
          Connect a backend to enable live resume parsing, AI analysis, and candidate matching.
        </p>
      </div>
    </div>
  );
}
