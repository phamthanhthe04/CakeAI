import {
  authProxyUnexpectedErrorResponse,
  proxyAuthPost,
} from '@/lib/server/auth-proxy';

export async function POST(request: Request) {
  try {
    // Route nội bộ của Next.js: nhận request từ FE rồi chuyển tiếp sang API thật.
    return await proxyAuthPost(request, '/api/v1/auth/forgot-password');
  } catch {
    return authProxyUnexpectedErrorResponse(
      'Không thể xử lý yêu cầu quên mật khẩu',
    );
  }
}
