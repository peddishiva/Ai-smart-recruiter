import { DEFAULT_JOB_ID, getCandidatesForJob, getJobById } from '@/data/demo';
import CandidatesWorkspace from '@/features/candidates/components/CandidatesWorkspace';

export default function CandidatesPage() {
  const job = getJobById(DEFAULT_JOB_ID);

  if (!job) {
    return null;
  }

  return (
    <CandidatesWorkspace
      candidates={getCandidatesForJob(job.id)}
      job={job}
      candidateBaseHref="/candidates"
      uploadHref="/upload-resumes"
      legacy
    />
  );
}
