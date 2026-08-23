'use client';

import { Alert } from '@/types';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { EmptyState } from '@/components/ui';

interface SmartAlertsProps {
  alerts?: Alert[];
}

export default function SmartAlerts({ alerts = [] }: SmartAlertsProps) {
  if (alerts.length === 0) {
    return (
      <EmptyState
        title="No attention items"
        description="Demo alerts will appear here when candidates need review."
      />
    );
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'low':
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <div className="flow-root">
      <ul className="divide-y divide-slate-200">
        {alerts.map((alert) => (
          <li key={alert.id} className={`py-4 ${!alert.read ? 'bg-blue-50/70 -mx-3 px-3' : ''}`}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {getPriorityIcon(alert.priority)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-950">
                  {alert.title}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {alert.message}
                </p>
              </div>
              <div className="inline-flex flex-shrink-0 items-center text-xs text-slate-500">
                <Clock className="h-3.5 w-3.5 mr-1" />
                {alert.time}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
