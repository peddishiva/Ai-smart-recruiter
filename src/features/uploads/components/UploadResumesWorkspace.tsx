'use client';

import { useState } from 'react';
import {
  CheckCircle,
  FileText,
  Upload,
  XCircle,
} from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  PageHeader,
} from '@/components/ui';
import type { Job } from '@/types';
import JobWorkspaceNav from '@/features/jobs/components/JobWorkspaceNav';

interface UploadResumesWorkspaceProps {
  job: Job;
  legacy?: boolean;
}

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  status: 'queued' | 'error';
  errorReason?: string;
}

const maxUploadBytes = 10 * 1024 * 1024;
const allowedExtensions = ['pdf', 'doc', 'docx'];

const formatFileSize = (bytes: number) => {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  return `${(bytes / 1024).toFixed(2)} KB`;
};

const getFileExtension = (fileName: string) => {
  const extension = fileName.split('.').pop();
  return extension?.toLowerCase() ?? '';
};

const getUploadError = (file: File) => {
  if (!allowedExtensions.includes(getFileExtension(file.name))) {
    return 'Only PDF, DOC, or DOCX files can be queued.';
  }

  if (file.size > maxUploadBytes) {
    return 'File exceeds the 10 MB demo limit.';
  }

  return undefined;
};

export default function UploadResumesWorkspace({
  job,
  legacy = false,
}: UploadResumesWorkspaceProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const candidatesHref = legacy ? '/candidates' : `/jobs/${job.id}/candidates`;

  const handleDrag = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.type === 'dragenter' || event.type === 'dragover') {
      setDragActive(true);
    } else if (event.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      handleFiles(event.dataTransfer.files);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (event.target.files && event.target.files[0]) {
      handleFiles(event.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files).map((file) => {
      const errorReason = getUploadError(file);

      return {
        id: `${file.name}-${file.size}-${file.lastModified}`,
        name: file.name,
        size: formatFileSize(file.size),
        status: errorReason ? ('error' as const) : ('queued' as const),
        errorReason,
      };
    });

    setUploadedFiles((current) => [...current, ...newFiles]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-6 px-4 pb-8 pt-6 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Resume upload"
          title="Upload Resumes"
          description={`Add demo resume files to the ${job.title} application queue. Phase 3 establishes job context only; real parsing and matching are not implemented.`}
          actions={
            <Button href={candidatesHref} variant="secondary">
              View Candidates
            </Button>
          }
        />

        {!legacy && <JobWorkspaceNav job={job} current="upload" />}

        <Card>
          <CardContent className="grid gap-4 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="primary">Active job</Badge>
                <span className="text-sm font-semibold text-slate-950">{job.title}</span>
                <Badge variant="demo">Demo queue</Badge>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Uploaded files are associated with this one job context. They are not parsed,
                matched, scored, or persisted in Phase 3.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Candidates
                </p>
                <p className="mt-1 text-xl font-bold text-slate-950">{job.candidateCount}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Shortlist
                </p>
                <p className="mt-1 text-xl font-bold text-slate-950">{job.shortlistedCount}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Files
                </p>
                <p className="mt-1 text-xl font-bold text-slate-950">{uploadedFiles.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resume Files</CardTitle>
            <CardDescription>
              Demo-only queue for validating the job-scoped upload experience.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className="space-y-6"
            >
              <div
                className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-colors focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 sm:p-12 ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-300 bg-slate-50 hover:border-slate-400'
                }`}
              >
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                  className="sr-only"
                  aria-label="Choose resume files for the local demo queue"
                />

                <Upload className="mx-auto mb-4 h-12 w-12 text-slate-400" aria-hidden="true" />

                <div className="space-y-2">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer rounded-lg text-sm font-semibold text-blue-700 hover:text-blue-800"
                  >
                    Click to upload
                  </label>
                  <span className="text-sm text-slate-600"> or drag and drop</span>
                  <p className="text-sm text-slate-500">
                    PDF, DOC, DOCX up to 10MB. Files enter a local demo queue only.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-blue-50 p-4 text-center">
                  <p className="text-sm font-medium text-blue-700">Accepted Formats</p>
                  <p className="mt-1 text-2xl font-bold text-blue-800">PDF, DOC</p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-4 text-center">
                  <p className="text-sm font-medium text-emerald-700">Max File Size</p>
                  <p className="mt-1 text-2xl font-bold text-emerald-800">10 MB</p>
                </div>
                <div className="rounded-lg bg-slate-100 p-4 text-center">
                  <p className="text-sm font-medium text-slate-700">Processing</p>
                  <p className="mt-1 text-2xl font-bold text-slate-800">Phase 4</p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {uploadedFiles.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Local Demo Queue ({uploadedFiles.length})</CardTitle>
                  <CardDescription>
                    These files are staged in browser state and are not uploaded to a backend.
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setUploadedFiles([])}>
                  Clear All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <FileText
                        className="h-8 w-8 flex-shrink-0 text-blue-500"
                        aria-hidden="true"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-950">{file.name}</p>
                        <p className="text-xs text-slate-500">{file.size}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {file.status === 'queued' && (
                        <>
                          <CheckCircle className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                          <span className="text-sm font-medium text-emerald-700">
                            Queued locally
                          </span>
                        </>
                      )}
                      {file.status === 'error' && (
                        <>
                          <XCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
                          <span className="text-sm font-medium text-red-600">
                            {file.errorReason ?? 'Not queued'}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
