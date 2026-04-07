import { Header } from '@/components';
import { Footer } from '@/components';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative h-screen overflow-hidden'>
      <div
        className='pointer-events-none fixed inset-0 z-0'
        data-testid='main-gradient-base'
      />
      <div
        className='pointer-events-none fixed inset-0 z-10'
        data-testid='main-gradient-overlay'
        style={{
          background:
            'linear-gradient(180deg, rgba(1, 157, 138, 0.25) 0%, rgba(5, 118, 203, 0.15) 40%, rgba(5, 118, 203, 0) 100%)',
        }}
      />
      <div className='fixed bottom-2 right-2 z-60 rounded bg-black/70 px-2 py-1 text-xs text-white'>
        MAIN_LAYOUT_ACTIVE
      </div>
      <div className='relative z-20 flex h-full min-h-0 flex-col'>
        <div data-testid='main-header-mounted'>
          <Header />
        </div>
        <main className='min-h-0 flex-1 overflow-y-auto'>
          {children}
          <div data-testid='main-footer-mounted'>
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
