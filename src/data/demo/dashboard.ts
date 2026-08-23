import {
  ActiveJobContext,
  ActivityItem,
  Alert,
  KpiData,
  PipelineStage,
  QuickAction,
  RecommendedCandidate,
} from '@/types';

export const activeJobContext: ActiveJobContext = {
  title: 'Senior Frontend Engineer',
  department: 'Product Engineering',
  location: 'Remote / Bengaluru',
  applicants: 86,
  openRoles: 2,
  updatedAt: 'Updated today',
};

export const kpiData: KpiData[] = [
  {
    id: 'needs-review',
    title: 'Needs Review',
    value: 18,
    change: 9.5,
    icon: 'ClipboardList',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'strong-matches',
    title: 'Strong Matches',
    value: 12,
    change: 6.4,
    icon: 'UserCheck',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'avg-demo-score',
    title: 'Avg Demo Match',
    value: '78%',
    change: 3.2,
    icon: 'Award',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'interviews',
    title: 'Interviews Scheduled',
    value: 24,
    change: -2.1,
    icon: 'Calendar',
    color: 'bg-slate-100 text-slate-700',
  },
];

export const recommendedCandidates: RecommendedCandidate[] = [
  {
    id: 'maya-raman',
    name: 'Maya Raman',
    role: 'Senior Frontend Engineer',
    matchScore: 94,
    status: 'shortlisted',
    topSkills: ['React', 'TypeScript', 'Design Systems'],
    gaps: ['GraphQL leadership'],
    summaryReason:
      'Strongest demo match for product UI depth, component architecture, and accessibility work.',
    evidence:
      'Resume examples mention React platform ownership, dashboard redesigns, and WCAG-focused reviews.',
    lastActivity: 'Resume reviewed 18m ago',
  },
  {
    id: 'arjun-mehta',
    name: 'Arjun Mehta',
    role: 'Frontend Platform Engineer',
    matchScore: 89,
    status: 'reviewing',
    topSkills: ['Next.js', 'Performance', 'Testing'],
    gaps: ['Recruiting domain'],
    summaryReason:
      'High demo fit for Next.js delivery and front-end performance ownership.',
    evidence:
      'Resume highlights app router migrations, Web Vitals improvements, and test automation.',
    lastActivity: 'Added to review queue 42m ago',
  },
  {
    id: 'nisha-kapoor',
    name: 'Nisha Kapoor',
    role: 'Product Engineer',
    matchScore: 86,
    status: 'new',
    topSkills: ['React', 'UX Systems', 'Analytics'],
    gaps: ['Large-scale hiring tools'],
    summaryReason:
      'Promising demo match with strong product judgment and dashboard workflow experience.',
    evidence:
      'Resume references user-facing SaaS workflows, data-heavy screens, and cross-functional delivery.',
    lastActivity: 'New resume uploaded today',
  },
];

export const pipelineStages: PipelineStage[] = [
  {
    id: 'new',
    label: 'New',
    count: 28,
    description: 'Awaiting first review',
    tone: 'blue',
  },
  {
    id: 'reviewing',
    label: 'Reviewing',
    count: 18,
    description: 'Needs recruiter decision',
    tone: 'amber',
  },
  {
    id: 'shortlisted',
    label: 'Shortlisted',
    count: 12,
    description: 'Ready for next step',
    tone: 'green',
  },
  {
    id: 'interview',
    label: 'Interview',
    count: 8,
    description: 'Scheduled or pending',
    tone: 'slate',
  },
  {
    id: 'rejected',
    label: 'Rejected',
    count: 20,
    description: 'Not moving forward',
    tone: 'red',
  },
];

export const smartAlertsData: Alert[] = [
  {
    id: 'candidate-match',
    title: 'Review strong demo match',
    message: 'Maya Raman has a 94% demo match for Senior Frontend Engineer.',
    time: '10m ago',
    priority: 'high',
    read: false,
  },
  {
    id: 'review-queue',
    title: 'Review queue growing',
    message: '18 candidates are waiting for recruiter review in the demo pipeline.',
    time: '1h ago',
    priority: 'medium',
    read: false,
  },
  {
    id: 'interview-reminder',
    title: 'Interview prep needed',
    message: 'Two scheduled interviews still need scorecard notes.',
    time: '2h ago',
    priority: 'high',
    read: true,
  },
];

export const recentActivityData: ActivityItem[] = [
  {
    id: 'activity-1',
    title: 'Maya Raman shortlisted',
    description: 'Demo analysis marked her as a top candidate for the active role.',
    time: '18m ago',
    tone: 'green',
  },
  {
    id: 'activity-2',
    title: '6 resumes uploaded',
    description: 'Demo files were added to the Senior Frontend Engineer queue.',
    time: '54m ago',
    tone: 'blue',
  },
  {
    id: 'activity-3',
    title: 'Review queue updated',
    description: 'New candidates moved into the recruiter review stage.',
    time: '1h ago',
    tone: 'amber',
  },
  {
    id: 'activity-4',
    title: 'Weekly report generated',
    description: 'Demo analytics snapshot is available on the Reports page.',
    time: 'Yesterday',
    tone: 'slate',
  },
];

export const quickActionsData: QuickAction[] = [
  {
    id: 'upload-resumes',
    title: 'Upload resumes',
    description: 'Add resumes to the demo processing queue.',
    icon: 'Upload',
    href: '/upload-resumes',
    availability: 'available',
  },
  {
    id: 'view-reports',
    title: 'View reports',
    description: 'Open current demo recruiting analytics.',
    icon: 'BarChart2',
    href: '/reports',
    availability: 'available',
  },
  {
    id: 'review-candidates',
    title: 'Review candidates',
    description: 'Candidate list and detail views.',
    icon: 'Users',
    availability: 'phase-2',
  },
  {
    id: 'create-job',
    title: 'Create job',
    description: 'Job setup and selection workflow.',
    icon: 'Briefcase',
    availability: 'phase-3',
  },
];
