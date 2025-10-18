'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartDataPoint } from '@/types';

const RADIAN = Math.PI / 180;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderCustomizedLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.2;
  const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.2;

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor="middle" 
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface ScoreChartProps {
  data: ChartDataPoint[];
}

export default function ScoreChart({ data }: ScoreChartProps) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value}%`, 'Candidates']}
            contentStyle={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: 'none',
              padding: '0.5rem 1rem',
            }}
          />
          <Legend 
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center"
            wrapperStyle={{
              paddingTop: '1rem',
            }}
            formatter={(value, entry, index) => (
              <span className="text-gray-500 text-sm">
                {data[index].name}: {data[index].value}%
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
