# AI Smart Recruiter Project Architecture

This is the master product and workflow architecture for AI Smart Recruiter.
Use it as the source of truth for future frontend, backend, data model, API,
AI, database, and UX decisions, while treating the current Git repository as
authoritative for actual implementation state.

Do not invent product behavior that conflicts with this architecture. Do not
implement anything merely because this document lists a page. Build toward this
architecture incrementally by approved phase.

## 1. Product Vision

AI Smart Recruiter is a recruiter workspace for managing multiple job openings
and evaluating applicants against the specific job they applied for.

The system should help recruiters:

1. Create and manage jobs.
2. Define the hiring criteria for each job.
3. Upload multiple applicant resumes for a selected job.
4. Parse and analyze every uploaded resume.
5. Match every applicant against the selected job.
6. Generate an explainable Job Match Score.
7. Rank applicants as a decision-support mechanism.
8. Allow recruiters to manually review applicants.
9. Allow recruiters to manually shortlist or reject applicants.
10. Allow recruiters to manually choose which shortlisted applicants should
    proceed to interview.
11. Schedule and manage interviews.
12. Track recruitment analytics.
13. Generate recruitment reports.

Core principle:

AI recommends and explains. Recruiters review and decide.

The system must never remove recruiter decision-making merely because an AI
score exists.

## 2. The Most Important Domain Rule

Every application is treated as an independent candidate/application record tied
to:

- One specific job
- One specific resume/application submission

We are not implementing a global candidate profile in this version.

Example:

```text
Sarah Johnson applies to:

Frontend Developer
  -> Sarah_Frontend.pdf
  -> Match Score 94%
  -> Status: Shortlisted

Backend Developer
  -> Sarah_Backend.pdf
  -> Match Score 72%
  -> Status: Reviewing
```

These are treated as two independent candidate/application records inside the
recruiting workflow.

They may belong to the same real-world person, but the system should not
aggregate them into a single global candidate profile.

Do not introduce:

- Global candidate dashboards
- Cross-job candidate aggregation
- Global candidate history
- Cross-application scoring
- Automatic merging of applications

unless explicitly requested in a future architecture change.

## 3. Job Is The Primary Recruiting Context

A recruiter can create multiple jobs.

Examples:

- Frontend Developer
- Backend Developer
- Data Analyst
- DevOps Engineer

Each job is an independent recruiting context.

A job contains the information required to evaluate applicants. A job may
contain:

- Title
- Department
- Location
- Employment type
- Job description
- Responsibilities
- Required skills
- Preferred skills
- Experience requirements
- Education requirements
- Certifications
- Additional hiring criteria
- Status, such as draft/open/closed, when implemented

Job Description and Job Requirements are not two independent uploads.

The recruiter creates one job profile. That job profile contains:

```text
Job Description
+
Structured Requirements
```

The structured requirements are used by the matching system.

## 4. Create And Manage Job

The Jobs area is the top-level area where recruiters manage openings.

Conceptual pages:

- `/jobs`
- `/jobs/create`
- `/jobs/[jobId]`
- `/jobs/[jobId]/edit`
- `/jobs/[jobId]/settings`

The recruiter can:

- Create a job
- Edit a job
- View job details
- Manage job criteria
- Open the job workspace

Example:

```text
Frontend Developer

Job Description:
"We are looking for a frontend engineer..."

Required Skills:
React
TypeScript
Next.js

Preferred:
AWS
Docker

Experience:
3+ years

Education:
Bachelor's degree or equivalent
```

## 5. Active Job Context

After the recruiter selects a job, that job becomes the active job.

Example:

```text
Active Job:
Frontend Developer
```

From this point onward, job-scoped screens operate on that job.

Job-scoped areas include:

- Dashboard
- Resume Upload
- Candidates
- Candidate Detail
- Interviews
- Analytics
- Reports

If the recruiter switches to Backend Developer, the same application switches
context and all job-scoped data changes to Backend Developer.

This is one application with multiple job contexts. It is not multiple separate
applications or websites.

## 6. Complete Job Workspace

The active job workspace is conceptually:

```text
JOB
|
+-- Dashboard
+-- Upload Resumes
+-- Candidates
+-- Candidate Detail / Match Analysis
+-- Interviews
+-- Analytics
+-- Reports
```

All of these are scoped to the active job.

## 7. Dashboard

The Dashboard answers:

```text
"What needs my attention for this job?"
```

It is an overview and decision-support page.

It may contain:

- Total candidates
- Pending review
- Shortlisted
- Interviews
- Hired
- Average match score
- AI recommended candidates
- Candidate pipeline
- Smart alerts
- Recent activity
- Secondary analytics

The dashboard should not become the primary deep-analysis page. It should
prioritize recruiter action.

## 8. Pending Review

Pending Review means candidates/applications that the recruiter has not manually
reviewed yet.

It does not mean shortlisted candidates waiting for interview review.

The pipeline is:

```text
New
  ->
Pending Recruiter Review
  ->
Recruiter Decision
  ->
Shortlisted OR Rejected
```

## 9. AI Recommended Candidates

AI Recommended Candidates is a small, prioritized subset of the candidate pool.

It should show only a manageable number of high-priority/relevant candidates.

Example:

```text
Sarah 94%
Alex 92%
Priya 90%
David 88%
```

This is not the complete candidate list. The complete set is available in
Candidates.

AI recommendations are decision support. They do not automatically shortlist
candidates.

## 10. Resume Upload

Resume upload is always performed in the context of the active job.

Example:

```text
Active Job:
Frontend Developer

Recruiter uploads:

resume1.pdf
resume2.pdf
resume3.pdf
...
resume100.pdf
```

Every uploaded application/resume is processed independently.

The conceptual processing pipeline for each resume is:

```text
Resume Upload
    ->
File Validation
    ->
Resume Text Extraction
    ->
Resume Parsing
    ->
Candidate Information Extraction
    ->
Job Matching
    ->
Match Scoring
    ->
Explainable Analysis
    ->
Candidate Ranking
```

The system repeats this processing for every uploaded resume.

## 11. Candidate Matching

The system compares each application/resume against the active job.

Example job criteria:

```text
Required:
React
TypeScript
Next.js
3+ years experience

Preferred:
AWS
```

Candidate resume:

```text
React
TypeScript
Next.js
5 years
AWS
```

The system generates:

```text
Job Match Score
+
explanation
```

Example:

```text
94% Strong Match

Skills: 9/10
Experience: 10/10
Education: 8/10

Matched:
React
TypeScript
Next.js
AWS

Gaps:
System Design
```

The score is job-specific. The same candidate/application can have a different
score for another job because the evaluation target changes.

## 12. Job Match Score

The primary score for this product is Job Match Score.

It means:

```text
"How well does this particular application/resume match this specific job?"
```

The current product does not require a separate ATS Resume Score. Do not
introduce ATS scoring into the core architecture.

Potential future ATS analysis is separate and outside the current product scope.

## 13. Explainable Match Analysis

A recruiter must be able to understand why a candidate received a match score.

Never show:

```text
"AI Score: 94%"
```

with no explanation.

The analysis should eventually expose concepts such as:

- Overall match score
- Skills match
- Experience match
- Education match
- Required skills matched
- Missing skills
- Strengths
- Weaknesses/gaps
- Evidence
- Recommendation

Example:

```text
94%
Strong Match

WHY THIS SCORE?

Skills: 8/9
Experience: 9/10
Education: Meets requirement

MATCHED SKILLS:
React
TypeScript
Next.js

MISSING / WEAKER:
AWS
System Design

EVIDENCE:
"6 years of frontend development experience."

RECOMMENDATION:
"Recommended for technical interview."
```

This explanation is an important product feature. Recruiters should be able to
manually inspect why the system recommended or did not recommend an
application.

## 14. Candidates

Candidates represents the complete application pool for the active job.

It does not mean shortlisted candidates only.

Candidate statuses may include:

- New
- Reviewing
- Shortlisted
- Rejected
- Interview
- Hired

Candidates page should support:

- Search
- Filtering
- Sorting
- Status views
- Match score
- Skills
- Experience
- Candidate/application details

The candidate list is job-scoped.

## 15. Candidate Detail

Every candidate/application has a detail page.

Conceptually:

```text
/jobs/[jobId]/candidates/[candidateId]
```

The page should provide:

- Candidate/application identity
- Submitted resume
- Role/job
- Experience
- Education
- Skills
- Certifications when available
- Match score
- Match analysis
- Matched skills
- Missing skills
- Strengths
- Gaps
- Evidence
- Recommendation
- Recruiter decision/status

The same candidate/application can be:

- New
- Reviewing
- Shortlisted
- Rejected
- Interview
- Hired

The analysis should be accessible regardless of status.

## 16. Shortlisting

AI does not automatically determine the final shortlist.

The system may recommend/rank candidates. The recruiter makes the shortlist
decision.

Example:

```text
100 applications
  ->
AI ranking
  ->
Recruiter reviews
  ->
Recruiter chooses:
    Sarah -> Shortlisted
    Alex -> Shortlisted
    Priya -> Rejected
    David -> Reviewing
```

Shortlisting is therefore a recruiter-controlled action.

## 17. Interview Selection

There is no automatic rule such as:

```text
"Take the top 12 shortlisted candidates and schedule interviews."
```

Instead:

```text
42 shortlisted candidates
      ->
Recruiter manually reviews them
      ->
Recruiter manually selects candidates for interview
      ->
Selected candidates are scheduled for interviews
```

The recruiter may choose 3, 8, 12, or another number. The product should support
manual selection.

## 18. Interviews

Interviews happen after recruiter selection.

Conceptual workflow:

```text
Shortlisted
    ->
Recruiter selects candidates
    ->
Schedule Interview
    ->
Upcoming
    ->
Completed
    ->
Interview Feedback
    ->
Hiring Decision
```

Interview pages may include:

- `/jobs/[jobId]/interviews`
- `/jobs/[jobId]/interviews/create`
- `/jobs/[jobId]/interviews/[interviewId]`

Future states:

- Upcoming
- Today
- Completed
- Cancelled

Interview information may include:

- Candidate
- Interview type
- Date
- Time
- Interviewer
- Meeting link
- Notes
- Feedback
- Recommendation

## 19. Analytics

Analytics answers:

```text
"What is happening across recruitment for this job?"
```

It is different from the Dashboard.

Dashboard:

```text
"What needs my attention now?"
```

Analytics:

```text
"What patterns/trends are happening?"
```

Possible analytics:

- Total applications
- Reviewed
- Shortlisted
- Rejected
- Interviews
- Hired
- Average match score
- Match score distribution
- Candidate pipeline
- Skills distribution
- Hiring funnel
- Trends over time

All analytics are job-scoped.

## 20. Reports

Reports answer:

```text
"What structured recruitment information should I export/share?"
```

Reports are different from Analytics.

Analytics:

```text
interactive analysis
```

Reports:

```text
structured/exportable information
```

Future reports may include:

- Recruitment summary
- Candidate summary
- Shortlist summary
- Interview summary
- Hiring summary
- Skill gaps
- Match distribution

Possible exports:

- PDF
- CSV
- Downloadable report

Reports are also job-scoped.

## 21. Multi-Job Example

Recruiter creates:

```text
Job A:
Frontend Developer

Job B:
Backend Developer

Job C:
Data Analyst
```

Recruiter selects:

```text
Frontend Developer
```

Application context:

```text
Dashboard -> Frontend data
Upload -> Frontend applicants
Candidates -> Frontend applications
Interviews -> Frontend interviews
Analytics -> Frontend analytics
Reports -> Frontend reports
```

Switch to Backend Developer and everything changes to Backend context. Switch
to Data Analyst and everything changes to Data Analyst context.

## 22. Same Person, Different Applications

If the same real-world person applies to multiple jobs with different resumes,
those applications are independent records.

Example:

```text
Sarah Johnson
    |
    +-- Frontend Application
    |      Job: Frontend Developer
    |      Resume: Sarah_Frontend.pdf
    |      Score: 94%
    |      Status: Shortlisted
    |
    +-- Backend Application
           Job: Backend Developer
           Resume: Sarah_Backend.pdf
           Score: 72%
           Status: Reviewing
```

Treat these as two independent candidate/application records. Do not build a
global candidate profile for them.

No cross-job aggregation is required in the current architecture.

## 23. Data Model Concept

The conceptual relationship is:

```text
JOB
  +
APPLICATION/CANDIDATE RECORD
  +
SPECIFIC RESUME
  ->
JOB-SPECIFIC MATCH ANALYSIS
  ->
RECRUITER DECISION
```

The unit of recruiting evaluation is therefore the application, not the global
person.

Future backend structure should preserve this distinction.

## 24. Final End-To-End Workflow

The master workflow is:

```text
CREATE / MANAGE JOB
        ->
Create Job Profile
        ->
Select Active Job
        ->
Job Workspace
        ->
Upload Resumes
        ->
Process Every Resume
        ->
Parse Every Application
        ->
Match Every Application Against Active Job
        ->
Generate Match Score + Explanation
        ->
Rank / Recommend Candidates
        ->
Recruiter Manually Reviews
        ->
Shortlist OR Reject
        ->
Recruiter Manually Selects Interview Candidates
        ->
Schedule Interviews
        ->
Interview Feedback
        ->
Hiring Decision
        ->
Analytics
        ->
Reports
```

## 25. Responsibility Split

System / AI responsibilities:

- Parse resumes
- Extract candidate information
- Compare against job requirements
- Calculate job match score
- Identify matching skills
- Identify missing skills
- Provide supporting evidence
- Generate recommendation
- Rank/recommend candidates

Recruiter responsibilities:

- Create/manage jobs
- Define job criteria
- Upload resumes
- Review applications
- Shortlist
- Reject
- Choose interview candidates
- Schedule interviews
- Review interview feedback
- Make hiring decisions

Core principle:

The AI assists the recruiter. The AI does not replace the recruiter's judgment.

## 26. Page Architecture

Authentication:

- `/login`
- `/forgot-password`
- `/reset-password`

Jobs:

- `/jobs`
- `/jobs/create`
- `/jobs/[jobId]`
- `/jobs/[jobId]/edit`
- `/jobs/[jobId]/settings`

Job workspace:

- `/jobs/[jobId]/dashboard`
- `/jobs/[jobId]/upload`
- `/jobs/[jobId]/candidates`
- `/jobs/[jobId]/candidates/[candidateId]`
- `/jobs/[jobId]/interviews`
- `/jobs/[jobId]/interviews/create`
- `/jobs/[jobId]/interviews/[interviewId]`
- `/jobs/[jobId]/analytics`
- `/jobs/[jobId]/reports`

Global:

- `/notifications`
- `/profile`
- `/settings`
- `/help`

System:

- `loading`
- `error`
- `not-found`
- `unauthorized`

These routes are the target architecture. Do not implement every page at once.
Implement incrementally by phase.

## 27. Implementation Priority

Current project state:

- Phase 1: Frontend foundation and recruiter dashboard, done.
- Phase 2: Candidates and explainable candidate analysis, done.

Next:

- Phase 3: Jobs and job context.
- Phase 4: Resume upload workflow and matching integration architecture.
- Phase 5: Interviews, Analytics, and Reports.

Later:

- Backend
- Database
- API layer
- Real resume parsing
- Real AI/LLM matching
- Authentication
- Persistence

Do not skip architectural dependencies. Jobs should be established before real
resume-to-job matching.

## 28. Phase Discipline

For every future phase:

1. Inspect current repository.
2. Read this architecture.
3. Compare implementation with architecture.
4. Do not break earlier functionality.
5. Implement only the approved phase.
6. Reuse existing components.
7. Avoid speculative abstractions.
8. Avoid fake APIs.
9. Avoid fake AI claims.
10. Verify lint/build.
11. Verify responsive behavior.
12. Report exactly what changed.

## 29. Non-Negotiable Product Rules

1. Each application is independent.
2. The active job determines the recruiting context.
3. Job Description and structured requirements belong to one job profile.
4. Every uploaded resume is evaluated against the selected job.
5. Match Score is job-specific.
6. Explainability is required.
7. AI recommendations do not automatically determine hiring decisions.
8. Shortlisting is recruiter-controlled.
9. Interview selection is recruiter-controlled.
10. Do not automatically turn a fixed number of shortlisted candidates into
    interview candidates.
11. The current product does not implement a global candidate profile.
12. The current product does not require a separate ATS Resume Score.
13. Do not invent backend/API behavior before the architecture phase that
    introduces it.
14. Do not add navigation to future pages until the corresponding page actually
    exists.
15. Preserve job-specific isolation throughout the system.

## 30. Future Task Evaluation

Before implementing any future feature, evaluate:

1. Which job context does this belong to?
2. Is this job-level, application-level, recruiter-level, or system-level?
3. Does it affect the independent application rule?
4. Does it require a real backend contract?
5. Does it change the recruiter vs AI responsibility boundary?
6. Does it belong to the current phase?
7. Does the feature introduce cross-job/global candidate aggregation?
8. Does it conflict with any non-negotiable rule above?

If a request conflicts with this architecture, explicitly identify the conflict
before implementing.

