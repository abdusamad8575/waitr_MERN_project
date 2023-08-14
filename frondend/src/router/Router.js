import React from 'react'
import Home from '../pages/user/home/Home'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SingUp';
import Account from '../pages/user/account/Account'
import UserProtected from './userProtected';

function Router() {
  console.log('9854');
  return (
    <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<UserProtected />}>

          <Route path = '/account' element = {<Account />} />
          </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
        </Routes>
      
    </>
  )
}

export default Router
