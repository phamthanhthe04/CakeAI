import { NextResponse } from 'next/server';
import { setAuthCookies } from '@/lib/server/auth-session';
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
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (!apiBaseUrl) {
    return NextResponse.json(
      { message: 'Missing NEXT_PUBLIC_API_BASE_URL' },
      { status: 500 },
    );
  }

  try {
    const payload = await request.json();
    const upstream = await fetch(`${apiBaseUrl}/api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const json = (await upstream.json()) as Partial<RegisterApiPayload>;

    if (!upstream.ok || !json.data) {
      return NextResponse.json(json, { status: upstream.status });
    }

    if (!json.data.token) {
      return NextResponse.json(
        { message: 'Missing access token from upstream register response' },
        { status: 502 },
      );
    }

    await setAuthCookies({
      accessToken: json.data.token,
      refreshToken: json.data.refreshToken,
    });

    return NextResponse.json({
      ...json,
      data: sanitizeUser(json.data),
    });
  } catch {
    return NextResponse.json(
      { message: 'Unable to process register request' },
      { status: 500 },
    );
  }
}
