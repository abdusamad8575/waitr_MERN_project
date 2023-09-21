import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Adminroutes from '../pages/admin/Adminroutes'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Adminroutes />} />
    </Routes>
  );
};

export default AdminRoutes;