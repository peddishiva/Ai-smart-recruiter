import type { Job, JobStatus } from '@/types';

export const DEFAULT_JOB_ID = 'frontend-developer';

export const demoJobs: Job[] = [
  {
    id: DEFAULT_JOB_ID,
    title: 'Frontend Developer',
    department: 'Product Engineering',
    location: 'Remote / Bengaluru',
    employmentType: 'full-time',
    description:
      'Build recruiter-facing product workflows with React, TypeScript, and Next.js, with an emphasis on accessible dashboards and explainable decision support.',
    responsibilities: [
      'Own reusable frontend architecture for recruiter workflows.',
      'Build accessible dashboard, candidate review, and reporting surfaces.',
      'Partner with product and design on workflow clarity and review ergonomics.',
      'Improve testing, performance, and component quality across the app.',
    ],
    requiredSkills: ['React', 'TypeScript', 'Next.js', 'Testing', 'Accessibility'],
    preferredSkills: ['Design Systems', 'GraphQL', 'AWS', 'Analytics'],
    experienceRequirement: '5+ years building production frontend applications.',
    educationRequirement: "Bachelor's degree in Computer Science or equivalent experience.",
    certifications: [],
    otherCriteria: ['Experience with data-heavy SaaS workflows is preferred.'],
    status: 'open',
    createdAt: '2026-08-12',
    updatedAt: '2026-08-23',
    candidateCount: 16,
    shortlistedCount: 3,
    interviewCount: 2,
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    department: 'Platform Engineering',
    location: 'Hybrid / Hyderabad',
    employmentType: 'full-time',
    description:
      'Design and maintain secure backend services for resume ingestion, candidate workflows, reporting, and future matching integrations.',
    responsibilities: [
      'Build reliable service boundaries for recruiting workflows.',
      'Model job-scoped application data and candidate review state.',
      'Improve observability, background jobs, and API reliability.',
      'Partner with frontend engineers on clear contracts and error states.',
    ],
    requiredSkills: ['Node.js', 'PostgreSQL', 'APIs', 'Docker', 'Observability'],
    preferredSkills: ['AWS', 'Queue workers', 'Security reviews', 'TypeScript'],
    experienceRequirement: '4+ years building backend services and production APIs.',
    educationRequirement: "Bachelor's degree or equivalent backend engineering experience.",
    certifications: ['AWS Associate preferred'],
    otherCriteria: ['Experience with asynchronous processing is useful for future resume pipelines.'],
    status: 'open',
    createdAt: '2026-08-14',
    updatedAt: '2026-08-22',
    candidateCount: 4,
    shortlistedCount: 1,
    interviewCount: 1,
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    department: 'People Analytics',
    location: 'Remote / Mumbai',
    employmentType: 'contract',
    description:
      'Create recruitment analytics and structured reporting that help hiring teams understand pipeline quality, skills coverage, and review progress.',
    responsibilities: [
      'Build hiring funnel and pipeline quality dashboards.',
      'Analyze candidate stage movement and recruiter review patterns.',
      'Prepare structured reports for recruiting leadership.',
      'Partner with operations teams on data quality and definitions.',
    ],
    requiredSkills: ['SQL', 'Data Visualization', 'Excel', 'Recruiting Analytics'],
    preferredSkills: ['Python', 'Tableau', 'Experimentation', 'Stakeholder communication'],
    experienceRequirement: '3+ years in analytics, reporting, or operations intelligence.',
    educationRequirement: "Bachelor's degree in analytics, statistics, business, or equivalent experience.",
    certifications: [],
    otherCriteria: ['Comfort explaining metrics to non-technical hiring stakeholders.'],
    status: 'paused',
    createdAt: '2026-08-16',
    updatedAt: '2026-08-21',
    candidateCount: 3,
    shortlistedCount: 1,
    interviewCount: 0,
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'On-site / Pune',
    employmentType: 'full-time',
    description:
      'Support deployment, monitoring, and infrastructure reliability for the recruiting platform as it moves toward backend and AI integration.',
    responsibilities: [
      'Own CI/CD, deployment reliability, and runtime observability.',
      'Support infrastructure planning for background processing and storage.',
      'Improve incident readiness and operational documentation.',
      'Partner with engineering on secure environment configuration.',
    ],
    requiredSkills: ['AWS', 'Docker', 'CI/CD', 'Monitoring', 'Terraform'],
    preferredSkills: ['Kubernetes', 'Security', 'Cost optimization', 'Node.js'],
    experienceRequirement: '4+ years operating cloud-hosted production systems.',
    educationRequirement: "Bachelor's degree or equivalent infrastructure experience.",
    certifications: ['AWS Professional or Kubernetes certification preferred'],
    otherCriteria: ['Experience supporting regulated or high-availability SaaS systems.'],
    status: 'draft',
    createdAt: '2026-08-18',
    updatedAt: '2026-08-20',
    candidateCount: 3,
    shortlistedCount: 1,
    interviewCount: 0,
  },
];

export const jobStatusLabels: Record<JobStatus, string> = {
  draft: 'Draft',
  open: 'Open',
  paused: 'Paused',
  closed: 'Closed',
};

export function getJobById(jobId: string): Job | undefined {
  return demoJobs.find((job) => job.id === jobId);
}

export function getDefaultJob(): Job {
  return demoJobs.find((job) => job.id === DEFAULT_JOB_ID) ?? demoJobs[0];
}

export function formatEmploymentType(type: Job['employmentType']) {
  return type
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
