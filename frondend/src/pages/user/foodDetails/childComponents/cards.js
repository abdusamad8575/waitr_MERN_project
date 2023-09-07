import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axiosInstance from "../../../../axios";
import { Box, Skeleton } from "@mui/material";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import customFilter from "./customFilter";
import {selectRestaurant} from '../../../../redux-toolkit/userSlice'

import Pagination from '@mui/material/Pagination';

const H1 = styled(Typography)({
  variant: "body1",
  color: "#000",
  paddingLeft: "1px",
  paddingTop: "1px",
  fontSize: "14px",
  fontWeight: "600",
  lineHeight: "normal",
});

const H3 = styled(Typography)({
  variant: "body1",
  color: "#000",
  fontSize: "12px",
  paddingLeft: "px",
  paddingRight: "px",
  paddingTop: "1px",
});

export default function Album({ filter}) {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [data, setData] = React.useState([""]);
 
  const [FilterData, setFilterdData] = React.useState([""]);
  const [loading, setLoading] = React.useState(true);
  const location = useSelector(store => store.user.location)
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    try {
      setLoading(true)
      const fetchData = async () => {
        await axiosInstance.get('/restorentDetails')
          .then((res) => res && setData(res.data.restaurant))
          .then(() => setLoading(false))
      }
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  React.useEffect(() => {
    const datas = customFilter(data, filter, location)
    setFilterdData(datas)
  }, [filter, location, data])


  const itemsPerPage = 9;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = FilterData.slice(startIndex, endIndex);
  const handleRestaurantDetails = (id) =>{
    const restaurantData = itemsToDisplay.filter((value)=>value._id === id)
    dispatch(selectRestaurant(restaurantData[0]))
    navigate('/DetailPage')
  }

  return (
    <Container sx={{ py: 1 }} maxWidth="md">
      <Grid container spacing={4}>
        {itemsToDisplay.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                {loading ? (
                  <Skeleton
                    variant="rectangular"
                    // width={100}
                    height={150}
                  />
                ) : (
                  <CardMedia
                    onClick={()=>handleRestaurantDetails(card._id)}
                    key={`media-${card._id}`}
                    component="div"
                    sx={{
                      pt: "56.25%",
                      cursor: "pointer",
                    }}
                    image={
                      card.images && card.images[0]
                    }
                  />
                )}
                <CardContent sx={{ flexGrow: 1, cursor: "pointer" }}>
                  {loading ? (
                    <Box sx={{ pt: 0.5 }}>
                      <Skeleton />
                      <Skeleton width="60%" />
                    </Box>
                  ) : (
                    <>                <Typography gutterBottom variant="h5" component="h2">
                      <H1>{card.restaurantName}</H1>
                    </Typography>
                      <Typography>
                        <H3 variant="body2" component="poppins"> {card.location} </H3>
                      </Typography>
                    </>

                  )}
                </CardContent>
              </Card>
            </Grid>
          // ))}
        ))}
      </Grid>

      <Pagination
        count={Math.ceil(FilterData.length / itemsPerPage)}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
        sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
      />

    </Container>
  );
}