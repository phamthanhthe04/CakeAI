# CakeAI Next.js Structure

Cấu trúc dự án được tổ chức theo hướng **App Router + Domain Modules** để dễ mở rộng, dễ onboard, và dễ bảo trì.

## Cấu trúc thư mục

```text
app/
	globals.css
	layout.tsx
	page.tsx

components/
	layout/
		page-container.tsx
	ui/
		section-title.tsx
	index.ts

features/
	home/
		components/
			home-hero.tsx
		index.ts
	index.ts

lib/
	constants/
		site.ts
	utils/
		cn.ts
	index.ts

services/
	api/
		client.ts
	index.ts

config/
	env.ts

types/
	app.ts
	index.ts
```

## Quy ước maintainable

- `app/`: chỉ giữ file routing/conventions của Next (`page`, `layout`, `loading`, `error`, `route`).
- `features/`: chứa logic theo domain nghiệp vụ (ví dụ `home`, `auth`, `blog`).
- `components/`: UI dùng chung, không chứa business logic.
- `lib/`: constants và utility thuần.
- `services/`: gateway giao tiếp API/external systems.
- `types/`: type dùng lại toàn app.
- `index.ts` (barrel): export tập trung để import ngắn và nhất quán.

## Cách thêm module mới

Ví dụ thêm module `blog`:

1. Tạo `features/blog/components/` và `features/blog/index.ts`.
2. Tạo route trong `app/blog/page.tsx`.
3. Đặt API call vào `services/api/`.
4. Type shared đặt trong `types/` hoặc local trong `features/blog/types`.

## Chạy dự án

```bash
npm install
npm run dev
```

Mở `http://localhost:3000` để xem kết quả.
