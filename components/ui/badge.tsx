import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

type BadgeProps = {
  icon?: ReactNode;
  text: string;
  tone?: 'teal' | 'blue' | 'gray' | 'soft';
  className?: string;
  textClassName?: string;
  iconClassName?: string;
  padding?: 'none' | 'default' | 'sm' | 'md' | 'lg';
};

const toneClassMap: Record<NonNullable<BadgeProps['tone']>, string> = {
  teal: 'bg-teal-100 text-teal-700',
  blue: 'bg-blue-100 text-blue-700 border-0',
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
  padding = 'default',
}: BadgeProps) {
  const paddingClass = {
    none: 'px-0 py-0',
    default: 'px-4 py-2',
    sm: 'px-3 py-1.5',
    md: 'px-4 py-3',
    lg: 'p-6',
  }[padding];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full text-sm font-medium',
        paddingClass,
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
