'use client';

import { OptimizedImage } from '@/components/ui/optimized-image';
import ForgotPasswordForm from './components/forgot-password-form';
import RegisterBanner from '../register/components/register-banner';

export default function ForgotPasswordPage() {
  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* Left - Form Section */}
      <div className='flex flex-col bg-white'>
        {/* Logo */}
        <div className='flex justify-center lg:ml-3 lg:justify-start'>
          <OptimizedImage
            imageKey='logo'
            containerClassName='h-[80px] w-[189px]'
            className='h-full w-full object-contain'
            rounded='none'
          />
        </div>

        <ForgotPasswordForm />
      </div>

      <RegisterBanner />
    </div>
  );
}
