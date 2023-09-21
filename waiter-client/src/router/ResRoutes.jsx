import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Resroutes from '../pages/restaurant/Resroutes';

const ResRoutes = () => {
  return (
    <Routes>
      <Route exact path="/restaurant" component={Resroutes} />
    </Routes>
  );
};

export default ResRoutes;
