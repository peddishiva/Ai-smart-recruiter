'use client';

import dynamic from 'next/dynamic';
import { kpiData, skillsData, scoreDistributionData, smartAlertsData, recruiterActivityData } from '../data/mockData';

// Dynamically import components with no SSR
const KpiCard = dynamic(() => import('@/components/dashboard/KpiCard'), { ssr: false });
const SkillsChart = dynamic(() => import('@/components/dashboard/SkillsChart'), { ssr: false });
const ScoreChart = dynamic(() => import('@/components/dashboard/ScoreChart'), { ssr: false });
const ActivityChart = dynamic(() => import('@/components/dashboard/ActivityChart'), { ssr: false });
const SmartAlerts = dynamic(() => import('@/components/dashboard/SmartAlerts'), { ssr: false });
const QuickActions = dynamic(() => import('@/components/dashboard/QuickActions'), { ssr: false });

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      {/* KPI Cards Grid */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.id} {...kpi} />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skills Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Skills vs Candidate Count</h2>
            <SkillsChart data={skillsData} />
          </div>

          {/* Activity Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Weekly Recruiter Activity</h2>
            <ActivityChart data={recruiterActivityData} />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Score Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Resume Score Distribution</h2>
            <ScoreChart data={scoreDistributionData} />
          </div>

          {/* Smart Alerts */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Smart Alerts</h2>
              <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">View All</span>
            </div>
            <SmartAlerts alerts={smartAlertsData} />
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
}
