'use client';

import { App as AntdApp, Form, Input, Button } from 'antd';
import Image from 'next/image';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginWithPassword, useGoogleLogin } from '@/features/auth';
import { getApiErrorMessage } from '@/lib/utils/api-error';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { LoginRequest } from '@/types';

export default function LoginForm() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const isSubmitting = useAppSelector(
    (state) => state.auth.loginStatus === 'loading',
  );
  const router = useRouter();
  const { notification } = AntdApp.useApp();
  const { isGoogleSubmitting, handleGoogleLogin } = useGoogleLogin({
    onSuccess: () => router.push('/'),
  });

  const handleSubmit = async (values: LoginRequest) => {
    try {
      await dispatch(loginWithPassword(values)).unwrap();

      router.push('/');
    } catch (error) {
      notification.warning({
        title: 'Notification',
        description: getApiErrorMessage(
          error,
          'Tài khoản hoặc mật khẩu không chính xác',
        ),
        placement: 'topRight',
      });
    }
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
              Đăng nhập bằng google
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
