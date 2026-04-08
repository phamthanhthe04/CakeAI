import { apiClient, buildApiUrl } from './client';
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  GoogleLoginRequest,
  GoogleLoginResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/types';

export async function login(payload: LoginRequest) {
  const response = await apiClient<LoginResponse>(
    buildApiUrl('/api/v3/auth/login'),
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );

  return response.data;
}

export async function loginWithGoogle(payload: GoogleLoginRequest) {
  const response = await apiClient<GoogleLoginResponse>(
    buildApiUrl('/api/v1/auth/login-google'),
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );

  return response.data;
}

export async function forgotPassword(payload: ForgotPasswordRequest) {
  const response = await apiClient<ForgotPasswordResponse>(
    buildApiUrl('/api/v1/auth/forgot-password'),
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );

  return response.data;
}

export async function register(payload: RegisterRequest) {
  const response = await apiClient<RegisterResponse>(
    buildApiUrl('/api/v1/auth/register'),
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );

  return response.data;
}
