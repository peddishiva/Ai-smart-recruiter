import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

type BadgeVariant =
  | 'neutral'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'demo'
  | 'score';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  neutral: 'border-slate-200 bg-slate-50 text-slate-700',
  primary: 'border-blue-200 bg-blue-50 text-blue-700',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  warning: 'border-amber-200 bg-amber-50 text-amber-700',
  danger: 'border-red-200 bg-red-50 text-red-700',
  demo: 'border-violet-200 bg-violet-50 text-violet-700',
  score: 'border-blue-200 bg-blue-600 text-white',
};

export function Badge({ className, variant = 'neutral', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold leading-none',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
