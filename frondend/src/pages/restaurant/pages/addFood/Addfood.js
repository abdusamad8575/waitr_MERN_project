import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import styled from "@emotion/styled";
import Album from './childComponents/cards'
import axiosInstance from '../../../../axios';
// @mui
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Grid, 
  Box
} from '@mui/material';
import Iconify from '../../components/iconify';
import DialogBox from './DialogBox';

// ----------------------------------------------------------------------
const FiliterContainer = styled(Container)({});


const LeftSide = styled(Box)({
  display: "flex",
  flexDirection: "column",
  paddingTop: "10px",
  margin: { sx: 0, sm: 0, md: 0, lg: 0, xl: 0 },
  marginTop: { md: 2, lg: 2, xl: 2, sx: 0 },
  marginLeft: { md: 2, lg: 2, xl: 2 },
});

export default function Addfood() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [data,setData] = useState([])

  useEffect(()=>{
    const fetchDatas = async() =>{
      try {
        await axiosInstance.get('/restaurant/foodDetails')
          .then((res) =>
            setData(res.data.foodDetails)
          ).catch((error)=>{
            console.log(error);
          })
      } catch (error) {
        console.log(error)
      }
    }
    fetchDatas()
  },[])

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };
  return (
    <>
      <Helmet>
        <title> addfood | restaurant </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Food Details
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAddDialog}>
            Add Food
          </Button>
        </Stack>

        {/* Add Restaurant Dialog */}

        <DialogBox openAddDialog={openAddDialog} setOpenAddDialog={setOpenAddDialog} />

        <Card>
          <FiliterContainer>
            <Grid container >
              <Grid item xs={12}>
                <LeftSide>
                  <Album data={data} />
                </LeftSide>
              </Grid>
            </Grid>
          </FiliterContainer>
        </Card>
      </Container>
    </>
  );
}
