import type { Candidate, CandidateStatus, MatchScoreLabel } from '@/types';

export type CandidateSortOption = 'highest-match' | 'lowest-match' | 'newest' | 'name';
export type MatchScoreFilter = 'all' | 'strong' | 'good' | 'potential' | 'weak';

export interface CandidateFilterState {
  query: string;
  status: CandidateStatus | 'all';
  match: MatchScoreFilter;
  sort: CandidateSortOption;
}

export const candidateStatusLabels: Record<CandidateStatus, string> = {
  new: 'New',
  reviewing: 'Reviewing',
  shortlisted: 'Shortlisted',
  rejected: 'Rejected',
  interview: 'Interview',
  hired: 'Hired',
};

export const candidateStatusOptions: Array<CandidateStatus | 'all'> = [
  'all',
  'new',
  'reviewing',
  'shortlisted',
  'rejected',
  'interview',
  'hired',
];

export const matchScoreOptions: MatchScoreFilter[] = [
  'all',
  'strong',
  'good',
  'potential',
  'weak',
];

export const sortOptions: CandidateSortOption[] = [
  'highest-match',
  'lowest-match',
  'newest',
  'name',
];

export const matchScoreFilterLabels: Record<MatchScoreFilter, string> = {
  all: 'All scores',
  strong: 'Strong match',
  good: 'Good match',
  potential: 'Potential match',
  weak: 'Weak match',
};

export const sortLabels: Record<CandidateSortOption, string> = {
  'highest-match': 'Highest match',
  'lowest-match': 'Lowest match',
  newest: 'Newest',
  name: 'Name',
};

export function getMatchScoreLabel(score: number): MatchScoreLabel {
  if (score >= 90) {
    return 'Strong Match';
  }

  if (score >= 80) {
    return 'Good Match';
  }

  if (score >= 70) {
    return 'Potential Match';
  }

  return 'Weak Match';
}

export function getMatchScoreKey(score: number): Exclude<MatchScoreFilter, 'all'> {
  if (score >= 90) {
    return 'strong';
  }

  if (score >= 80) {
    return 'good';
  }

  if (score >= 70) {
    return 'potential';
  }

  return 'weak';
}

export function filterCandidates(
  candidates: Candidate[],
  filters: CandidateFilterState
): Candidate[] {
  const normalizedQuery = filters.query.trim().toLowerCase();

  return candidates
    .filter((candidate) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [
          candidate.name,
          candidate.role,
          candidate.location,
          candidate.experienceSummary,
          ...candidate.skills,
          ...candidate.matchAnalysis.matchedSkills,
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesStatus = filters.status === 'all' || candidate.status === filters.status;
      const matchesScore =
        filters.match === 'all' || getMatchScoreKey(candidate.matchScore) === filters.match;

      return matchesQuery && matchesStatus && matchesScore;
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case 'lowest-match':
          return a.matchScore - b.matchScore;
        case 'newest':
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        case 'highest-match':
        default:
          return b.matchScore - a.matchScore;
      }
    });
}

export function hasActiveCandidateFilters(filters: CandidateFilterState) {
  return (
    filters.query.trim().length > 0 ||
    filters.status !== 'all' ||
    filters.match !== 'all' ||
    filters.sort !== 'highest-match'
  );
}
