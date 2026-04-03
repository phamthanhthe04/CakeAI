/**
 * Experience Component
 * Call-to-action section with feature highlights
 */

import { Zap, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { BaseButton } from '@/components/ui/button';

const features = [
  { icon: Zap, text: 'Tối ưu công việc' },
  { icon: TrendingUp, text: 'Tăng hiệu suất' },
  { icon: Sparkles, text: 'Ứng dụng AI thực tế' },
];

export function ExperienceSection() {
  const sectionVisibleStyle = { opacity: 1, transform: 'none' as const };

  return (
    <section className='relative overflow-hidden'>
      {/* Background Gradients */}
      <div className='absolute inset-0 overflow-hidden'>
        <div
          className='absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl'
          style={{
            background: 'hsl(var(--accent) / 0.1)',
          }}
        ></div>
        <div
          className='absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl'
          style={{
            background: 'hsl(var(--accent) / 0.08)',
          }}
        ></div>
      </div>

      <div
        className='container mx-auto px-4 relative z-10 bg-[#1c4a4a]'
        style={{
          padding: '3rem 2rem',
        }}
      >
        <div className='max-w-3xl mx-auto text-center'>
          {/* Badge */}
          <div style={sectionVisibleStyle}>
            <span className='inline-block bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm'>
              Sẵn sàng trải nghiệm
            </span>
          </div>

          {/* Heading */}
          <div style={sectionVisibleStyle}>
            <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6'>
              Bắt đầu sử dụng CakeAI ngay hôm nay
            </h2>
          </div>

          {/* Subheading */}
          <div style={sectionVisibleStyle}>
            <p className='text-lg text-white/80 mb-8'>
              CakeAI – AI làm việc cùng bạn, mỗi ngày.
            </p>
          </div>

          {/* Features */}
          <div style={sectionVisibleStyle}>
            <div className='flex flex-wrap items-center justify-center gap-6 mb-10'>
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className='flex items-center gap-2'>
                    <div className='w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm'>
                      <Icon className='w-4 h-4 text-white' />
                    </div>
                    <span className='text-white font-medium'>
                      {feature.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={sectionVisibleStyle}>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
              <BaseButton
                text='Trải nghiệm miễn phí'
                size='xl'
                textClassName='text-white text-lg'
                className='bg-white text-accent hover:bg-white/90'
                style={{
                  background: 'var(--gradient-primary)',
                  border: 'none',
                }}
                icon={<ArrowRight className='text-accent' size={20} />}
              />
              <BaseButton
                text='Liên hệ tư vấn'
                size='xl'
                textClassName='text-white text-lg'
                className='border-2 border-white/50 text-white bg-[#f9fbfbcc] hover:bg-white/10 backdrop-blur-sm'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
