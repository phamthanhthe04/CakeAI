import { proxyAuthPost } from '@/lib/server/auth-proxy';

export async function POST(request: Request) {
  try {
    // FE gọi /api/auth/set-password, route này sẽ proxy sang backend /api/v1.
    return await proxyAuthPost(request, '/api/v1/auth/set-password');
  } catch {
    return Response.json(
      { message: 'Unable to process reset password request' },
      { status: 500 },
    );
  }
}
