import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

type ApiErrorData = {
  message?: string;
  error?: string;
  description?: string;
};

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error;
}

function isSerializedError(error: unknown): error is SerializedError {
  return typeof error === 'object' && error !== null && 'message' in error;
}

export class ApiError {
  message: string;
  description?: string;

  constructor(message: string, description?: string) {
    this.message = message;
    this.description = description;
  }

  static from(
    error: unknown,
    fallbackMessage = 'Có lỗi xảy ra, vui lòng thử lại',
  ): ApiError {
    if (error instanceof ApiError) {
      return error;
    }

    if (isFetchBaseQueryError(error)) {
      const data = error.data as ApiErrorData | string | undefined;
      if (typeof data === 'string' && data.trim()) {
        return new ApiError(data);
      }
      if (data && typeof data === 'object') {
        const message = data.message || data.error || fallbackMessage;
        return new ApiError(message, data.description);
      }
    }

    if (isSerializedError(error) && error.message) {
      return new ApiError(error.message);
    }

    if (error instanceof Error) {
      return new ApiError(error.message);
    }

    return new ApiError(fallbackMessage);
  }

  serialize() {
    return {
      message: this.message,
      description: this.description,
    };
  }
}

export function getApiErrorMessage(
  error: unknown,
  fallback = 'Có lỗi xảy ra, vui lòng thử lại',
): string {
  return ApiError.from(error, fallback).message;
}
