import { env } from '@/config/env';
import type { ApiResponse } from '@/types';

type ApiClientInit = RequestInit & {
  skipContentType?: boolean;
};

export async function apiClient<T>(
  input: RequestInfo | URL,
  init?: ApiClientInit,
): Promise<ApiResponse<T>> {
  const skipContentType = init?.skipContentType ?? false;
  const response = await fetch(input, {
    ...init,
    headers: {
      ...(skipContentType ? {} : { 'Content-Type': 'application/json' }),
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    try {
      const errorPayload = (await response.json()) as Partial<
        ApiResponse<unknown>
      >;
      throw new Error(errorPayload.message || `API error: ${response.status}`);
    } catch {
      throw new Error(`API error: ${response.status}`);
    }
  }

  const payload = (await response.json()) as ApiResponse<T>;

  if (payload.code !== 200) {
    throw new Error(payload.message || 'Request failed');
  }

  return payload;
}

export function buildApiUrl(path: string): string {
  const base = env.apiBaseUrl?.trim();

  if (!base) {
    return path;
  }

  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
