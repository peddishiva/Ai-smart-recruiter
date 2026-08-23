'use client';

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { ChartDataPoint } from '@/types';
import { useChartSize } from './useChartSize';

const RADIAN = Math.PI / 180;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderCustomizedLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor="middle" 
      dominantBaseline="central"
      className="text-sm font-bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface ScoreChartProps {
  data: ChartDataPoint[];
}

export default function ScoreChart({ data }: ScoreChartProps) {
  const chart = useChartSize();

  return (
    <div ref={chart.ref} className="h-80 min-w-0 w-full">
      {chart.ready ? (
        <PieChart width={chart.width} height={chart.height}>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            innerRadius={0}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value}%`, 'Score Range']}
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
            }}
          />
          <Legend 
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center"
            wrapperStyle={{
              paddingTop: '1.5rem',
            }}
            formatter={(value, entry, index) => (
              <span className="text-gray-700 text-sm font-medium">
                {data[index].name}: {data[index].value}%
              </span>
            )}
            iconType="circle"
            iconSize={10}
          />
        </PieChart>
      ) : (
        <div className="h-full w-full rounded-lg bg-slate-50" aria-hidden="true" />
      )}
    </div>
  );
}
