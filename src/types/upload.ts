import type { Candidate } from './candidate';

export type UploadFileType = 'pdf' | 'doc' | 'docx';

export type UploadQueueStatus =
  | 'queued'
  | 'uploading'
  | 'validating'
  | 'parsing'
  | 'analyzing'
  | 'matching'
  | 'completed'
  | 'failed';

export type ProcessingStageId =
  | 'upload'
  | 'validate'
  | 'extract'
  | 'parse'
  | 'analyze'
  | 'match'
  | 'complete';

export type UploadQueueErrorKind =
  | 'unsupported-type'
  | 'too-large'
  | 'duplicate'
  | 'invalid-file'
  | 'processing';

export interface UploadQueueItem {
  id: string;
  jobId: string;
  fileName: string;
  fileSize: number;
  fileSizeLabel: string;
  fileType: UploadFileType | 'unknown';
  fileKey: string;
  status: UploadQueueStatus;
  progress: number;
  currentStage: ProcessingStageId;
  candidateId?: string;
  applicationId?: string;
  error?: string;
  errorKind?: UploadQueueErrorKind;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  retryCount: number;
}

export interface ProcessingStage {
  id: ProcessingStageId;
  label: string;
  description: string;
  status: Exclude<UploadQueueStatus, 'queued' | 'failed'>;
  progress: number;
}

export interface DemoApplicationRecord {
  applicationId: string;
  jobId: string;
  uploadItemId: string;
  fileName: string;
  fileSize: number;
  fileType: UploadFileType;
  candidate: Candidate;
  createdAt: string;
  source: 'session-upload';
}
