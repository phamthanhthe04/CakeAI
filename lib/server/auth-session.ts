import { cookies } from 'next/headers';

const ACCESS_TOKEN_COOKIE = 'cakeai_access_token';
const REFRESH_TOKEN_COOKIE = 'cakeai_refresh_token';
const isProduction = process.env.NODE_ENV === 'production';

function getCookieConfig(maxAgeSeconds: number) {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: maxAgeSeconds,
  };
}

export async function setAuthCookies(tokens: {
  accessToken: string;
  refreshToken?: string | null;
}) {
  const cookieStore = await cookies();
  cookieStore.set(
    ACCESS_TOKEN_COOKIE,
    tokens.accessToken,
    getCookieConfig(60 * 60 * 24),
  );

  if (tokens.refreshToken) {
    cookieStore.set(
      REFRESH_TOKEN_COOKIE,
      tokens.refreshToken,
      getCookieConfig(60 * 60 * 24 * 30),
    );
  }
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_COOKIE);
  cookieStore.delete(REFRESH_TOKEN_COOKIE);
}
