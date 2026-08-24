'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, Users, X } from 'lucide-react';
import { Badge, Button, Card, CardContent, EmptyState } from '@/components/ui';
import type { Candidate } from '@/types';
import MatchScore from './MatchScore';
import CandidateStatusBadge from './CandidateStatusBadge';
import {
  CandidateFilterState,
  candidateStatusLabels,
  candidateStatusOptions,
  filterCandidates,
  hasActiveCandidateFilters,
  matchScoreFilterLabels,
  matchScoreOptions,
  sortLabels,
  sortOptions,
} from '../utils/candidateFilters';

interface CandidateListClientProps {
  candidates: Candidate[];
  candidateBaseHref?: string;
}

const defaultFilters: CandidateFilterState = {
  query: '',
  status: 'all',
  match: 'all',
  sort: 'highest-match',
};

export default function CandidateListClient({
  candidates,
  candidateBaseHref = '/candidates',
}: CandidateListClientProps) {
  const [filters, setFilters] = useState<CandidateFilterState>(defaultFilters);

  const filteredCandidates = useMemo(
    () => filterCandidates(candidates, filters),
    [candidates, filters]
  );

  const updateFilter = <Key extends keyof CandidateFilterState>(
    key: Key,
    value: CandidateFilterState[Key]
  ) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const clearFilters = () => setFilters(defaultFilters);
  const activeFilters = hasActiveCandidateFilters(filters);

  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto_auto] lg:items-end">
            <div>
              <label htmlFor="candidate-search" className="text-sm font-semibold text-slate-950">
                Search candidates
              </label>
              <div className="relative mt-2">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  id="candidate-search"
                  type="search"
                  value={filters.query}
                  onChange={(event) => updateFilter('query', event.target.value)}
                  placeholder="Search by name, role, or skill"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-10 text-sm text-slate-950 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {filters.query && (
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    aria-label="Clear search"
                    onClick={() => updateFilter('query', '')}
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="candidate-status" className="text-sm font-semibold text-slate-950">
                Status
              </label>
              <select
                id="candidate-status"
                value={filters.status}
                onChange={(event) =>
                  updateFilter('status', event.target.value as CandidateFilterState['status'])
                }
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:w-44"
              >
                {candidateStatusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All statuses' : candidateStatusLabels[status]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="candidate-match" className="text-sm font-semibold text-slate-950">
                Match score
              </label>
              <select
                id="candidate-match"
                value={filters.match}
                onChange={(event) =>
                  updateFilter('match', event.target.value as CandidateFilterState['match'])
                }
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:w-44"
              >
                {matchScoreOptions.map((match) => (
                  <option key={match} value={match}>
                    {matchScoreFilterLabels[match]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="candidate-sort" className="text-sm font-semibold text-slate-950">
                Sort
              </label>
              <select
                id="candidate-sort"
                value={filters.sort}
                onChange={(event) =>
                  updateFilter('sort', event.target.value as CandidateFilterState['sort'])
                }
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:w-44"
              >
                {sortOptions.map((sort) => (
                  <option key={sort} value={sort}>
                    {sortLabels[sort]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <SlidersHorizontal className="h-4 w-4 text-slate-400" aria-hidden="true" />
              <span>
                Showing {filteredCandidates.length} of {candidates.length} demo candidates
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              disabled={!activeFilters}
              className="w-full sm:w-auto"
            >
              Clear filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {filteredCandidates.length === 0 ? (
        <EmptyState
          icon={<Users className="h-8 w-8" aria-hidden="true" />}
          title="No candidates found"
          description="Try changing your filters or search query."
          action={
            <Button variant="primary" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          }
        />
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm xl:block">
            <div className="overflow-x-auto">
            <table className="min-w-[980px] divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Candidate
                  </th>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Role
                  </th>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Experience
                  </th>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Skills
                  </th>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Match
                  </th>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                  <th scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Added
                  </th>
                  <th scope="col" className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredCandidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <Link
                        href={`${candidateBaseHref}/${candidate.id}`}
                        className="font-semibold text-slate-950 hover:text-blue-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        {candidate.name}
                      </Link>
                      <p className="mt-1 text-sm text-slate-500">{candidate.location}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-700">{candidate.role}</td>
                    <td className="px-5 py-4 text-sm text-slate-700">
                      {candidate.experienceYears} years
                    </td>
                    <td className="max-w-xs px-5 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {candidate.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="neutral">
                            {skill}
                          </Badge>
                        ))}
                        {candidate.skills.length > 3 && (
                          <Badge variant="neutral">+{candidate.skills.length - 3}</Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <MatchScore score={candidate.matchScore} size="sm" showMeter={false} />
                    </td>
                    <td className="px-5 py-4">
                      <CandidateStatusBadge status={candidate.status} />
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{candidate.addedAtLabel}</td>
                    <td className="px-5 py-4 text-right">
                      <Button href={`${candidateBaseHref}/${candidate.id}`} variant="secondary" size="sm">
                        Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

          <div className="space-y-4 xl:hidden">
            {filteredCandidates.map((candidate) => (
              <article
                key={candidate.id}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-semibold text-slate-950">{candidate.name}</h2>
                      <CandidateStatusBadge status={candidate.status} />
                    </div>
                    <p className="mt-1 text-sm text-slate-700">{candidate.role}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {candidate.location} · {candidate.experienceYears} years
                    </p>
                  </div>
                  <MatchScore score={candidate.matchScore} size="sm" showMeter={false} />
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {candidate.matchAnalysis.summary}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {candidate.skills.slice(0, 4).map((skill) => (
                    <Badge key={skill} variant="neutral">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-slate-500">Added {candidate.addedAtLabel}</p>
                  <Button href={`${candidateBaseHref}/${candidate.id}`} variant="secondary" size="sm">
                    Review candidate
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
