import type { ReactNode } from 'react';

type SectionTitleProps = {
  title: string;
  description?: ReactNode;
};

export function SectionTitle({ title, description }: SectionTitleProps) {
  return (
    <header className='space-y-2'>
      <h2 className='text-3xl font-bold tracking-tight'>{title}</h2>
      {description ? (
        <p className='text-sm text-zinc-600 dark:text-zinc-300'>
          {description}
        </p>
      ) : null}
    </header>
  );
}
