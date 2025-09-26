import type { NotificationInstance } from 'antd/es/notification/interface';
import { HttpStatusCode, type AxiosError } from 'axios';

type BadRequestError = AxiosError<{
  errors: Array<{ param: string; msg: string }>;
}>;

export const isBadRequestError = (
  err: unknown | AxiosError
): err is BadRequestError => {
  return (
    (err as AxiosError)?.status === HttpStatusCode.BadRequest &&
    (err as AxiosError)?.code === 'ERR_BAD_REQUEST'
  );
};

export const notifyRequestErrors = (
  err: unknown | AxiosError,
  notify: NotificationInstance
) => {
  if (isBadRequestError(err)) {
    err.response?.data.errors.map((error) => {
      notify.error({
        message: error.msg,
      });
    });
    return;
  }
  notify.error({
    message: 'Something went wrong!',
  });
};
