'use client';

import Link from 'next/link';

export default function LoginBanner() {
  return (
    <div
      className='flex w-full h-full justify-center items-center text-white relative overflow-hidden'
      style={{
        background: "url('/images/images/bg-register.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Content */}
      <div className='relative z-10 w-fit h-fit max-w-md'>
        <h3 className='text-2xl font-medium mb-4'>Xin chào</h3>

        <div className='mt-2 mb-1'>
          <p
            className='mb-1 text-sm'
            style={{
              marginBottom: '4px',
            }}
          >
            Chúng tôi rất vui mừng chào đón bạn đến với{' '}
            <span className='font-medium'>CakeAI Chat</span>
          </p>
          <p className='mb-1 text-sm'>
            Đây là công cụ AI tốt nhất dành cho bạn
          </p>
        </div>

        <div className='italic underline underline-offset-4 mb-6 text-sm'>
          Nếu bạn đã có tài khoản?
        </div>

        <div className='flex justify-end'>
          <Link href='/login' className='w-fit h-fit'>
            <button
              type='button'
              style={{
                boxShadow: 'none',
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: '16px',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                background:
                  'linear-gradient(90deg, var(--CakeAI-liner-gradient-start-primary-color) 0%, var(--CakeAI-liner-gradient-end-primary-color) 100%)',
                padding: '10px 24px',
              }}
              className='font-medium hover:opacity-90 transition-opacity'
            >
              Đăng nhập ngay
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
