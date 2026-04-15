'use client';

import { App as AntdApp } from 'antd';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { env } from '@/config/env';
import { useLoginWithGoogleMutation } from '@/features/auth';

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
};

type GoogleErrorResponse = {
  type?: string;
};

type GoogleTokenClient = {
  requestAccessToken: (overrideConfig?: { prompt?: string }) => void;
};

declare global {
  interface Window {
    google?: {
      accounts?: {
        oauth2?: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: GoogleTokenResponse) => void;
            error_callback?: (error: GoogleErrorResponse) => void;
          }) => GoogleTokenClient;
        };
      };
    };
  }
}

type UseGoogleLoginOptions = {
  onSuccess?: () => void;
};

function isGoogleAuthCancelled(response: GoogleTokenResponse): boolean {
  return response.error === 'access_denied';
}

function isGooglePopupClosed(error: GoogleErrorResponse): boolean {
  return error.type === 'popup_closed';
}

export function useGoogleLogin(options?: UseGoogleLoginOptions) {
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [isGoogleReady, setIsGoogleReady] = useState(false);
  const [loginWithGoogleMutation] = useLoginWithGoogleMutation();
  const router = useRouter();
  const { notification } = AntdApp.useApp();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (window.google?.accounts?.oauth2) {
      setIsGoogleReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => setIsGoogleReady(true);
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleLoginSuccess = useCallback(() => {
    if (options?.onSuccess) {
      options.onSuccess();
      return;
    }

    router.push('/');
  }, [options, router]);

  const handleGoogleLogin = useCallback(() => {
    if (!env.googleClientId) {
      notification.warning({
        title: 'Notification',
        description: 'Thiếu NEXT_PUBLIC_GOOGLE_CLIENT_ID để đăng nhập Google',
        placement: 'topRight',
      });
      return;
    }

    if (!isGoogleReady || !window.google?.accounts?.oauth2) {
      notification.warning({
        title: 'Notification',
        description: 'Google login chưa sẵn sàng, vui lòng thử lại',
        placement: 'topRight',
      });
      return;
    }

    setIsGoogleSubmitting(true);

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: env.googleClientId,
      scope: 'openid email profile',
      callback: async (response: GoogleTokenResponse) => {
        const googleToken = response.access_token;

        if (!googleToken) {
          setIsGoogleSubmitting(false);

          if (isGoogleAuthCancelled(response)) {
            return;
          }

          notification.warning({
            title: 'Notification',
            description: 'Không nhận được token Google',
            placement: 'topRight',
          });
          return;
        }

        try {
          await loginWithGoogleMutation({
            token: googleToken,
            agentCode: null,
          }).unwrap();

          handleLoginSuccess();
        } catch {
          notification.warning({
            title: 'Notification',
            description: 'Đăng nhập Google thất bại',
            placement: 'topRight',
          });
        } finally {
          setIsGoogleSubmitting(false);
        }
      },
      error_callback: (error: GoogleErrorResponse) => {
        setIsGoogleSubmitting(false);

        if (isGooglePopupClosed(error)) {
          return;
        }

        notification.warning({
          title: 'Notification',
          description: 'Không thể mở popup Google',
          placement: 'topRight',
        });
      },
    });

    tokenClient.requestAccessToken({ prompt: 'select_account' });
  }, [
    handleLoginSuccess,
    isGoogleReady,
    loginWithGoogleMutation,
    notification,
  ]);

  return {
    isGoogleSubmitting,
    isGoogleReady,
    handleGoogleLogin,
  };
}
