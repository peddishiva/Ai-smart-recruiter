import { cn } from '@/lib/utils/cn';
import { getMatchScoreLabel } from '../utils/candidateFilters';

type MatchScoreSize = 'sm' | 'md' | 'lg';

interface MatchScoreProps {
  score: number;
  size?: MatchScoreSize;
  showMeter?: boolean;
  className?: string;
}

const scoreStyles = {
  strong: {
    text: 'text-emerald-700',
    bg: 'bg-emerald-600',
    ring: 'border-emerald-200 bg-emerald-50',
  },
  good: {
    text: 'text-blue-700',
    bg: 'bg-blue-600',
    ring: 'border-blue-200 bg-blue-50',
  },
  potential: {
    text: 'text-amber-700',
    bg: 'bg-amber-500',
    ring: 'border-amber-200 bg-amber-50',
  },
  weak: {
    text: 'text-red-700',
    bg: 'bg-red-600',
    ring: 'border-red-200 bg-red-50',
  },
};

const sizeClasses: Record<MatchScoreSize, { score: string; label: string; padding: string }> = {
  sm: {
    score: 'text-lg',
    label: 'text-xs',
    padding: 'px-3 py-2',
  },
  md: {
    score: 'text-2xl',
    label: 'text-sm',
    padding: 'px-4 py-3',
  },
  lg: {
    score: 'text-4xl',
    label: 'text-base',
    padding: 'px-5 py-4',
  },
};

function getStyleKey(score: number): keyof typeof scoreStyles {
  if (score >= 90) {
    return 'strong';
  }

  if (score >= 80) {
    return 'good';
  }

  if (score >= 70) {
    return 'potential';
  }

  return 'weak';
}

export default function MatchScore({
  score,
  size = 'md',
  showMeter = true,
  className,
}: MatchScoreProps) {
  const label = getMatchScoreLabel(score);
  const style = scoreStyles[getStyleKey(score)];
  const sizing = sizeClasses[size];

  return (
    <div
      className={cn('rounded-lg border', style.ring, sizing.padding, className)}
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={score}
      aria-label={`${score} percent demo match score, ${label}`}
    >
      <div className="flex items-baseline gap-2">
        <span className={cn('font-bold leading-none', style.text, sizing.score)}>{score}%</span>
        <span className={cn('font-semibold', style.text, sizing.label)}>{label}</span>
      </div>
      {showMeter && (
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/80" aria-hidden="true">
          <div className={cn('h-full rounded-full', style.bg)} style={{ width: `${score}%` }} />
        </div>
      )}
    </div>
  );
}
