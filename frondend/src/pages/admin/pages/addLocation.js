
import { Helmet } from 'react-helmet-async';
// @mui
import {Button, Container, Stack, Typography,Dialog, DialogTitle, DialogContent, DialogActions, TextField  } from '@mui/material';
// components
import Iconify from '../components/iconify';
import {BlogPostsSort } from '../sections/@dashboard/blog';
import { useState } from 'react';
import tryCatch from '../../../utils/tryCatch';
import axiosInstance from '../../../axios';

// ----------------------------------------------------------------------

export default function AddLocation() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [errors, setErrors] = useState({});
  const [locations, setLocation] = useState({location:''});
  console.log(locations);

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };
  const validateForm = () => {
    const newErrors = {};

    if (!locations.location.trim()) {
      newErrors.Rname = 'Restaurant Name is required';
    }else{
        newErrors.Rname = '';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = tryCatch(()=>{
    const isValid = validateForm();
    if (isValid) {
        console.log('bjdvgj');
    //   setAddHotel({
    //     Rname: '',
    //   });
    //   axiosInstance.post('/dashboard/location',{locations})
      setOpenAddDialog(false);
    }
  })
  return (
    <>
      <Helmet>
        <title> Add Location| dashboard </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Location
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAddDialog}>
            Add Location
          </Button>
        </Stack>


        {/* Add offer Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add Location Details</DialogTitle>
        <DialogContent>
          {/* Replace the following TextField components with your desired form fields for adding restaurant details */}
          <TextField label="Location" fullWidth onChange={(e)=>setLocation({location: e.target.value})} value={locations.location} required
            error={!!errors.Rname}
            helperText={errors.Rname} />
          {/* <TextField label="price" fullWidth />
          <TextField label="max-discount" fullWidth /> */}
          {/* Add more form fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

       
      </Container>
    </>
  );
}
