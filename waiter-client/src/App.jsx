import React from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Router from '../../waiter-client/src/router/Router';
import { HelmetProvider } from 'react-helmet-async';
import ThemeProvider from '../../waiter-client/src/pages/admin/theme';
import { StyledChart } from '../../waiter-client/src/pages/admin/components/chart';
import ScrollToTop from '../../waiter-client/src/pages/admin/components/scroll-to-top';
import AdminRoutes from '../../waiter-client/src/pages/admin/Adminroutes';
import ResRoutes from '../../waiter-client/src/pages/restaurant/Resroutes';

function App() {
  return (
    <>
      <ToastContainer />
      <Router />
      <HelmetProvider> 
        <ThemeProvider>  
          <ScrollToTop />
          <StyledChart />       
          <AdminRoutes />   
          <ResRoutes />
        </ThemeProvider>
      </HelmetProvider>
       
    </>
  );
}

export default App;
