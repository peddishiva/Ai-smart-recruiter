'use client';

import dynamic from 'next/dynamic';
import { kpiData, skillsData, scoreDistributionData } from '../data/mockData';

// Dynamically import components with no SSR
const KpiCard = dynamic(() => import('@/components/dashboard/KpiCard'), { ssr: false });
const SkillsChart = dynamic(() => import('@/components/dashboard/SkillsChart'), { ssr: false });
const ScoreChart = dynamic(() => import('@/components/dashboard/ScoreChart'), { ssr: false });

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        
        {/* KPI Cards - Single Row with 4 Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {kpiData.map((kpi) => (
            <KpiCard key={kpi.id} {...kpi} />
          ))}
        </div>

        {/* Two Column Layout - Bar Chart and Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Bar Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Skills vs Candidate Count</h2>
            <SkillsChart data={skillsData} />
          </div>

          {/* Right Column - Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Resume Score Distribution</h2>
            <ScoreChart data={scoreDistributionData} />
          </div>
        </div>
      </div>
    </div>
  );
}
