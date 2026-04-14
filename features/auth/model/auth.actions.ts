import { baseApi } from '@/store/base-api';
import type { AppDispatch } from '@/store/index';
import { AUTH_ENDPOINTS } from '@/features/auth/api/auth.endpoints';
import { logout } from './auth.slice';

export function clearAuthSession() {
  return async (dispatch: AppDispatch) => {
    await fetch(AUTH_ENDPOINTS.logout, { method: 'POST' }).catch(() => undefined);
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
  };
}
