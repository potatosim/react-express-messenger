import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { Spin } from 'antd';
import { appRouter } from './routes/routes.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<Spin />}>
      <RouterProvider router={appRouter} />
    </Suspense>
  </StrictMode>
);
