import { ChartDataPoint } from '@/types';

export const skillsData: ChartDataPoint[] = [
  { name: 'React', value: 45, fill: '#2563eb' },
  { name: 'Python', value: 38, fill: '#059669' },
  { name: 'AWS', value: 29, fill: '#d97706' },
  { name: 'Node.js', value: 32, fill: '#7c3aed' },
  { name: 'SQL', value: 27, fill: '#db2777' },
];

export const scoreDistributionData: ChartDataPoint[] = [
  { name: '80-100', value: 35, fill: '#059669' },
  { name: '60-80', value: 45, fill: '#2563eb' },
  { name: '0-50', value: 20, fill: '#dc2626' },
];

export const recruiterActivityData = [
  { name: 'Mon', scheduled: 4, completed: 2 },
  { name: 'Tue', scheduled: 3, completed: 3 },
  { name: 'Wed', scheduled: 5, completed: 4 },
  { name: 'Thu', scheduled: 7, completed: 5 },
  { name: 'Fri', scheduled: 6, completed: 3 },
  { name: 'Sat', scheduled: 2, completed: 1 },
  { name: 'Sun', scheduled: 1, completed: 0 },
];
