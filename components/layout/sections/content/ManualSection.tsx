/**
 * Mantual Component
 * Step-by-step guide for getting started with CakeAI
 * All content slides up from bottom on scroll
 */

'use client';

import { Badge, CircleCheckBigIcon } from '@/components';
import { SparklesIcon } from '@/components/ui/icon';
import { Play } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

const steps = [
  {
    number: '1',
    title: 'Đăng ký tài khoản miễn phí',
  },
  {
    number: '2',
    title: 'Chọn công cụ AI phù hợp',
  },
  {
    number: '3',
    title: 'Bắt đầu sử dụng ngay lập tức',
  },
  {
    number: '4',
    title: 'Tận hưởng hiệu suất vượt trội',
  },
];

export function ManualSection() {
  return (
    <section className='py-20 bg-[#edf2f24d]'>
      <div className='px-4 mx-auto w-full max-w-[1400px]'>
        {/* Header - Slide up from bottom */}
        <div className='max-w-3xl mx-auto text-center mb-12 space-y-4'>
          <ScrollReveal delay={0}>
            <Badge
              tone='gray'
              text='Hướng dẫn sử dụng'
              icon={<SparklesIcon className='text-accent' size={16} />}
            />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className='text-3xl md:text-4xl font-bold text-foreground1 mb-4'>
              Bắt đầu với CakeAI
              <span
                style={{
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {' '}
                thật đơn giản
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className='text-muted-foreground text-lg'>
              Chỉ cần vài bước đơn giản, bạn đã có thể sử dụng toàn bộ sức mạnh
              AI của CakeAI
            </p>
          </ScrollReveal>
        </div>

        {/* Main Grid */}
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Left - Video Preview */}
          <ScrollReveal animation='fade-left' delay={0}>
            <div className='relative rounded-2xl overflow-hidden aspect-video border-0 border-border bg-[#1c4a4a]'>
              <div className='absolute inset-0 flex items-center justify-center bg-[linear-gradient(to_bottom_right,#00949433,#0094940D)]'>
                <button
                  type='button'
                  className='w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 bg-[#0b7676]'
                >
                  <Play className='w-8 h-8 text-white fill-white ml-1' />
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Steps */}
          <div className='space-y-6'>
            <ScrollReveal animation='fade-right' delay={100}>
              <h3 className='text-2xl font-bold text-foreground1 mb-8'>
                4 bước đơn giản để bắt đầu
              </h3>
            </ScrollReveal>

            {steps.map((step, idx) => (
              <ScrollReveal
                key={idx}
                animation='fade-up'
                delay={200 + idx * 100}
              >
                <div
                  className='flex items-center gap-4 p-4 rounded-xl border border-transparent transition-all duration-300 hover:border-accent'
                  style={{
                    background: 'var(--gradient-card)',
                  }}
                >
                  <div
                    className='shrink-0 w-10 h-10 rounded-full flex items-center justify-center'
                    style={{ background: 'hsl(var(--accent) / 0.1)' }}
                  >
                    <span className='text-accent font-bold text-sm'>
                      {step.number}
                    </span>
                  </div>
                  <p className='text-foreground1 font-medium flex-1 text-sm'>
                    {step.title}
                  </p>
                  <CircleCheckBigIcon className='w-5 h-5 text-accent' />
                </div>
              </ScrollReveal>
            ))}

            {/* Tip */}
            <ScrollReveal animation='fade-up' delay={600}>
              <p className='text-muted-foreground mt-6 rounded-lg'>
                💡 <strong className='text-[#628484]'>Mẹo:</strong> Bạn có thể
                bắt đầu với AI Chat để làm quen, sau đó khám phá các công cụ
                khác như Image AI và Video AI.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
