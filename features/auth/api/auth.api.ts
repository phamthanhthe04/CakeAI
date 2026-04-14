import { baseApi } from '@/store/base-api';
import {
  setCredentials,
  type AuthUser,
} from '@/features/auth/model/auth.slice';
import { AUTH_ENDPOINTS } from './auth.endpoints';
import type {
  ApiResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  GoogleLoginRequest,
  GoogleLoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '@/types';

type RtkQuerySideEffectError = {
  error?: {
    status?: number;
  };
};

function shouldLogSideEffectError(error: unknown): boolean {
  const status = (error as RtkQuerySideEffectError)?.error?.status;

  if (typeof status === 'number' && status >= 400 && status < 500) {
    return false;
  }

  return true;
}

function toAuthUser(
  user: Pick<
    GoogleLoginResponse | RegisterResponse,
    'id' | 'email' | 'name' | 'phone' | 'role'
  > & { avatar?: string | null },
): AuthUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    avatar: user.avatar,
    role: user.role,
  };
}

function authDataResponse<T>(response: ApiResponse<T>): T {
  // Chuẩn hóa response từ dạng ApiResponse<T> -> T để component dùng trực tiếp.
  return response.data;
}

export const authApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    loginWithGoogle: builder.mutation<GoogleLoginResponse, GoogleLoginRequest>({
      // UI chỉ gọi endpoint nội bộ /api/auth/*, không gọi thẳng API upstream.
      query: (body) => ({
        url: AUTH_ENDPOINTS.loginWithGoogle,
        method: 'POST',
        body,
      }),
      transformResponse: authDataResponse<GoogleLoginResponse>,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            setCredentials({
              user: toAuthUser(data),
            }),
          );
        } catch (error) {
          if (shouldLogSideEffectError(error)) {
            console.error('Google login side effect failed', error);
          }
        }
      },
    }),
    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (body) => ({
        url: AUTH_ENDPOINTS.forgotPassword,
        method: 'POST',
        body,
      }),
      transformResponse: authDataResponse<ForgotPasswordResponse>,
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: AUTH_ENDPOINTS.register,
        method: 'POST',
        body,
      }),
      transformResponse: authDataResponse<RegisterResponse>,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            setCredentials({
              user: toAuthUser(data),
            }),
          );
        } catch (error) {
          if (shouldLogSideEffectError(error)) {
            console.error('Register side effect failed', error);
          }
        }
      },
    }),
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: (body) => ({
        url: AUTH_ENDPOINTS.resetPassword,
        method: 'POST',
        body,
      }),
      transformResponse: authDataResponse<ResetPasswordResponse>,
    }),
  }),
});

export const {
  useLoginWithGoogleMutation,
  useForgotPasswordMutation,
  useRegisterMutation,
  useResetPasswordMutation,
} = authApi;
