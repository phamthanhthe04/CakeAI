import { NextResponse } from 'next/server';
import type { ApiResponse, ResetPasswordResponse } from '@/types';

type ResetPasswordApiPayload = ApiResponse<ResetPasswordResponse>;

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
    const upstream = await fetch(`${apiBaseUrl}/api/v1/auth/set-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const json = (await upstream.json()) as Partial<ResetPasswordApiPayload>;
    return NextResponse.json(json, { status: upstream.status });
  } catch {
    return NextResponse.json(
      { message: 'Unable to process reset password request' },
      { status: 500 },
    );
  }
}
