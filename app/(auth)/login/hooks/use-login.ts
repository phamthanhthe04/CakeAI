'use client';

import { App as AntdApp } from 'antd';
import { useRouter } from 'next/navigation';
import {
  loginWithPassword,
  selectIsLoginSubmitting,
  useGoogleLogin,
} from '@/features/auth';
import { getApiErrorMessage } from '@/lib/utils/api-error';
import { startRouteLoading } from '@/lib/utils/top-loader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { LoginRequest } from '@/types';
import { useEffect } from 'react';

export function useLogin() {
  const dispatch = useAppDispatch();
  const isSubmitting = useAppSelector(selectIsLoginSubmitting);
  const router = useRouter();
  const { notification } = AntdApp.useApp();
  const { isGoogleSubmitting, handleGoogleLogin } = useGoogleLogin();

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
