// import React, { useEffect } from 'react';  
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import UserPage from './pages/UserPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import Addhotels from './pages/Addhotels';
import Orders from './pages/Orders';
import Offres from './pages/Offres';
import Profile from './pages/Profile';
import AddHotelReq from './pages/addHotelReq';
import AddLocation from './pages/addLocation';

export default function Adminroutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/dashboard');  
  const adminRoutes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'userReq', element: <AddHotelReq /> },
        { path: 'addhotel', element: <Addhotels /> },
        { path: 'addLocation', element: <AddLocation /> },
        { path: 'orders', element: <Orders /> },
        { path: 'offers', element: <Offres /> },
        { path: 'profile', element: <Profile /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return isAdminRoute ? adminRoutes : null;
}
