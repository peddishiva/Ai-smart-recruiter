import {
  BarChart2,
  Briefcase,
  CalendarDays,
  FileText,
  Home,
  Upload,
  Users,
  type LucideIcon,
} from 'lucide-react';

interface BaseNavItem {
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface PrimaryNavItem extends BaseNavItem {
  href: string;
}

export interface FutureNavItem extends BaseNavItem {
  href?: string;
  phase: string;
}

export const topLevelNavItems: PrimaryNavItem[] = [
  {
    name: 'Jobs',
    description: 'Create and manage openings',
    href: '/jobs',
    icon: Briefcase,
  },
  {
    name: 'Demo Reports',
    description: 'Existing reports demo',
    href: '/reports',
    icon: BarChart2,
  },
];

export const getJobWorkspaceNavItems = (jobId: string): PrimaryNavItem[] => [
  {
    name: 'Overview',
    description: 'Job-scoped dashboard',
    href: `/jobs/${jobId}/dashboard`,
    icon: Home,
  },
  {
    name: 'Candidates',
    description: 'Applications for this job',
    href: `/jobs/${jobId}/candidates`,
    icon: Users,
  },
  {
    name: 'Upload Resumes',
    description: 'Queue resumes for this job',
    href: `/jobs/${jobId}/upload`,
    icon: Upload,
  },
];

export const futureNavItems: FutureNavItem[] = [
  {
    name: 'Interviews',
    description: 'Manual interview selection and scheduling',
    phase: 'Phase 5',
    icon: CalendarDays,
  },
  {
    name: 'Analytics',
    description: 'Job-scoped recruiting trends',
    phase: 'Phase 5',
    icon: BarChart2,
  },
  {
    name: 'Job Reports',
    description: 'Structured job-scoped exports',
    phase: 'Phase 5',
    icon: FileText,
  },
];
