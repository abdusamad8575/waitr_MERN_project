import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Autocomplete from '@mui/material/Autocomplete';
import DynamicFieldsExample from './sub pages/DynamicFieldsExample ';
import axiosInstance from '../../../axios';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'location', label: 'Location', alignRight: false },
  { id: 'no', label: 'Restaurant No.', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

const mealType = ['Breakfast', 'Lunch', 'Dinner ']
const FullWeek = ['Sunday', 'Monday', 'Tuesday ', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

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

export default function RestaurantDetails() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openAddDialog, setOpenAddDialog] = useState(false);


  const [selectedImages, setSelectedImages] = useState([]);

  const [formData, setFormData] = useState({
    restaurantName: '',
    location: '',
    startTime: '',
    endTime: '',
    mealsType: [],
    daysOfWeek: [],
    addTable:null
  });
  
  const [formErrors, setFormErrors] = useState({
    restaurantName: '',
    location: '',
    startTime: '',
    endTime: '',
    mealsType: '',
    daysOfWeek: '',
  });

  const handleImageUpload = (event) => {
    const files = event.target.files;
    // const selectedImagesArray = Array.from(files).map((file) => URL.createObjectURL(file));
    const validFiles = [];

    for (let i = 0; i < files.length; i++) {
      if (allowedImageTypes.includes(files[i].type)) {
        validFiles.push(files[i]);
      }
    }
    setSelectedImages(validFiles);
  };


  const validateForm = () => {
    let valid = true;
    const newFormErrors = { ...formErrors };

    if (formData.restaurantName.trim() === '') {
      newFormErrors.restaurantName = 'Restaurant name is required';
      valid = false;
    } else {
      newFormErrors.restaurantName = '';
    }

    if (formData.location.trim() === '') {
      newFormErrors.location = 'Location is required';
      valid = false;
    } else {
      newFormErrors.location = '';
    }

    if (formData.startTime.trim() === '') {
      newFormErrors.startTime = 'Start time is required';
      valid = false;
    } else {
      newFormErrors.startTime = '';
    }

    if (formData.endTime.trim() === '') {
      newFormErrors.endTime = 'End time is required';
      valid = false;
    } else {
      newFormErrors.endTime = '';
    }

    if (formData.mealsType.length === 0) {
      newFormErrors.mealsType = 'At least one meal type must be selected';
      valid = false;
    } else {
      newFormErrors.mealsType = '';
    }

    if (formData.daysOfWeek.length === 0) {
      newFormErrors.daysOfWeek = 'At least one day of the week must be selected';
      valid = false;
    } else {
      newFormErrors.daysOfWeek = '';
    }

    if (selectedImages.length === 0) {
      newFormErrors.images = "Please select at least one image.";
      valid = false;
    }else{
      newFormErrors.images = '';
    }

    setFormErrors(newFormErrors);
    return valid;
  };

// const compleateData = {
//   ...formData,
//   images: selectedImages
// }

// const formDatas = new FormData();

//     for (const image of selectedImages) {
//       formDatas.append('images', image);
//     }

  const handleSubmit = async () => {
    const isValid = validateForm();
    
    if (!isValid) {
      return;
    }else{







      // Create a new FormData object
  const newFormData = new FormData();

  // Append fields from formData to new FormData
  for (const [key, value] of Object.entries(formData)) {
    if (key === 'mealsType' || key === 'daysOfWeek') {
      // Convert arrays to comma-separated strings
      newFormData.append(key, value.join(','));
    } else if (key === 'addTable') {
      // Append addTable sub-fields to new FormData
      for (const table of value) {
          // console.log("table-",value);
        newFormData.append('addTable', JSON.stringify(table));
        for (const img of table.images) {
        //   console.log("table-",img);
        // newFormData.append('img', img);

        }
      }
    } else {
      newFormData.append(key, value);
    }
  }

  // Append images to the new FormData
  for (const image of selectedImages) {
    newFormData.append('images', image);
  }


  console.log(formData);



    //   console.log("25-",newFormData);
      axiosInstance.post('/restaurant/adminAddRestorent', newFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log('Response from backend:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });


    }
  };





  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

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
      const newSelecteds = USERLIST.map((n) => n.name);
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

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const [receivedValue, setReceivedValue] = useState('');
  const handleValueFromChild = (value) => {
    setReceivedValue(value);
    setFormData({...formData,addTable:receivedValue})
  };


  return (
    <>
      <Helmet>
        <title> addhotel | dashboard </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Restaurant
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAddDialog}>
            Add Restaurant
          </Button>
        </Stack>

        {/* Add Restaurant Dialog */}
        <Dialog open={openAddDialog} onClose={handleCloseAddDialog} onSubmit={handleSubmit}>
          <DialogTitle sx={{ pt: 5 }}>Add Restaurant Details</DialogTitle>
          <DialogContent >
            <TextField fullWidth label="Restaurant Name" id="restaurantName" sx={{ mb: 2 }}
              value={formData.restaurantName}
              onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
              error={!!formErrors.restaurantName}
              helperText={formErrors.restaurantName} />
            <TextField fullWidth label="Location" sx={{ mb: 2 }}
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              error={!!formErrors.location}
              helperText={formErrors.location} />
            <Stack direction="row" mb={2}>
              <TextField label="Start time" id='startTime' sx={{ mr: 1 }}
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                error={!!formErrors.startTime}
                helperText={formErrors.startTime} />
              <TextField label="End time" id='endTime' sx={{ ml: 1 }}
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                error={!!formErrors.endTime}
                helperText={formErrors.endTime} />
            </Stack>

            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              sx={{ mb: 2 }}
              options={mealType}
              fullWidth
              disableCloseOnSelect
              getOptionLabel={(option) => option}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
              // style={{ width: 500 }}
              value={formData.mealsType} // Set the selected values here
              onChange={(event, newValue) => setFormData({ ...formData, mealsType: newValue })}
              renderInput={(params) => (
                <TextField {...params} label="Meals Type" placeholder="select"
                  error={!!formErrors.mealsType}
                  helperText={formErrors.mealsType}
                />
              )}

            />

            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              sx={{ mb: 2 }}
              options={FullWeek}
              fullWidth
              disableCloseOnSelect
              getOptionLabel={(option) => option}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
              // style={{ width: 500 }}
              value={formData.daysOfWeek} // Set the selected values here
              onChange={(event, newValue) => setFormData({ ...formData, daysOfWeek: newValue })}
              renderInput={(params) => (
                <TextField {...params} label="Of Days" placeholder="select"
                  error={!!formErrors.daysOfWeek}
                  helperText={formErrors.daysOfWeek} />
              )}
            />
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
              {selectedImages.map((imageSrc, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(imageSrc)}
                  alt={`${index + 1}`}
                  style={{ maxWidth: '100px', maxHeight: '100px', margin: '10px' }}
                />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <label htmlFor="image-upload">
                <Button variant="contained" color="primary" component="span">
                  Upload Restaurant Images
                </Button>
              </label>
              <input
                type="file"
                id="image-upload"
                multiple
                accept = 'image/*'
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
            </div>
            {formErrors.images && (
        <p style={{ color: 'red', textAlign: 'center' }}>{formErrors.images}</p>
      )}

            <DynamicFieldsExample  onValueChange={handleValueFromChild} />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary" type='submit'>
              Add
            </Button>
          </DialogActions>
        </Dialog>





        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, role, status, company, isVerified } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{company}</TableCell>

                        <TableCell align="left">{role}</TableCell>

                        <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>

                        <TableCell align="left">
                          <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
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

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
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
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
