'use client';

import { useRouter } from 'next/navigation';
import {
  loginWithPassword,
  selectIsLoginSubmitting,
  useAuthFeedback,
  useGoogleLogin,
} from '@/features/auth';
import { startRouteLoading } from '@/lib/utils/top-loader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { LoginRequest } from '@/types';

export function useLogin() {
  const dispatch = useAppDispatch();
  const isSubmitting = useAppSelector(selectIsLoginSubmitting);
  const router = useRouter();
  const { runWithFeedback } = useAuthFeedback();
  const { isGoogleSubmitting, handleGoogleLogin } = useGoogleLogin({
    onSuccess: () => {},
  });

  const login = (values: LoginRequest) => {
    return dispatch(loginWithPassword(values)).unwrap();
  };

  const onSuccess = () => {
    startRouteLoading();
    router.push('/');
  };

  const handleSubmit = (values: LoginRequest) => {
    runWithFeedback(() => login(values), {
      onSuccess,
    });
  };

  return {
    isSubmitting,
    isGoogleSubmitting,
    handleGoogleLogin,
    handleSubmit,
  };
}
