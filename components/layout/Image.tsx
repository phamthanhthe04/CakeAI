/**
 * Image Component
 * Production-grade image AI showcase section
 * Two-column layout: image slides from left, features from right
 * Animation only plays once on first scroll into view
 */

'use client';

import Image from 'next/image';
import { Badge, IconWrapper } from '@/components';
import { Layers, Palette, RefreshCw } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ImageIcon } from '@/components';
import { OptimizedImage } from '@/components/ui/optimized-image';

const features = [
  {
    icon: Layers,
    title: 'Tích hợp nhiều mô hình tạo ảnh AI',
    imageKey: 'feature_multimodel' as const,
    description:
      'Sử dụng nhiều công nghệ tạo hình ảnh AI tiên tiến trong cùng một nền tảng.',
  },
  {
    icon: Palette,
    title: 'Hơn 80 hiệu ứng & bộ lọc',
    imageKey: 'feature_effects' as const,
    description:
      'Ghibli, Pixar, hoạt hình, Lego, minh họa, chân dung nghệ thuật...',
  },
  {
    icon: RefreshCw,
    title: 'Image-to-Image',
    imageKey: 'feature_imagetoimage' as const,
    description:
      'Tải ảnh lên để thay đổi phong cách, biến đổi bối cảnh, giữ nguyên khuôn mặt.',
  },
];

const styles = [
  {
    name: 'Ghibli',
    imageKey: 'thumb_ghibli' as const,
  },
  {
    name: 'Pixar',
    imageKey: 'thumb_pixar' as const,
  },
  {
    name: 'Hoạt hình',
    imageKey: 'thumb_cartoon' as const,
  },
  {
    name: 'Lego',
    imageKey: 'thumb_lego' as const,
  },
  {
    name: 'Minh họa',
    imageKey: 'thumb_Illustration' as const,
  },
  {
    name: 'Nghệ thuật',
    imageKey: 'thumb_art' as const,
  },
];

const useCases = ['Marketing', 'Thiết kế', 'Giáo dục', 'Mạng xã hội'];

export function ImageSection() {
  const { ref: leftRef, isInView: leftInView } = useScrollAnimation({
    threshold: 0.2,
    once: true,
  });
  const { ref: rightRef, isInView: rightInView } = useScrollAnimation({
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
          <Badge tone='gray' text='Image AI' />
          <h2 className='text-3xl md:text-4xl font-bold text-foreground1'>
            Tạo hình ảnh AI
            <span
              style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {' '}
              sáng tạo
            </span>
          </h2>
          <p className='text-muted-foreground text-lg'>
            Tạo hình ảnh AI chất lượng cao, từ chân thực đến sáng tạo nghệ
            thuật, phù hợp cho cả người mới và chuyên gia.
          </p>
        </div>

        {/* Main Grid */}
        <div className='grid lg:grid-cols-2 gap-8 items-start'>
          {/* Left - Image Preview - Slide from Left */}
          <div
            ref={leftRef}
            className='order-2 lg:order-1 transition-all duration-1000 ease-out'
            style={{
              opacity: leftInView ? 1 : 0,
              transform: leftInView ? 'translateX(0)' : 'translateX(-100px)',
            }}
          >
            <div
              className='rounded-2xl border-0 border-border p-6 overflow-hidden shadow-lg'
              style={{ opacity: 1, transform: 'none' }}
            >
              {/* Main Image */}
              <div className='flex-none gap-2 mb-6'>
                <Badge
                  text='Phong cách có sẵn'
                  textClassName='text-[#1b3232]'
                  icon={<ImageIcon className='text-accent' size={20} />}
                  className='border-0 border-border bg-transparent px-3 py-1.5 text-sm font-medium'
                />
              </div>

              <div className='mb-6 aspect-square relative rounded-xl overflow-hidden'>
                <Image
                  src='/images/images/ai-image-DEVXHCxY.webp'
                  alt='AI Image Generation'
                  width={618}
                  height={618}
                  className='w-full h-full object-cover'
                  priority
                />
              </div>

              {/* Style Thumbnails Grid */}
              <div className='grid grid-cols-3 gap-3'>
                {styles.map((style) => (
                  <div
                    key={style.name}
                    className='group cursor-pointer text-center'
                  >
                    <div className='relative aspect-square rounded-xl overflow-hidden mb-2 group-hover:scale-105 transition-transform duration-300'>
                      <OptimizedImage
                        imageKey={style.imageKey}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <p className='text-sm font-medium text-foreground1'>
                      {style.name}
                    </p>
                  </div>
                ))}
              </div>

              <p className='text-center text-muted-foreground text-sm mt-6'>
                👉 Không cần học nhiều công cụ – chỉ cần CakeAI
              </p>
            </div>
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
            {/* Feature Cards */}
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: 'var(--gradient-card)',
                    opacity: rightInView ? 1 : 0,
                    transform: rightInView
                      ? 'translateY(0)'
                      : 'translateY(20px)',
                    transition: `all 0.6s ease-out ${idx * 0.1}s`,
                  }}
                  className='flex gap-4 rounded-xl border-0 border-border p-5 transition-all duration-300 hover:shadow-lg'
                >
                  <IconWrapper size='md' variant='gradient'>
                    <Icon className='text-white' size={24} />
                  </IconWrapper>
                  <div>
                    <h3 className='text-lg font-semibold text-foreground1 mb-1'>
                      {feature.title}
                    </h3>
                    <p className='text-muted-foreground text-sm'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Use Cases */}
            <div
              style={{
                background: 'hsl(var(--accent) / 0.05)',
                opacity: rightInView ? 1 : 0,
                transform: rightInView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-out 0.3s',
              }}
              className='rounded-xl border border-solid border-[#00949433] p-5'
            >
              <p className='text-sm font-medium text-foreground1 mb-3'>
                Phù hợp cho:
              </p>
              <div className='flex flex-wrap gap-2'>
                {useCases.map((useCase) => (
                  <span
                    key={useCase}
                    className='bg-white rounded-full px-3 py-1 text-sm text-foreground1 border-0 border-border'
                  >
                    {useCase}
                  </span>
                ))}
              </div>
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
