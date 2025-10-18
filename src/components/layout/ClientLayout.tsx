'use client';

import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Providers } from '@/app/providers';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Clean up any browser extension attributes
    const cleanupExtensionAttributes = () => {
      const html = document.documentElement;
      const extensionAttrs = ['crxemulator', 'data-crx', 'data-extension'];
      extensionAttrs.forEach(attr => {
        if (html.hasAttribute(attr)) {
          html.removeAttribute(attr);
        }
      });
    };
    
    cleanupExtensionAttributes();
    
    // Set up a mutation observer to catch any future changes
    const observer = new MutationObserver(cleanupExtensionAttributes);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['crxemulator', 'data-crx', 'data-extension'],
    });
    
    return () => observer.disconnect();
  }, []);

  // Render a minimal loading state during hydration
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <Providers>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="md:pl-64 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  );
}
