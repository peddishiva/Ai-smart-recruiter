import { Badge } from '@/components/ui';
import type { JobStatus } from '@/types';
import { jobStatusLabels } from '@/data/demo';

interface JobStatusBadgeProps {
  status: JobStatus;
}

const statusVariants: Record<JobStatus, 'neutral' | 'primary' | 'success' | 'warning'> = {
  draft: 'neutral',
  open: 'success',
  paused: 'warning',
  closed: 'neutral',
};

export default function JobStatusBadge({ status }: JobStatusBadgeProps) {
  return <Badge variant={statusVariants[status]}>{jobStatusLabels[status]}</Badge>;
}
