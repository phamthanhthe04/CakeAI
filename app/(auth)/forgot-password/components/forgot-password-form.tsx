'use client';

import { Button, Form, Input, notification } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { forgotPassword } from '@/services';

type ForgotPasswordFormValues = {
  email: string;
};

export default function ForgotPasswordForm() {
  const [form] = Form.useForm<ForgotPasswordFormValues>();
  const router = useRouter();

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
      <div className='w-full max-w-md px-4'>
        <div className='mb-6 text-center text-4xl font-medium'>
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

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
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
      </div>
    </div>
  );
}
