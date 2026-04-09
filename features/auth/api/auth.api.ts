import { baseApi } from '@/store/base-api';
import { setCredentials, type AuthUser } from '@/features/auth';
import type {
  ApiResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  GoogleLoginRequest,
  GoogleLoginResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '@/types';

function toAuthUser(
  user: Pick<
    LoginResponse | GoogleLoginResponse | RegisterResponse,
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

function persistAuthTokens(accessToken: string, refreshToken?: string | null) {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem('accessToken', accessToken);

  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  } else {
    localStorage.removeItem('refreshToken');
  }
}

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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            setCredentials({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              user: toAuthUser(data),
            }),
          );

          persistAuthTokens(data.accessToken, data.refreshToken);
        } catch {
          // noop
        }
      },
    }),
    loginWithGoogle: builder.mutation<GoogleLoginResponse, GoogleLoginRequest>({
      query: (body) => ({
        url: '/api/v1/auth/login-google',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<GoogleLoginResponse>) =>
        response.data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const accessToken = data.token || data.refreshToken;

          if (!accessToken) {
            return;
          }

          dispatch(
            setCredentials({
              accessToken,
              refreshToken: data.refreshToken,
              user: toAuthUser(data),
            }),
          );

          persistAuthTokens(accessToken, data.refreshToken);
        } catch {
          // noop
        }
      },
    }),
    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (body) => ({
        url: '/api/v1/auth/forgot-password',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<ForgotPasswordResponse>) =>
        response.data,
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: '/api/v1/auth/register',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<RegisterResponse>) =>
        response.data,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const accessToken = data.token || data.refreshToken;

          if (!accessToken) {
            return;
          }

          dispatch(
            setCredentials({
              accessToken,
              refreshToken: data.refreshToken,
              user: toAuthUser(data),
            }),
          );

          persistAuthTokens(accessToken, data.refreshToken);
        } catch {
          // noop
        }
      },
    }),
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: (body) => ({
        url: '/api/v1/auth/set-password',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<ResetPasswordResponse>) =>
        response.data,
    }),
  }),
});

export const {
  useLoginMutation,
  useLoginWithGoogleMutation,
  useForgotPasswordMutation,
  useRegisterMutation,
  useResetPasswordMutation,
} = authApi;
