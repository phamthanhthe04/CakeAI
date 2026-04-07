'use client';

import { Form, Input, Button, Checkbox } from 'antd';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

export default function RegisterForm() {
  const [form] = Form.useForm();

  return (
    <div className='flex-1 flex justify-center items-center'>
      <div className='w-full max-w-md px-4'>
        {/* Title */}
        <div className='text-center font-medium text-2xl mb-3 lg:mb-6'>
          Đăng ký
        </div>

        <Form
          form={form}
          layout='vertical'
          onFinish={(values) => console.log(values)}
          className='w-full'
        >
          {/* Email */}
          <Form.Item
            name='email'
            rules={[{ required: true, message: 'Vui lòng nhập email' }]}
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
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              className='hover:border-accent'
              style={{
                borderRadius: '8px',
              }}
            />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            name='confirmPassword'
            rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu' }]}
          >
            <Input.Password
              placeholder='Xác nhận mật khẩu'
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
              className='hover:border-accent'
              style={{
                borderRadius: '8px',
              }}
            />
          </Form.Item>

          {/* Forgot password */}
          <div className='forgot-password-link mb-2'>
            <a href='/forgot-password' className='text-sm'>
              Quên mật khẩu
            </a>
          </div>

          {/* Terms & Conditions */}
          <Form.Item
            name='terms'
            valuePropName='checked'
            rules={[
              { required: true, message: 'Vui lòng đồng ý với điều khoản' },
            ]}
          >
            <Checkbox>
              <span className='text-sm'>
                Tôi đồng ý với{' '}
                <Link
                  href='/terms'
                  className='text-accent hover:text-accent/80'
                >
                  Điều khoản dịch vụ
                </Link>{' '}
                và{' '}
                <Link
                  href='/privacy'
                  className='text-accent hover:text-accent/80'
                >
                  Chính sách bảo mật
                </Link>
              </span>
            </Checkbox>
          </Form.Item>

          {/* Submit */}
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
              }}
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>

        {/* Login Google */}
        <div className='mt-3 lg:mt-6'>
          <div className='flex items-center justify-center gap-x-2 cursor-pointer bg-[linear-gradient(90deg,var(--CakeAI-liner-gradient-start-primary-color),var(--CakeAI-liner-gradient-end-primary-color))] py-2 rounded-lg hover:opacity-90 transition-opacity'>
            <div className='bg-white flex justify-center items-center rounded-md w-7 h-7'>
              <Image
                src='/images/images/google.e3b196e3.svg'
                alt=''
                width={20}
                height={20}
              />
            </div>
            <span className='text-white font-semibold'>
              Đăng ký bằng Google
            </span>
          </div>
        </div>

        {/* Sign In Link */}
        <div className='flex items-center justify-center gap-x-1 mt-3 lg:hidden'>
          <span className='italic text-sm'>Đã có tài khoản?</span>
          <Link
            href='/login'
            className='text-accent hover:text-accent/80 font-semibold'
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
