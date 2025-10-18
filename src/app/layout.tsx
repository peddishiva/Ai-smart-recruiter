import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './error-handler';
import ClientLayout from '@/components/layout/ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Smart Recruiter',
  description: 'AI-powered recruitment dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body 
        className={`${inter.className} bg-gray-50 h-full`} 
        suppressHydrationWarning
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
