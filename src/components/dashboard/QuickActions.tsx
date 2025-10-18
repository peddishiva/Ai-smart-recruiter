'use client';

import { Plus, Upload, Search, UserPlus, FileText, Mail, Filter } from 'lucide-react';

const actions = [
  {
    title: 'Add Candidate',
    icon: UserPlus,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'Upload Resumes',
    icon: Upload,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    title: 'Search Candidates',
    icon: Search,
    color: 'bg-green-100 text-green-600',
  },
  {
    title: 'Create Job',
    icon: FileText,
    color: 'bg-amber-100 text-amber-600',
  },
  {
    title: 'Send Email',
    icon: Mail,
    color: 'bg-red-100 text-red-600',
  },
  {
    title: 'Advanced Filters',
    icon: Filter,
    color: 'bg-indigo-100 text-indigo-600',
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.title}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div className={`p-2.5 rounded-lg ${action.color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <span className="mt-2 text-sm font-medium text-gray-700">
              {action.title}
            </span>
          </button>
        );
      })}
    </div>
  );
}
