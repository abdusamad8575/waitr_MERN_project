// import React, { useEffect } from 'react';  
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import UserPage from './pages/UserPage';
import Page404 from './pages/Page404';
// import Addhotels from './pages/Addhotels';
import DashboardAppPage from './pages/DashboardAppPage';
import Addhotels from './pages/Addhotels';
import Orders from './pages/Orders';
import Offres from './pages/Offres';
// import axiosInstance from '../../axios';
// import { useDispatch, useSelector } from 'react-redux';
// import {setUserDatas} from '../../redux-toolkit/adminSlice'

export default function Adminroutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/dashboard');
  // const dispatch = useDispatch();


  //  const len =selecter.length;
  
  // useEffect(()=>{
  //   console.log("data fetching first time");
  //   const fetchUserData=async()=>{
  //     const res = await axiosInstance.get('/dashboard/fetchUserData');
  //     const userData = res.data.users;
  //     dispatch(setUserDatas(userData))
  //   }
  //   fetchUserData()
  // },[])
  // const selecter = useSelector((state)=>state.admin.userDatas)
  // console.log("selecter1=>",selecter);
  
  const adminRoutes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'addhotel', element: <Addhotels /> },
        { path: 'orders', element: <Orders /> },
        { path: 'offers', element: <Offres /> },
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
