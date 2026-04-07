const envSchema = {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_API_BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api-dev.cakeai.vn',
};

export const env = {
  nodeEnv: envSchema.NODE_ENV,
  apiBaseUrl: envSchema.NEXT_PUBLIC_API_BASE_URL,
};
