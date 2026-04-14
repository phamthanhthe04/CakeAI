import { proxyAuthPostWithSession } from '@/lib/server/auth-proxy';
import type { ApiResponse, RegisterResponse } from '@/types';

type RegisterApiPayload = ApiResponse<RegisterResponse>;

function sanitizeUser(data: RegisterResponse): RegisterResponse {
  return {
    ...data,
    token: undefined,
    refreshToken: undefined,
  };
}

export async function POST(request: Request) {
  try {
    // Register thành công sẽ set cookie ở server, client không cần giữ token thô.
    return await proxyAuthPostWithSession<RegisterApiPayload['data']>(request, {
      endpoint: '/api/v1/auth/register',
      missingTokenMessage: 'Missing access token from upstream register response',
      pickAccessToken: (data) => data?.token,
      sanitizeData: sanitizeUser,
    });
  } catch {
    return Response.json(
      { message: 'Unable to process register request' },
      { status: 500 },
    );
  }
}
