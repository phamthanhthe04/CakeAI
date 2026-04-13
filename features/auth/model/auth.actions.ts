import { baseApi } from '@/store/base-api';
import type { AppDispatch } from '@/store/index';
import { logout } from './auth.slice';

export function clearAuthSession() {
  return (dispatch: AppDispatch) => {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
  };
}
