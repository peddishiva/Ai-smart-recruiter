import {
  BarChart2,
  Briefcase,
  CalendarDays,
  FileText,
  Home,
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

export const primaryNavItems: PrimaryNavItem[] = [
  {
    name: 'Overview',
    description: 'Recruiter dashboard',
    href: '/',
    icon: Home,
  },
  {
    name: 'Candidates',
    description: 'Candidate list and analysis',
    href: '/candidates',
    icon: Users,
  },
  {
    name: 'Upload Resumes',
    description: 'Demo upload queue',
    href: '/upload-resumes',
    icon: FileText,
  },
  {
    name: 'Reports',
    description: 'Demo analytics',
    href: '/reports',
    icon: BarChart2,
  },
];

export const futureNavItems: FutureNavItem[] = [
  {
    name: 'Jobs',
    description: 'Job setup and selection',
    phase: 'Phase 3',
    icon: Briefcase,
  },
  {
    name: 'Interviews',
    description: 'Interview workflow',
    phase: 'Phase 4',
    icon: CalendarDays,
  },
];
