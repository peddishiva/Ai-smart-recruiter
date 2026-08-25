'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { DemoApplicationRecord } from '@/types';

interface DemoApplicationContextValue {
  applications: DemoApplicationRecord[];
  addApplication: (record: DemoApplicationRecord) => void;
  getApplicationsForJob: (jobId: string) => DemoApplicationRecord[];
}

const DemoApplicationContext = createContext<DemoApplicationContextValue | undefined>(undefined);

export function DemoApplicationProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<DemoApplicationRecord[]>([]);

  const addApplication = useCallback((record: DemoApplicationRecord) => {
    setApplications((current) => {
      if (current.some((item) => item.applicationId === record.applicationId)) {
        return current.map((item) =>
          item.applicationId === record.applicationId ? record : item
        );
      }

      return [record, ...current];
    });
  }, []);

  const getApplicationsForJob = useCallback(
    (jobId: string) => applications.filter((application) => application.jobId === jobId),
    [applications]
  );

  const value = useMemo(
    () => ({
      applications,
      addApplication,
      getApplicationsForJob,
    }),
    [addApplication, applications, getApplicationsForJob]
  );

  return (
    <DemoApplicationContext.Provider value={value}>{children}</DemoApplicationContext.Provider>
  );
}

export function useDemoApplications() {
  const context = useContext(DemoApplicationContext);

  if (!context) {
    throw new Error('useDemoApplications must be used inside DemoApplicationProvider');
  }

  return context;
}

export function useDemoApplicationsForJob(jobId: string) {
  const { getApplicationsForJob } = useDemoApplications();

  return useMemo(() => getApplicationsForJob(jobId), [getApplicationsForJob, jobId]);
}
