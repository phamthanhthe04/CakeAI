import { siteConfig } from '@/lib/constants/site';
import { SectionTitle } from '@/components/ui/section-title';

export function HomeHero() {
  return (
    <section className='space-y-6 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950'>
      <SectionTitle
        title={siteConfig.name}
        description={siteConfig.description}
      />
    </section>
  );
}
