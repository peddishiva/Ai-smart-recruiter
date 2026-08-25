import type {
  UploadFileType,
  UploadQueueErrorKind,
  UploadQueueItem,
} from '@/types';

export const MAX_RESUME_UPLOAD_BYTES = 10 * 1024 * 1024;
export const ALLOWED_RESUME_FILE_TYPES: UploadFileType[] = ['pdf', 'doc', 'docx'];

interface ResumeValidationFailure {
  valid: false;
  error: string;
  errorKind: UploadQueueErrorKind;
  fileType: UploadFileType | 'unknown';
}

interface ResumeValidationSuccess {
  valid: true;
  fileType: UploadFileType;
}

export type ResumeValidationResult = ResumeValidationSuccess | ResumeValidationFailure;

export function formatFileSize(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return '0 KB';
  }

  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  return `${(bytes / 1024).toFixed(2)} KB`;
}

export function getFileExtension(fileName: string) {
  const extension = fileName.split('.').pop();
  return extension?.toLowerCase() ?? '';
}

export function getResumeFileType(fileName: string): UploadFileType | 'unknown' {
  const extension = getFileExtension(fileName);

  return ALLOWED_RESUME_FILE_TYPES.includes(extension as UploadFileType)
    ? (extension as UploadFileType)
    : 'unknown';
}

export function getResumeFileKey(file: Pick<File, 'name' | 'size' | 'lastModified'>) {
  return `${file.name.trim().toLowerCase()}-${file.size}-${file.lastModified}`;
}

export function validateResumeFile(
  file: File,
  duplicateKeys: Set<string>
): ResumeValidationResult {
  const fileType = getResumeFileType(file.name);

  if (!file.name.trim() || file.size <= 0) {
    return {
      valid: false,
      fileType,
      error: 'This file is empty or invalid. Choose a PDF, DOC, or DOCX resume.',
      errorKind: 'invalid-file',
    };
  }

  if (duplicateKeys.has(getResumeFileKey(file))) {
    return {
      valid: false,
      fileType,
      error: 'Duplicate in this browser queue. Remove the existing item before adding it again.',
      errorKind: 'duplicate',
    };
  }

  if (fileType === 'unknown') {
    return {
      valid: false,
      fileType,
      error: 'Unsupported file type. Use PDF, DOC, or DOCX for the demo queue.',
      errorKind: 'unsupported-type',
    };
  }

  if (file.size > MAX_RESUME_UPLOAD_BYTES) {
    return {
      valid: false,
      fileType,
      error: 'File exceeds the 10 MB demo limit.',
      errorKind: 'too-large',
    };
  }

  return {
    valid: true,
    fileType,
  };
}

export function getUploadQueueDuplicateKeys(items: UploadQueueItem[]) {
  return new Set(items.map((item) => item.fileKey));
}
