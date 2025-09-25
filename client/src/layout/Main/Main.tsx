import { type FC, type PropsWithChildren } from 'react';

const Main: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="flex flex-[1_1_auto] justify-center">{children}</main>
  );
};

export default Main;
