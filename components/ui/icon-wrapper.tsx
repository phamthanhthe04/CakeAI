/**
 * IconWrapper - Icon với background tùy chọn
 * Support 3 kích thước: 32px, 48px, 56px
 * Mặc định không có background
 */

import type { CSSProperties, ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

type IconWrapperProps = {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg'; // 32px, 48px, 56px
  variant?: 'gradient' | 'solid' | 'outline' | 'soft' | 'none';
  className?: string;
};

const sizeMap = {
  sm: 'w-8 h-8', // 32px
  md: 'w-12 h-12', // 48px
  lg: 'w-14 h-14', // 56px
};

const variantMap = {
  gradient: 'solid',
  solid: 'bg-primary',
  outline: 'border-2 border-primary',
  soft: 'bg-primary/10 border border-primary/20',
  none: '',
};

const variantStyle: Record<string, CSSProperties> = {
  gradient: {
    background: 'var(--gradient-primary)',
  },
};

export function IconWrapper({
  children,
  size = 'md',
  variant = 'none',
  className,
}: IconWrapperProps) {
  const variantClass = variantMap[variant];
  const style = variantStyle[variant];

  return (
    <div
      className={cn(
        'rounded-xl flex items-center justify-center shrink-0',
        sizeMap[size],
        variant !== 'gradient' && variantClass,
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
