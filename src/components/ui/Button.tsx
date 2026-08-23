import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'muted';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  href?: string;
}

type ButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600 shadow-sm',
  secondary: 'bg-white text-slate-900 hover:bg-slate-50 border-slate-200 shadow-sm',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 border-transparent',
  outline: 'bg-white text-slate-700 hover:bg-slate-50 border-slate-300',
  muted: 'bg-slate-100 text-slate-500 border-slate-200',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-sm',
};

export function Button({
  children,
  className,
  variant = 'secondary',
  size = 'md',
  icon,
  href,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  const buttonClassName = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg border font-semibold transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant],
    sizes[size],
    className
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={buttonClassName}>
        {icon}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button type={type} className={buttonClassName} disabled={disabled} {...props}>
      {icon}
      <span>{children}</span>
    </button>
  );
}
