'use client';

import { App as AntdApp, Button, Form, Input } from 'antd';
import Image from 'next/image';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { useResetPasswordMutation } from '@/features/auth';
import { getApiErrorMessage } from '@/lib/utils/api-error';
import type { ResetPasswordRequest } from '@/types';
import Link from 'next/link';

type ResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
  otp: string;
};

export default function ResetPasswordForm() {
  const [form] = Form.useForm<ResetPasswordFormValues>();
  const [resetPasswordMutation, { isLoading: isSubmitting }] =
    useResetPasswordMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { notification } = AntdApp.useApp();

  const email = searchParams.get('q') || '';

  const handleSubmit = async (values: ResetPasswordFormValues) => {
    try {
      if (!email) {
        notification.warning({
          title: 'Notification',
          description: 'Thiếu email đặt lại mật khẩu',
          placement: 'topRight',
        });
        return;
      }

      const payload: ResetPasswordRequest = {
        email,
        password: values.password,
        otp: values.otp,
      };

      await resetPasswordMutation(payload).unwrap();

      notification.success({
        title: 'Notification',
        description: 'Đặt lại mật khẩu thành công',
        placement: 'topRight',
      });

      router.push('/login');
    } catch (error) {
      notification.warning({
        title: 'Notification',
        description: getApiErrorMessage(error, 'Đặt lại mật khẩu thất bại'),
        placement: 'topRight',
      });
    }
  };

  return (
    <div className='flex flex-1 items-center justify-center'>
      <div className='w-full px-4 lg:w-100 lg:px-0'>
        <div className='mb-6 text-center text-4xl font-medium'>
          Đặt lại mật khẩu
        </div>

        <Form
          form={form}
          layout='vertical'
          onFinish={handleSubmit}
          className='w-full'
        >
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password
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
              { required: true, message: 'Vui lòng nhập lại mật khẩu' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Mật khẩu xác nhận không khớp'),
                  );
                },
              }),
            ]}
          >
            <Input.Password
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

          <Form.Item
            name='otp'
            rules={[{ required: true, message: 'Vui lòng nhập OTP' }]}
          >
            <Input
              placeholder='Nhập OTP'
              style={{ borderRadius: '8px', padding: '6px 11px' }}
              prefix={
                <Image
                  src='/images/images/padlock_white.webp'
                  alt=''
                  width={20}
                  height={20}
                />
              }
            />
          </Form.Item>

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
              Gửi
            </Button>
          </Form.Item>
        </Form>

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
