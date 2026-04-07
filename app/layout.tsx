import type { Metadata } from 'next';
import { siteConfig } from '@/lib/constants/site';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
    <html lang='vi' className={`${inter.variable} h-full antialiased`}>
      <body className='relative min-h-screen font-sans text-foreground1'>
        <div className='pointer-events-none fixed inset-0 z-0' />
        <div
          className='absolute w-full -z-10 inset-0 top-0'
          style={{
            maxHeight: '400px',
            height: '400px',
            background:
              'linear-gradient(180deg, rgba(1, 157, 138, 0.25) 0%, rgba(5, 118, 203, 0.15) 40%, rgba(5, 118, 203, 0) 100%)',
          }}
        />
        <div className='relative z-20'>{children}</div>
      </body>
    </html>
  );
}
