import Navebar from '../../../components/Navebar'
import Footer from '../../../components/Footer'
import { Typography, Breadcrumbs, Grid, Container, Box,Skeleton } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import styled from "@emotion/styled";
import Album from "./childComponents/cards";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import  { fetchData } from '../../../redux-toolkit/fetchData';    
// import {fetchData} from '../../../redux-toolkit/fetchData'



const FiliterContainer = styled(Container)({});


const LeftSide = styled(Box)({
  display: "flex",
  flexDirection: "column",
  paddingTop: "10px",
  margin: { sx: 0, sm: 0, md: 0, lg: 0, xl: 0 },
  marginTop: { md: 2, lg: 2, xl: 2, sx: 0 },
  marginLeft: { md: 2, lg: 2, xl: 2 },
});
const FoodDetails = () => {
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  const storeDetails = useSelector((state)=>state.user.guestDetails)
  const loading = useSelector((state)=>state.resData.loading)
  const guestDetails = storeDetails ? storeDetails : (JSON.parse(localStorage.getItem("guestDetails")))
  console.log('guestDetails',guestDetails); 
  const details = useSelector((state)=>state.resData.details)
  useEffect(()=>{
    if(!details){
      let resId = JSON.parse(localStorage.getItem('restaurantId'))
      dispatch(fetchData(resId))
    }
  },[])
  const datas = details?.foodDetails.map((value)=>{return{...value,count:0}})
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" to={'/'} style={{ textDecoration: 'none',color:'black' }}>
      Home
    </Link>,   
    <Link
      underline="hover"
      key="2"
      color="inherit"
      to={'/findrestaurant'}
      style={{ textDecoration: 'none',color:'black' }}
    >
      Find Restaurant
    </Link>,
    <Typography key="3" color="text.primary">
      Food Details
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

      <FiliterContainer>
        <Grid container >
          <Grid item xs={12}>
            <LeftSide>
              {
                loading ? 
                <img width={'200px'} height={'200px'} src='https://www.wpfaster.org/wp-content/uploads/2013/06/loading-gif.gif' alt='images' />
                     :
                    (datas && <Album data={datas} />)
              }
              {/* {datas && <Album data={datas} />} */}
            </LeftSide>
          </Grid>
        </Grid>
      </FiliterContainer>
      <Footer />
    </>
  )
}

export default FoodDetails
