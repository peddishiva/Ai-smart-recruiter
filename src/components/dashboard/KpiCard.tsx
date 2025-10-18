'use client';

import { ArrowUp, ArrowDown } from 'lucide-react';
import { KpiData } from '@/types';
import * as LucideIcons from 'lucide-react';

export default function KpiCard({ title, value, change, icon, color }: KpiData) {
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[icon] || LucideIcons.Users;
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-md p-3 ${color.split(' ')[0]}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {value}
                </div>
                <div
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {isPositive ? (
                    <ArrowUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDown className="self-center flex-shrink-0 h-4 w-4 text-red-500" />
                  )}
                  <span className="sr-only">
                    {isPositive ? 'Increased' : 'Decreased'} by
                  </span>
                  {Math.abs(change)}%
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
