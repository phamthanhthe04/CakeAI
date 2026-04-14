import { NextResponse } from 'next/server';
import { proxyAuthPostWithSession } from '@/lib/server/auth-proxy';
import type { ApiResponse, LoginResponse } from '@/types';

type LoginApiPayload = ApiResponse<LoginResponse>;

function sanitizeUser(data: LoginResponse): LoginResponse {
  return {
    ...data,
    token: undefined,
    accessToken: undefined,
    refreshToken: undefined,
  };
}

export async function POST(request: Request) {
  try {
    // Login cho phép backend trả accessToken hoặc token, route sẽ xử lý fallback.
    return await proxyAuthPostWithSession<LoginApiPayload['data']>(request, {
      endpoint: '/api/v3/auth/login',
      missingTokenMessage: 'Missing access token from upstream login response',
      pickAccessToken: (data) => data?.accessToken ?? data?.token,
      sanitizeData: sanitizeUser,
    });
  } catch {
    return NextResponse.json(
      { message: 'Unable to process login request' },
      { status: 500 },
    );
  }
}
