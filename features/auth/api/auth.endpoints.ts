// Tập trung toàn bộ endpoint auth mà frontend sử dụng.
export const AUTH_ENDPOINTS = {
  loginWithGoogle: '/api/auth/login-google',
  forgotPassword: '/api/auth/forgot-password',
  register: '/api/auth/register',
  resetPassword: '/api/auth/set-password',
  logout: '/api/auth/logout',
} as const;
