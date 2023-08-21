
import { Helmet } from 'react-helmet-async';
// components
import Iconify from '../components/iconify';
import { useEffect, useState } from 'react';
import tryCatch from '../../../utils/tryCatch';
import axiosInstance from '../../../axios';
import {
  Card,
  Table,
  Paper,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Button, Container, Stack, Typography,Dialog, DialogTitle, DialogContent, DialogActions, TextField 
} from '@mui/material';
// import USERLIST from '../_mock/user';
import { filter } from 'lodash';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead} from '../sections/@dashboard/user';

// ----------------------------------------------------------------------
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);

}

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
];

export default function AddLocation() {
  
  const [open, setOpen] = useState(null);
  
  const [page, setPage] = useState(0);
  
  const [order, setOrder] = useState('asc');
  
  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');
  
  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const [openAddDialog, setOpenAddDialog] = useState(false);
  // ----------------------------------------------------------------------
  
  
  // const [selectedImages, setSelectedImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [locations, setLocation] = useState({location:''});
  const [locationDatas,setLocationDatas] = useState([])

  useEffect(()=>{
    const fetchData = async()=>{
    try{
      await axiosInstance.get('/dashboard/fetchLocations')
      .then((res)=>
      setLocationDatas(res.data.locations.location)
      // console.log(res.data.locations.location)
      )
    }catch(error){
      console.log(error)
    }
  }
    fetchData();
    
  },[])
console.log("locationDatas",locationDatas);
  

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
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = tryCatch(()=>{
    const isValid = validateForm();
    console.log(isValid);
    if (isValid) {
        console.log('bjdvgj');
        setLocation({
        location: '',
      });
      axiosInstance.post('/dashboard/location',locations)
      .then((res)=>
      setLocationDatas(res.data.locations.location))
      setOpenAddDialog(false);
    }
  })



  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = locationDatas.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - locationDatas.length) : 0;

  const filteredUsers = applySortFilter(locationDatas, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;
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


      <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={locationDatas.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((location) => {
                    // const {location} = row;
                    // console.log(row);
                    
                    const selectedUser = selected.indexOf(location) !== -1;

                    return (
                      <TableRow hover key={location} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, location)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {location}
                            </Typography>
                          </Stack>
                        </TableCell>

                        {/* <TableCell align="left">{company}</TableCell>

                        <TableCell align="left">{role}</TableCell>

                        <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>

                        <TableCell align="left">
                          <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell> */}
                      </TableRow>
                    )
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          {/* <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{location}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography> */}
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={locationDatas.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
       
      </Container>
    </>
  );
}
