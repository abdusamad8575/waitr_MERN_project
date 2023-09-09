import Navebar from '../../../components/Navebar'
import Footer from '../../../components/Footer'
import { Typography, Breadcrumbs, Grid, Link, Container, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import styled from "@emotion/styled";
import Album from "./childComponents/cards";
import { useSelector } from 'react-redux';

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
  const data = useSelector((state) => state.user.details.foodDetails)
  // console.log("data5:-",data);
  const navigate = useNavigate()
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" onClick={() => navigate('/')}>
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href=""
      onClick={() => navigate('/findrestaurant')}
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
              <Album data={data} />
            </LeftSide>
          </Grid>
        </Grid>
      </FiliterContainer>
      <Footer />
    </>
  )
}

export default FoodDetails
