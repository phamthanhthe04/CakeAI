// app/layout.tsx
import { Inter } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={inter.variable}>
      <body>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                // Áp dụng font Inter cho toàn bộ hệ thống Antd
                fontFamily: `var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`,

                // (Tùy chọn) Đảm bảo font-size và các thông số khác đồng bộ
                fontSize: 14,
                borderRadius: 6,
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
