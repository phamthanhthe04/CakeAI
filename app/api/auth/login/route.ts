import { NextResponse } from 'next/server';
import { setAuthCookies } from '@/lib/server/auth-session';
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
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (!apiBaseUrl) {
    return NextResponse.json(
      { message: 'Missing NEXT_PUBLIC_API_BASE_URL' },
      { status: 500 },
    );
  }

  try {
    const payload = await request.json();
    const upstream = await fetch(`${apiBaseUrl}/api/v3/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const json = (await upstream.json()) as Partial<LoginApiPayload>;

    if (!upstream.ok || !json.data) {
      return NextResponse.json(json, { status: upstream.status });
    }

    const accessToken = json.data.accessToken ?? json.data.token;

    if (!accessToken) {
      return NextResponse.json(
        { message: 'Missing access token from upstream login response' },
        { status: 502 },
      );
    }

    await setAuthCookies({
      accessToken,
      refreshToken: json.data.refreshToken,
    });

    return NextResponse.json({
      ...json,
      data: sanitizeUser(json.data),
    });
  } catch {
    return NextResponse.json(
      { message: 'Unable to process login request' },
      { status: 500 },
    );
  }
}
