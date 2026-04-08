'use client';

import { App as AntdApp, Button, Form, Input } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { forgotPassword } from '@/services';
import Link from 'antd/es/typography/Link';

type ForgotPasswordFormValues = {
  email: string;
};

export default function ForgotPasswordForm() {
  const [form] = Form.useForm<ForgotPasswordFormValues>();
  const router = useRouter();
  const { notification } = AntdApp.useApp();

  const handleSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      const result = await forgotPassword({ email: values.email });
      const nextEmail = result?.email || values.email;
      router.push(`/reset-password?q=${encodeURIComponent(nextEmail)}`);
    } catch {
      notification.warning({
        title: 'Notification',
        description: 'Email không tồn tại trong hệ thống',
        placement: 'topRight',
      });
    }
  };

  return (
    <div className='flex flex-1 items-center justify-center'>
      <div className='w-full px-4 lg:w-100 lg:px-0'>
        <div className='mb-3 text-center text-[24px] font-medium'>
          Quên mật khẩu
        </div>

        <Form
          form={form}
          layout='vertical'
          onFinish={handleSubmit}
          className='w-full'
        >
          <Form.Item
            name='email'
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' },
            ]}
          >
            <Input
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

          <button
            type='submit'
            className='w-full flex items-center justify-center gap-x-2 h-9 cursor-pointer bg-[#029697] hover:opacity-90 rounded-lg transition-opacity disabled:opacity-70 text-white disabled:cursor-not-allowed'
          >
            Gửi
          </button>
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
