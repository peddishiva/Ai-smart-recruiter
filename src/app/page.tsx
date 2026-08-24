import { DEFAULT_JOB_ID } from '@/data/demo';
import DashboardWorkspace from '@/features/dashboard/components/DashboardWorkspace';

export default function DashboardPage() {
  return <DashboardWorkspace jobId={DEFAULT_JOB_ID} legacy />;
}
