import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <main
      className={cn('relative z-10 mx-auto w-full max-w-330 px-4', className)}
    >
      {children}
    </main>
  );
}
