'use client';

import { ReactNode, InputHTMLAttributes, forwardRef } from 'react';
import Image from 'next/image';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Icon/component/ảnh bên trái */
  leftIcon?: ReactNode;
  /** Icon/component/ảnh bên phải */
  rightIcon?: ReactNode;
  /** Đường dẫn ảnh bên trái (thay thế leftIcon nếu có) */
  leftImage?: string;
  /** Đường dẫn ảnh bên phải (thay thế rightIcon nếu có) */
  rightImage?: string;
  /** Alt text cho ảnh trái */
  leftImageAlt?: string;
  /** Alt text cho ảnh phải */
  rightImageAlt?: string;
  /** Callback khi click icon/ảnh phải */
  onRightIconClick?: () => void;
  /** Callback khi click icon/ảnh trái */
  onLeftIconClick?: () => void;
  /** CSS class cho icon trái */
  leftIconClassName?: string;
  /** CSS class cho icon phải */
  rightIconClassName?: string;
  /** Kích thước ảnh trái (mặc định: 20) */
  leftImageSize?: number;
  /** Kích thước ảnh phải (mặc định: 20) */
  rightImageSize?: number;
}

const BaseInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      leftIcon,
      rightIcon,
      leftImage,
      rightImage,
      leftImageAlt = 'Left icon',
      rightImageAlt = 'Right icon',
      onRightIconClick,
      onLeftIconClick,
      leftIconClassName = 'text-gray-400',
      rightIconClassName = 'text-gray-400',
      leftImageSize = 20,
      rightImageSize = 20,
      className = '',
      ...props
    },
    ref,
  ) => {
    return (
      <div className='relative w-full'>
        {/* Left Icon/Image */}
        {(leftIcon || leftImage) && (
          <div
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center ${
              onLeftIconClick ? 'cursor-pointer hover:opacity-70' : ''
            }`}
            onClick={onLeftIconClick}
            role={onLeftIconClick ? 'button' : undefined}
            tabIndex={onLeftIconClick ? 0 : undefined}
          >
            {leftImage ? (
              <Image
                src={leftImage}
                alt={leftImageAlt}
                width={leftImageSize}
                height={leftImageSize}
                className='object-contain'
              />
            ) : (
              <div className={leftIconClassName}>{leftIcon}</div>
            )}
          </div>
        )}

        {/* Input */}
        <input
          ref={ref}
          className={`w-full ${leftIcon || leftImage ? 'pl-12' : 'pl-4'} ${rightIcon || rightImage ? 'pr-12' : 'pr-4'} border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white transition-all duration-200 ${className}`}
          {...props}
        />

        {/* Right Icon/Image */}
        {(rightIcon || rightImage) && (
          <div
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center ${
              onRightIconClick ? 'cursor-pointer hover:opacity-70' : ''
            }`}
            onClick={onRightIconClick}
            role={onRightIconClick ? 'button' : undefined}
            tabIndex={onRightIconClick ? 0 : undefined}
          >
            {rightImage ? (
              <Image
                src={rightImage}
                alt={rightImageAlt}
                width={rightImageSize}
                height={rightImageSize}
                className='object-contain'
              />
            ) : (
              <div className={rightIconClassName}>{rightIcon}</div>
            )}
          </div>
        )}
      </div>
    );
  },
);

BaseInput.displayName = 'BaseInput';

export { BaseInput };
export type { InputProps };
