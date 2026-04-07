import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

import { Badge } from './badge';
import { FeatureItem } from './feature-item';

type BadgeItem = {
  text: string;
  icon?: ReactNode;
  className?: string;
  padding?: 'default' | 'none';
};

type FeatureCardProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  badges?: BadgeItem[];
  className?: string;
};

export function FeatureCard({
  icon,
  title,
  description,
  badges,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        'group rounded-xl border border-[#e7eff3] bg-white p-6 shadow-sm transition-all duration-300',
        className,
      )}
    >
      <FeatureItem
        direction='col'
        align='start'
        icon={icon}
        title={title}
        description={description}
      />
      {badges && badges.length > 0 && (
        <div className='mt-4 flex flex-col gap-2'>
          {badges.map((badge, idx) => (
            <Badge
              key={idx}
              text={badge.text}
              icon={badge.icon}
              tone='soft'
              textClassName='text-foreground1 text-sm'
              className={badge.className}
              padding={badge.padding}
            />
          ))}
        </div>
      )}
    </div>
  );
}
