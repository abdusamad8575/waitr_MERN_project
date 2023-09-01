import Navebar from '../../../components/Navebar'
import Footer from '../../../components/Footer'
import DetailsBar from './childComponents/DetailsBar'
import Cards from './childComponents/Card'
import { useSelector } from 'react-redux'
import { Typography, Breadcrumbs, Link, Grid, Button } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom'

//Breadcrumbs click time

const RestaurantDetails = () => {
  const navigate = useNavigate()
  const details = useSelector((state) => state.user.details)
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" onClick={()=>navigate('/')}>
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href=""
      onClick={()=>navigate('/findrestaurant')}
    >
      Home Restaurant
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
      <Grid container columnSpacing={{lg:6,md:4,sm:3}} rowSpacing={{xs:3}} direction={'row'} p={{lg:'20px 50px 50px 50px',md:4,sm:2,xs:3}}>
        <Grid item xs={12} sm={6} md={8} lg={8}>
          <Cards details={details} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <DetailsBar />
        </Grid>

      </Grid>

      <Footer />
    </>
  )
}

export default RestaurantDetails
