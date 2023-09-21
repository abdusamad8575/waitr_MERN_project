import React, { useEffect } from 'react'
import Navebar from '../../../components/Navebar';
import Footer from '../../../components/Footer'
import { Grid, Typography, Breadcrumbs, Paper } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, useNavigate } from 'react-router-dom'
import FoodCart from './childComponents/FoodCart';
import SideBar from './childComponents/SideBar';
import { useSelector } from 'react-redux';

const MainCart = () => {
  const data = useSelector((state) => state.user.orders)
  const oderFoods = data ? data : (JSON.parse(localStorage.getItem('orderFoodDetails')))
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      to={'/findrestaurant'}
      style={{ textDecoration: 'none', color: 'black' }}
    >
      Find Restaurant
    </Link>,
    <Typography key="3" color="text.primary">
      Restaurant Details
    </Typography>,
  ];

  return (
    <>
      <Navebar />
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        ml='20px'
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Grid container columnSpacing={{ lg: 6, md: 4, sm: 3 }} rowSpacing={{ xs: 3 }} direction={'row'} p={{ lg: '20px 50px 50px 50px', md: 4, sm: 2, xs: 3 }}>
        <Grid item xs={12} sm={7} md={8} lg={8}>
          <FoodCart data={oderFoods} />
        </Grid>
        <Grid item xs={12} sm={5} md={4} lg={4}>
          <SideBar data={oderFoods}/>
        </Grid>

      </Grid>
      <Footer />
    </>
  )
}

export default MainCart
