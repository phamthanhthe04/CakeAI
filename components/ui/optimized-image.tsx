/**
 * OptimizedImage Component
 * Reusable wrapper cho next/image với metadata tập trung
 * - Tự động lấy dimensions từ IMAGES constant
 * - Type-safe image keys
 * - Hỗ trợ custom className
 */

'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils/cn';
import { IMAGES, type ImageKey } from '@/lib/constants/images';

interface OptimizedImageProps {
  imageKey: ImageKey;
  className?: string;
  containerClassName?: string;
  fill?: boolean;
  maxWidth?: string;
  maxHeight?: string;
}

export function OptimizedImage({
  imageKey,
  className,
  containerClassName,
  fill,
  maxWidth,
  maxHeight,
}: OptimizedImageProps) {
  const image = IMAGES[imageKey];

  return (
    <div
      className={cn('relative', containerClassName)}
      style={{
        maxWidth: maxWidth || 'none',
        maxHeight: maxHeight || 'none',
      }}
    >
      <Image
        src={image.path}
        alt={image.alt}
        width={fill ? undefined : image.width}
        height={fill ? undefined : image.height}
        priority={image.priority}
        fill={fill}
        className={cn(
          'rounded-2xl agent_shadowCard__OMD5Z',
          !fill && 'w-full h-full',
          className,
        )}
      />
    </div>
  );
}
