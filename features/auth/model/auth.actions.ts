import { baseApi } from '@/store/base-api';
import type { AppDispatch } from '@/store/index';
import { logout } from './auth.slice';

export function clearAuthSession() {
  return async (dispatch: AppDispatch) => {
    await fetch('/api/auth/logout', { method: 'POST' }).catch(() => undefined);
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
  };
}
