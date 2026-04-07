'use client';

import RegisterForm from './components/register-form';
import RegisterBanner from './components/register-banner';

export default function RegisterPage() {
  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* Left - Form Section */}
      <div className='flex flex-col p-6 lg:p-8 bg-white'>
        {/* Logo */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-accent'>CakeAI</h1>
        </div>

        {/* Form Container */}
        <RegisterForm />
      </div>

      {/* Right - Banner Section */}
      <RegisterBanner />
    </div>
  );
}
