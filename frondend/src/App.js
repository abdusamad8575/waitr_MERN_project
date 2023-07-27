import React from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Router from './router/Router';
import { HelmetProvider } from 'react-helmet-async';
import ThemeProvider from './pages/admin/theme';
import { StyledChart } from './pages/admin/components/chart';
import ScrollToTop from './pages/admin/components/scroll-to-top';
import Adminroutes from './pages/admin/Adminroutes';

function App() {
  return (
    <>
      <ToastContainer />
      <Router />
      <HelmetProvider>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Adminroutes />
        </ThemeProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
