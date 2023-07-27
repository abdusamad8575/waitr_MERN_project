import React from 'react'
import Home from '../pages/user/home/Home'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SingUp';

function Router() {
  return (
    <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
        </Routes>
      
    </>
  )
}

export default Router
