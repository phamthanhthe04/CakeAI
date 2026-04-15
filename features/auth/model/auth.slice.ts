import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { createApiAsyncThunk } from '@/lib/utils/create-api-async-thunk';
import { ApiError } from '@/lib/utils/api-error';
import type { RootState } from '@/store/index';
import type { ApiResponse, LoginRequest, LoginResponse } from '@/types';

export type AuthUser = {
  id: number;
  email: string;
  name: string;
  phone?: string | null;
  avatar?: string | null;
  role?: number;
};

export type SetCredentialsPayload = {
  user: AuthUser;
};

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoginSubmitting: boolean;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoginSubmitting: false,
};

function toAuthUser(data: LoginResponse): AuthUser {
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    phone: data.phone,
    avatar: data.avatar,
    role: data.role,
  };
}

export const loginWithPassword = createApiAsyncThunk<
  SetCredentialsPayload,
  LoginRequest
>('auth/loginWithPassword', async (payload) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const json = (await response.json()) as Partial<ApiResponse<LoginResponse>>;

  if (!response.ok) {
    throw new ApiError(
      json.message || 'Tài khoản hoặc mật khẩu không chính xác',
    );
  }

  if (typeof json.code === 'number' && json.code !== 200) {
    throw new ApiError(
      json.message || 'Tài khoản hoặc mật khẩu không chính xác',
    );
  }

  if (!json.data) {
    throw new ApiError('Không nhận được dữ liệu đăng nhập từ hệ thống');
  }

  return {
    user: toAuthUser(json.data),
  };
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: () => ({
      ...initialState,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithPassword.pending, (state) => {
        state.isLoginSubmitting = true;
      })
      .addCase(loginWithPassword.fulfilled, (state, action) => {
        state.isLoginSubmitting = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginWithPassword.rejected, (state) => {
        state.isLoginSubmitting = false;
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectLoginStatus = (state: RootState) =>
  state.auth.isLoginSubmitting;
export const selectIsLoginSubmitting = (state: RootState) =>
  state.auth.isLoginSubmitting;

export default authSlice.reducer;
