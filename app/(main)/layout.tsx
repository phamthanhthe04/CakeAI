import { Header } from '@/components';
import { Footer } from '@/components';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className='min-h-0 flex-1 overflow-y-auto'>
        {children}
        <Footer />
      </main>
    </>
  );
}
