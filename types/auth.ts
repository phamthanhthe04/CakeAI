export type ApiResponse<T> = {
  code?: number;
  data: T;
  message: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginUser = {
  id: number;
  email: string;
  name: string;
  phone?: string | null;
  avatar?: string | null;
  role?: number;
  accessToken: string;
  refreshToken?: string;
};

export type LoginResponse = LoginUser;

export type GoogleLoginRequest = {
  token: string;
  agentCode: string | null;
};

export type GoogleLoginUser = {
  id: number;
  email: string;
  name: string;
  role?: number;
  phone?: string | null;
  avatar?: string | null;
  token: string;
  refreshToken?: string;
};

export type GoogleLoginResponse = GoogleLoginUser;

export type ForgotPasswordRequest = {
  email: string;
};

export type ForgotPasswordResponse = {
  id: number;
  email: string;
  code?: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  phone: string;
  name: string;
  agentCode: string | null;
};

export type RegisterResponse = {
  id: number;
  email: string;
  name: string;
  phone?: string | null;
  role?: number;
  token: string;
  refreshToken?: string;
};

export type ResetPasswordRequest = {
  email: string;
  password: string;
  otp: string;
};

export type ResetPasswordResponse = {
  id: number;
  email: string;
  message?: string;
};
