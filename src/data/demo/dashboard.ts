import type {
  ActiveJobContext,
  ActivityItem,
  Alert,
  CandidateStatus,
  KpiData,
  PipelineStage,
  QuickAction,
} from '@/types';
import { DEFAULT_JOB_ID, getDefaultJob, getJobById, jobStatusLabels } from './jobs';
import { getCandidatesForJob, getRecommendedCandidatesForJob } from './candidates';

const pipelineStatusConfig: Array<{
  id: CandidateStatus;
  label: string;
  description: string;
  tone: PipelineStage['tone'];
}> = [
  {
    id: 'new',
    label: 'New',
    description: 'Awaiting first review',
    tone: 'blue',
  },
  {
    id: 'reviewing',
    label: 'Reviewing',
    description: 'Needs recruiter decision',
    tone: 'amber',
  },
  {
    id: 'shortlisted',
    label: 'Shortlisted',
    description: 'Ready for recruiter next step',
    tone: 'green',
  },
  {
    id: 'interview',
    label: 'Interview',
    description: 'Selected for interview workflow',
    tone: 'slate',
  },
  {
    id: 'hired',
    label: 'Hired',
    description: 'Accepted or closed',
    tone: 'green',
  },
  {
    id: 'rejected',
    label: 'Rejected',
    description: 'Not moving forward',
    tone: 'red',
  },
];

const formatUpdatedAt = (value: string) => {
  const date = new Date(`${value}T00:00:00`);

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export function getDashboardDataForJob(jobId: string = DEFAULT_JOB_ID) {
  const job = getJobById(jobId) ?? getDefaultJob();
  const candidates = getCandidatesForJob(job.id);

  const countByStatus = (status: CandidateStatus) =>
    candidates.filter((candidate) => candidate.status === status).length;

  const needsReviewCount = candidates.filter((candidate) =>
    ['new', 'reviewing'].includes(candidate.status)
  ).length;
  const strongMatchCount = candidates.filter((candidate) => candidate.matchScore >= 90).length;
  const averageMatchScore =
    candidates.length === 0
      ? 0
      : Math.round(
          candidates.reduce((sum, candidate) => sum + candidate.matchScore, 0) / candidates.length
        );

  const activeJobContext: ActiveJobContext = {
    id: job.id,
    title: job.title,
    department: job.department,
    location: job.location,
    applicants: candidates.length,
    openRoles: job.status === 'open' ? 1 : 0,
    updatedAt: `Updated ${formatUpdatedAt(job.updatedAt)}`,
    status: jobStatusLabels[job.status],
  };

  const kpiData: KpiData[] = [
    {
      id: 'needs-review',
      title: 'Needs Review',
      value: needsReviewCount,
      change: needsReviewCount > 0 ? 6.8 : 0,
      icon: 'ClipboardList',
      color: 'bg-amber-100 text-amber-700',
    },
    {
      id: 'strong-matches',
      title: 'Strong Matches',
      value: strongMatchCount,
      change: strongMatchCount > 0 ? 5.2 : 0,
      icon: 'UserCheck',
      color: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: 'avg-demo-score',
      title: 'Avg Demo Match',
      value: `${averageMatchScore}%`,
      change: averageMatchScore >= 80 ? 3.1 : -1.4,
      icon: 'Award',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'interviews',
      title: 'Interviews Selected',
      value: countByStatus('interview'),
      change: job.interviewCount > 0 ? 2.4 : 0,
      icon: 'Calendar',
      color: 'bg-slate-100 text-slate-700',
    },
  ];

  const pipelineStages: PipelineStage[] = pipelineStatusConfig.map((stage) => ({
    ...stage,
    count: countByStatus(stage.id),
  }));

  const topCandidate = getRecommendedCandidatesForJob(job.id)[0];

  const smartAlertsData: Alert[] = [
    topCandidate
      ? {
          id: `${job.id}-top-candidate`,
          title: 'Review strongest demo match',
          message: `${topCandidate.name} has a ${topCandidate.matchScore}% explained demo match for ${job.title}.`,
          time: '10m ago',
          priority: 'high',
          read: false,
        }
      : {
          id: `${job.id}-no-candidates`,
          title: 'No candidate applications yet',
          message: `${job.title} has no demo applications ready for review.`,
          time: 'Now',
          priority: 'low',
          read: false,
        },
    {
      id: `${job.id}-review-queue`,
      title: 'Recruiter review queue',
      message: `${needsReviewCount} ${job.title} demo applications are waiting for manual recruiter review.`,
      time: '1h ago',
      priority: needsReviewCount > 0 ? 'medium' : 'low',
      read: false,
    },
    {
      id: `${job.id}-interview-context`,
      title: 'Interview selection remains manual',
      message: `${job.interviewCount} candidates are marked for interview context. No automatic scheduling is active.`,
      time: '2h ago',
      priority: job.interviewCount > 0 ? 'medium' : 'low',
      read: true,
    },
  ];

  const recentActivityData: ActivityItem[] = [
    topCandidate
      ? {
          id: `${job.id}-activity-top`,
          title: `${topCandidate.name} surfaced as a strong fit`,
          description: `Demo explanation is scoped to the ${job.title} job context.`,
          time: '18m ago',
          tone: 'green',
        }
      : {
          id: `${job.id}-activity-empty`,
          title: `${job.title} candidate pool is empty`,
          description: 'Upload context is ready, but no real resume processing exists yet.',
          time: 'Today',
          tone: 'slate',
        },
    {
      id: `${job.id}-activity-review`,
      title: `${needsReviewCount} applications need review`,
      description: 'Pending review means the recruiter has not manually reviewed them yet.',
      time: '54m ago',
      tone: needsReviewCount > 0 ? 'amber' : 'slate',
    },
    {
      id: `${job.id}-activity-job`,
      title: `${job.title} profile updated`,
      description: `${job.department} criteria were last updated in demo data.`,
      time: activeJobContext.updatedAt,
      tone: 'blue',
    },
    {
      id: `${job.id}-activity-reports`,
      title: 'Reports remain demo-only',
      description: 'Structured exports need backend integration in a later phase.',
      time: 'Yesterday',
      tone: 'slate',
    },
  ];

  const quickActionsData: QuickAction[] = [
    {
      id: 'upload-resumes',
      title: 'Upload resumes',
      description: `Add resumes to the ${job.title} demo queue.`,
      icon: 'Upload',
      href: `/jobs/${job.id}/upload`,
      availability: 'available',
    },
    {
      id: 'review-candidates',
      title: 'Review candidates',
      description: `Open ${job.title} applications and explanations.`,
      icon: 'Users',
      href: `/jobs/${job.id}/candidates`,
      availability: 'available',
    },
    {
      id: 'manage-job',
      title: 'Manage job',
      description: 'View job profile, criteria, and local demo context.',
      icon: 'Briefcase',
      href: `/jobs/${job.id}`,
      availability: 'available',
    },
    {
      id: 'view-reports',
      title: 'Reports',
      description: 'Job-scoped reports are coming in a later phase.',
      icon: 'BarChart2',
      availability: 'phase-5',
    },
  ];

  return {
    activeJobContext,
    kpiData,
    pipelineStages,
    smartAlertsData,
    recentActivityData,
    quickActionsData,
    recommendedCandidates: getRecommendedCandidatesForJob(job.id),
  };
}

const defaultDashboardData = getDashboardDataForJob(DEFAULT_JOB_ID);

export const activeJobContext = defaultDashboardData.activeJobContext;
export const kpiData = defaultDashboardData.kpiData;
export const pipelineStages = defaultDashboardData.pipelineStages;
export const smartAlertsData = defaultDashboardData.smartAlertsData;
export const recentActivityData = defaultDashboardData.recentActivityData;
export const quickActionsData = defaultDashboardData.quickActionsData;
