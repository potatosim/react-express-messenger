import axios, { AxiosError, HttpStatusCode } from 'axios';
import type { IFormValues } from '../pages/SendMessagePage/SendMessagePage';

export const postMessage = async ({
  body,
  onSuccess,
  onError,
  onFinish,
}: {
  body: IFormValues;
  onSuccess: (data: IFormValues) => void;
  onError: (error: AxiosError) => void;
  onFinish: () => void;
}) => {
  try {
    const { data } = await axios.post<{ data: IFormValues; success: boolean }>(
      'http://localhost:3000/api/messages',
      body
    );

    onSuccess(data?.data);

    return data;
  } catch (err) {
    onError(err as AxiosError);
  } finally {
    onFinish();
  }
};

export const isValidationError = (
  err: AxiosError
): err is AxiosError<{ errors: Array<{ param: string; msg: string }> }> => {
  return (
    err.status === HttpStatusCode.BadRequest && err.code === 'ERR_BAD_REQUEST'
  );
};
