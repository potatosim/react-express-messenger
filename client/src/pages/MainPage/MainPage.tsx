import { Button } from 'antd';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../routes/routes';

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-12 text-center p-10">
      <Title> Добро пожаловать!</Title>
      <Title level={2}>
        Мы рады приветствовать Вас в нашем сервисе по отправке сообщений. Чтобы
        начать работу и перейти к отправке сообщений нажмите кнопку "Далее".
      </Title>
      <Button
        variant="solid"
        color="volcano"
        size="large"
        onClick={() => navigate(APP_ROUTES.SEND_MESSAGE)}>
        Далее
      </Button>
    </div>
  );
};

export const Component = MainPage;
