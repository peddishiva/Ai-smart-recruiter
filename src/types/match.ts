export type MatchScoreLabel =
  | 'Strong Match'
  | 'Good Match'
  | 'Potential Match'
  | 'Weak Match';

export type ScoreBreakdownCategory =
  | 'skills'
  | 'experience'
  | 'education'
  | 'domain'
  | 'delivery';

export interface ScoreBreakdown {
  id: ScoreBreakdownCategory;
  label: string;
  score: number;
  maxScore: number;
  description: string;
}

export type EvidenceCategory =
  | 'skills'
  | 'experience'
  | 'education'
  | 'impact'
  | 'risk';

export interface EvidenceItem {
  id: string;
  category: EvidenceCategory;
  title: string;
  detail: string;
}

export interface CandidateRecommendation {
  decision: 'technical-interview' | 'recruiter-screen' | 'hold' | 'reject';
  title: string;
  reason: string;
  nextStep: string;
}

export interface MatchAnalysis {
  summary: string;
  requiredSkillsMatched: number;
  requiredSkillsTotal: number;
  scoreBreakdown: ScoreBreakdown[];
  matchedSkills: string[];
  missingSkills: string[];
  weakerAreas: string[];
  strengths: string[];
  gaps: string[];
  evidence: EvidenceItem[];
  recommendation: CandidateRecommendation;
}
