/**
 * AI Chat Component
 * Showcase section for AI Chat features with scroll animations
 * Two-column layout: features slide from left, image from right
 * All items slide up from bottom on scroll
 */

'use client';

import {
  Badge,
  SparklesIcon,
  BrainIcon,
  MessageSquareIcon,
  WorkflowIcon,
  FeatureCard,
  OptimizedImage,
  ImageIcon,
  FileTextIcon,
  Link2Icon,
  IconWrapper,
  Layers3Icon,
  GlobeIcon,
} from '@/components';
import { ScrollReveal } from '../../../ScrollReveal';

const features = [
  {
    icon: Layers3Icon,
    title: 'Tích hợp nhiều mô hình AI hàng đầu',
    description:
      'Sử dụng linh hoạt nhiều mô hình AI tiên tiến trong cùng một nền tảng, được cập nhật liên tục.',
    badges: [
      { text: 'Không cần dùng nhiều công cụ rời rạc', icon: SparklesIcon },
      { text: 'Không cần kiến thức kỹ thuật', icon: SparklesIcon },
    ],
  },
  {
    icon: GlobeIcon,
    title: 'Ghi nhớ thông tin làm việc',
    description:
      'Lưu trữ và học hỏi từ các cuộc trò chuyện trước để phục vụ bạn tốt hơn.',
    badges: [
      { text: 'Trả lời chính xác, có cập nhật', icon: SparklesIcon },
      { text: 'Phục vụ nghiên cứu, báo cáo', icon: SparklesIcon },
    ],
  },
  {
    icon: GlobeIcon,
    title: 'Thực hiện theo quy trình',
    description:
      'Không chỉ trả lời câu hỏi mà còn thực hiện công việc theo quy trình được định sẵn.',
    badges: [
      { text: 'Tự động hiểu nội dung', icon: SparklesIcon },
      { text: 'Phản hồi thông minh', icon: SparklesIcon },
    ],
  },
];

const inputTypes = [
  { icon: ImageIcon, text: 'Hình ảnh' },
  { icon: FileTextIcon, text: 'PDF / Word / TXT' },
  { icon: Link2Icon, text: 'Link website' },
];

export function AIChatSection() {
  return (
    <section className='py-20 md:py-28'>
      <div className='container mx-auto px-4 max-w-7xl'>
        {/* Header - Slide up from bottom */}
        <div className='max-w-3xl mx-auto text-center mb-12 space-y-4'>
          <ScrollReveal delay={0}>
            <Badge tone='gray' text='AI Chat' />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className='text-3xl md:text-4xl font-bold text-foreground1 mb-4'>
              Nền tảng trò chuyện AI
              <span
                style={{
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {' '}
                không giới hạn
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className='text-muted-foreground text-lg'>
              CakeAI không chỉ là chatbot thông thường, mà là nền tảng trò
              chuyện AI thông minh phục vụ công việc, học tập và quản lý trong
              thực tế.
            </p>
          </ScrollReveal>
        </div>

        {/* Main Grid */}
        <div className='grid lg:grid-cols-2 gap-12 items-center mb-12'>
          {/* Left - Features - Slide from Left */}
          <div className='space-y-6'>
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <ScrollReveal key={idx} animation='fade-left' delay={idx * 100}>
                  <FeatureCard
                    icon={
                      <IconWrapper variant='gradient'>
                        <Icon className='text-white' size={24} />
                      </IconWrapper>
                    }
                    className='hover:[box-shadow:0_12px_40px_-8px_#00949440]'
                    title={feature.title}
                    description={feature.description}
                    badges={feature.badges.map((badge) => ({
                      text: badge.text,
                      icon: <badge.icon className='text-accent' size={16} />,
                      className: 'border-0',
                      padding: 'none',
                    }))}
                  />
                </ScrollReveal>
              );
            })}
          </div>

          {/* Right - Image - Slide from Right */}
          <ScrollReveal animation='fade-right' delay={0}>
            <OptimizedImage imageKey='chat' maxWidth='448px' />
          </ScrollReveal>
        </div>

        {/* Input Types Support */}
        <ScrollReveal delay={0}>
          <div
            className='rounded-2xl border border-border p-8 md:p-12 text-white'
            style={{
              background: 'hsl(var(--secondary) / 1)',
            }}
          >
            <div className='text-center mb-8'>
              <h3 className='text-2xl font-bold mb-2'>
                Hỗ trợ đa dạng đầu vào
              </h3>
              <p className='text-[#ffffffb3]'>
                Tải lên và phân tích nhiều loại dữ liệu
              </p>
            </div>
            <div className='flex flex-wrap items-center justify-center gap-6'>
              {inputTypes.map((input, idx) => {
                const Icon = input.icon;
                return (
                  <Badge
                    key={idx}
                    text={input.text}
                    tone='teal'
                    textClassName='text-white'
                    padding='lg'
                    className='flex flex-col bg-white/10 rounded-lg hover:bg-white/15 transition-colors min-w-[140px]'
                    icon={
                      <IconWrapper size='lg' variant='gradient'>
                        <Icon className='text-white' size={24} />
                      </IconWrapper>
                    }
                  />
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
