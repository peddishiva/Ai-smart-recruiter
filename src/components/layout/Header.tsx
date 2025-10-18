'use client';

import { Search, Bell } from 'lucide-react';

export default function Header() {
  return (
    <div className="sticky top-0 z-10 flex-shrink-0 h-16 bg-white shadow-sm border-b border-gray-200">
      <div className="h-full px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Search bar - takes available space on the left */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="search"
              name="search"
              className="block w-full bg-gray-50 py-2 pl-10 pr-3 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="Search"
              type="search"
            />
          </div>
        </div>
        
        {/* Right side - notifications and user profile */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="user-menu"
            aria-expanded="false"
            aria-haspopup="true"
            aria-label="User menu"
          >
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">JD</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
