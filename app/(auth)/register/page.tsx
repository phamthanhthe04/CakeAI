'use client';

import RegisterForm from './components/register-form';
import RegisterBanner from './components/register-banner';
import { OptimizedImage } from '@/components/ui/optimized-image';

export default function RegisterPage() {
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

        {/* Form Container */}
        <RegisterForm />
      </div>

      {/* Right - Banner Section */}
      <RegisterBanner />
    </div>
  );
}
