import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils/cn';
import { ICONS, type IconKey } from '@/lib/constants/icons';

type IconBaseProps = {
  icon: LucideIcon;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export function IconBase({
  icon: Icon,
  size = 16,
  strokeWidth = 2,
  className,
}: IconBaseProps) {
  return (
    <Icon
      size={size}
      strokeWidth={strokeWidth}
      className={cn('shrink-0', className)}
      aria-hidden='true'
    />
  );
}

/**
 * Generic icon component - type-safe, flexible
 * Dùng: <Icon iconKey='crown' size={20} className='text-blue-500' />
 */
interface IconProps {
  iconKey: IconKey;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function Icon({ iconKey, size, strokeWidth, className }: IconProps) {
  const config = ICONS[iconKey];
  return (
    <IconBase
      icon={config.component}
      size={size ?? config.defaultSize}
      strokeWidth={strokeWidth ?? config.defaultStrokeWidth}
      className={className}
    />
  );
}

/**
 * Convenience exports - backward compatibility
 * Auto-generated từ ICONS constant
 */

export function CrownIcon({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  return <Icon iconKey='crown' size={size} className={className} />;
}

export function SparklesIcon({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  return <Icon iconKey='sparkles' size={size} className={className} />;
}

export function LayersIcon({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  return <Icon iconKey='layers' size={size} className={className} />;
}

export function CheckIcon({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  return <Icon iconKey='check' size={size} className={className} />;
}

export function ArrowRightIcon({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  return <Icon iconKey='arrowRight' size={size} className={className} />;
}

export function BotIcon({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  return <Icon iconKey='bot' size={size} className={className} />;
}

export function ZapIcon({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  return <Icon iconKey='zap' size={size} className={className} />;
}

export function BrainIcon({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  return <Icon iconKey='brain' size={size} className={className} />;
}

export function MessageSquareIcon({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  return <Icon iconKey='messageSquare' size={size} className={className} />;
}

export function WorkflowIcon({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  return <Icon iconKey='workflow' size={size} className={className} />;
}

export function UserIcon({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  return <Icon iconKey='user' size={size} className={className} />;
}

export function SettingsIcon({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  return <Icon iconKey='settings' size={size} className={className} />;
}

export function HeadphonesIcon({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  return <Icon iconKey='headphones' size={size} className={className} />;
}

export function Layers3Icon({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  return <Icon iconKey='layers3' size={size} className={className} />;
}

export function GlobeIcon({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  return <Icon iconKey='globe' size={size} className={className} />;
}

export function ImageIcon({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  return <Icon iconKey='image' size={size} className={className} />;
}

export function FileTextIcon({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  return <Icon iconKey='fileText' size={size} className={className} />;
}

export function Link2Icon({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  return <Icon iconKey='link2' size={size} className={className} />;
}

export function CircleCheckBigIcon({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  return <Icon iconKey='circleCheckBig' size={size} className={className} />;
}

export const ICON_COMPONENTS = {
  crown: CrownIcon,
  sparkles: SparklesIcon,
  layers: LayersIcon,
  check: CheckIcon,
  arrowRight: ArrowRightIcon,
  bot: BotIcon,
  zap: ZapIcon,
  brain: BrainIcon,
  messageSquare: MessageSquareIcon,
  workflow: WorkflowIcon,
  user: UserIcon,
  settings: SettingsIcon,
  headphones: HeadphonesIcon,
  layers3: Layers3Icon,
  globe: GlobeIcon,
  image: ImageIcon,
  fileText: FileTextIcon,
  link2: Link2Icon,
};
