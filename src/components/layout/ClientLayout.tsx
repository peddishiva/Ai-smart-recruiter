'use client';

import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Providers } from '@/app/providers';
import MobileNav from './MobileNav';
import { DemoBanner } from '@/components/shared/DemoBanner';
import JobContextBar from '@/features/jobs/components/JobContextBar';
import { DemoApplicationProvider } from '@/features/uploads/components/DemoApplicationProvider';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mobileNavOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileNavOpen]);

  // Render a minimal loading state during hydration
  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-sm font-medium text-slate-600">Loading workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <Providers>
      <DemoApplicationProvider>
        <div className="flex min-h-screen bg-slate-50">
          <Sidebar />
          <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

          <div className="flex min-w-0 flex-1 flex-col md:ml-64">
            <Header onMenuClick={() => setMobileNavOpen(true)} />

            <main className="min-w-0 flex-1 bg-slate-50">
              <DemoBanner />
              <JobContextBar />
              {children}
            </main>
          </div>
        </div>
      </DemoApplicationProvider>
    </Providers>
  );
}
