/**
 * Mantual Component
 * Step-by-step guide for getting started with CakeAI
 * All content slides up from bottom on scroll
 */

'use client';

import { useState, useEffect } from 'react';
import { Badge, CircleCheckBigIcon } from '@/components';
import { SparklesIcon } from '@/components/ui/icon';
import { Play } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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

export function MantualSection() {
  const { ref: containerRef, isInView } = useScrollAnimation({
    threshold: 0.2,
    once: true,
  });

  return (
    <section className='py-20 bg-[#edf2f24d]' ref={containerRef}>
      <div className='container mx-auto px-4 max-w-7xl'>
        {/* Header - Slide up from bottom */}
        <div
          className='max-w-3xl mx-auto text-center mb-12 space-y-4 opacity-0 transition-all duration-700 ease-out'
          style={{
            animation: 'slideUpOnce 0.8s ease-out forwards',
          }}
        >
          <Badge
            tone='gray'
            text='Hướng dẫn sử dụng'
            icon={<SparklesIcon className='text-accent' size={16} />}
          />
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
          <p className='text-muted-foreground text-lg'>
            Chỉ cần vài bước đơn giản, bạn đã có thể sử dụng toàn bộ sức mạnh AI
            của CakeAI
          </p>
        </div>

        {/* Main Grid */}
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Left - Video Preview */}
          <div
            className='opacity-0 transition-all duration-700 ease-out'
            style={{
              animation: isInView
                ? 'slideUpOnce 0.8s ease-out forwards 0.2s'
                : 'none',
            }}
          >
            <div className='relative rounded-2xl overflow-hidden aspect-video border border-border'>
              <div
                className='absolute inset-0 flex items-center justify-center'
                style={{
                  background:
                    'linear-gradient(to bottom right, hsl(var(--accent) / 0.2), hsl(var(--accent) / 0.05))',
                }}
              >
                <button
                  type='button'
                  className='w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110'
                  style={{
                    background: 'var(--gradient-primary)',
                  }}
                >
                  <Play className='w-8 h-8 text-white fill-white ml-1' />
                </button>
              </div>
            </div>
          </div>

          {/* Right - Steps */}
          <div className='space-y-6'>
            <div
              className='opacity-0 transition-all duration-700 ease-out'
              style={{
                animation: isInView
                  ? 'slideUpOnce 0.8s ease-out forwards 0.15s'
                  : 'none',
              }}
            >
              <h3 className='text-2xl font-bold text-foreground1 mb-8'>
                4 bước đơn giản để bắt đầu
              </h3>
            </div>

            {steps.map((step, idx) => (
              <div
                key={idx}
                className='opacity-0 transition-all duration-700 ease-out'
                style={{
                  animation: isInView
                    ? `slideUpOnce 0.8s ease-out forwards ${0.2 + idx * 0.1}s`
                    : 'none',
                }}
              >
                <div
                  className='flex items-center gap-4 p-4 rounded-xl border border-border transition-all duration-300 hover:border-accent'
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
                  <p className='text-foreground1 font-medium flex-1'>
                    {step.title}
                  </p>
                  <CircleCheckBigIcon className='w-5 h-5 text-accent' />
                </div>
              </div>
            ))}

            {/* Tip */}
            <div
              className='opacity-0 transition-all duration-700 ease-out'
              style={{
                animation: isInView
                  ? `slideUpOnce 0.8s ease-out forwards ${0.6}s`
                  : 'none',
              }}
            >
              <p className='text-muted-foreground mt-6 rounded-lg'>
                💡 <strong className='text-[#628484]'>Mẹo:</strong> Bạn có thể
                bắt đầu với AI Chat để làm quen, sau đó khám phá các công cụ
                khác như Image AI và Video AI.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUpOnce {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
