'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '@/types';

interface SkillsChartProps {
  data: ChartDataPoint[];
}

export default function SkillsChart({ data }: SkillsChartProps) {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: '#6B7280' }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: '#6B7280' }}
            width={30}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: 'none',
              padding: '0.5rem 1rem',
            }}
            labelStyle={{ 
              color: '#4B5563',
              fontWeight: '500',
              fontSize: '0.875rem',
              marginBottom: '0.25rem',
            }}
            formatter={(value: number) => [`${value}%`, 'Candidates']}
          />
          <Bar 
            dataKey="value" 
            radius={[4, 4, 0, 0]}
            barSize={32}
          >
            {data.map((entry, index) => (
              <rect 
                key={`bar-${index}`} 
                x={0} 
                y={0} 
                width={32} 
                height={32} 
                fill={entry.fill} 
                rx={4}
                ry={4}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
