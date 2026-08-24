'use client';

import { useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import type { EmploymentType, Job, JobFormValues, JobStatus } from '@/types';
import { formatEmploymentType, jobStatusLabels } from '@/data/demo';

interface JobFormProps {
  mode: 'create' | 'edit';
  initialJob?: Job;
}

type JobFormErrors = Partial<Record<keyof JobFormValues, string>>;

const emptyValues: JobFormValues = {
  title: '',
  department: '',
  location: '',
  employmentType: 'full-time',
  description: '',
  responsibilities: '',
  requiredSkills: '',
  preferredSkills: '',
  experienceRequirement: '',
  educationRequirement: '',
  certifications: '',
  otherCriteria: '',
  status: 'draft',
};

const employmentTypes: EmploymentType[] = ['full-time', 'part-time', 'contract', 'internship'];
const jobStatuses: JobStatus[] = ['draft', 'open', 'paused', 'closed'];

const toTextareaList = (items: string[]) => items.join('\n');

const valuesFromJob = (job?: Job): JobFormValues => {
  if (!job) {
    return emptyValues;
  }

  return {
    title: job.title,
    department: job.department,
    location: job.location,
    employmentType: job.employmentType,
    description: job.description,
    responsibilities: toTextareaList(job.responsibilities),
    requiredSkills: job.requiredSkills.join(', '),
    preferredSkills: job.preferredSkills.join(', '),
    experienceRequirement: job.experienceRequirement,
    educationRequirement: job.educationRequirement,
    certifications: job.certifications.join(', '),
    otherCriteria: toTextareaList(job.otherCriteria),
    status: job.status,
  };
};

const parseList = (value: string) =>
  value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);

export default function JobForm({ mode, initialJob }: JobFormProps) {
  const [values, setValues] = useState<JobFormValues>(() => valuesFromJob(initialJob));
  const [errors, setErrors] = useState<JobFormErrors>({});
  const [savedValues, setSavedValues] = useState<JobFormValues | null>(null);

  const requiredSkills = useMemo(() => parseList(values.requiredSkills), [values.requiredSkills]);
  const preferredSkills = useMemo(() => parseList(values.preferredSkills), [values.preferredSkills]);

  const updateValue = <Key extends keyof JobFormValues>(key: Key, value: JobFormValues[Key]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = () => {
    const nextErrors: JobFormErrors = {};

    if (!values.title.trim()) {
      nextErrors.title = 'Job title is required.';
    }

    if (!values.description.trim()) {
      nextErrors.description = 'Job description is required.';
    }

    if (requiredSkills.length === 0) {
      nextErrors.requiredSkills = 'Add at least one required skill.';
    }

    if (!values.experienceRequirement.trim()) {
      nextErrors.experienceRequirement = 'Experience requirement is required.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setSavedValues(values);
  };

  const submitLabel = mode === 'create' ? 'Create Job' : 'Save Demo Changes';
  const cancelHref = mode === 'edit' && initialJob ? `/jobs/${initialJob.id}` : '/jobs';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Job Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-5 lg:grid-cols-2">
            <div>
              <label htmlFor="job-title" className="text-sm font-semibold text-slate-950">
                Job Title <span className="text-red-600">*</span>
              </label>
              <input
                id="job-title"
                value={values.title}
                onChange={(event) => updateValue('title', event.target.value)}
                aria-invalid={Boolean(errors.title)}
                aria-describedby={errors.title ? 'job-title-error' : undefined}
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Frontend Developer"
              />
              {errors.title && (
                <p id="job-title-error" className="mt-2 text-sm text-red-600">
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="job-department" className="text-sm font-semibold text-slate-950">
                Department
              </label>
              <input
                id="job-department"
                value={values.department}
                onChange={(event) => updateValue('department', event.target.value)}
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Product Engineering"
              />
            </div>

            <div>
              <label htmlFor="job-location" className="text-sm font-semibold text-slate-950">
                Location
              </label>
              <input
                id="job-location"
                value={values.location}
                onChange={(event) => updateValue('location', event.target.value)}
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Remote / Bengaluru"
              />
            </div>

            <div>
              <label htmlFor="employment-type" className="text-sm font-semibold text-slate-950">
                Employment Type
              </label>
              <select
                id="employment-type"
                value={values.employmentType}
                onChange={(event) =>
                  updateValue('employmentType', event.target.value as EmploymentType)
                }
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {employmentTypes.map((type) => (
                  <option key={type} value={type}>
                    {formatEmploymentType(type)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="job-status" className="text-sm font-semibold text-slate-950">
                Job Status
              </label>
              <select
                id="job-status"
                value={values.status}
                onChange={(event) => updateValue('status', event.target.value as JobStatus)}
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {jobStatuses.map((status) => (
                  <option key={status} value={status}>
                    {jobStatusLabels[status]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="experience" className="text-sm font-semibold text-slate-950">
                Experience Requirement <span className="text-red-600">*</span>
              </label>
              <input
                id="experience"
                value={values.experienceRequirement}
                onChange={(event) => updateValue('experienceRequirement', event.target.value)}
                aria-invalid={Boolean(errors.experienceRequirement)}
                aria-describedby={
                  errors.experienceRequirement ? 'experience-error' : undefined
                }
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="5+ years building production applications"
              />
              {errors.experienceRequirement && (
                <p id="experience-error" className="mt-2 text-sm text-red-600">
                  {errors.experienceRequirement}
                </p>
              )}
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="job-description" className="text-sm font-semibold text-slate-950">
              Job Description <span className="text-red-600">*</span>
            </label>
            <textarea
              id="job-description"
              value={values.description}
              onChange={(event) => updateValue('description', event.target.value)}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={errors.description ? 'job-description-error' : undefined}
              rows={5}
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-950 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the role, team, and hiring context."
            />
            {errors.description && (
              <p id="job-description-error" className="mt-2 text-sm text-red-600">
                {errors.description}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Structured Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-5 lg:grid-cols-2">
            <div>
              <label htmlFor="responsibilities" className="text-sm font-semibold text-slate-950">
                Responsibilities
              </label>
              <textarea
                id="responsibilities"
                value={values.responsibilities}
                onChange={(event) => updateValue('responsibilities', event.target.value)}
                rows={5}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-950 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="One responsibility per line"
              />
            </div>

            <div>
              <label htmlFor="required-skills" className="text-sm font-semibold text-slate-950">
                Required Skills <span className="text-red-600">*</span>
              </label>
              <textarea
                id="required-skills"
                value={values.requiredSkills}
                onChange={(event) => updateValue('requiredSkills', event.target.value)}
                aria-invalid={Boolean(errors.requiredSkills)}
                aria-describedby={errors.requiredSkills ? 'required-skills-error' : undefined}
                rows={5}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-950 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="React, TypeScript, Next.js"
              />
              {errors.requiredSkills && (
                <p id="required-skills-error" className="mt-2 text-sm text-red-600">
                  {errors.requiredSkills}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="preferred-skills" className="text-sm font-semibold text-slate-950">
                Preferred Skills
              </label>
              <textarea
                id="preferred-skills"
                value={values.preferredSkills}
                onChange={(event) => updateValue('preferredSkills', event.target.value)}
                rows={4}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-950 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="AWS, GraphQL, analytics"
              />
            </div>

            <div>
              <label htmlFor="education" className="text-sm font-semibold text-slate-950">
                Education Requirement
              </label>
              <textarea
                id="education"
                value={values.educationRequirement}
                onChange={(event) => updateValue('educationRequirement', event.target.value)}
                rows={4}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-950 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Degree, equivalent experience, or role-specific requirements"
              />
            </div>

            <div>
              <label htmlFor="certifications" className="text-sm font-semibold text-slate-950">
                Certifications
              </label>
              <textarea
                id="certifications"
                value={values.certifications}
                onChange={(event) => updateValue('certifications', event.target.value)}
                rows={3}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-950 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="AWS Associate, Kubernetes, or leave blank"
              />
            </div>

            <div>
              <label htmlFor="other-criteria" className="text-sm font-semibold text-slate-950">
                Other Criteria
              </label>
              <textarea
                id="other-criteria"
                value={values.otherCriteria}
                onChange={(event) => updateValue('otherCriteria', event.target.value)}
                rows={3}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-950 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Domain experience, collaboration needs, or hiring notes"
              />
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-700" aria-hidden="true" />
              <p className="text-sm leading-6 text-blue-950">
                This form creates one job profile containing both description and structured
                requirements. Demo saves are local to this page and do not call a backend.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {savedValues && (
        <div
          className="rounded-lg border border-emerald-200 bg-emerald-50 p-4"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-700" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-emerald-950">
                {mode === 'create' ? 'Demo job profile created locally' : 'Demo job edits applied locally'}
              </p>
              <p className="mt-1 text-sm leading-6 text-emerald-900">
                {savedValues.title} is staged in this form only. It has not been persisted to a
                backend, database, or API.
              </p>
            </div>
          </div>
        </div>
      )}

      <Card>
        <CardContent className="p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-950">Current criteria preview</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {requiredSkills.length > 0 ? (
                  requiredSkills.slice(0, 8).map((skill) => (
                    <Badge key={skill} variant="primary">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <Badge variant="neutral">No required skills yet</Badge>
                )}
                {preferredSkills.slice(0, 4).map((skill) => (
                  <Badge key={skill} variant="neutral">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button href={cancelHref} variant="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                {submitLabel}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
