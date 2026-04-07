/**
 * Experience Component
 * Call-to-action section with feature highlights
 */

'use client';

import { Zap, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { BaseButton } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ScrollReveal';

const features = [
  { icon: Zap, text: 'Tối ưu công việc' },
  { icon: TrendingUp, text: 'Tăng hiệu suất' },
  { icon: Sparkles, text: 'Ứng dụng AI thực tế' },
];

export function ExperienceSection() {
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
          <ScrollReveal delay={0}>
            <span className='inline-block bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm'>
              Sẵn sàng trải nghiệm
            </span>
          </ScrollReveal>

          {/* Heading */}
          <ScrollReveal delay={100}>
            <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6'>
              Bắt đầu sử dụng CakeAI ngay hôm nay
            </h2>
          </ScrollReveal>

          {/* Subheading */}
          <ScrollReveal delay={200}>
            <p className='text-lg text-white/80 mb-8'>
              CakeAI – AI làm việc cùng bạn, mỗi ngày.
            </p>
          </ScrollReveal>

          {/* Features */}
          <ScrollReveal delay={300}>
            <div className='flex flex-wrap items-center justify-center gap-6 mb-10'>
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className='flex items-center gap-2'>
                    <div className='w-8 h-8 rounded-lg bg-[#00949433] flex items-center justify-center backdrop-blur-sm'>
                      <Icon className='w-4 h-4 text-white' />
                    </div>
                    <span className='text-white font-medium'>
                      {feature.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

          {/* CTA Buttons */}
          <ScrollReveal delay={400}>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
              <BaseButton
                text='Trải nghiệm miễn phí'
                size='xl'
                textClassName='text-white text-lg'
                className='text-accent bg-white hover:bg-white/90 hover:scale-105 active:scale-100'
                iconPosition='right'
                style={{
                  background: 'var(--gradient-primary)',
                  border: 'none',
                }}
                icon={<ArrowRight className='text-white' size={20} />}
              />
              <BaseButton
                text='Liên hệ tư vấn'
                size='xl'
                textClassName='text-white text-lg group-hover:text-accent'
                className='border-2 border-white/50 text-white bg-[#f9fbfbcc] hover:border-accent backdrop-blur-sm'
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
