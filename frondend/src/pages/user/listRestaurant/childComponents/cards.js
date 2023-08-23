import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axiosInstance from "../../../../axios";
import { Box,Skeleton } from "@mui/material";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

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

export default function Album({ filter }) {
  const location = useSelector((state)=>state.user.location)
  const navigate = useNavigate();
  const [filterLocation, setfilterLocation] = React.useState('');
  const [data, setData] = React.useState([""]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    try {
      setLoading(true)
      const fetchData = async () => {
        await axiosInstance.get('/restorentDetails', filter)
          .then((res) =>res && setData(res.data.restaurant))
          .then(() => setLoading(false))
      }
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [filter]);
  // React.useEffect(()=>{
  //   console.log("data2:-",data); 
  //   try {
  //     const fetchFilterData = async()=>{
  //       const datas = await data.map((value)=>{
  //         console.log("sa",value);
  //       })
  //       // setfilterLocation(location)
  //     }
      
  //     fetchFilterData()
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // },[location])
  if(location !== ''){
    
    const datas = data.filter((value)=>{
      return value.location  === location
    })
    setfilterLocation(datas)
  }else{
    setfilterLocation(data)
    
  }
  console.log("sa",filterLocation);
  
  return (
    <Container sx={{ py: 1 }} maxWidth="md">
      <Grid container spacing={4}>
        {data.map((card, index) => (
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
                onClick={() =>
                                navigate(`/DetailPage?id=${card._id}`)
                              }
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
              <CardContent sx={{ flexGrow: 1 , cursor: "pointer" }}>
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
        ))}

      </Grid>
    </Container>
  );
}