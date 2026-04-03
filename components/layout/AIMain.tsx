/**
 * AI Main Component
 * Hero section with main features preview
 * Introduces CakeAI platform at top of page
 */

'use client';

import {
  Badge,
  SparklesIcon,
  ZapIcon,
  BotIcon,
  BaseButton,
  ArrowRightIcon,
  FeatureItem,
} from '@/components';

const featureHighlights = [
  { icon: BotIcon, text: 'AI Agent thông minh' },
  { icon: SparklesIcon, text: 'Tạo ảnh & video AI' },
  { icon: ZapIcon, text: 'Phản hồi tức thì' },
];

export function AIMainSection() {
  return (
    <section className='py-20 md:py-28'>
      <div className='container mx-auto px-4 max-w-7xl'>
        {/* Header */}
        <div className='max-w-3xl mx-auto text-center mb-12 space-y-4'>
          <Badge
            tone='gray'
            icon={<SparklesIcon className='text-accent' size={16} />}
            text='Một tài khoản - nhiều sức mạnh AI'
          />
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-foreground1 leading-tight mb-6 text-center'>
            Nền tảng AI
            <span
              style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              tất cả trong một
            </span>
            <br />
            cho cá nhân & tổ chức
          </h1>
          <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-center'>
            Từ trò chuyện AI, tạo hình ảnh, video đến các AI Agent làm việc theo
            kịch bản. CakeAI giúp bạn tiết kiệm thời gian, nâng cao hiệu suất và
            ra quyết định tốt hơn.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className='flex justify-center gap-4 mb-12'>
          <BaseButton
            text='Trải nghiệm miễn phí'
            size='xl'
            textClassName='text-white text-xl'
            style={{ background: 'var(--gradient-primary)', border: 'none' }}
            icon={<ArrowRightIcon className='text-white' size={16} />}
          />
          <BaseButton
            text='Xem demo'
            variant='outline'
            size='xl'
            className='agent_button'
            textClassName='text-foreground1 text-xl'
          />
        </div>

        {/* Feature Highlights */}
        <div className='flex flex-wrap items-center justify-center gap-6 mb-16'>
          {featureHighlights.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Badge
                key={idx}
                tone='soft'
                text={feature.text}
                textClassName='text-foreground1'
                icon={<Icon className='text-accent' size={20} />}
              />
            );
          })}
        </div>

        {/* Features Preview */}
        <div className='mt-16 relative'>
          <div
            className='rounded-3xl agent_shadowCard__OMD5Z overflow-hidden mx-auto max-w-5xl'
            style={{
              background: 'var(--gradient-card)',
              border: '1px solid hsl(var(--border) / 0.5)',
            }}
          >
            {/* Browser Header */}
            <div
              className='px-4 py-3 flex items-center gap-2'
              style={{
                background: 'hsl(var(--secondary) / 0.05)',
                borderBottom: '1px solid hsl(var(--border) / 0.5)',
              }}
            >
              <div className='w-3 h-3 rounded-full bg-destructive/60'></div>
              <div className='w-3 h-3 rounded-full bg-accent/60'></div>
              <div className='w-3 h-3 rounded-full bg-green-500/60'></div>
            </div>

            {/* Content */}
            <div className='p-6 md:p-10'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {/* AI Chat Feature */}
                <div className='rounded-2xl border border-[hsl(var(--border)/0.5)] bg-white/45 p-5'>
                  <FeatureItem
                    title='AI Chat'
                    icon={<BotIcon className='text-accent' size={18} />}
                  />
                  <div className='space-y-3'>
                    <p className='mt-6 text-[14px] leading-relaxed text-muted-foreground'>
                      Xin chào! Tôi có thể giúp gì cho bạn?
                    </p>
                    <div className='bg-primary/10 rounded-lg p-3 text-sm text-foreground1 ml-4'>
                      Phân tích báo cáo doanh thu Q4
                    </div>
                  </div>
                </div>

                {/* Image AI Feature */}
                <div className='rounded-2xl border border-[hsl(var(--border)/0.5)] bg-white/45 p-5'>
                  <FeatureItem
                    title='Image AI'
                    icon={<SparklesIcon className='text-accent' size={18} />}
                  />
                  <div className='mt-6 flex h-52.5 items-center justify-center rounded-2xl bg-[#b9d8d8]'>
                    <div className='h-16 w-16 rounded-full bg-accent shadow-[0_0_24px_hsl(var(--accent)/0.45)]'></div>
                  </div>
                </div>

                {/* AI Agent Feature */}
                <div className='rounded-2xl border border-[hsl(var(--border)/0.5)] bg-white/45 p-5'>
                  <FeatureItem
                    title='AI Agent'
                    icon={<ZapIcon className='text-accent' size={18} />}
                  />
                  <div className='space-y-2'>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 rounded-full bg-primary'></div>
                      <span className='text-sm text-muted-foreground'>
                        Marketing
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 rounded-full bg-primary'></div>
                      <span className='text-sm text-muted-foreground'>
                        Bán hàng
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 rounded-full bg-primary'></div>
                      <span className='text-sm text-muted-foreground'>
                        CSKH
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
