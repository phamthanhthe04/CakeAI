/**
 * Why Component
 * Reasons to choose CakeAI section
 * All items slide up from bottom on scroll
 */

'use client';

import { useState, useEffect } from 'react';
import {
  Layers,
  Zap,
  Target,
  Users,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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
  const sectionVisibleStyle = { opacity: 1, transform: 'none' as const };

  return (
    <section className='py-20 md:py-28'>
      <div className='container mx-auto px-4 max-w-7xl'>
        {/* Header */}
        <div className='max-w-3xl mx-auto text-center mb-12'>
          <div style={sectionVisibleStyle}>
            <span className='inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-4'>
              Tại sao chọn CakeAI
            </span>
          </div>
          <div style={sectionVisibleStyle}>
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
          </div>
        </div>

        <div className='max-w-4xl mx-auto'>
          {/* Reasons Grid */}
          <div className='grid md:grid-cols-2 gap-6 mb-12'>
            {reasons.map((reason, idx) => {
              const Icon = reason.icon;
              return (
                <div key={idx} style={sectionVisibleStyle}>
                  <div
                    className='flex items-start gap-4 rounded-xl border border-border p-5 transition-all duration-300 hover:shadow-lg'
                    style={{
                      background: 'var(--gradient-card)',
                    }}
                  >
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
                </div>
              );
            })}
          </div>

          {/* Highlights */}
          <div style={sectionVisibleStyle}>
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
          </div>
        </div>
      </div>
    </section>
  );
}
