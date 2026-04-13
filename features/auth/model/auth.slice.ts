import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { env } from '@/config/env';
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
  accessToken: string;
  refreshToken?: string | null;
  user: AuthUser;
};

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  loginStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  loginError: string | null;
};

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
  loginStatus: 'idle',
  loginError: null,
};

function buildApiUrl(path: string): string {
  const base = env.apiBaseUrl?.trim();

  if (!base) {
    return path;
  }

  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

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

function resolveAccessToken(data: LoginResponse): string | null {
  return data.accessToken ?? data.token ?? null;
}

export const loginWithPassword = createAsyncThunk<
  SetCredentialsPayload,
  LoginRequest,
  { rejectValue: string }
>('auth/loginWithPassword', async (payload, { rejectWithValue }) => {
  try {
    const response = await fetch(buildApiUrl('/api/v3/auth/login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const json = (await response.json()) as Partial<ApiResponse<LoginResponse>>;

    if (!response.ok) {
      return rejectWithValue(
        json.message || 'Tài khoản hoặc mật khẩu không chính xác',
      );
    }

    if (typeof json.code === 'number' && json.code !== 200 && json.message) {
      return rejectWithValue(json.message);
    }

    if (!json.data) {
      return rejectWithValue('Không nhận được dữ liệu đăng nhập từ hệ thống');
    }

    const accessToken = resolveAccessToken(json.data);

    if (!accessToken) {
      return rejectWithValue('Không nhận được access token từ hệ thống');
    }

    return {
      accessToken,
      refreshToken: json.data.refreshToken,
      user: toAuthUser(json.data),
    };
  } catch {
    return rejectWithValue('Không thể kết nối máy chủ, vui lòng thử lại');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken ?? null;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithPassword.pending, (state) => {
        state.loginStatus = 'loading';
        state.loginError = null;
      })
      .addCase(loginWithPassword.fulfilled, (state, action) => {
        state.loginStatus = 'succeeded';
        state.loginError = null;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken ?? null;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginWithPassword.rejected, (state, action) => {
        state.loginStatus = 'failed';
        state.loginError =
          action.payload || 'Tài khoản hoặc mật khẩu không chính xác';
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectLoginStatus = (state: RootState) => state.auth.loginStatus;
export const selectLoginError = (state: RootState) => state.auth.loginError;
export const selectIsLoginSubmitting = (state: RootState) =>
  state.auth.loginStatus === 'loading';

export default authSlice.reducer;
