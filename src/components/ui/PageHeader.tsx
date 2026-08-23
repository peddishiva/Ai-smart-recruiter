import type { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0">
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-700">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl font-bold tracking-normal text-slate-950 sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </div>
  );
}
