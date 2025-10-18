'use client';

import { Alert } from '@/types';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface SmartAlertsProps {
  alerts?: Alert[];
}

export default function SmartAlerts({ alerts = [] }: SmartAlertsProps) {
  if (alerts.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-gray-500">No new alerts</p>
      </div>
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
      <ul className="divide-y divide-gray-200">
        {alerts.map((alert) => (
          <li key={alert.id} className={`py-3 ${!alert.read ? 'bg-blue-50 -mx-3 px-3' : ''}`}>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {getPriorityIcon(alert.priority)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {alert.title}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {alert.message}
                </p>
              </div>
              <div className="inline-flex items-center text-xs text-gray-500">
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
