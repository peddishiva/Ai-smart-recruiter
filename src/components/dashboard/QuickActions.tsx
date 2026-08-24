'use client';

import * as LucideIcons from 'lucide-react';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { quickActionsData } from '@/data/demo';
import type { QuickAction } from '@/types';

const phaseLabels: Record<QuickAction['availability'], string> = {
  available: 'Available',
  'phase-2': 'Phase 2',
  'phase-3': 'Phase 3',
  'phase-4': 'Phase 4',
};

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Primary Actions</CardTitle>
        <CardDescription>Use the available demo actions; future workflows stay labeled.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {quickActionsData.map((action) => {
            const Icon =
              (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
                action.icon
              ] ?? LucideIcons.Circle;
            const isAvailable = action.availability === 'available' && Boolean(action.href);

            return (
              <div
                key={action.id}
                className="flex min-h-32 flex-col justify-between rounded-lg border border-slate-200 bg-white p-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <Badge variant={isAvailable ? 'primary' : 'neutral'}>
                      {phaseLabels[action.availability]}
                    </Badge>
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-slate-950">{action.title}</h3>
                  <p className="mt-1 text-sm leading-5 text-slate-500">{action.description}</p>
                </div>
                <div className="mt-4">
                  {isAvailable && action.href ? (
                    <Button href={action.href} variant="secondary" size="sm" className="w-full">
                      Open
                    </Button>
                  ) : (
                    <Button variant="muted" size="sm" className="w-full" disabled>
                      Coming in {phaseLabels[action.availability]}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
