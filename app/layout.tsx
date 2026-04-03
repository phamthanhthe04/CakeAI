import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header } from '@/components';
import { Footer } from '@/components';
import { siteConfig } from '@/lib/constants/site';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='relative h-screen overflow-hidden bg-[#d9e7f1]'>
        <div className='pointer-events-none fixed inset-0 z-0 bg-[#d9e7f1]' />
        <div
          className='pointer-events-none fixed inset-0 z-10'
          style={{
            background:
              'linear-gradient(180deg, rgba(1, 157, 138, 0.25) 0%, rgba(5, 118, 203, 0.15) 40%, rgba(5, 118, 203, 0) 100%)',
          }}
        />
        <div className='relative z-20 flex h-full min-h-0 flex-col'>
          <Header />
          <main className='min-h-0 flex-1 overflow-y-auto'>
            {children}
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}
