import { notification } from 'antd';

export function notifyReduxError(message: string) {
  notification.warning({
    title: 'Notification',
    description: message,
    placement: 'topRight',
  });
}
