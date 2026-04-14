import { NextResponse } from 'next/server';
import { setAuthCookies } from '@/lib/server/auth-session';

type JsonObject = Record<string, unknown>;
type ApiPayload<TData> = {
  data?: TData;
} & JsonObject;

type SessionProxyOptions<TData extends JsonObject> = {
  endpoint: string;
  missingTokenMessage: string;
  pickAccessToken: (data: TData) => string | undefined;
  sanitizeData: (data: TData) => TData;
};

// Hàm lấy base url từ env
function getApiBaseUrl(): string | null {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  return baseUrl || null;
}

// Hàm parse json từ response
async function parseUpstreamJson(response: Response): Promise<JsonObject> {
  try {
    return (await response.json()) as JsonObject;
  } catch {
    return { message: 'Invalid JSON response from upstream service' };
  }
}

// Hàm trả về response khi missing base url
export function missingBaseUrlResponse() {
  return NextResponse.json(
    { message: 'Missing NEXT_PUBLIC_API_BASE_URL' },
    { status: 500 },
  );
}

// Hàm proxy chung cho các endpoint POST không cần set session/cookie.
export async function proxyAuthPost(
  request: Request,
  endpoint: string,
): Promise<NextResponse> {
  const apiBaseUrl = getApiBaseUrl();

  if (!apiBaseUrl) {
    return missingBaseUrlResponse();
  }

  const payload = await request.json();
  const upstream = await fetch(`${apiBaseUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  const json = await parseUpstreamJson(upstream);
  return NextResponse.json(json, { status: upstream.status });
}

// Hàm proxy cho login/register: gọi upstream, lấy token, set cookie và ẩn token trước khi trả về client.
export async function proxyAuthPostWithSession<TData extends JsonObject>(
  request: Request,
  options: SessionProxyOptions<TData>,
): Promise<NextResponse> {
  const apiBaseUrl = getApiBaseUrl();

  if (!apiBaseUrl) {
    return missingBaseUrlResponse();
  }

  const payload = await request.json();
  const upstream = await fetch(`${apiBaseUrl}${options.endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  const json = (await parseUpstreamJson(upstream)) as ApiPayload<TData>;

  if (!upstream.ok || !json.data) {
    return NextResponse.json(json, { status: upstream.status });
  }

  const accessToken = options.pickAccessToken(json.data);
  if (!accessToken) {
    return NextResponse.json(
      { message: options.missingTokenMessage },
      { status: 502 },
    );
  }

  await setAuthCookies({
    accessToken,
    refreshToken:
      (json.data as { refreshToken?: string }).refreshToken ?? undefined,
  });

  return NextResponse.json({
    ...json,
    data: options.sanitizeData(json.data),
  });
}
