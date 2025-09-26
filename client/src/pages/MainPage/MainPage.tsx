import { Button } from 'antd';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../routes/routes';

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-12 text-center p-10">
      <Title>Welcome!</Title>
      <Title level={2}>
        We are happy to see you in our messaging service. To get started and
        begin sending messages, click the "Next" button.
      </Title>
      <Button
        variant="solid"
        color="volcano"
        size="large"
        onClick={() => navigate(APP_ROUTES.SEND_MESSAGE)}>
        Next
      </Button>
    </div>
  );
};

export const Component = MainPage;
