import React from 'react'
import Navebar from '../../../components/Navebar'
import Footer from '../../../components/Footer'
import DetailsBar from './childComponents/DetailsBar'
import { Grid } from '@mui/material'
import Cards from './childComponents/Card'

const RestaurantDetails = () => {
  return (
    <>
      <Navebar />
      <Grid container spacing={7} direction={'row'} p={5}>
        <Grid item xs={12} md={6} lg={8}>
          <Cards />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DetailsBar />
        </Grid>

      </Grid>

      <Footer />
    </>
  )
}

export default RestaurantDetails
