'use client';

import { Button, Form, Input, notification } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGoogleLogin, useRegisterMutation } from '@/features/auth';
import type { RegisterRequest, RegisterFormValues } from '@/types';

function UserIcon() {
  return (
    <svg
      aria-hidden='true'
      focusable='false'
      viewBox='0 0 448 512'
      className='h-3.5 w-5'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fill='currentColor'
        d='M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z'
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      aria-hidden='true'
      focusable='false'
      viewBox='0 0 512 512'
      className='h-3.5 w-5'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fill='currentColor'
        d='M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z'
      />
    </svg>
  );
}

export default function RegisterForm() {
  const [registerMutation, { isLoading: isSubmitting }] = useRegisterMutation();
  const router = useRouter();
  const { isGoogleSubmitting, handleGoogleLogin } = useGoogleLogin({
    onSuccess: () => {},
  });

  const handleSubmit = async (values: RegisterFormValues) => {
    const { confirmPassword, ...rest } = values;

    const payload: RegisterRequest = {
      ...rest,
      agentCode: null,
    };
    try {
      await registerMutation(payload).unwrap();
      router.push('/');
    } catch (error) {
      notification.warning({
        title: 'Notification',
        description:
          error instanceof Error ? error.message : 'Đăng ký thất bại',
        placement: 'topRight',
      });
    }
  };

  return (
    <div className='flex flex-1 items-center justify-center'>
      <div className='w-full px-4 lg:w-100 lg:px-0'>
        <div className='mb-3 text-center text-2xl font-medium lg:mb-6'>
          Đăng ký
        </div>

        <Form layout='vertical' onFinish={handleSubmit} className='w-full'>
          <Form.Item
            name='name'
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input
              id='name'
              placeholder='Nhập họ tên'
              prefix={<UserIcon />}
              style={{ borderRadius: '8px', padding: '6px 11px' }}
            />
          </Form.Item>

          <Form.Item
            name='email'
            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
          >
            <Input
              id='email'
              placeholder='Nhập email'
              prefix={
                <Image
                  src='/images/images/email.webp'
                  alt=''
                  width={20}
                  height={20}
                />
              }
              style={{ borderRadius: '8px', padding: '6px 11px' }}
            />
          </Form.Item>

          <Form.Item
            name='phone'
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
            ]}
          >
            <Input
              id='phone'
              placeholder='Nhập số điện thoại'
              prefix={<PhoneIcon />}
              style={{ borderRadius: '8px', padding: '6px 11px' }}
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              id='password'
              placeholder='Nhập mật khẩu'
              prefix={
                <Image
                  src='/images/images/padlock_white.webp'
                  alt=''
                  width={20}
                  height={20}
                />
              }
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              style={{ borderRadius: '8px', padding: '6px 11px' }}
            />
          </Form.Item>

          <Form.Item
            name='confirmPassword'
            dependencies={['password']}
            rules={[
              { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error('Mật khẩu xác nhận không khớp!'),
                  );
                },
              }),
            ]}
          >
            <Input.Password
              id='confirmPassword'
              placeholder='Nhập lại mật khẩu'
              prefix={
                <Image
                  src='/images/images/padlock_white.webp'
                  alt=''
                  width={20}
                  height={20}
                />
              }
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              style={{ borderRadius: '8px', padding: '6px 11px' }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              loading={isSubmitting}
              block
              style={{
                boxShadow: 'none',
                fontSize: 14,
                fontWeight: 600,
                lineHeight: '16px',
                height: '36px',
                border: 'none',
                borderRadius: 8,
                color: 'rgb(255, 255, 255)',
                background:
                  'linear-gradient(90deg, var(--CakeAI-liner-gradient-start-primary-color) 0%, var(--CakeAI-liner-gradient-end-primary-color) 100%)',
              }}
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
        {/* Login Google */}
        <div>
          <button
            type='button'
            onClick={handleGoogleLogin}
            disabled={isGoogleSubmitting || isSubmitting}
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
            <span className='text-white font-semibold text-sm'>
              {isGoogleSubmitting ? 'Đang xử lý...' : 'Đăng nhập bằng Google'}
            </span>
          </button>
        </div>

        <div className='mt-3 flex items-center justify-center gap-x-1 lg:hidden'>
          <span className='text-sm italic'>Nếu bạn đã có tài khoản?</span>
          <Link href='/login' className='text-sm'>
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
