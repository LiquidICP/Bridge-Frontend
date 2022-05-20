import { notification } from 'antd';
import { transformBackendErrorToString } from './transformBackendErrorToString';

export const sagaExceptionHandler = (exception: unknown) => {
  let message = '';
  if (exception instanceof Error) {
    message = transformBackendErrorToString(exception);
  }

  if (typeof exception === 'string') {
    message = exception;
  }

  notification.error({
    message: 'Error',
    description: message,
  });
};
