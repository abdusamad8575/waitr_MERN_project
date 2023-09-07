import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
} from '@mui/material';
import Iconify from '../../components/iconify';
import DialogBox from './DialogBox';

// ----------------------------------------------------------------------

export default function Addfood() {
  const [openAddDialog, setOpenAddDialog] = useState(false);

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
      
      <DialogBox openAddDialog={openAddDialog} setOpenAddDialog={setOpenAddDialog}/>

        <Card>
          uhckvcxnk,nxvckvkvkn
        </Card>
      </Container>
    </>
  );
}
