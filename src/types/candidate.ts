import type { MatchAnalysis } from './match';

export type CandidateStatus =
  | 'new'
  | 'reviewing'
  | 'shortlisted'
  | 'rejected'
  | 'interview'
  | 'hired';

export interface Candidate {
  id: string;
  jobId: string;
  name: string;
  role: string;
  location: string;
  experienceYears: number;
  experienceSummary: string;
  education: string;
  skills: string[];
  status: CandidateStatus;
  matchScore: number;
  addedAt: string;
  addedAtLabel: string;
  lastActivity: string;
  resumeSummary: string;
  matchAnalysis: MatchAnalysis;
}
