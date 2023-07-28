import { Helmet } from 'react-helmet-async';
// @mui
import {Button, Container, Stack, Typography,Dialog, DialogTitle, DialogContent, DialogActions, TextField  } from '@mui/material';
// components
import Iconify from '../components/iconify';
import {BlogPostsSort } from '../sections/@dashboard/blog';
import { useState } from 'react';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function Offres() {
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };
  return (
    <>
      <Helmet>
        <title> offers| dashboard </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Offers
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAddDialog}>
            Add Offers
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          {/* <BlogPostsSearch posts={} /> */}
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>


        {/* Add offer Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add Restaurant Details</DialogTitle>
        <DialogContent>
          {/* Replace the following TextField components with your desired form fields for adding restaurant details */}
          <TextField label="offer Name" fullWidth />
          <TextField label="price" fullWidth />
          <TextField label="max-discount" fullWidth />
          {/* Add more form fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseAddDialog} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

       
      </Container>
    </>
  );
}
