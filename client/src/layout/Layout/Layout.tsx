import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Main from '../Main';

const Layout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-stretch overflow-hidden">
      <div className="flex flex-[1_1_auto] flex-col">
        <Header />
        <Main>
          <Outlet />
        </Main>
      </div>
    </div>
  );
};

export default Layout;
