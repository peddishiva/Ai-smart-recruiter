import {
  BarChart2,
  Briefcase,
  CalendarDays,
  FileText,
  Home,
  Users,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  name: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  phase?: string;
}

export const primaryNavItems: NavItem[] = [
  {
    name: 'Overview',
    description: 'Recruiter dashboard',
    href: '/',
    icon: Home,
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

export const futureNavItems: NavItem[] = [
  {
    name: 'Candidates',
    description: 'Candidate list and analysis',
    phase: 'Phase 2',
    icon: Users,
  },
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
