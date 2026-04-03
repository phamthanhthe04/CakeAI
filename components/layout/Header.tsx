import { BaseButton } from '@/components/ui/button';
import { CrownIcon } from '@/components/ui/icon';

export function Header() {
  return (
    <header className='sticky top-0 z-50 h-12.5 w-full border-[#d7e2e6] px-5'>
      <div className='flex h-full w-full items-center justify-end'>
        <div className='flex items-center gap-2'>
          <BaseButton
            text='Nâng cấp'
            icon={<CrownIcon className='text-white' size={14} />}
            variant='primary'
            className='h-7.5! rounded-lg! border-none!'
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
            }}
          />
          <BaseButton
            text='Đăng nhập'
            href='/login'
            variant='outline'
            size='md'
          />
        </div>
      </div>
    </header>
  );
}
