import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { env } from '@/config/env';
import { startGlobalLoading, stopGlobalLoading } from '@/lib/utils/top-loader';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: env.apiBaseUrl?.trim() || '',
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    if (typeof window !== 'undefined') {
      startGlobalLoading();
    }

    try {
      return await rawBaseQuery(args, api, extraOptions);
    } finally {
      if (typeof window !== 'undefined') {
        stopGlobalLoading();
      }
    }
  },
  endpoints: () => ({}),
});
