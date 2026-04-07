'use client';

import Link from 'next/link';

export default function RegisterBanner() {
  return (
    <div
      className='hidden lg:flex justify-center items-center text-white relative overflow-hidden h-full'
      style={{
        background: "url('/images/images/bg-register.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className='absolute inset-0 bg-black/20' />

      {/* Content */}
      <div className='relative z-10 text-center w-fit h-fit max-w-md'>
        <h3 className='text-2xl font-medium mb-4'>Bắt đầu ngay</h3>

        <div className='mt-2 mb-6'>
          <p className='mb-2'>
            Tham gia hàng triệu người dùng đang sử dụng CakeAI để tăng năng suất
            và sáng tạo
          </p>
        </div>

        <div className='italic underline underline-offset-4 mb-6'>
          Đã có tài khoản?
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
