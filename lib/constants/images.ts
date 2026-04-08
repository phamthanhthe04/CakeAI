/**
 * Centralized image management system
 * Mô tả: Quản lý toàn bộ ảnh trong ứng dụng từ một nơi
 * - Type-safe paths
 * - Tự động tính toán dimensions
 * - Hỗ trợ next/image tối ưu
 */

type ImageFormat = 'png' | 'webp' | 'jpg' | 'jpeg' | 'svg';
type ImageLoading = 'lazy' | 'eager';

interface ImageConfig {
  path: string;
  alt: string;
  width: number;
  height: number;
  format?: ImageFormat;
  priority?: boolean;
  loading?: ImageLoading;
}

/**
 * Helper: Auto-generate image path từ base folder
 */
const img = (
  name: string,
  alt: string,
  width: number,
  height: number,
  format: ImageFormat = 'png',
  priority = false,
  loading?: ImageLoading,
): ImageConfig => ({
  path: `/images/images/${name}.${format}`,
  alt,
  width,
  height,
  format,
  priority,
  loading,
});

/**
 * Toàn bộ ảnh trong app - dễ scale, type-safe
 * Thêm ảnh mới chỉ cần 1 dòng vào đây
 */
export const IMAGES = {
  // AI Features
  agent: img(
    'ai-agent-BTa9VAc8',
    'AI Agent hỗ trợ công việc thực tế',
    768,
    768,
    'png',
    true,
  ),
  chat: img(
    'ai-chat-og3UO0If',
    'AI Chat - Trò chuyện thông minh',
    768,
    768,
    'png',
  ),
  image: img(
    'ai-image-DEVXHCxY',
    'AI Image - Tạo ảnh từ văn bản',
    768,
    768,
    'webp',
  ),
  video: img(
    'ai-video-CEeZ1INw',
    'AI Video - Tạo video tự động',
    768,
    768,
    'png',
  ),
  thumb_ghibli: img(
    'thumb_ghibli',
    'Hình ảnh phong cách Ghibli',
    400,
    400,
    'webp',
  ),
  thumb_cartoon: img(
    'thumb_cartoon',
    'Hình ảnh phong cách Cartoon',
    400,
    400,
    'webp',
  ),
  thumb_pixar: img(
    'thumb_pixar',
    'Hình ảnh phong cách Pixar',
    400,
    400,
    'webp',
  ),
  thumb_illustration: img(
    'thumb_Illustration',
    'Hình ảnh phong cách Illstration',
    400,
    400,
    'webp',
  ),
  thumb_lego: img('thumb_lego', 'Hình ảnh phong cách Lego', 400, 400, 'webp'),
  thumb_art: img('thumb_art', 'Hình ảnh phong cách Art', 400, 400, 'webp'),
  logo: img('logo', 'Logo CakeAI', 120, 40, 'svg', false, 'eager'),
} as const;

export type ImageKey = keyof typeof IMAGES;
