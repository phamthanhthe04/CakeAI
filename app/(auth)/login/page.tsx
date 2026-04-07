'use client';

import LoginForm from './components/login-form';
import LoginBanner from './components/login-banner';
import { OptimizedImage } from '@/components/ui/optimized-image';

export default function LoginPage() {
  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* Left - Form Section */}
      <div className='flex flex-col bg-white'>
        {/* Logo */}
        <div className='mb-8 lg:justify-start lg:ml-3 py-4'>
          <OptimizedImage
            imageKey='logo'
            maxWidth='189px'
            maxHeight='80px'
            rounded='none'
          />
        </div>

        {/* Form Container */}
        <LoginForm />
      </div>

      {/* Right - Banner Section */}
      <LoginBanner />
    </div>
  );
}
