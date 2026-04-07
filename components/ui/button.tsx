import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

import { cn } from '@/lib/utils/cn';

type BaseStyleProps = {
  text: string;
  icon?: ReactNode;
  className?: string;
  textClassName?: string;
  iconClassName?: string;
  variant?: 'primary' | 'outline' | 'none';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  iconPosition?: 'left' | 'right';
};

type ButtonModeProps = BaseStyleProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkModeProps = BaseStyleProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
    href: string;
  };

export type BaseButtonProps = ButtonModeProps | LinkModeProps;

const baseClassName =
  'cursor-pointer group inline-flex items-center justify-center gap-2 rounded-2xl border text-xs font-semibold leading-4 select-none transition-all duration-300';

const variantClassMap: Record<
  NonNullable<BaseButtonProps['variant']>,
  string
> = {
  primary:
    'border-transparent text-white shadow-none hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400',
  outline:
    'border-[#e0e2e5] bg-white text-[#375375d9] hover:bg-[#f9f9f9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300',
  none: '',
};

const sizeClassMap: Record<NonNullable<BaseButtonProps['size']>, string> = {
  xs: 'h-6 px-2 text-[11px]',
  sm: 'h-7 px-2.5 text-xs',
  md: 'h-[30px] px-3 text-xs',
  lg: 'h-9 px-4 text-sm',
  xl: 'h-14 px-6 text-sm',
};

export function BaseButton({
  text,
  icon,
  className,
  textClassName,
  iconClassName,
  variant = 'none',
  size = 'md',
  iconPosition = 'left',
  ...rest
}: BaseButtonProps) {
  const mergedClassName = cn(
    baseClassName,
    variantClassMap[variant],
    sizeClassMap[size],
    className,
  );
  const primaryBackgroundStyle =
    variant === 'primary'
      ? {
          background:
            'linear-gradient(90deg, var(--CakeAI-liner-gradient-start-primary-color) 0%, var(--CakeAI-liner-gradient-end-primary-color) 100%)',
        }
      : undefined;

  const iconEl = icon ? (
    <span className={cn('inline-flex shrink-0', iconClassName)}>{icon}</span>
  ) : null;

  const textEl = (
    <span
      className={cn(
        'font-semibold leading-4 select-none whitespace-nowrap',
        textClassName,
      )}
    >
      {text}
    </span>
  );

  const content =
    iconPosition === 'right' ? (
      <>
        {textEl}
        {iconEl}
      </>
    ) : (
      <>
        {iconEl}
        {textEl}
      </>
    );

  if ('href' in rest && typeof rest.href === 'string') {
    const { href, style, ...anchorProps } = rest;

    return (
      <a
        href={href}
        className={mergedClassName}
        style={{ ...primaryBackgroundStyle, ...(style ?? {}) }}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  const { type = 'button', style, ...buttonProps } = rest;

  return (
    <button
      type={type}
      className={mergedClassName}
      style={{ ...primaryBackgroundStyle, ...(style ?? {}) }}
      {...buttonProps}
    >
      {content}
    </button>
  );
}
