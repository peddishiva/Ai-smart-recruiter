import type {
  ActiveJobContext,
  ActivityItem,
  Alert,
  CandidateStatus,
  KpiData,
  PipelineStage,
  QuickAction,
} from '@/types';
import { demoCandidates } from './candidates';

const countByStatus = (status: CandidateStatus) =>
  demoCandidates.filter((candidate) => candidate.status === status).length;

const needsReviewCount = demoCandidates.filter((candidate) =>
  ['new', 'reviewing'].includes(candidate.status)
).length;
const strongMatchCount = demoCandidates.filter((candidate) => candidate.matchScore >= 90).length;
const averageMatchScore = Math.round(
  demoCandidates.reduce((sum, candidate) => sum + candidate.matchScore, 0) /
    demoCandidates.length
);

export const activeJobContext: ActiveJobContext = {
  title: 'Senior Frontend Engineer',
  department: 'Product Engineering',
  location: 'Remote / Bengaluru',
  applicants: demoCandidates.length,
  openRoles: 2,
  updatedAt: 'Updated today',
};

export const kpiData: KpiData[] = [
  {
    id: 'needs-review',
    title: 'Needs Review',
    value: needsReviewCount,
    change: 9.5,
    icon: 'ClipboardList',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'strong-matches',
    title: 'Strong Matches',
    value: strongMatchCount,
    change: 6.4,
    icon: 'UserCheck',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'avg-demo-score',
    title: 'Avg Demo Match',
    value: `${averageMatchScore}%`,
    change: 3.2,
    icon: 'Award',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'interviews',
    title: 'Interviews Scheduled',
    value: countByStatus('interview'),
    change: -2.1,
    icon: 'Calendar',
    color: 'bg-slate-100 text-slate-700',
  },
];

export const pipelineStages: PipelineStage[] = [
  {
    id: 'new',
    label: 'New',
    count: countByStatus('new'),
    description: 'Awaiting first review',
    tone: 'blue',
  },
  {
    id: 'reviewing',
    label: 'Reviewing',
    count: countByStatus('reviewing'),
    description: 'Needs recruiter decision',
    tone: 'amber',
  },
  {
    id: 'shortlisted',
    label: 'Shortlisted',
    count: countByStatus('shortlisted'),
    description: 'Ready for next step',
    tone: 'green',
  },
  {
    id: 'interview',
    label: 'Interview',
    count: countByStatus('interview'),
    description: 'Scheduled or pending',
    tone: 'slate',
  },
  {
    id: 'hired',
    label: 'Hired',
    count: countByStatus('hired'),
    description: 'Accepted or closed',
    tone: 'green',
  },
  {
    id: 'rejected',
    label: 'Rejected',
    count: countByStatus('rejected'),
    description: 'Not moving forward',
    tone: 'red',
  },
];

export const smartAlertsData: Alert[] = [
  {
    id: 'candidate-match',
    title: 'Review strong demo match',
    message: 'Maya Raman has a 94% explained demo match for Senior Frontend Engineer.',
    time: '10m ago',
    priority: 'high',
    read: false,
  },
  {
    id: 'review-queue',
    title: 'Review queue growing',
    message: `${needsReviewCount} candidates are waiting for recruiter review in the demo pipeline.`,
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
    description: 'Open the candidate review workflow.',
    icon: 'Users',
    href: '/candidates',
    availability: 'available',
  },
  {
    id: 'create-job',
    title: 'Create job',
    description: 'Job setup and selection workflow.',
    icon: 'Briefcase',
    availability: 'phase-3',
  },
];
