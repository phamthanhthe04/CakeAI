/**
 * Footer Component
 * Production-grade footer with proper styling and structure
 */

import Image from 'next/image';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { label: 'AI Agent', href: '#' },
    { label: 'AI Chat', href: '#' },
    { label: 'Video AI', href: '#' },
    { label: 'Image AI', href: '#' },
  ];

  const companyLinks = [
    { label: 'Về chúng tôi', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Liên hệ', href: '#' },
    { label: 'Tuyển dụng', href: '#' },
  ];

  const supportLinks = [
    { label: 'Hướng dẫn', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Điều khoản', href: '/privacy-policy' },
    { label: 'Chính sách', href: '/terms-of-use' },
  ];

  return (
    <footer className='py-16'>
      <div className='w-full px-4 mx-auto'>
        {/* Main Grid */}
        <div className='grid md:grid-cols-4 gap-12 pb-12'>
          {/* Brand Section */}
          <div>
            <div className='flex items-center gap-2 mb-4'>
              <Image
                src='https://app.cakeai.vn/logo.svg'
                alt='CakeAI'
                width={120}
                height={40}
                style={{ objectFit: 'contain', maxHeight: '40px' }}
              />
            </div>
            <p className='text-muted-foreground text-sm'>
              Nền tảng AI tất cả trong một cho cá nhân và tổ chức.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className='font-semibold text-foreground1 mb-4'>Sản phẩm</h4>
            <ul className='space-y-2'>
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className='text-muted-foreground hover:text-foreground1 transition-colors text-sm'
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className='font-semibold text-foreground1 mb-4'>Công ty</h4>
            <ul className='space-y-2'>
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className='text-muted-foreground hover:text-foreground1 transition-colors text-sm'
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className='font-semibold text-foreground1 mb-4'>Hỗ trợ</h4>
            <ul className='space-y-2'>
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className='text-muted-foreground hover:text-foreground1 transition-colors text-sm'
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Company Info Grid */}
        <div className='py-10 border-y border-border grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* 84Soft */}
          <div className='bg-white border border-border rounded-xl p-6 space-y-3'>
            <div className='font-bold text-accent uppercase text-sm'>
              Chủ sở hữu
            </div>
            <div className='flex items-center gap-3'>
              <div className='bg-black rounded-lg px-3 py-2 text-white font-bold shrink-0'>
                +84<span className='text-accent'>Soft</span>
              </div>
              <div className='text-foreground1 font-medium text-sm'>
                Công ty Cổ Phần Công Nghệ
                <br />
                Và Đầu Tư 84Soft
              </div>
            </div>
            <div className='text-muted-foreground text-sm space-y-2'>
              <p>
                📍 Tòa nhà 24T2, Phố Hoàng Đạo Thúy, P. Trung Hòa, Q. Cầu Giấy,
                TP. Hà Nội
              </p>
              <p>
                📞 Hotline:{' '}
                <a
                  href='tel:0901676262'
                  className='text-accent hover:underline'
                >
                  0901 676 262
                </a>
              </p>
            </div>
          </div>

          {/* ITS */}
          <div className='bg-white border border-border rounded-xl p-6 space-y-3'>
            <div className='font-bold text-accent uppercase text-sm'>
              Đối tác triển khai chiến lược
            </div>
            <div className='flex items-center gap-3'>
              <div
                className='rounded-lg px-3 py-2 font-black text-xl shrink-0 border border-border'
                style={{
                  color: '#e87722',
                  background:
                    'linear-gradient(135deg, #fff5ec 0%, #ffffff 100%)',
                }}
              >
                ITS
              </div>
              <div className='text-foreground1 font-medium text-sm'>
                Công ty Cổ Phần Giải Pháp Công Nghệ
                <br />
                Thông Tin Quốc Tế (ITS)
              </div>
            </div>
            <div className='text-muted-foreground text-sm space-y-2'>
              <p>
                📍 Tầng 03, Tòa N01-T3, Ngoại Giao Đoàn, Đ. Hoàng Minh Thảo, P.
                Xuân Đỉnh, Hà Nội
              </p>
              <p>
                📧{' '}
                <a
                  href='mailto:info@interits.com'
                  className='text-accent hover:underline'
                >
                  info@interits.com
                </a>{' '}
                ·{' '}
                <a
                  href='mailto:vugialuyen@interits.com'
                  className='text-accent hover:underline'
                >
                  vugialuyen@interits.com
                </a>
              </p>
              <p>
                📞 Hotline:{' '}
                <a
                  href='tel:0962510265'
                  className='text-accent hover:underline'
                >
                  0962 510 265
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-4 pt-6'>
          <p className='text-sm text-muted-foreground'>
            © {currentYear} CakeAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
