/**
 * Video Component
 * Production-grade video showcase section with scroll animations
 * Two-column layout: features slide from left, video from right
 * Animation only plays once on first scroll into view
 */

'use client';

import { Badge, SparklesIcon, IconWrapper } from '@/components';
import { OptimizedImage } from '@/components';
import { ScrollReveal } from '@/components/ScrollReveal';
import { FilmIcon, WandSparklesIcon } from 'lucide-react';

const features = [
  {
    icon: FilmIcon,
    title: 'Tích hợp nền tảng Video AI hàng đầu',
    description: 'Nhiều công nghệ tạo video AI trong một giao diện duy nhất.',
  },
  {
    icon: WandSparklesIcon,
    title: 'Tạo video từ văn bản hoặc hình ảnh',
    description:
      'Nhập mô tả hoặc tải hình ảnh, CakeAI tạo video AI sinh động, đúng ngữ cảnh.',
  },
  {
    icon: SparklesIcon,
    title: 'Hơn 50 hiệu ứng video AI',
    description:
      'Hiệu ứng ôm, hôn AI, chuyển động nhân vật, video vui nhộn sáng tạo.',
  },
];

const effectBadges = [
  'Hiệu ứng ôm',
  'Hôn AI',
  'Chuyển động nhân vật',
  'Video vui nhộn',
];

export function VideoSection() {
  return (
    <section id='video' className='py-20 md:py-28 bg-muted/30'>
      <div className='container mx-auto px-4 max-w-7xl'>
        {/* Header */}
        <div className='max-w-3xl mx-auto text-center mb-12 space-y-4'>
          <ScrollReveal delay={0}>
            <Badge tone='gray' text='Video AI' />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className='text-3xl md:text-4xl font-bold text-foreground1'>
              Tạo video AI
              <span
                style={{
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {' '}
                tất cả trong một
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className='text-muted-foreground text-lg'>
              Tạo video AI nhanh chóng mà không cần kỹ năng dựng phim hay phần
              mềm phức tạp.
            </p>
          </ScrollReveal>
        </div>

        {/* Features Grid */}
        <div className='grid lg:grid-cols-2 gap-8 items-center'>
          {/* Features List - Fade from left */}
          <div className='space-y-6'>
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <ScrollReveal key={idx} animation='fade-left' delay={idx * 100}>
                  <div
                    className='flex gap-4 rounded-xl border-0 border-border/50 p-5 transition-all duration-300 hover:[box-shadow:0_12px_40px_-8px_#00949440]'
                    style={{
                      background: 'var(--gradient-card)',
                    }}
                  >
                    <IconWrapper size='md' variant='gradient'>
                      <Icon className='text-white' size={24} />
                    </IconWrapper>
                    <div>
                      <h3 className='text-lg font-semibold text-foreground1 mb-1'>
                        {feature.title}
                      </h3>
                      <p className='text-muted-foreground text-sm'>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}

            {/* Effect Badges */}
            <ScrollReveal animation='fade-up' delay={features.length * 100}>
              <div className='flex flex-wrap gap-2 pt-4'>
                {effectBadges.map((badge, idx) => (
                  <Badge
                    key={idx}
                    text={badge}
                    tone='gray'
                    textClassName='text-primary'
                  />
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Video Preview - Fade from right */}
          <ScrollReveal animation='fade-right' delay={0}>
            <div
              className='rounded-2xl border-0 border-border/50 agent_shadowCard__OMD5Z overflow-hidden'
              style={{
                background: 'var(--gradient-card)',
              }}
            >
              {/* Image Container with aspect ratio */}
              <div className='relative w-full overflow-hidden aspect-video'>
                <OptimizedImage
                  imageKey='video'
                  className='w-full h-full object-cover'
                />

                {/* Play Button Overlay */}
                <div className='absolute inset-0 flex items-center justify-center bg-transparent'>
                  <button
                    className='w-20 h-20 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110'
                    style={{
                      background: 'var(--gradient-primary)',
                      boxShadow: '0 0 24px hsl(var(--accent) / 0.45)',
                    }}
                    aria-label='Play video'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='32'
                      height='32'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='text-white ml-1'
                    >
                      <path d='M5 3l14 9-14 9V3z' />
                    </svg>
                  </button>
                </div>

                {/* Badges */}
                <div className='absolute top-4 left-4 bg-primary/80 backdrop-blur-sm rounded-full px-3 py-1'>
                  <span className='text-xs font-medium text-white'>
                    AI Generated
                  </span>
                </div>
                <div className='absolute bottom-4 right-4 flex items-center gap-2 bg-background1/80 backdrop-blur-sm rounded-full px-3 py-1.5'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    className='text-accent'
                  >
                    <path d='m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5' />
                    <rect x='2' y='6' width='14' height='12' rx='2' />
                  </svg>
                  <span className='text-xs font-medium text-foreground1'>
                    4K Quality
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className='p-4 border-t border-border/50'>
                <p className='text-sm text-muted-foreground'>
                  👉 Một nền tảng - nhiều công nghệ Video AI
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
