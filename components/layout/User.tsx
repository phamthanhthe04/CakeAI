/**
 * User Component
 * Target users section showcasing various use cases
 * All items slide up from bottom on scroll
 */

'use client';

import { useState, useEffect } from 'react';
import {
  ArrowRight,
  User,
  Building2,
  Users,
  GraduationCap,
  ShoppingBag,
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const userTypes = [
  {
    icon: User,
    title: 'Cá nhân làm việc tri thức',
    description: 'Tối ưu công việc hằng ngày với AI thông minh',
  },
  {
    icon: Building2,
    title: 'Chủ doanh nghiệp, nhà quản lý',
    description: 'Ra quyết định nhanh hơn, hiệu quả hơn',
  },
  {
    icon: Users,
    title: 'Phòng ban trong tổ chức',
    description: 'Tự động hóa quy trình nội bộ',
  },
  {
    icon: GraduationCap,
    title: 'Trường học, trung tâm đào tạo',
    description: 'Hỗ trợ giảng dạy và học tập',
  },
  {
    icon: ShoppingBag,
    title: 'Đội ngũ bán hàng, marketing, CSKH',
    description: 'Tăng hiệu suất và chất lượng dịch vụ',
  },
];

export function UserSection() {
  const { ref: containerRef, isInView } = useScrollAnimation({
    threshold: 0.2,
    once: true,
  });

  return (
    <section className='py-20 md:py-28 bg-[#edf2f24d]' ref={containerRef}>
      <div className='container mx-auto px-4 max-w-7xl '>
        {/* Header */}
        <div
          className='max-w-3xl mx-auto text-center mb-12 opacity-0 transition-all duration-700 ease-out'
          style={{
            animation: 'slideUpOnce 0.8s ease-out forwards',
          }}
        >
          <span className='inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-4'>
            Đối tượng sử dụng
          </span>
          <h2 className='text-3xl md:text-4xl font-bold text-foreground1 mb-4'>
            CakeAI phù hợp cho
            <span
              style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {' '}
              mọi người
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {userTypes.map((user, idx) => {
            const Icon = user.icon;
            return (
              <div
                key={idx}
                className='opacity-0 transition-all duration-700 ease-out'
                style={{
                  animation: isInView
                    ? `slideUpOnce 0.8s ease-out forwards ${0.15 + idx * 0.1}s`
                    : 'none',
                }}
              >
                <div
                  className='group rounded-2xl border border-border p-6 transition-all duration-300 hover:shadow-lg'
                  style={{
                    background: 'var(--gradient-card)',
                  }}
                >
                  <div className='flex items-start gap-4'>
                    <div
                      className='w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300'
                      style={{
                        background: 'var(--gradient-primary)',
                      }}
                    >
                      <Icon className='w-6 h-6 text-white' />
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-lg font-semibold text-foreground1 mb-1'>
                        {user.title}
                      </h3>
                      <p className='text-muted-foreground text-sm'>
                        {user.description}
                      </p>
                    </div>
                    <ArrowRight className='w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity' />
                  </div>
                </div>
              </div>
            );
          })}
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
