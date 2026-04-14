import {
  authProxyUnexpectedErrorResponse,
  proxyAuthPost,
} from '@/lib/server/auth-proxy';

export async function POST(request: Request) {
  try {
    // FE gọi /api/auth/set-password, route này sẽ proxy sang backend /api/v1.
    return await proxyAuthPost(request, '/api/v1/auth/set-password');
  } catch {
    return authProxyUnexpectedErrorResponse(
      'Không thể xử lý yêu cầu đặt lại mật khẩu',
    );
  }
}
