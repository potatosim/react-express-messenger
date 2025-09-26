import axios from 'axios';

export interface IMessageDto {
  name: string;
  phone: string;
  message: string;
}

export const createMessage = async (message: IMessageDto) => {
  const { data } = await axios.post<{
    data: IMessageDto;
    success: boolean;
  }>(`${import.meta.env.VITE_API_URL}/messages`, message);

  return data;
};
