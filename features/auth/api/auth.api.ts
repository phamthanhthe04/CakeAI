import { baseApi } from '@/store/base-api';
import {
  setCredentials,
  type AuthUser,
} from '@/features/auth/model/auth.slice';
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

export const authApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    loginWithGoogle: builder.mutation<GoogleLoginResponse, GoogleLoginRequest>({
      query: (body) => ({
        url: '/api/auth/login-google',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<GoogleLoginResponse>) =>
        response.data,
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
        url: '/api/auth/forgot-password',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<ForgotPasswordResponse>) =>
        response.data,
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: '/api/auth/register',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<RegisterResponse>) =>
        response.data,
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
        url: '/api/auth/set-password',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<ResetPasswordResponse>) =>
        response.data,
    }),
  }),
});

export const {
  useLoginWithGoogleMutation,
  useForgotPasswordMutation,
  useRegisterMutation,
  useResetPasswordMutation,
} = authApi;
