'use client';

import { App as AntdApp } from 'antd';
import { useCallback } from 'react';
import { getApiErrorMessage } from '@/lib/utils/api-error';

type UseAuthFeedbackOptions<TData> = {
  successMessage?: string;
  errorMessage?: string;
  fallbackErrorMessage?: string;
  onSuccess?: (data: TData) => void | Promise<void>;
  onError?: (error: unknown) => void | Promise<void>;
  rethrowError?: boolean;
};

export function useAuthFeedback() {
  const { notification } = AntdApp.useApp();

  const runWithFeedback = useCallback(
    async <TData>(
      action: () => Promise<TData>,
      options?: UseAuthFeedbackOptions<TData>,
    ): Promise<TData | undefined> => {
      try {
        const result = await action();

        if (options?.successMessage) {
          notification.success({
            message: options.successMessage,
            placement: 'topRight',
          });
        }

        await options?.onSuccess?.(result);

        return result;
      } catch (error) {
        notification.warning({
          title: 'Notification',
          description: getApiErrorMessage(error, options?.fallbackErrorMessage),
          placement: 'topRight',
        });

        await options?.onError?.(error);

        if (options?.rethrowError) {
          throw error;
        }

        return undefined;
      }
    },
    [notification],
  );

  return {
    runWithFeedback,
  };
}
