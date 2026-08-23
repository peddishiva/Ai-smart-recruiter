'use client';

import { Download, TrendingUp, Users, FileText, Calendar, Filter } from 'lucide-react';
import dynamic from 'next/dynamic';
import { recruiterActivityData, skillsData } from '@/data/demo';

// Dynamically import chart components
const ActivityChart = dynamic(() => import('@/components/dashboard/ActivityChart'), { ssr: false });
const SkillsChart = dynamic(() => import('@/components/dashboard/SkillsChart'), { ssr: false });

export default function ReportsPage() {
  const reportStats = [
    {
      title: 'Demo Reports Generated',
      value: '156',
      change: '+12%',
      icon: FileText,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Demo Candidates',
      value: '1,248',
      change: '+8%',
      icon: Users,
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'This Month',
      value: '42',
      change: '+15%',
      icon: Calendar,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Avg Response Time',
      value: '2.4h',
      change: '-5%',
      icon: TrendingUp,
      color: 'bg-amber-50 text-amber-600',
    },
  ];

  const recentReports = [
    {
      id: 1,
      name: 'Monthly Recruitment Report',
      date: 'Oct 18, 2025',
      type: 'PDF',
      size: '2.4 MB',
      status: 'Ready',
    },
    {
      id: 2,
      name: 'Candidate Analysis Q4',
      date: 'Oct 15, 2025',
      type: 'Excel',
      size: '1.8 MB',
      status: 'Ready',
    },
    {
      id: 3,
      name: 'Skills Gap Analysis',
      date: 'Oct 12, 2025',
      type: 'PDF',
      size: '3.1 MB',
      status: 'Ready',
    },
    {
      id: 4,
      name: 'Interview Performance',
      date: 'Oct 10, 2025',
      type: 'PDF',
      size: '1.5 MB',
      status: 'Ready',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-6 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">Reports</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              View demo recruitment analytics. Backend export and filtering arrive in a later phase.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="flex cursor-not-allowed items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-500"
              disabled
              title="Filtering is coming in Phase 4"
            >
              <Filter className="h-4 w-4" />
              Filter Phase 4
            </button>
            <button
              type="button"
              className="flex cursor-not-allowed items-center gap-2 rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-500"
              disabled
              title="Export requires backend integration"
            >
              <Download className="h-4 w-4" />
              Export Phase 4
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {reportStats.map((stat, index) => (
            <div
              key={index}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="mb-1 text-sm font-medium text-slate-600">
                    {stat.title}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold text-slate-950">
                      {stat.value}
                    </h3>
                    <span className="text-sm font-semibold text-green-600">
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`flex-shrink-0 rounded-lg p-3 ${stat.color.split(' ')[0]}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color.split(' ')[1]}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Weekly Activity */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-slate-950">Weekly Activity</h2>
            <ActivityChart data={recruiterActivityData} />
          </div>

          {/* Skills Distribution */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-slate-950">Top Skills</h2>
            <SkillsChart data={skillsData} />
          </div>
        </div>

        {/* Recent Reports Table */}
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-950">Recent Demo Reports</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {recentReports.map((report) => (
                  <tr key={report.id} className="transition-colors hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-900">
                          {report.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {report.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {report.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        type="button"
                        className="ml-auto flex cursor-not-allowed items-center gap-1 font-medium text-slate-400"
                        disabled
                        title="Report downloads require backend integration"
                      >
                        <Download className="h-4 w-4" />
                        Phase 4
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
