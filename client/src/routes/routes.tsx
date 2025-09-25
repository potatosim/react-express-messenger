import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';

export const APP_ROUTES = {
  MAIN: '/',
  SEND_MESSAGE: '/send',
  NOT_FOUND: '*',
} as const;

export const appRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: APP_ROUTES.MAIN,
        index: true,
        lazy: () => import('../pages/MainPage'),
      },
      {
        path: APP_ROUTES.SEND_MESSAGE,
        lazy: () => import('../pages/SendMessagePage'),
      },
      {
        path: APP_ROUTES.NOT_FOUND,
        lazy: () => import('../pages/NotFoundPage'),
      },
    ],
  },
]);
