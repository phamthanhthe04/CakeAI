'use client';

import Link from 'next/link';

export default function LoginBanner() {
  return (
    <div
      className='hidden lg:flex flex-col items-center justify-center p-8 relative overflow-hidden'
      style={{
        background:
          'linear-gradient(135deg, hsl(180, 100%, 29%), hsl(165, 80%, 40%) 50%, hsl(150, 70%, 45%))',
      }}
    >
      {/* Decorative Circles */}
      <div className='absolute top-20 right-20 w-40 h-40 rounded-full bg-white/10 blur-3xl'></div>
      <div className='absolute bottom-20 left-20 w-60 h-60 rounded-full bg-white/5 blur-3xl'></div>

      {/* Content */}
      <div className='relative z-10 text-center text-white max-w-md'>
        {/* Illustration Placeholder */}

        <h3 className='text-3xl font-bold mb-4'>Xin chào</h3>

        <p className='text-lg mb-6 text-white/90'>
          Chúng tôi rất vui mừng chào đón bạn đến với CakeAI Chat. Đây là công
          cụ AI tốt nhất dành cho bạn
        </p>

        <p className='text-sm mb-8 text-white/80'>
          <span className='block mb-2'>Nếu bạn chưa có tài khoản?</span>
          <span className='text-xs text-white/70'>
            Bạn có thể đăng ký để tiếp tục
          </span>
        </p>

        <Link
          href='/register'
          className='inline-block px-6 py-3 bg-white text-accent font-semibold rounded-lg hover:bg-white/90 transition-all duration-300'
        >
          Đăng ký ngay
        </Link>
      </div>
    </div>
  );
}
