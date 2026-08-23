import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './error-handler';
import ClientLayout from '@/components/layout/ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Smart Recruiter',
  description: 'AI-powered recruitment workspace prototype',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body 
        className={`${inter.className} h-full bg-slate-50`} 
        suppressHydrationWarning
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
