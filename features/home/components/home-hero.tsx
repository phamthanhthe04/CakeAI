import { siteConfig } from '@/lib/constants/site';
import { SectionTitle } from '@/components/ui/section-title';

export function HomeHero() {
  return (
    <section className='space-y-6 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950'>
      <SectionTitle
        title={siteConfig.name}
        description={siteConfig.description}
      />

      <div className='space-y-3 text-sm text-zinc-700 dark:text-zinc-200'>
        <p>
          Cấu trúc hiện tại dùng hướng <strong>domain + shared</strong> để tách
          biệt logic nghiệp vụ và UI tái sử dụng.
        </p>
        <p>
          Bạn có thể mở rộng bằng cách thêm module mới trong `features/` mà
          không làm rối `app/`.
        </p>
      </div>
    </section>
  );
}
