'use client';

import { Form, Input, Button } from 'antd';
import { useState } from 'react';
import Image from 'next/image';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

export default function LoginForm() {
  const [form] = Form.useForm();

  return (
    <div className='flex-1 flex justify-center items-center'>
      <div className='w-full max-w-md px-4'>
        {/* Title */}
        <div className='text-center font-medium text-2xl mb-3 lg:mb-6'>
          Đăng nhập
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
              className='hover:border-accent transition-colors'
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
                height: '36px',
              }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        {/* Login Google */}
        <div className='mt-3 '>
          <div className='flex items-center justify-center gap-x-2 h-9 cursor-pointer bg-[linear-gradient(90deg,var(--CakeAI-liner-gradient-start-primary-color),var(--CakeAI-liner-gradient-end-primary-color))] rounded-lg hover:opacity-90 transition-opacity'>
            <div className='bg-white flex justify-center items-center rounded-md w-7 h-7'>
              <Image
                src='/images/images/google.e3b196e3.svg'
                alt=''
                width={20}
                height={20}
              />
            </div>
            <span className='text-white font-semibold'>
              Đăng nhập bằng Google
            </span>
          </div>
        </div>

        {/* Register */}
        <div className='flex items-center justify-center gap-x-1 mt-3 lg:hidden'>
          <span className='italic text-sm'>Nếu bạn chưa có tài khoản?</span>
          <a
            href='/register'
            className='text-accent hover:text-accent/80 font-semibold'
          >
            Đăng ký
          </a>
        </div>
      </div>
    </div>
  );
}
