'use client';

import {
  loginWithPassword,
  selectIsLoginSubmitting,
  useGoogleLogin,
  selectIsAuthenticated,
} from '@/features/auth';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { LoginRequest } from '@/types';
import { useEffect } from 'react';
import { startRouteLoading } from '@/lib/utils/top-loader';
import { useRouter } from 'next/navigation';

export function useLogin() {
  const dispatch = useAppDispatch();
  const route = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isSubmitting = useAppSelector(selectIsLoginSubmitting);
  const { isGoogleSubmitting, handleGoogleLogin } = useGoogleLogin();
  useEffect(() => {
    if (isAuthenticated) {
      startRouteLoading();
      route.push('/');
    }
  }, [isAuthenticated]);

  const handleSubmit = (payload: LoginRequest) => {
    dispatch(loginWithPassword(payload));
  };

  return {
    isSubmitting,
    isGoogleSubmitting,
    handleGoogleLogin,
    handleSubmit,
  };
}
