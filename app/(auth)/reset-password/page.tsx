'use client';

import { OptimizedImage } from '@/components/ui/optimized-image';
import RegisterBanner from '../register/components/register-banner';
import ResetPasswordForm from './components/reset-password-form';

export default function ResetPasswordPage() {
  return (
    <div className='grid min-h-screen lg:grid-cols-2'>
      <div className='flex flex-col bg-white'>
        <div className='mb-8 py-4 lg:ml-3 lg:justify-start'>
          <OptimizedImage
            imageKey='logo'
            maxWidth='189px'
            maxHeight='80px'
            rounded='none'
          />
        </div>

        <ResetPasswordForm />
      </div>

      <RegisterBanner />
    </div>
  );
}
