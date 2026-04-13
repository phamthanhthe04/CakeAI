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
  IconWrapper,
} from '@/components';
import { ScrollReveal } from '@/components/ScrollReveal';

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
  return (
    <section className='py-20 md:py-28'>
      <div className='container mx-auto px-4 max-w-7xl'>
        {/* Header - Each item slides up separately */}
        <div className='max-w-3xl mx-auto text-center mb-12 space-y-4'>
          <ScrollReveal delay={0}>
            <Badge tone='gray' text='AI Agent' />
          </ScrollReveal>

          <ScrollReveal delay={100}>
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
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className='text-muted-foreground text-lg'>
              AI Agent CakeAI giúp cá nhân và tổ chức tự động hóa công việc,
              tăng hiệu suất và ra quyết định hiệu quả hơn mỗi ngày.
            </p>
          </ScrollReveal>
        </div>

        {/* Main Grid */}
        <div className='grid lg:grid-cols-2 gap-12 items-center mb-12'>
          {/* Left - Image - Fade from left */}
          <ScrollReveal animation='fade-left' delay={0}>
            <div className='order-2 lg:order-1 mx-auto'>
              <OptimizedImage
                imageKey='agent'
                maxWidth='448px'
                containerClassName='mx-auto'
              />
            </div>
          </ScrollReveal>

          {/* Right - Features - Fade from right */}
          <div className='space-y-4 order-1 lg:order-2'>
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <ScrollReveal
                  key={idx}
                  animation='fade-right'
                  delay={idx * 100}
                >
                  <FeatureCard
                    icon={
                      <IconWrapper
                        variant='gradient'
                        className='group-hover:scale-110 transition-transform duration-300'
                      >
                        <Icon className='text-white ' size={24} />
                      </IconWrapper>
                    }
                    className='group-hover:scale-110 hover:-translate-y-1 hover:[box-shadow:0_12px_40px_-8px_#00949440]'
                    title={feature.title}
                    description={feature.description}
                  />
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Use Cases - Fade up */}
        <ScrollReveal animation='fade-up' delay={0}>
          <div
            className='rounded-2xl border-0 border-border p-8 box-shadow-card hover:shadow-lg transition-shadow duration-300'
            style={{
              background: 'var(--gradient-card)',
            }}
          >
            <h3 className='text-lg font-semibold text-foreground1 mb-6 text-center '>
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
        </ScrollReveal>
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
