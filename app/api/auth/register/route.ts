import {
  authProxyUnexpectedErrorResponse,
  proxyAuthPostWithSession,
  sanitizeAuthTokens,
} from '@/lib/server/auth-proxy';
import type { ApiResponse, RegisterResponse } from '@/types';

type RegisterApiPayload = ApiResponse<RegisterResponse>;

function sanitizeUser(data: RegisterResponse): RegisterResponse {
  return sanitizeAuthTokens(data, ['token', 'refreshToken']);
}

export async function POST(request: Request) {
  try {
    // Register thành công sẽ set cookie ở server, client không cần giữ token thô.
    return await proxyAuthPostWithSession<RegisterApiPayload['data']>(request, {
      endpoint: '/api/v1/auth/register',
      missingTokenMessage: 'Không nhận được access token từ phản hồi đăng ký',
      pickAccessToken: (data) => data?.token,
      sanitizeData: sanitizeUser,
    });
  } catch {
    return authProxyUnexpectedErrorResponse('Không thể xử lý yêu cầu đăng ký');
  }
}
