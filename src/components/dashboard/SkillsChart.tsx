'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { ChartDataPoint } from '@/types';
import { useChartSize } from './useChartSize';

interface SkillsChartProps {
  data: ChartDataPoint[];
}

export default function SkillsChart({ data }: SkillsChartProps) {
  const chart = useChartSize();

  return (
    <div ref={chart.ref} className="h-80 min-w-0 w-full">
      {chart.ready ? (
        <BarChart
          width={chart.width}
          height={chart.height}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: '#6B7280', fontSize: 14 }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: '#6B7280', fontSize: 14 }}
            width={40}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              padding: '0.75rem 1rem',
            }}
            labelStyle={{ 
              color: '#111827',
              fontWeight: '600',
              fontSize: '0.875rem',
              marginBottom: '0.25rem',
            }}
            formatter={(value: number) => [`${value} candidates`, '']}
            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
          />
          <Bar 
            dataKey="value" 
            radius={[8, 8, 0, 0]}
            maxBarSize={60}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      ) : (
        <div className="h-full w-full rounded-lg bg-slate-50" aria-hidden="true" />
      )}
    </div>
  );
}
