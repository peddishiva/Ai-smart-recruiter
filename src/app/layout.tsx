import type { Metadata } from 'next';
import './globals.css';
import './error-handler';
import ClientLayout from '@/components/layout/ClientLayout';

export const metadata: Metadata = {
  title: 'AI Smart Recruiter',
  description: 'Demo recruiting workspace prototype',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body 
        className="h-full bg-slate-50"
        suppressHydrationWarning
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
