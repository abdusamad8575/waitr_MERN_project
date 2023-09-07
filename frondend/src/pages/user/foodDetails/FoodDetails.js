import React,{ useEffect, useState } from 'react'
import Navebar from '../../../components/Navebar'
import Footer from '../../../components/Footer'
import { Typography, Breadcrumbs ,Grid, Link,Container,Box} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import styled from "@emotion/styled";
import Album from "./childComponents/cards"; 
import Filiter from "./childComponents/filter";
import FreeSolo from "./childComponents/SearchBar";

const FiliterContainer = styled(Container)({});


const LeftSide = styled(Box)({
  display: "flex",
  flexDirection: "column",
  paddingTop: "10px",
  margin: { sx: 0, sm: 0, md: 0, lg: 0, xl: 0 },
  marginTop: { md: 2, lg: 2, xl: 2, sx: 0 },
  marginLeft: { md: 2, lg: 2, xl: 2 },
});
function totalElements(obj) {
  let totalCount = 0;
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && Array.isArray(obj[key])) {
      totalCount += obj[key].length;
    }
  }
  return totalCount
}
const FoodDetails = () => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({})
  const [filterCount, setCount] = useState(0)
  const [search, setSearch] = React.useState('')
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
      Find Restaurant
    </Link>,
    <Typography key="3" color="text.primary">
      Food Details
    </Typography>,
  ];

  useEffect(() => {
    console.log(search);
    setFilters(prev => ({ ...prev, search }))
    console.log(filters);
  }, [search])
  useEffect(() => {
    const count = totalElements(filters)
    setCount(count)
  }, [filters])
  useEffect(() => {
    !filterCount && setFilters({})
  }, [filterCount])
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
          <FreeSolo filterCount={filterCount} search={search} apply={setSearch} removeFilter={setCount} />
          <Grid container >
            {/* <Grid item xs={12} md={3} lg={2.5} marginTop={1}>
              <Filiter filter={filterCount} apply={setFilters} />
            </Grid> */}
            <Grid item xs={12} md={9} sm={12} lg={9.5}>
              <LeftSide>
                <Album />
              </LeftSide>
            </Grid>
          </Grid>
        </FiliterContainer>
      
      <Footer />
    </>
  )
}

export default FoodDetails