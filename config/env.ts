const isProduction = process.env.NODE_ENV === 'production';

const envSchema = {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_API_BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    (isProduction ? '' : 'https://api-dev.cakeai.vn'),
  NEXT_PUBLIC_GOOGLE_CLIENT_ID:
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? (isProduction ? '' : ''),
};

export const env = {
  nodeEnv: envSchema.NODE_ENV,
  apiBaseUrl: envSchema.NEXT_PUBLIC_API_BASE_URL,
  googleClientId: envSchema.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
};
