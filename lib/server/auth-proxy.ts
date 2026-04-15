import { NextResponse } from 'next/server';
import { setAuthCookies } from '@/lib/server/auth-session';

type JsonObject = Record<string, any>;

const DEFAULT_LANGUAGE = 'vi';
const ERROR_INVALID_BACKEND_JSON =
  'Phản hồi JSON từ dịch vụ backend không hợp lệ';
const ERROR_MISSING_BASE_URL = 'Thiếu cấu hình NEXT_PUBLIC_API_BASE_URL';

function getApiBaseUrl(): string | null {
  return process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || null;
}

function buildHeaders() {
  return {
    'Content-Type': 'application/json',
    'Accept-Language': DEFAULT_LANGUAGE,
    'X-Language': DEFAULT_LANGUAGE,
  };
}

async function parseJson(res: Response): Promise<JsonObject> {
  try {
    return await res.json();
  } catch {
    return { message: ERROR_INVALID_BACKEND_JSON };
  }
}

export function missingBaseUrlResponse() {
  return NextResponse.json(
    { message: ERROR_MISSING_BASE_URL },
    { status: 500 },
  );
}

export function authProxyUnexpectedErrorResponse(message: string) {
  return NextResponse.json({ message }, { status: 500 });
}

export function sanitizeAuthTokens<T extends JsonObject>(
  data: T,
  fields: (keyof T)[],
): T {
  const sanitized = { ...data };
  for (const field of fields) (sanitized as any)[field] = undefined;
  return sanitized;
}

// Proxy POST request, no session/cookie
export async function proxyAuthPost(
  request: Request,
  endpoint: string,
): Promise<NextResponse> {
  const apiBaseUrl = getApiBaseUrl();
  if (!apiBaseUrl) return missingBaseUrlResponse();

  const payload = await request.json();
  const upstream = await fetch(apiBaseUrl + endpoint, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify(payload),
    cache: 'no-store',
  });
  const json = await parseJson(upstream);
  return NextResponse.json(json, { status: upstream.status });
}

// Proxy POST request, set session/cookie if success
interface SessionProxyOptions<T extends JsonObject> {
  endpoint: string;
  missingTokenMessage: string;
  pickAccessToken: (data: T) => string | undefined;
  sanitizeData: (data: T) => T;
}

export async function proxyAuthPostWithSession<T extends JsonObject>(
  request: Request,
  options: SessionProxyOptions<T>,
): Promise<NextResponse> {
  const apiBaseUrl = getApiBaseUrl();
  if (!apiBaseUrl) return missingBaseUrlResponse();

  const payload = await request.json();
  const upstream = await fetch(apiBaseUrl + options.endpoint, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify(payload),
    cache: 'no-store',
  });
  const json = (await parseJson(upstream)) as { data?: T } & JsonObject;

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
    refreshToken: (json.data as any).refreshToken ?? undefined,
  });

  return NextResponse.json({
    ...json,
    data: options.sanitizeData(json.data),
  });
}
