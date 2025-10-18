'use client';

import { Home, Users, FileText, BarChart2, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Upload Resumes', href: '/upload-resumes', icon: FileText },
    { name: 'Reports', href: '/reports', icon: BarChart2 },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0 md:fixed md:inset-y-0 md:left-0 md:z-20">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white h-screen">
        {/* Header */}
        <div className="flex items-center flex-shrink-0 h-16 px-6 border-b border-gray-200">
          <h1 className="text-lg font-bold text-gray-900">AI Smart Recruiter</h1>
        </div>

        {/* Navigation */}
        <div className="flex-1 flex flex-col overflow-y-auto pt-2 pb-6">
          <nav className="px-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 flex-shrink-0 ${
                      isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="flex-1">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile */}
        <div className="flex-shrink-0 border-t border-gray-200 p-4">
          <div className="flex items-center gap-3 px-2">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-500" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900 truncate">John Doe</p>
              <p className="text-xs text-gray-500 truncate">Recruiter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
