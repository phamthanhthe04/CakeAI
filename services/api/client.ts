import { env } from '@/config/env';
import { startGlobalLoading, stopGlobalLoading } from '@/lib/utils/top-loader';
import type { ApiResponse } from '@/types';

type ApiClientInit = RequestInit & {
  skipContentType?: boolean;
  skipGlobalLoading?: boolean;
};

export async function apiClient<T>(
  input: RequestInfo | URL,
  init?: ApiClientInit,
): Promise<ApiResponse<T>> {
  const skipContentType = init?.skipContentType ?? false;
  const skipGlobalLoading = init?.skipGlobalLoading ?? false;
  const shouldHandleGlobalLoading =
    !skipGlobalLoading && typeof window !== 'undefined';

  if (shouldHandleGlobalLoading) {
    startGlobalLoading();
  }

  try {
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
        throw new Error(
          errorPayload.message || `API error: ${response.status}`,
        );
      } catch {
        throw new Error(`API error: ${response.status}`);
      }
    }

    const payload = (await response.json()) as ApiResponse<T>;

    if (typeof payload.code === 'number' && payload.code !== 200) {
      throw new Error(payload.message || 'Request failed');
    }

    return payload;
  } finally {
    if (shouldHandleGlobalLoading) {
      stopGlobalLoading();
    }
  }
}

export function buildApiUrl(path: string): string {
  const base = env.apiBaseUrl?.trim();

  if (!base) {
    return path;
  }

  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
