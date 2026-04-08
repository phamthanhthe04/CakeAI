const envSchema = {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_API_BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api-dev.cakeai.vn',
  NEXT_PUBLIC_GOOGLE_CLIENT_ID:
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ??
    '733051704152-1mqfk1756qmelme25vfl3n0u1o1a62vh.apps.googleusercontent.com',
};

export const env = {
  nodeEnv: envSchema.NODE_ENV,
  apiBaseUrl: envSchema.NEXT_PUBLIC_API_BASE_URL,
  googleClientId: envSchema.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
};
