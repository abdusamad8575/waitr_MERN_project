import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Box, Skeleton,Button } from "@mui/material";
import styled from "@emotion/styled";
import FreeSolo from "./SearchBar";
import searchData from './custamsearch'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Pagination from '@mui/material/Pagination';
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()
  const [search, setSearch] = React.useState('')
  const [datas, setDatas] = React.useState()
  const [prodect, setProdect] = React.useState([])
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
  const itemsToDisplay = filterDatas.slice(startIndex, endIndex);

const setCount = (index,type)=>{
  itemsToDisplay[index].count += type === 'inc' ? 1 : itemsToDisplay[index].count? -1 : 0
  console.log("itemsToDisplay:-",itemsToDisplay);
  const filterData = prodect.filter((value)=>value.foodName !== itemsToDisplay[index].foodName && value.count)
  setProdect([...filterData,itemsToDisplay[index]])
  
  
}
console.log("filterData:-",prodect)
  return (  
    <>
      <FreeSolo search={search} apply={setSearch} />
      <Container sx={{ py: 1 ,width:"100%"}} >
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
                    key={`media-${index}`}
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
                    <Box sx={{display:'flex',justifyContent:'space-between'}}>
                      <Typography gutterBottom variant="h5" component="h2">
                        <H1>{card.foodName}</H1>
                      </Typography>
                      <Typography>
                        <H3 variant="body2" component="poppins"><CurrencyRupeeIcon sx={{fontSize :'small'}} />:{card.price} </H3>
                      </Typography>
                    </Box>
                    <Typography>
                    <H3 variant="body2" component="poppins"> {card.description} </H3>
                  </Typography>
                  <Grid sx={{display:'flex',justifyContent:'center',marginTop:1}}>
                    {card.count ? <Box sx={{ width: '100px', height: '31px', backgroundColor: '#ff645a', color: '#ffffff', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '4px' }}>
                        <RemoveIcon onClick={() => setCount(index,'dec')} sx={{ cursor: 'pointer' }} />
                        <Box sx={{ fontWeight: 600, }} mr={2} ml={2} >{card.count}</Box>
                        <AddIcon onClick={() => setCount(index,'inc')} sx={{ cursor: 'pointer' }} />
                    </Box> :
                  <Button variant="contained" color="error" size="small" sx={{width: '100px',backgroundColor:'#ff645a'}} onClick={() => setCount(index,'inc')} >Add Food</Button>}
                  </Grid>
                  </>

                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
           {prodect.length && prodect[0].count ? <Grid sx={{display:'flex',justifyContent:'center',position:'sticky',bottom:0,marginTop:2}}>
              <Box   sx={{backgroundColor:'#ff645a',width:{xs:'100%',sm:'500px',md:'800px'},borderRadius:'3px',padding:2,color:'#fff',display:'flex',justifyContent:'space-between',cursor:'pointer'}} onClick={()=>navigate('/cart')}>
                <Typography sx={{fontWeight:700}}>{prodect.length}item|<CurrencyRupeeIcon sx={{fontSize :'18px'}} />{prodect.reduce((total,value)=>total+=value.price*value.count,0)}</Typography>
                <Typography sx={{fontWeight:700}}>VIEW CART <ShoppingCartIcon sx={{fontWeight:700}} /></Typography>
              </Box>
            </Grid>: ''}

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