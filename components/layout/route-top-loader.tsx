'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ROUTE_LOADING_START_EVENT,
  startGlobalLoading,
  stopGlobalLoading,
  subscribeGlobalLoading,
} from '@/lib/utils/top-loader';

const LOADER_FALLBACK_TIMEOUT = 4000;

export default function RouteTopLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const isFirstRenderRef = useRef(true);
  const progressIntervalRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);
  const routeTimeoutRef = useRef<number | null>(null);
  const isRoutePendingRef = useRef(false);

  const clearRouteTimeout = useCallback(() => {
    if (routeTimeoutRef.current !== null) {
      window.clearTimeout(routeTimeoutRef.current);
      routeTimeoutRef.current = null;
    }
  }, []);

  const clearProgressInterval = useCallback(() => {
    if (progressIntervalRef.current !== null) {
      window.clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const clearHideTimeout = useCallback(() => {
    if (hideTimeoutRef.current !== null) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const beginRouteLoading = useCallback(() => {
    if (isRoutePendingRef.current) {
      return;
    }

    isRoutePendingRef.current = true;
    startGlobalLoading();

    clearRouteTimeout();
    routeTimeoutRef.current = window.setTimeout(() => {
      if (!isRoutePendingRef.current) return;

      isRoutePendingRef.current = false;
      stopGlobalLoading();
      routeTimeoutRef.current = null;
    }, LOADER_FALLBACK_TIMEOUT);
  }, [clearRouteTimeout]);

  const startVisualLoading = useCallback(() => {
    clearHideTimeout();

    setIsLoading(true);

    setProgress((prev) => (prev > 0 ? prev : 8));

    if (progressIntervalRef.current !== null) {
      return;
    }

    progressIntervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          return prev;
        }

        if (prev < 30) return prev + 10;
        if (prev < 60) return prev + 6;
        if (prev < 80) return prev + 3;
        return prev + 1;
      });
    }, 200);
  }, [clearHideTimeout]);

  const stopVisualLoading = useCallback(() => {
    clearHideTimeout();
    clearProgressInterval();

    setProgress(100);

    hideTimeoutRef.current = window.setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
      hideTimeoutRef.current = null;
    }, 220);
  }, [clearHideTimeout, clearProgressInterval]);

  useEffect(() => {
    const unsubscribe = subscribeGlobalLoading((pendingCount) => {
      if (pendingCount > 0) {
        startVisualLoading();
      } else {
        stopVisualLoading();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [startVisualLoading, stopVisualLoading]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a');

      if (!anchor) return;
      if (anchor.target === '_blank') return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;

      const href = anchor.getAttribute('href');
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')
      ) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;

      const current = `${window.location.pathname}${window.location.search}`;
      const next = `${destination.pathname}${destination.search}`;

      if (current === next) return;

      beginRouteLoading();
    };

    document.addEventListener('click', handleDocumentClick, true);

    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, [beginRouteLoading]);

  useEffect(() => {
    const handleProgrammaticRouteStart = () => {
      beginRouteLoading();
    };

    window.addEventListener(
      ROUTE_LOADING_START_EVENT,
      handleProgrammaticRouteStart,
    );

    return () => {
      window.removeEventListener(
        ROUTE_LOADING_START_EVENT,
        handleProgrammaticRouteStart,
      );
    };
  }, [beginRouteLoading]);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    if (!isRoutePendingRef.current) {
      return;
    }

    isRoutePendingRef.current = false;
    clearRouteTimeout();
    stopGlobalLoading();
  }, [clearRouteTimeout, pathname, searchParams]);

  useEffect(() => {
    return () => {
      clearProgressInterval();
      clearHideTimeout();
      clearRouteTimeout();

      if (isRoutePendingRef.current) {
        isRoutePendingRef.current = false;
        stopGlobalLoading();
      }
    };
  }, [clearHideTimeout, clearProgressInterval, clearRouteTimeout]);

  return (
    <div className={`route-top-loader-wrap ${isLoading ? 'is-active' : ''}`}>
      <div className='route-top-loader' style={{ width: `${progress}%` }} />
    </div>
  );
}
