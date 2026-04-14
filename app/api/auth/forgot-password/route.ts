import { proxyAuthPost } from '@/lib/server/auth-proxy';

export async function POST(request: Request) {
  try {
    // Route nội bộ của Next.js: nhận request từ FE rồi forward sang API thật.
    return await proxyAuthPost(request, '/api/v1/auth/forgot-password');
  } catch {
    return Response.json(
      { message: 'Unable to process forgot password request' },
      { status: 500 },
    );
  }
}
