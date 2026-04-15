import {
  authProxyUnexpectedErrorResponse,
  proxyAuthPostWithSession,
  sanitizeAuthTokens,
} from '@/lib/server/auth-proxy';
import type { ApiResponse, GoogleLoginResponse } from '@/types';

type GoogleLoginApiPayload = ApiResponse<GoogleLoginResponse>;

function sanitizeUser(data: GoogleLoginResponse): GoogleLoginResponse {
  return sanitizeAuthTokens(data, ['token', 'refreshToken']);
}

export async function POST(request: Request) {
  try {
    // Google login thành công sẽ set cookie và loại bỏ token trước khi trả về FE.
    return await proxyAuthPostWithSession<GoogleLoginApiPayload['data']>(
      request,
      {
        endpoint: '/api/v1/auth/login-google',
        missingTokenMessage:
          'Không nhận được access token từ phản hồi đăng nhập Google',
        pickAccessToken: (data) =>
          (data as { accessToken?: string }).accessToken ?? data?.token,
        sanitizeData: sanitizeUser,
      },
    );
  } catch {
    return authProxyUnexpectedErrorResponse(
      'Không thể xử lý yêu cầu đăng nhập Google',
    );
  }
}
