import React from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import Addfood from './pages/Addfood';
import Orders from './pages/Orders';
import Offres from './pages/Offres';

export default function Resroutes() {
  const location = useLocation();
  const isRestaurentRoute = location.pathname.startsWith('/restaurent');

  const restaurentRoutes = useRoutes([
    {
      path: '/restaurent',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/restaurent/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'addfood', element: <Addfood /> },
        { path: 'orders', element: <Orders /> },
        { path: 'offers', element: <Offres /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/restaurent/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return isRestaurentRoute ? restaurentRoutes : null;
}
