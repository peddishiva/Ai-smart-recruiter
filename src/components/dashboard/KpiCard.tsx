'use client';

import { ArrowUp, ArrowDown } from 'lucide-react';
import { KpiData } from '@/types';
import * as LucideIcons from 'lucide-react';

export default function KpiCard({ title, value, change, icon, color }: KpiData) {
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[icon] || LucideIcons.Users;
  const isPositive = change >= 0;
  
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="mb-1 text-sm font-medium text-slate-600">
              {title}
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-slate-950">
                {value}
              </h3>
              <div
                className={`flex items-center gap-1 text-sm font-semibold ${
                  isPositive ? 'text-emerald-600' : 'text-red-600'
                }`}
              >
                {isPositive ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                <span>{Math.abs(change)}%</span>
              </div>
            </div>
          </div>
          <div className={`flex-shrink-0 rounded-lg p-3 ${color.split(' ')[0]}`}>
            <Icon className={`h-6 w-6 ${color.split(' ')[1]}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
