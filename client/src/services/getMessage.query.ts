import axios, { AxiosError } from 'axios';

export const getMessage = async ({
  onSuccess,
  onError,
}: {
  onSuccess: (message: string) => void;
  onError: (error: AxiosError) => void;
}) => {
  try {
    const { data } = await axios.get<{ message: string }>('api/message');

    onSuccess(data.message);
  } catch (err) {
    onError(err as AxiosError);
  }
};
