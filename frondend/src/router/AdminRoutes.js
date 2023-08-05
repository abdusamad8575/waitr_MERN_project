import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Adminroutes from '../pages/admin/Adminroutes'

const AdminRoutes = () => {
  console.log("8546")
  return (
    <Routes>
      <Route path="/dashboard" element={<Adminroutes />} />
    </Routes>
  );
};

export default AdminRoutes;