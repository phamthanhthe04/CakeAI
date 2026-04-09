import { baseApi } from '@/store/base-api';
import type {
  ApiResponse,
  GoogleLoginRequest,
  GoogleLoginResponse,
  LoginRequest,
  LoginResponse,
} from '@/types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/api/v3/auth/login',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<LoginResponse>) =>
        response.data,
    }),
    loginWithGoogle: builder.mutation<GoogleLoginResponse, GoogleLoginRequest>({
      query: (body) => ({
        url: '/api/v1/auth/login-google',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<GoogleLoginResponse>) =>
        response.data,
    }),
  }),
});

export const { useLoginMutation, useLoginWithGoogleMutation } = authApi;
