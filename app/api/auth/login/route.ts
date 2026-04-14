import {
  authProxyUnexpectedErrorResponse,
  proxyAuthPostWithSession,
  sanitizeAuthTokens,
} from '@/lib/server/auth-proxy';
import type { ApiResponse, LoginResponse } from '@/types';

type LoginApiPayload = ApiResponse<LoginResponse>;

function sanitizeUser(data: LoginResponse): LoginResponse {
  return sanitizeAuthTokens(data, ['token', 'accessToken', 'refreshToken']);
}

export async function POST(request: Request) {
  try {
    // Login cho phép backend trả accessToken hoặc token, route sẽ xử lý fallback.
    return await proxyAuthPostWithSession<LoginApiPayload['data']>(request, {
      endpoint: '/api/v3/auth/login',
      missingTokenMessage: 'Không nhận được access token từ phản hồi đăng nhập',
      pickAccessToken: (data) => data?.accessToken ?? data?.token,
      sanitizeData: sanitizeUser,
    });
  } catch {
    return authProxyUnexpectedErrorResponse('Không thể xử lý yêu cầu đăng nhập');
  }
}
