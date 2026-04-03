/**
 * useScrollAnimation Hook
 * Handles scroll-triggered animations with configurable behavior
 */

import { useState, useEffect, useRef } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  /** If true, animation triggers only once. Default: false */
  once?: boolean;
  /** Delay before animation starts (in ms) */
  delay?: number;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.2, once = false, delay = 0 } = options;
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (once && hasAnimated.current) {
              return;
            }

            if (delay > 0) {
              const timer = setTimeout(() => {
                setIsInView(true);
                if (once) {
                  hasAnimated.current = true;
                }
              }, delay);

              return () => clearTimeout(timer);
            } else {
              setIsInView(true);
              if (once) {
                hasAnimated.current = true;
              }
            }
          } else {
            // Only reset if not "once" mode
            if (!once) {
              setIsInView(false);
            }
          }
        });
      },
      { threshold },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, once, delay]);

  return { ref, isInView };
}
