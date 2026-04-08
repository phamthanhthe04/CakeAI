'use client';

import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';

type AnimationType =
  | 'fade-up'
  | 'fade-left'
  | 'fade-right'
  | 'fade-scale'
  | 'fade';

type ScrollRevealProps = {
  children: ReactNode;
  delay?: number;
  threshold?: number;
  animation?: AnimationType;
  duration?: number;
};

const animationVariants: Record<
  AnimationType,
  { hidden: string; visible: string }
> = {
  'fade-up': {
    hidden: 'opacity-0 translate-y-12',
    visible: 'opacity-100 translate-y-0',
  },
  'fade-left': {
    hidden: 'opacity-0 -translate-x-12',
    visible: 'opacity-100 translate-x-0',
  },
  'fade-right': {
    hidden: 'opacity-0 translate-x-12',
    visible: 'opacity-100 translate-x-0',
  },
  'fade-scale': {
    hidden: 'opacity-0 scale-95',
    visible: 'opacity-100 scale-100',
  },
  fade: {
    hidden: 'opacity-0',
    visible: 'opacity-100',
  },
};

export function ScrollReveal({
  children,
  delay = 0,
  threshold = 0.2,
  animation = 'fade-up',
  duration = 700,
}: ScrollRevealProps) {
  // Animation disabled - renders children directly without animation effects
  // To re-enable animations, comment out this return and uncomment the animation code below
  // return <div>{children}</div>;

  // Original animation code (commented out for disable mode):

  const { ref, isVisible } = useInView(threshold);
  const variant = animationVariants[animation];

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all will-change-transform',
        isVisible ? variant.visible : variant.hidden,
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {children}
    </div>
  );
}
