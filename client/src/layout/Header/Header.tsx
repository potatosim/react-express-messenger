import { HomeFilled } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '@/routes/routes';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center p-[1rem]">
      <Tooltip title="Home">
        <Button
          onClick={() => {
            navigate(APP_ROUTES.MAIN);
          }}
          icon={<HomeFilled style={{ color: '#fa541c' }} />}
        />
      </Tooltip>
    </header>
  );
};

export default Header;
