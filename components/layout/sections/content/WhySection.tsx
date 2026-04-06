/**
 * Why Component
 * Reasons to choose CakeAI section
 * All items slide up from bottom on scroll
 */

'use client';

import {
  Layers,
  Zap,
  Target,
  Users,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

const reasons = [
  {
    icon: Layers,
    title: 'Nền tảng AI tất cả trong một',
    description: 'Không cần sử dụng nhiều công cụ riêng lẻ',
  },
  {
    icon: Zap,
    title: 'Dễ dùng, không cần kiến thức kỹ thuật',
    description: 'Giao diện thân thiện, trải nghiệm mượt mà',
  },
  {
    icon: Target,
    title: 'Ứng dụng thực tế',
    description: 'Không chỉ trình diễn mà giải quyết vấn đề thực',
  },
  {
    icon: Users,
    title: 'Linh hoạt cho cá nhân và tổ chức',
    description: 'Phù hợp mọi quy mô sử dụng',
  },
  {
    icon: TrendingUp,
    title: 'Sẵn sàng mở rộng theo nhu cầu',
    description: 'Tăng trưởng cùng doanh nghiệp của bạn',
  },
];

const highlights = [
  { icon: CheckCircle, text: 'Hàng nghìn người dùng' },
  { icon: CheckCircle, text: 'Cập nhật liên tục' },
  { icon: CheckCircle, text: 'Hỗ trợ 24/7' },
];

export function WhySection() {
  return (
    <section className='py-20 md:py-28'>
      <div className='container mx-auto px-4 max-w-7xl'>
        {/* Header */}
        <div className='max-w-3xl mx-auto text-center mb-12'>
          <ScrollReveal delay={0}>
            <span className='inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-4'>
              Tại sao chọn CakeAI
            </span>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className='text-3xl md:text-4xl font-bold text-foreground1 mb-4'>
              Lý do lựa chọn
              <span
                style={{
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {' '}
                CakeAI
              </span>
            </h2>
          </ScrollReveal>
        </div>

        <div className='max-w-4xl mx-auto'>
          {/* Reasons Grid */}
          <div className='grid md:grid-cols-2 gap-6 mb-12'>
            {reasons.map((reason, idx) => {
              const Icon = reason.icon;
              return (
                <ScrollReveal
                  key={idx}
                  animation={idx % 2 === 0 ? 'fade-left' : 'fade-right'}
                  delay={idx * 100}
                >
                  <div className='flex items-start gap-4 rounded-xl border-0 border-border p-5 transition-all duration-300 hover:[box-shadow:0_12px_40px_-8px_#00949440]'>
                    <div className='w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0'>
                      <Icon className='w-5 h-5 text-accent' />
                    </div>
                    <div>
                      <h3 className='font-semibold text-foreground1 mb-1'>
                        {reason.title}
                      </h3>
                      <p className='text-muted-foreground text-sm'>
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Highlights */}
          <ScrollReveal animation='fade-up' delay={reasons.length * 100}>
            <div className='mt-12 flex flex-wrap items-center justify-center gap-8'>
              {highlights.map((highlight, idx) => {
                const Icon = highlight.icon;
                return (
                  <div key={idx} className='flex items-center gap-2'>
                    <Icon className='w-5 h-5 text-accent' />
                    <span className='text-foreground1 font-medium'>
                      {highlight.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
