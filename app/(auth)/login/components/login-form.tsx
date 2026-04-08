'use client';

import { App as AntdApp, Form, Input, Button } from 'antd';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login, loginWithGoogle } from '@/services';
import type { LoginRequest } from '@/types';
import { env } from '@/config/env';

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
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

function isGoogleAuthCancelled(response: GoogleTokenResponse): boolean {
  return response.error === 'access_denied';
}

function isGooglePopupClosed(error: GoogleErrorResponse): boolean {
  return error.type === 'popup_closed';
}

export default function LoginForm() {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [isGoogleReady, setIsGoogleReady] = useState(false);
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

  const handleSubmit = async (values: LoginRequest) => {
    try {
      setIsSubmitting(true);

      const loginData = await login(values);

      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', loginData.accessToken);
      }

      router.push('/');
    } catch {
      notification.warning({
        title: 'Notification',
        description: 'Tài khoản hoặc mật khẩu không chính xác',
        placement: 'topRight',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
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
          const loginData = await loginWithGoogle({
            token: googleToken,
            agentCode: null,
          });

          if (typeof window !== 'undefined') {
            localStorage.setItem(
              'accessToken',
              loginData.token || loginData.refreshToken || '',
            );
          }

          router.push('/');
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
  };

  return (
    <div className='flex-1 flex justify-center items-center'>
      <div className='w-full px-4 lg:w-100 lg:px-0'>
        {/* Title */}
        <div className='text-center font-medium text-2xl mb-3 lg:mb-6'>
          Đăng nhập
        </div>

        <Form
          form={form}
          layout='vertical'
          onFinish={handleSubmit}
          className='w-full'
        >
          {/* Email */}
          <Form.Item
            name='email'
            rules={[{ required: true, message: 'Vui lòng nhập tài khoản' }]}
          >
            <Input
              placeholder='Email'
              prefix={
                <Image
                  src='/images/images/email.webp'
                  alt=''
                  width={20}
                  height={20}
                />
              }
              className='hover:border-accent'
              style={{
                borderRadius: '8px',
                padding: '6px 11px',
              }}
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password
              placeholder='Mật khẩu'
              prefix={
                <Image
                  src='/images/images/padlock_white.webp'
                  alt=''
                  width={20}
                  height={20}
                />
              }
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              className='hover:border-accent transition-colors'
              style={{
                borderRadius: '8px',
                padding: '6px 11px',
              }}
            />
          </Form.Item>

          {/* Forgot password */}
          <div className='w-full forgot-password-link mb-2 flex justify-end'>
            <Link
              href='/forgot-password'
              className='text-sm text-[#029697] cursor-pointer'
            >
              Quên mật khẩu
            </Link>
          </div>

          {/* Submit */}
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              loading={isSubmitting}
              block
              style={{
                borderRadius: 8,
                fontWeight: 600,
                background:
                  'linear-gradient(90deg, var(--CakeAI-liner-gradient-start-primary-color), var(--CakeAI-liner-gradient-end-primary-color))',
                border: 'none',
                boxShadow: 'none',
                height: '36px',
              }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        {/* Login Google */}
        <div className=' '>
          <button
            type='button'
            onClick={handleGoogleLogin}
            disabled={isGoogleSubmitting}
            className='w-full flex items-center justify-center gap-x-2 h-9 cursor-pointer bg-[linear-gradient(90deg,var(--CakeAI-liner-gradient-start-primary-color),var(--CakeAI-liner-gradient-end-primary-color))] rounded-lg transition-opacity disabled:opacity-70 disabled:cursor-not-allowed'
          >
            <div className='bg-white flex justify-center items-center rounded-md w-7 h-7'>
              <Image
                src='/images/images/google.e3b196e3.svg'
                alt=''
                width={20}
                height={20}
              />
            </div>
            <span className='text-white text-sm font-semibold'>
              {isGoogleSubmitting ? 'Đang xử lý...' : 'Đăng nhập bằng Google'}
            </span>
          </button>
        </div>

        {/* Register */}
        <div className='flex items-center justify-center gap-x-1 mt-3 lg:hidden'>
          <span className='italic text-sm'>Nếu bạn chưa có tài khoản?</span>
          <Link href='/register' className='text-sm'>
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
}
