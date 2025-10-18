'use client';

import { Download, TrendingUp, Users, FileText, Calendar, Filter } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import chart components
const ActivityChart = dynamic(() => import('@/components/dashboard/ActivityChart'), { ssr: false });
const SkillsChart = dynamic(() => import('@/components/dashboard/SkillsChart'), { ssr: false });

export default function ReportsPage() {
  const reportStats = [
    {
      title: 'Total Reports Generated',
      value: '156',
      change: '+12%',
      icon: FileText,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Active Candidates',
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

  const skillsData = [
    { name: 'React', value: 45, fill: '#3b82f6' },
    { name: 'Python', value: 38, fill: '#10b981' },
    { name: 'AWS', value: 29, fill: '#f59e0b' },
    { name: 'Node.js', value: 32, fill: '#8b5cf6' },
    { name: 'SQL', value: 27, fill: '#ec4899' }
  ];

  const activityData = [
    { name: 'Mon', scheduled: 4, completed: 2 },
    { name: 'Tue', scheduled: 3, completed: 3 },
    { name: 'Wed', scheduled: 5, completed: 4 },
    { name: 'Thu', scheduled: 7, completed: 5 },
    { name: 'Fri', scheduled: 6, completed: 3 },
    { name: 'Sat', scheduled: 2, completed: 1 },
    { name: 'Sun', scheduled: 1, completed: 0 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            <p className="mt-2 text-sm text-gray-600">
              View and download recruitment analytics and reports
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4" />
              Export All
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {reportStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold text-gray-900">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Weekly Activity</h2>
            <ActivityChart data={activityData} />
          </div>

          {/* Skills Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Skills</h2>
            <SkillsChart data={skillsData} />
          </div>
        </div>

        {/* Recent Reports Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
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
              <tbody className="bg-white divide-y divide-gray-200">
                {recentReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50 transition-colors">
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
                      <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 ml-auto">
                        <Download className="h-4 w-4" />
                        Download
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
