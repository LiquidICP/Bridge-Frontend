import { notification } from 'antd';
import { serializeError, getMessageFromCode } from 'eth-rpc-errors';

export const sagaExceptionHandler = (exception: unknown) => {
  let message = '';
  if (exception instanceof Error) {
    message = exception.message;
  } else if (typeof exception === 'string') {
    message = exception;
  } else {
    const { code } = serializeError(exception);
    if (code) {
      message = getMessageFromCode(code);
    }
  }
  notification.error({
    message: 'Error',
    description: message,
  });
};
