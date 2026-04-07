export type ApiResponse<T> = {
  code: number;
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
