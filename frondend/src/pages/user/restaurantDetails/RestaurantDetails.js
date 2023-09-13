import Navebar from '../../../components/Navebar'
import Footer from '../../../components/Footer'
import DetailsBar from './childComponents/DetailsBar'
import Cards from './childComponents/Card'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Breadcrumbs, Grid, Button } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import {fetchData} from '../../../redux-toolkit/fetchData'

const RestaurantDetails = () => {
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  const resId = useSelector((state) => state.user.restaurantId)
  useEffect(() => {
    const restaurantId = resId ? resId : JSON.parse(localStorage.getItem("restaurantId"));
    dispatch(fetchData(restaurantId))
  },[])
  const details = useSelector((state)=>state.resData.details)

  
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      to={'findrestaurant'}
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
      {details && <Grid container columnSpacing={{ lg: 6, md: 4, sm: 3 }} rowSpacing={{ xs: 3 }} direction={'row'} p={{ lg: '20px 50px 50px 50px', md: 4, sm: 2, xs: 3 }}>
        <Grid item xs={12} sm={6} md={8} lg={8}>
          <Cards details={details} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <DetailsBar details={details} />
        </Grid>

      </Grid>}

      <Footer />
    </>
  )
}

export default RestaurantDetails
