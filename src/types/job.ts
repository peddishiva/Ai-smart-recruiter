export type JobStatus = 'draft' | 'open' | 'paused' | 'closed';

export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship';

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
  description: string;
  responsibilities: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  experienceRequirement: string;
  educationRequirement: string;
  certifications: string[];
  otherCriteria: string[];
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  candidateCount: number;
  shortlistedCount: number;
  interviewCount: number;
}

export interface JobFormValues {
  title: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
  description: string;
  responsibilities: string;
  requiredSkills: string;
  preferredSkills: string;
  experienceRequirement: string;
  educationRequirement: string;
  certifications: string;
  otherCriteria: string;
  status: JobStatus;
}
