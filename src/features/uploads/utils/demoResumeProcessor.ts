import type {
  Candidate,
  CandidateRecommendation,
  DemoApplicationRecord,
  Job,
  ProcessingStage,
  UploadFileType,
  UploadQueueItem,
} from '@/types';
import { formatFileSize, getResumeFileKey, validateResumeFile } from './fileValidation';

export const processingStages: ProcessingStage[] = [
  {
    id: 'upload',
    label: 'Upload',
    description: 'Add file metadata to browser session state.',
    status: 'uploading',
    progress: 16,
  },
  {
    id: 'validate',
    label: 'Validate',
    description: 'Check file type, size, and current-queue duplicates.',
    status: 'validating',
    progress: 30,
  },
  {
    id: 'extract',
    label: 'Extract',
    description: 'Demo placeholder for future text extraction.',
    status: 'parsing',
    progress: 46,
  },
  {
    id: 'parse',
    label: 'Parse',
    description: 'Demo placeholder for future resume parsing.',
    status: 'parsing',
    progress: 62,
  },
  {
    id: 'analyze',
    label: 'Analyze',
    description: 'Build an explainable demo candidate summary from job criteria.',
    status: 'analyzing',
    progress: 78,
  },
  {
    id: 'match',
    label: 'Match',
    description: 'Create a deterministic demo match analysis for this job only.',
    status: 'matching',
    progress: 92,
  },
  {
    id: 'complete',
    label: 'Complete',
    description: 'Create a browser-session application record.',
    status: 'completed',
    progress: 100,
  },
];

const demoLocations = [
  'Bengaluru, India',
  'Hyderabad, India',
  'Pune, India',
  'Remote',
  'Mumbai, India',
];

const rolePrefixes = ['Senior', 'Product', 'Platform', 'Staff', 'Lead'];

export function createUploadQueueItem(
  file: File,
  jobId: string,
  duplicateKeys: Set<string>
): UploadQueueItem {
  const validation = validateResumeFile(file, duplicateKeys);
  const now = new Date().toISOString();
  const fileType = validation.valid ? validation.fileType : validation.fileType;
  const status = validation.valid ? 'queued' : 'failed';

  return {
    id: `upload-${jobId}-${hashText(`${file.name}-${file.size}-${file.lastModified}-${now}`)}`,
    jobId,
    fileName: file.name,
    fileSize: file.size,
    fileSizeLabel: formatFileSize(file.size),
    fileType,
    fileKey: getResumeFileKey(file),
    status,
    progress: validation.valid ? 4 : 0,
    currentStage: validation.valid ? 'upload' : 'validate',
    error: validation.valid ? undefined : validation.error,
    errorKind: validation.valid ? undefined : validation.errorKind,
    createdAt: now,
    updatedAt: now,
    retryCount: 0,
  };
}

export function shouldSimulateProcessingFailure(item: UploadQueueItem) {
  return item.retryCount === 0 && /(fail|failed|broken|corrupt|parse-error)/i.test(item.fileName);
}

export function canRetryUploadItem(item: UploadQueueItem) {
  return item.status === 'failed' && item.errorKind === 'processing';
}

export function createDemoApplicationRecord(
  item: UploadQueueItem,
  job: Job
): DemoApplicationRecord {
  const now = new Date();
  const createdAt = now.toISOString();
  const baseName = getResumeBaseName(item.fileName);
  const hash = hashText(`${item.jobId}-${item.fileKey}-${item.id}`);
  const candidateId = `session-${item.jobId}-${slugify(baseName)}-${hash}`;
  const applicationId = `app-${item.jobId}-${hash}`;
  const candidateName = toCandidateName(baseName);
  const matchedSkills = selectMatchedSkills(job, item.fileName);
  const missingSkills = job.requiredSkills.filter((skill) => !matchedSkills.includes(skill));
  const matchScore = calculateDemoScore(job, matchedSkills, item.fileName);
  const recommendation = getDemoRecommendation(matchScore);

  const candidate: Candidate = {
    id: candidateId,
    applicationId,
    jobId: item.jobId,
    name: candidateName,
    role: `${rolePrefixes[hashText(baseName) % rolePrefixes.length]} ${job.title}`,
    location: demoLocations[hashText(`${baseName}-location`) % demoLocations.length],
    experienceYears: 3 + (hashText(`${baseName}-experience`) % 7),
    experienceSummary:
      'Demo session candidate created from an uploaded file name and active job criteria.',
    education: 'Demo education placeholder; no resume text was extracted.',
    skills: matchedSkills,
    status: matchScore >= 86 ? 'reviewing' : 'new',
    matchScore,
    addedAt: createdAt.slice(0, 10),
    addedAtLabel: formatDateLabel(now),
    lastActivity: 'Created from local demo upload in this browser session',
    resumeSummary:
      'This is a demo-only candidate summary. The application did not read the resume contents, call a backend, or run an AI model.',
    source: 'session-upload',
    sourceFileName: item.fileName,
    matchAnalysis: {
      summary: `Demo match analysis for ${job.title}. This explanation is generated from the file name, file metadata, and job criteria only; no resume text or AI service was used.`,
      requiredSkillsMatched: job.requiredSkills.length - missingSkills.length,
      requiredSkillsTotal: job.requiredSkills.length,
      scoreBreakdown: [
        {
          id: 'skills',
          label: 'Skills',
          score: Math.min(9, Math.max(4, matchedSkills.length)),
          maxScore: 10,
          description: 'Deterministic demo coverage based on the active job skill list.',
        },
        {
          id: 'experience',
          label: 'Experience',
          score: matchScore >= 86 ? 8 : 6,
          maxScore: 10,
          description: 'Placeholder experience signal for the demo workflow.',
        },
        {
          id: 'education',
          label: 'Education',
          score: 6,
          maxScore: 10,
          description: 'Education is not parsed in Phase 4.',
        },
        {
          id: 'domain',
          label: 'Domain',
          score: matchScore >= 86 ? 8 : 6,
          maxScore: 10,
          description: 'Job-context fit is simulated for architecture demonstration.',
        },
      ],
      matchedSkills,
      missingSkills,
      weakerAreas:
        missingSkills.length > 0
          ? [`Validate real evidence for ${missingSkills.slice(0, 2).join(' and ')} later.`]
          : ['Validate claims after real parsing is implemented.'],
      strengths: [
        `Appears aligned to ${matchedSkills.slice(0, 2).join(' and ')} in this demo scenario.`,
        'Created as a job-scoped application record for workflow testing.',
      ],
      gaps:
        missingSkills.length > 0
          ? [`Missing demo coverage for ${missingSkills.slice(0, 2).join(' and ')}.`]
          : ['No skill gaps are simulated, but real evidence is not available in Phase 4.'],
      evidence: [
        {
          id: `${candidateId}-e1`,
          category: 'skills',
          title: 'Demo skill coverage',
          detail: `The workflow mapped this upload to ${matchedSkills.slice(0, 3).join(', ')} using controlled demo data.`,
        },
        {
          id: `${candidateId}-e2`,
          category: 'experience',
          title: 'Upload source',
          detail: `${item.fileName} was processed as browser-session demo metadata for ${job.title}.`,
        },
        {
          id: `${candidateId}-e3`,
          category: 'risk',
          title: 'No real parsing',
          detail: 'The app did not inspect resume content, call a parser, or call an AI matching service.',
        },
      ],
      recommendation,
    },
  };

  return {
    applicationId,
    jobId: item.jobId,
    uploadItemId: item.id,
    fileName: item.fileName,
    fileSize: item.fileSize,
    fileType: item.fileType as UploadFileType,
    candidate,
    createdAt,
    source: 'session-upload',
  };
}

function selectMatchedSkills(job: Job, seed: string) {
  const allSkills = [...job.requiredSkills, ...job.preferredSkills];
  const start = hashText(seed) % Math.max(1, allSkills.length);
  const targetCount = Math.min(allSkills.length, Math.max(3, job.requiredSkills.length - 1));
  const selected: string[] = [];

  for (let index = 0; selected.length < targetCount && index < allSkills.length * 2; index += 1) {
    const skill = allSkills[(start + index) % allSkills.length];

    if (!selected.includes(skill)) {
      selected.push(skill);
    }
  }

  return selected;
}

function calculateDemoScore(job: Job, matchedSkills: string[], seed: string) {
  const requiredMatches = job.requiredSkills.filter((skill) => matchedSkills.includes(skill)).length;
  const coverage = requiredMatches / Math.max(1, job.requiredSkills.length);
  const variation = hashText(`${seed}-score`) % 8;

  return Math.min(94, Math.max(68, Math.round(68 + coverage * 20 + variation)));
}

function getDemoRecommendation(matchScore: number): CandidateRecommendation {
  if (matchScore >= 88) {
    return {
      decision: 'technical-interview',
      title: 'Demo recommendation: review soon',
      reason: 'The simulated match score is strong for this job context.',
      nextStep: 'Review the generated demo evidence; real verification requires future parsing.',
    };
  }

  if (matchScore >= 78) {
    return {
      decision: 'recruiter-screen',
      title: 'Demo recommendation: screen for fit',
      reason: 'The simulated skill coverage is promising but incomplete.',
      nextStep: 'Use a recruiter screen once real candidate details are available.',
    };
  }

  return {
    decision: 'hold',
    title: 'Demo recommendation: hold',
    reason: 'The simulated match has notable gaps against this job criteria.',
    nextStep: 'Revisit after the real parser and matching service exist.',
  };
}

function getResumeBaseName(fileName: string) {
  return fileName.replace(/\.[^/.]+$/, '').trim() || 'session candidate';
}

function toCandidateName(baseName: string) {
  return baseName
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return slug || 'candidate';
}

function hashText(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash;
}

function formatDateLabel(date: Date) {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
