/**
 * Reusable Section Header Component
 * Handles badge, title, and description with scroll animations
 * Reduces code duplication across all sections
 */

import { ReactNode } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SCROLL_ANIMATION_DELAYS as DELAYS } from '@/lib/constants/animations';

interface SectionHeaderProps {
  /** Badge text (optional) */
  badge?: string;
  /** Badge icon (optional) */
  badgeIcon?: ReactNode;
  /** Main title text */
  title: string;
  /** Highlighted portion of title (shown with gradient) */
  titleHighlight: string;
  /** Description text under title */
  description?: string;
  /** Custom delay values (optional, uses defaults if not provided) */
  delays?: {
    badge?: number;
    title?: number;
    desc?: number;
  };
  /** Custom CSS classes for badge */
  badgeClassName?: string;
  /** Custom CSS classes for title */
  titleClassName?: string;
  /** Custom CSS classes for description */
  descriptionClassName?: string;
}

export function SectionHeader({
  badge,
  badgeIcon,
  title,
  titleHighlight,
  description,
  delays = {
    badge: DELAYS.HEADER_BADGE,
    title: DELAYS.HEADER_TITLE,
    desc: DELAYS.HEADER_DESC,
  },
  badgeClassName,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  return (
    <div className='max-w-3xl mx-auto text-center mb-12 space-y-4'>
      {/* Badge */}
      {badge && (
        <ScrollReveal delay={delays.badge}>
          <span
            className={
              badgeClassName ||
              'inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-4'
            }
          >
            {badgeIcon && <span className='mr-2'>{badgeIcon}</span>}
            {badge}
          </span>
        </ScrollReveal>
      )}

      {/* Title with highlight */}
      {title && (
        <ScrollReveal delay={delays.title}>
          <h2
            className={
              titleClassName ||
              'text-3xl md:text-4xl font-bold text-foreground1 mb-4'
            }
          >
            {title}
            <span
              style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {' '}
              {titleHighlight}
            </span>
          </h2>
        </ScrollReveal>
      )}

      {/* Description */}
      {description && (
        <ScrollReveal delay={delays.desc}>
          <p
            className={descriptionClassName || 'text-muted-foreground text-lg'}
          >
            {description}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}
