import { proxyAuthPostWithSession } from '@/lib/server/auth-proxy';
import type { ApiResponse, GoogleLoginResponse } from '@/types';

type GoogleLoginApiPayload = ApiResponse<GoogleLoginResponse>;

function sanitizeUser(data: GoogleLoginResponse): GoogleLoginResponse {
  return {
    ...data,
    token: undefined,
    refreshToken: undefined,
  };
}

export async function POST(request: Request) {
  try {
    // Google login thành công sẽ set cookie và loại bỏ token trước khi trả về FE.
    return await proxyAuthPostWithSession<GoogleLoginApiPayload['data']>(
      request,
      {
        endpoint: '/api/v1/auth/login-google',
        missingTokenMessage:
          'Missing access token from upstream Google login response',
        pickAccessToken: (data) => data?.token,
        sanitizeData: sanitizeUser,
      },
    );
  } catch {
    return Response.json(
      { message: 'Unable to process Google login request' },
      { status: 500 },
    );
  }
}
