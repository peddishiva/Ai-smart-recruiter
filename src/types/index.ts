import type { CandidateStatus } from './candidate';

export * from './candidate';
export * from './job';
export * from './match';

export interface KpiData {
  id: string;
  title: string;
  value: string | number;
  change: number;
  icon: string;
  color: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fill?: string;
  [key: string]: string | number | undefined;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
}

export interface ActiveJobContext {
  id: string;
  title: string;
  department: string;
  location: string;
  applicants: number;
  openRoles: number;
  updatedAt: string;
  status: string;
}

export interface RecommendedCandidate {
  id: string;
  jobId: string;
  name: string;
  role: string;
  matchScore: number;
  status: CandidateStatus;
  topSkills: string[];
  gaps: string[];
  summaryReason: string;
  evidence: string;
  lastActivity: string;
}

export interface PipelineStage {
  id: CandidateStatus;
  label: string;
  count: number;
  description: string;
  tone: 'blue' | 'green' | 'amber' | 'red' | 'slate';
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  tone: 'blue' | 'green' | 'amber' | 'slate';
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  href?: string;
  availability: 'available' | 'phase-2' | 'phase-3' | 'phase-4' | 'phase-5';
}
