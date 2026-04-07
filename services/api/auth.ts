import { apiClient, buildApiUrl } from './client';
import type { LoginRequest, LoginResponse } from '@/types';

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
