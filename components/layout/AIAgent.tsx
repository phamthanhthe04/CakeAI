/**
 * AI Agent Component
 * Showcase section for AI Agent features with scroll animations
 * Two-column layout: image slides from left, features from right
 * All items slide up from bottom on scroll
 */

'use client';

import {
  Badge,
  BrainIcon,
  MessageSquareIcon,
  WorkflowIcon,
  UserIcon,
  FeatureCard,
  OptimizedImage,
  HeadphonesIcon,
  SettingsIcon,
} from '@/components';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const features = [
  {
    icon: BrainIcon,
    title: 'Hiểu ngữ cảnh sử dụng',
    description:
      'AI Agent hiểu bối cảnh công việc và đưa ra phản hồi phù hợp với từng tình huống cụ thể.',
  },
  {
    icon: MessageSquareIcon,
    title: 'Ghi nhớ thông tin làm việc',
    description:
      'Lưu trữ và học hỏi từ các cuộc trò chuyện trước để phục vụ bạn tốt hơn.',
  },
  {
    icon: WorkflowIcon,
    title: 'Thực hiện theo quy trình',
    description:
      'Không chỉ trả lời câu hỏi mà còn thực hiện công việc theo quy trình được định sẵn.',
  },
];

const useCases = [
  { icon: UserIcon, text: 'Marketing' },
  { icon: MessageSquareIcon, text: 'Bán hàng' },
  { icon: SettingsIcon, text: 'Hành chính - Nhân sự' },
  { icon: HeadphonesIcon, text: 'Chăm sóc khách hàng' },
];

export function AIAgentSection() {
  const { ref: leftRef, isInView: leftInView } = useScrollAnimation({
    threshold: 0.2,
    once: true,
  });
  const { ref: rightRef, isInView: rightInView } = useScrollAnimation({
    threshold: 0.2,
    once: true,
  });
  const { ref: useCasesRef, isInView: useCasesInView } = useScrollAnimation({
    threshold: 0.2,
    once: true,
  });

  return (
    <section className='py-20 md:py-28'>
      <div className='container mx-auto px-4 max-w-7xl'>
        {/* Header - Slide up from bottom */}
        <div
          className='max-w-3xl mx-auto text-center mb-12 space-y-4 opacity-0 transition-all duration-700 ease-out'
          style={{
            animation: 'slideUpOnce 0.8s ease-out forwards',
          }}
        >
          <Badge tone='gray' text='AI Agent' />
          <h2 className='text-3xl md:text-4xl font-bold text-foreground1 mb-4'>
            Trợ lý thông minh cho
            <span
              style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {' '}
              công việc thực tế
            </span>
          </h2>
          <p className='text-muted-foreground text-lg'>
            AI Agent CakeAI giúp cá nhân và tổ chức tự động hóa công việc, tăng
            hiệu suất và ra quyết định hiệu quả hơn mỗi ngày.
          </p>
        </div>

        {/* Main Grid */}
        <div className='grid lg:grid-cols-2 gap-12 items-center mb-12'>
          {/* Left - Image - Slide from Left */}
          <div
            ref={leftRef}
            className='order-2 lg:order-1 transition-all duration-1000 ease-out'
            style={{
              opacity: leftInView ? 1 : 0,
              transform: leftInView ? 'translateX(0)' : 'translateX(-100px)',
            }}
          >
            <OptimizedImage imageKey='agent' />
          </div>

          {/* Right - Features - Slide from Right */}
          <div
            ref={rightRef}
            className='space-y-4 order-1 lg:order-2 transition-all duration-1000 ease-out'
            style={{
              opacity: rightInView ? 1 : 0,
              transform: rightInView ? 'translateX(0)' : 'translateX(100px)',
            }}
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  style={{
                    opacity: rightInView ? 1 : 0,
                    transform: rightInView
                      ? 'translateY(0)'
                      : 'translateY(20px)',
                    transition: `all 0.6s ease-out ${idx * 0.1}s`,
                  }}
                >
                  <FeatureCard
                    icon={<Icon className='text-accent' size={18} />}
                    title={feature.title}
                    description={feature.description}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Use Cases */}
        <div
          ref={useCasesRef}
          className='opacity-0 transition-all duration-700 ease-out'
          style={{
            animation: useCasesInView
              ? 'slideUpOnce 0.8s ease-out forwards'
              : 'none',
          }}
        >
          <div
            className='rounded-2xl border-0 border-border p-8'
            style={{
              background: 'var(--gradient-card)',
            }}
          >
            <h3 className='text-lg font-semibold text-foreground1 mb-6 text-center'>
              Phù hợp cho nhiều lĩnh vực
            </h3>
            <div className='flex flex-wrap items-center justify-center gap-4'>
              {useCases.map((useCase, idx) => {
                const Icon = useCase.icon;
                return (
                  <Badge
                    key={idx}
                    tone='soft'
                    text={useCase.text}
                    textClassName='text-foreground1'
                    icon={<Icon className='text-accent' size={16} />}
                  />
                );
              })}
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
