import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
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
  loginStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  loginError: string | null;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loginStatus: 'idle',
  loginError: null,
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

export const loginWithPassword = createAsyncThunk<
  SetCredentialsPayload,
  LoginRequest,
  { rejectValue: string }
>('auth/loginWithPassword', async (payload, { rejectWithValue }) => {
  try {
    const response = await fetch('/api/auth/login', {
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

    return {
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
export const selectLoginStatus = (state: RootState) => state.auth.loginStatus;
export const selectLoginError = (state: RootState) => state.auth.loginError;
export const selectIsLoginSubmitting = (state: RootState) =>
  state.auth.loginStatus === 'loading';

export default authSlice.reducer;
