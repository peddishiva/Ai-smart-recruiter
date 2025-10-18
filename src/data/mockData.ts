import { KpiData, ChartDataPoint, Alert } from '@/types';

export const kpiData: KpiData[] = [
  {
    id: 'total-candidates',
    title: 'Total Candidates',
    value: '1,248',
    change: 12.5,
    icon: 'Users',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 'shortlisted',
    title: 'Shortlisted',
    value: '342',
    change: 8.2,
    icon: 'UserCheck',
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 'avg-score',
    title: 'Avg Resume Score',
    value: '78%',
    change: 3.2,
    icon: 'Award',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 'interviews',
    title: 'Interviews Scheduled',
    value: '24',
    change: -2.1,
    icon: 'Calendar',
    color: 'bg-amber-100 text-amber-600'
  }
];

export const skillsData: ChartDataPoint[] = [
  { name: 'React', value: 45, fill: '#3b82f6' },
  { name: 'Python', value: 38, fill: '#10b981' },
  { name: 'AWS', value: 29, fill: '#f59e0b' },
  { name: 'Node.js', value: 32, fill: '#8b5cf6' },
  { name: 'SQL', value: 27, fill: '#ec4899' }
];

export const scoreDistributionData: ChartDataPoint[] = [
  { name: '80-100', value: 35, fill: '#10b981' },
  { name: '60-80', value: 45, fill: '#3b82f6' },
  { name: '0-50', value: 20, fill: '#ef4444' }
];

export const smartAlertsData: Alert[] = [
  {
    id: '1',
    title: 'New Candidate Match',
    message: 'John Smith matches 92% of requirements for Senior Frontend role',
    time: '10m ago',
    priority: 'high',
    read: false
  },
  {
    id: '2',
    title: 'Resume Review Needed',
    message: '5 new resumes require your review',
    time: '1h ago',
    priority: 'medium',
    read: false
  },
  {
    id: '3',
    title: 'Interview Reminder',
    message: 'Interview with Sarah Johnson in 30 minutes',
    time: '2h ago',
    priority: 'high',
    read: true
  }
];

export const recruiterActivityData = [
  { name: 'Mon', scheduled: 4, completed: 2 },
  { name: 'Tue', scheduled: 3, completed: 3 },
  { name: 'Wed', scheduled: 5, completed: 4 },
  { name: 'Thu', scheduled: 7, completed: 5 },
  { name: 'Fri', scheduled: 6, completed: 3 },
  { name: 'Sat', scheduled: 2, completed: 1 },
  { name: 'Sun', scheduled: 1, completed: 0 }
];
