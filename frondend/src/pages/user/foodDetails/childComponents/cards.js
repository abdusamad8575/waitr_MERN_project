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
import { selectRestaurant } from '../../../../redux-toolkit/userSlice'
import FreeSolo from "./SearchBar";
import searchData from './custamsearch'

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

export default function Album({ data }) {
  const [search, setSearch] = React.useState('')
  const [datas, setDatas] = React.useState()
  React.useEffect(() => {
    const searchDatas = searchData(search,data)
    setDatas(searchDatas)
  }, [search])
  // console.log("datas12/:-", data);
  // const dispatch = useDispatch()
  // const navigate = useNavigate();
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filterDatas = datas  ?  datas : data ;
  // console.log("datas1",datas);
  const itemsToDisplay = filterDatas.slice(startIndex, endIndex);


  const handleselect = (id) => {
    const restaurantData = itemsToDisplay.filter((value) => value._id === id)
    // dispatch(selectRestaurant(restaurantData[0]))
    // navigate('/DetailPage')
  }

  return (
    <>
      <FreeSolo search={search} apply={setSearch} />
      <Container sx={{ py: 1 }} >
        <Grid container spacing={4}>
          {itemsToDisplay.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                {!data ? (
                  <Skeleton
                    variant="rectangular"
                    // width={100}
                    height={150}
                  />
                ) : (
                  <CardMedia
                    onClick={() => handleselect(card._id)}
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
                  {!data ? (
                    <Box sx={{ pt: 0.5 }}>
                      <Skeleton />
                      <Skeleton width="60%" />
                    </Box>
                  ) : (
                    <>
                      <Typography gutterBottom variant="h5" component="h2">
                        <H1>{card.foodName}</H1>
                      </Typography>
                      <Typography>
                        <H3 variant="body2" component="poppins"> {card.price} </H3>
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
          count={Math.ceil(data.length / itemsPerPage)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
        />

      </Container>
    </>
  );
}