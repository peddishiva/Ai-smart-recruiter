'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  Loader2,
  RefreshCw,
  Trash2,
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
import type { Job, ProcessingStageId, UploadQueueItem, UploadQueueStatus } from '@/types';
import JobWorkspaceNav from '@/features/jobs/components/JobWorkspaceNav';
import { useDemoApplications } from './DemoApplicationProvider';
import {
  canRetryUploadItem,
  createDemoApplicationRecord,
  createUploadQueueItem,
  processingStages,
  shouldSimulateProcessingFailure,
} from '../utils/demoResumeProcessor';
import { getUploadQueueDuplicateKeys } from '../utils/fileValidation';

interface UploadResumesWorkspaceProps {
  job: Job;
  legacy?: boolean;
}

const activeProcessingStatuses: UploadQueueStatus[] = [
  'queued',
  'uploading',
  'validating',
  'parsing',
  'analyzing',
  'matching',
];

const statusLabels: Record<UploadQueueStatus, string> = {
  queued: 'Queued',
  uploading: 'Uploading',
  validating: 'Validating',
  parsing: 'Parsing',
  analyzing: 'Analyzing',
  matching: 'Matching',
  completed: 'Completed',
  failed: 'Failed',
};

const statusBadgeVariants: Record<
  UploadQueueStatus,
  'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'demo'
> = {
  queued: 'neutral',
  uploading: 'primary',
  validating: 'primary',
  parsing: 'demo',
  analyzing: 'demo',
  matching: 'warning',
  completed: 'success',
  failed: 'danger',
};

const stageLabels: Record<ProcessingStageId, string> = processingStages.reduce(
  (labels, stage) => ({
    ...labels,
    [stage.id]: stage.label,
  }),
  {} as Record<ProcessingStageId, string>
);

export default function UploadResumesWorkspace({
  job,
  legacy = false,
}: UploadResumesWorkspaceProps) {
  const [dragActive, setDragActive] = useState(false);
  const [queueItems, setQueueItems] = useState<UploadQueueItem[]>([]);
  const queueItemsRef = useRef<UploadQueueItem[]>([]);
  const timersRef = useRef<Map<string, number[]>>(new Map());
  const { addApplication } = useDemoApplications();
  const candidatesHref = legacy ? '/candidates' : `/jobs/${job.id}/candidates`;

  useEffect(() => {
    queueItemsRef.current = queueItems;
  }, [queueItems]);

  const clearItemTimers = useCallback((itemId: string) => {
    const timers = timersRef.current.get(itemId) ?? [];
    timers.forEach((timer) => window.clearTimeout(timer));
    timersRef.current.delete(itemId);
  }, []);

  useEffect(
    () => () => {
      timersRef.current.forEach((timers) => {
        timers.forEach((timer) => window.clearTimeout(timer));
      });
      timersRef.current.clear();
    },
    []
  );

  const processItem = useCallback(
    (itemId: string) => {
      const queuedItem = queueItemsRef.current.find((item) => item.id === itemId);

      if (!queuedItem || queuedItem.status !== 'queued' || timersRef.current.has(itemId)) {
        return;
      }

      const timers: number[] = [];
      timersRef.current.set(itemId, timers);

      processingStages.forEach((stage, index) => {
        const timer = window.setTimeout(() => {
          const currentItem = queueItemsRef.current.find((item) => item.id === itemId);

          if (!currentItem || !activeProcessingStatuses.includes(currentItem.status)) {
            return;
          }

          if (stage.id === 'parse' && shouldSimulateProcessingFailure(currentItem)) {
            setQueueItems((current) =>
              current.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      status: 'failed',
                      progress: stage.progress,
                      currentStage: stage.id,
                      error:
                        'Demo parsing failure. File names containing "fail", "broken", or "corrupt" simulate a recoverable processing error.',
                      errorKind: 'processing',
                      updatedAt: new Date().toISOString(),
                    }
                  : item
              )
            );
            clearItemTimers(itemId);
            return;
          }

          if (stage.id === 'complete') {
            if (currentItem.fileType === 'unknown') {
              return;
            }

            const application = createDemoApplicationRecord(currentItem, job);
            addApplication(application);
            setQueueItems((current) =>
              current.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      status: 'completed',
                      progress: 100,
                      currentStage: 'complete',
                      candidateId: application.candidate.id,
                      applicationId: application.applicationId,
                      error: undefined,
                      errorKind: undefined,
                      completedAt: application.createdAt,
                      updatedAt: application.createdAt,
                    }
                  : item
              )
            );
            clearItemTimers(itemId);
            return;
          }

          setQueueItems((current) =>
            current.map((item) =>
              item.id === itemId
                ? {
                    ...item,
                    status: stage.status,
                    progress: stage.progress,
                    currentStage: stage.id,
                    updatedAt: new Date().toISOString(),
                  }
                : item
            )
          );
        }, 250 + index * 520);

        timers.push(timer);
      });
    },
    [addApplication, clearItemTimers, job]
  );

  useEffect(() => {
    queueItems.forEach((item) => {
      if (item.status === 'queued') {
        processItem(item.id);
      }
    });
  }, [processItem, queueItems]);

  const queueStats = useMemo(() => {
    return queueItems.reduce(
      (stats, item) => ({
        total: stats.total + 1,
        processing:
          stats.processing + (activeProcessingStatuses.includes(item.status) ? 1 : 0),
        completed: stats.completed + (item.status === 'completed' ? 1 : 0),
        failed: stats.failed + (item.status === 'failed' ? 1 : 0),
      }),
      { total: 0, processing: 0, completed: 0, failed: 0 }
    );
  }, [queueItems]);

  const hasCompletedUploads = queueStats.completed > 0;

  const handleDrag = (event: DragEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.type === 'dragenter' || event.type === 'dragover') {
      setDragActive(true);
    } else if (event.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (event: DragEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    if (event.dataTransfer.files.length > 0) {
      handleFiles(event.dataTransfer.files);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleFiles(event.target.files);
      event.target.value = '';
    }
  };

  const handleFiles = (files: FileList) => {
    const selectedFiles = Array.from(files);

    if (selectedFiles.length === 0) {
      return;
    }

    setQueueItems((current) => {
      const duplicateKeys = getUploadQueueDuplicateKeys(current);
      const newItems = selectedFiles.map((file) => {
        const item = createUploadQueueItem(file, job.id, duplicateKeys);
        duplicateKeys.add(item.fileKey);
        return item;
      });

      return [...current, ...newItems];
    });
  };

  const retryItem = (itemId: string) => {
    const item = queueItemsRef.current.find((queueItem) => queueItem.id === itemId);

    if (!item || !canRetryUploadItem(item)) {
      return;
    }

    clearItemTimers(itemId);
    setQueueItems((current) =>
      current.map((queueItem) =>
        queueItem.id === itemId
          ? {
              ...queueItem,
              status: 'queued',
              progress: 4,
              currentStage: 'upload',
              error: undefined,
              errorKind: undefined,
              retryCount: queueItem.retryCount + 1,
              updatedAt: new Date().toISOString(),
            }
          : queueItem
      )
    );
  };

  const removeItem = (itemId: string) => {
    const item = queueItemsRef.current.find((queueItem) => queueItem.id === itemId);

    if (!item || (item.status !== 'queued' && item.status !== 'failed')) {
      return;
    }

    clearItemTimers(itemId);
    setQueueItems((current) => current.filter((queueItem) => queueItem.id !== itemId));
  };

  const clearCompleted = () => {
    queueItems
      .filter((item) => item.status === 'completed')
      .forEach((item) => clearItemTimers(item.id));
    setQueueItems((current) => current.filter((item) => item.status !== 'completed'));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-6 px-4 pb-8 pt-6 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Resume upload"
          title="Upload Resumes"
          description={`Add demo resume files to the ${job.title} application queue. Phase 4 simulates processing in browser state only; no parser, AI model, API, or backend is called.`}
          actions={
            <Button
              href={candidatesHref}
              variant={hasCompletedUploads ? 'primary' : 'secondary'}
              icon={<Eye className="h-4 w-4" aria-hidden="true" />}
            >
              View Candidates
            </Button>
          }
        />

        {!legacy && <JobWorkspaceNav job={job} current="upload" />}

        <Card>
          <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="primary">Active job</Badge>
                <span className="text-sm font-semibold text-slate-950">{job.title}</span>
                <Badge variant="demo">Demo Mode</Badge>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Files are scoped to this job and processed locally for workflow demonstration.
                Completed records appear in Candidates during this browser session only.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4 lg:min-w-[460px]">
              <QueueStat label="Total" value={queueStats.total} />
              <QueueStat label="Processing" value={queueStats.processing} />
              <QueueStat label="Completed" value={queueStats.completed} />
              <QueueStat label="Failed" value={queueStats.failed} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Processing Model</CardTitle>
            <CardDescription>
              Demo stages are shown explicitly so future backend workers can replace the local
              timer implementation without changing the recruiter workflow.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
              {processingStages.map((stage) => (
                <li
                  key={stage.id}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-3"
                >
                  <p className="text-sm font-semibold text-slate-950">{stage.label}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{stage.description}</p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resume Files</CardTitle>
            <CardDescription>
              Queue PDF, DOC, or DOCX files up to 10 MB. Invalid files stay visible with their
              reason.
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
                    className="cursor-pointer rounded-lg text-sm font-semibold text-blue-700 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    Click to upload
                  </label>
                  <span className="text-sm text-slate-600"> or drag and drop</span>
                  <p className="text-sm text-slate-500">
                    Demo Mode: local queue only. Try a filename containing fail to simulate a
                    recoverable processing error.
                  </p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Job-Scoped Demo Queue ({queueItems.length})</CardTitle>
                <CardDescription>
                  Queue state is local to this browser session and active job.
                </CardDescription>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  href={candidatesHref}
                  variant={hasCompletedUploads ? 'primary' : 'muted'}
                  size="sm"
                  disabled={!hasCompletedUploads}
                  icon={<Eye className="h-4 w-4" aria-hidden="true" />}
                >
                  View completed
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={queueStats.completed === 0}
                  onClick={clearCompleted}
                >
                  Clear completed
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="sr-only" aria-live="polite">
              Queue summary: {queueStats.processing} processing, {queueStats.completed} completed,
              {queueStats.failed} failed.
            </p>
            {queueItems.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                <Clock3 className="mx-auto h-8 w-8 text-slate-400" aria-hidden="true" />
                <p className="mt-3 text-sm font-semibold text-slate-950">
                  No files in this job queue
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Add resumes above to see validation, processing stages, and demo application
                  creation.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {queueItems.map((item) => (
                  <QueueItemRow
                    key={item.id}
                    item={item}
                    onRetry={() => retryItem(item.id)}
                    onRemove={() => removeItem(item.id)}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function QueueStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-bold text-slate-950">{value}</p>
    </div>
  );
}

function QueueItemRow({
  item,
  onRetry,
  onRemove,
}: {
  item: UploadQueueItem;
  onRetry: () => void;
  onRemove: () => void;
}) {
  const canRetry = canRetryUploadItem(item);
  const canRemove = item.status === 'queued' || item.status === 'failed';
  const isActive = activeProcessingStatuses.includes(item.status);

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 flex-1 gap-3">
          <FileText className="mt-1 h-7 w-7 flex-shrink-0 text-blue-500" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="max-w-full truncate text-sm font-semibold text-slate-950">
                {item.fileName}
              </h3>
              <Badge variant={statusBadgeVariants[item.status]}>{statusLabels[item.status]}</Badge>
              {item.fileType !== 'unknown' && (
                <Badge variant="neutral">{item.fileType.toUpperCase()}</Badge>
              )}
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {item.fileSizeLabel} | Application ID: {item.applicationId ?? 'created after match'}
            </p>
            <div className="mt-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Current stage: {stageLabels[item.currentStage]}
                </p>
                <p className="text-xs text-slate-500">{item.progress}%</p>
              </div>
              <div
                className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
                aria-label={`${item.fileName} demo processing progress`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={item.progress}
              >
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    item.status === 'failed' ? 'bg-red-500' : 'bg-blue-600'
                  }`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>

            {item.error && (
              <div className="mt-3 flex gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <p>{item.error}</p>
              </div>
            )}

            {item.status === 'completed' && (
              <div className="mt-3 flex gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <p>
                  Demo application created for this active job. Candidate ID:{' '}
                  <span className="font-semibold">{item.candidateId}</span>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
          <StatusIcon status={item.status} isActive={isActive} />
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={onRetry}
              disabled={!canRetry}
              icon={<RefreshCw className="h-4 w-4" aria-hidden="true" />}
            >
              Retry
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              disabled={!canRemove}
              aria-label={`Remove ${item.fileName} from queue`}
              icon={<Trash2 className="h-4 w-4" aria-hidden="true" />}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

function StatusIcon({ status, isActive }: { status: UploadQueueStatus; isActive: boolean }) {
  if (status === 'completed') {
    return (
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
        Ready for Candidates
      </span>
    );
  }

  if (status === 'failed') {
    return (
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-red-700">
        <XCircle className="h-4 w-4" aria-hidden="true" />
        Needs attention
      </span>
    );
  }

  if (isActive) {
    return (
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        Demo processing
      </span>
    );
  }

  return null;
}
