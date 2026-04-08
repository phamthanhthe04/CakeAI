'use client';

import { Button, Form, Input, notification } from 'antd';
import Image from 'next/image';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useSearchParams } from 'next/navigation';

type ResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
  otp: string;
};

export default function ResetPasswordForm() {
  const [form] = Form.useForm<ResetPasswordFormValues>();
  const searchParams = useSearchParams();

  const handleSubmit = async () => {
    notification.success({
      title: 'Notification',
      description: 'Đã nhận thông tin đặt lại mật khẩu',
      placement: 'topRight',
    });
  };

  return (
    <div className='flex flex-1 items-center justify-center'>
      <div className='w-full max-w-md px-4'>
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

        {searchParams.get('q') ? (
          <p className='text-xs text-muted-foreground text-center'>
            Email xác thực: {searchParams.get('q')}
          </p>
        ) : null}
      </div>
    </div>
  );
}
