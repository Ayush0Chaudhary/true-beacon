import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '@/components/layouts/Base';
import Home from '@/pages/home';
import AuthenticationPage from '@/pages/register';
import LoginAuthenticationPage from '@/pages/login';
import AuthRequired from '@/components/AuthRequired';
import DashBoardLayout from '@/components/layouts/DashBase';
import AuthAlert from '@/components/AuthAlert';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashBoardLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/register',
    element: 
      <DashBoardLayout />,
    children: [
      {
        index: true,
        element: <LoginAuthenticationPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <DashBoardLayout/>,
    children: [
      {
        index: true,
        element: <LoginAuthenticationPage />,
      },
     
    ],
  }
]);

export const CustomRouter = () => {
  return <RouterProvider router={router} />;
};
