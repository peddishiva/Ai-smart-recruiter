import { DEFAULT_JOB_ID, getJobById } from '@/data/demo';
import UploadResumesWorkspace from '@/features/uploads/components/UploadResumesWorkspace';

export default function UploadResumesPage() {
  const job = getJobById(DEFAULT_JOB_ID);

  if (!job) {
    return null;
  }

  return <UploadResumesWorkspace job={job} legacy />;
}
