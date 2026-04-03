import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

type BadgeProps = {
  icon?: ReactNode;
  text: string;
  tone?: 'teal' | 'blue' | 'gray' | 'soft';
  className?: string;
  textClassName?: string;
  iconClassName?: string;
};

const toneClassMap: Record<NonNullable<BadgeProps['tone']>, string> = {
  teal: 'bg-teal-100 text-teal-700',
  blue: 'bg-blue-100 text-blue-700',
  gray: 'bg-primary/10 border border-primary/20 text-primary',
  soft: 'bg-white/70 text-[hsl(var(--foreground1))] border border-[hsl(var(--border)/0.5)]',
};

export function Badge({
  icon,
  text,
  tone = 'teal',
  className,
  textClassName,
  iconClassName,
}: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium',
        toneClassMap[tone],
        className,
      )}
    >
      {icon ? (
        <span className={cn('inline-flex shrink-0', iconClassName)}>
          {icon}
        </span>
      ) : null}
      <span className={cn(textClassName)}>{text}</span>
    </div>
  );
}
