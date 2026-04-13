/**
 * Icon Management System - Tập trung, dễ scale
 * Quản lý toàn bộ icon từ một nơi, type-safe
 */

import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Bot,
  Brain,
  Check,
  Crown,
  Layers,
  Sparkles,
  Zap,
  MessageSquare,
  Workflow,
  User,
  Settings,
  Headphones,
  Layers3,
  Globe,
  Image,
  FileText,
  Link2,
  CircleCheckBig,
} from 'lucide-react';

interface IconConfig {
  component: LucideIcon;
  defaultSize?: number;
  defaultStrokeWidth?: number;
}

/**
 * Helper: Tạo icon config
 */
const createIcon = (
  component: LucideIcon,
  defaultSize = 16,
  defaultStrokeWidth = 2,
): IconConfig => ({
  component,
  defaultSize,
  defaultStrokeWidth,
});

/**
 * Toàn bộ icon trong app - type-safe, dễ quản lý
 * Thêm icon mới chỉ cần 1 dòng vào đây
 */
export const ICONS = {
  crown: createIcon(Crown, 14, 2.2),
  sparkles: createIcon(Sparkles, 16, 2),
  layers: createIcon(Layers, 16, 2),
  check: createIcon(Check, 16, 2),
  arrowRight: createIcon(ArrowRight, 16, 2),
  bot: createIcon(Bot, 16, 2),
  zap: createIcon(Zap, 16, 2),
  brain: createIcon(Brain, 16, 2),
  messageSquare: createIcon(MessageSquare, 16, 2),
  workflow: createIcon(Workflow, 16, 2),
  user: createIcon(User, 16, 2),
  settings: createIcon(Settings, 16, 2),
  headphones: createIcon(Headphones, 16, 2),
  layers3: createIcon(Layers3, 16, 2),
  globe: createIcon(Globe, 16, 2),
  image: createIcon(Image, 16, 2),
  fileText: createIcon(FileText, 16, 2),
  link2: createIcon(Link2, 16, 2),
  circleCheckBig: createIcon(CircleCheckBig, 24, 2.5),
} as const;

export type IconKey = keyof typeof ICONS;
