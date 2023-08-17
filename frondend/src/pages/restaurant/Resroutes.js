import React from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import Addfood from './pages/Addfood';
import Orders from './pages/Orders';
import Offres from './pages/Offres';
import RestaurantDetails from './pages/RestaurantDetails';

export default function Resroutes() {
  const location = useLocation();
  const isRestaurentRoute = location.pathname.startsWith('/restaurant');

  const restaurentRoutes = useRoutes([
    {
      path: '/restaurant',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/restaurant/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'details', element: <RestaurantDetails />},
        { path: 'addfood', element: <Addfood /> },
        { path: 'orders', element: <Orders /> },
        { path: 'offers', element: <Offres /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/restaurant/app" />, index: true },
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
