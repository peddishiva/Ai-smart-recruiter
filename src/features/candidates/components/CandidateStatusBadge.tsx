import { Badge } from '@/components/ui';
import type { CandidateStatus } from '@/types';
import { candidateStatusLabels } from '../utils/candidateFilters';

interface CandidateStatusBadgeProps {
  status: CandidateStatus;
}

const statusVariants: Record<
  CandidateStatus,
  'neutral' | 'primary' | 'success' | 'warning' | 'danger'
> = {
  new: 'primary',
  reviewing: 'warning',
  shortlisted: 'success',
  rejected: 'danger',
  interview: 'neutral',
  hired: 'success',
};

export default function CandidateStatusBadge({ status }: CandidateStatusBadgeProps) {
  return (
    <Badge variant={statusVariants[status]} aria-label={`Candidate status: ${candidateStatusLabels[status]}`}>
      {candidateStatusLabels[status]}
    </Badge>
  );
}
