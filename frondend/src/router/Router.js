import React from 'react'
import Home from '../pages/user/home/Home'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SingUp';
import Account from '../pages/user/account/Account'
import UserProtected from './userProtected';
import ListRestaurant from '../pages/user/listRestaurant/listRestaurant';
import RestaurantDetails from '../pages/user/restaurantDetails/RestaurantDetails';

function Router() { 
  return (
    <>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route element={<UserProtected />}> */}

          <Route path = '/account' element = {<Account />} />
          <Route path = '/findrestaurant' element = {<ListRestaurant />} />
          <Route path = '/DetailPage' element = {<RestaurantDetails />} />
          {/* </Route> */}
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
        </Routes>
      
    </>
  )
}

export default Router
