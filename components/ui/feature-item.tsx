import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

export type FeatureItemProps = {
  icon?: ReactNode;
  title?: string;
  description?: string;
  direction?: 'row' | 'col';
  align?: 'start' | 'center';
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function FeatureItem({
  icon,
  title,
  description,
  direction = 'row',
  align = 'center',
  className,
  titleClassName,
  descriptionClassName,
}: FeatureItemProps) {
  return (
    <div
      className={cn(
        'flex gap-3',
        direction === 'col' ? 'flex-col' : 'flex-row',
        align === 'center' ? 'items-center' : 'items-start',
        className,
      )}
    >
      {icon ? <div className='shrink-0'>{icon}</div> : null}

      <div>
        {title ? (
          <p className={cn('font-semibold text-slate-900', titleClassName)}>
            {title}
          </p>
        ) : null}
        {description ? (
          <p
            className={cn(
              'text-sm leading-6 text-slate-500',
              descriptionClassName,
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
