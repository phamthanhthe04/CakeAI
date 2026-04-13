import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { FetchArgs } from '@reduxjs/toolkit/query';
import { startGlobalLoading, stopGlobalLoading } from '@/lib/utils/top-loader';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: '',
  credentials: 'include',
  prepareHeaders: (headers, { arg }) => {
    const fetchArgs = arg as FetchArgs | string;
    const body = typeof fetchArgs === 'string' ? undefined : fetchArgs?.body;
    const hasFormDataBody =
      typeof FormData !== 'undefined' && body instanceof FormData;

    if (!hasFormDataBody && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
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
