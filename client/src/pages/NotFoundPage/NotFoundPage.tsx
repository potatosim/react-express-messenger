import { Button, Image } from 'antd';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '@/routes/routes';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center text-center">
      <Image src="https://i.pinimg.com/736x/fe/4e/82/fe4e82e755122222288e340a5ff6b6ca.jpg" />
      <Title level={2}>Sorry, the page you requested could not be found!</Title>
      <Button
        variant="solid"
        color="volcano"
        onClick={() => navigate(APP_ROUTES.MAIN)}>
        Back to Home
      </Button>
    </div>
  );
};

export const Component = NotFoundPage;
