/**
 * Scroll Animation Delays Configuration
 * Used consistently across all sections for unified animation timing
 */

export const SCROLL_ANIMATION_DELAYS = {
  // Header animations
  HEADER_BADGE: 0,
  HEADER_TITLE: 100,
  HEADER_DESC: 200,

  // Content animations
  FIRST_ITEM: 300,
  ITEM_STEP: 100,

  // Special animations
  FEATURES_STEP: 50,
  HIGHLIGHTS_DELAY: 300,
} as const;

/**
 * Animation types available in ScrollReveal component
 */
export type AnimationType = 'fade-up' | 'fade-left' | 'fade-right';

/**
 * Common animation presets
 */
export const ANIMATION_PRESETS = {
  // Two-column layouts
  LEFT_COLUMN: 'fade-left',
  RIGHT_COLUMN: 'fade-right',

  // Vertical layouts
  UP: 'fade-up',

  // Alternating (for two-column grids)
  ALTERNATING: (index: number) =>
    index % 2 === 0 ? 'fade-left' : 'fade-right',
} as const;
