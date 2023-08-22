import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Stack,
  Button,
  Checkbox,
  MenuItem,
  Container,
  Typography,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';

import {CardActionArea, CardActions } from '@mui/material';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// components
import Iconify from '../components/iconify';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Autocomplete from '@mui/material/Autocomplete';
import axiosInstance from '../../../axios';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// ----------------------------------------------------------------------
const mealType = ['Breakfast', 'Lunch', 'Dinner ']
const resType = ['Veg', 'Non Veg', 'Veg and Non Veg ']
const cuisinesTypes = ['American', 'Arabian', 'Asian', 'Beverages', 'Biryani', 'Burger', 'Chettinad', 'Chinese', 'Continental', 'Coffee', 'Desserts', 'European', 'Fast Food', 'French', 'Italian', 'Japanese', 'Kerala', 'Malaysian', 'Mexican', 'North Eastern', 'Pizza', 'POrtuguese', 'Sea Food', 'South Indian', 'Spanish', 'Thamil', 'Tea', 'Turkish']
const FullWeek = ['Sunday', 'Monday', 'Tuesday ', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

// ----------------------------------------------------------------------

export default function RestaurantDetails() {
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const [selectedImages, setSelectedImages] = useState([]);

  const [names, setNames] = useState([]);
  const [selectOpen, setSelectOpen] = useState(false);
  const [datas,setDatas] = useState('')


  useEffect(() => {
    const fetchRestaurant = async () =>{
      try {
        await axiosInstance.get('/restaurant/fetchRestaurant')
          .then((res) =>
          // console.log(res.data.restaurant)
          setDatas(res.data.restaurant)
          )
      } catch (error) {
        console.log(error)
      }
    }
    const fetchData = async () => {
      try {
        await axiosInstance.get('/dashboard/fetchLocations')
          .then((res) =>  
            setNames(res.data.locations.location)
          )
      } catch (error) {
        console.log(error)
      }
    }

    fetchRestaurant();
    fetchData();
  }, [])
  const handleClose = () => {
    setSelectOpen(false);
  };

  const handleOpen = () => {
    setSelectOpen(true);
  };


  const [formData, setFormData] = useState({
    restaurantName: '',
    location: '',
    startTime: '',
    endTime: '',
    mealsType: [],
    daysOfWeek: [],
    restaurantType: [],
    cuisines: [],
    addTable: null
  });

  const handleLocation = async () => {
    await axios.get('https://ipapi.co/json')
      .then((res) => setFormData({ ...formData, location: res.data.city }))
      .catch((error) => console.log(error))
  }
  const [formErrors, setFormErrors] = useState({
    restaurantName: '',
    location: '',
    startTime: '',
    endTime: '',
    mealsType: '',
    restaurantType: '',
    cuisines: '',
  });

  const handleImageUpload = (event) => {
    const files = event.target.files;
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

    if (formData.restaurantType.length === 0) {
      newFormErrors.restaurantType = 'At least one Restaurant type must be selected';
      valid = false;
    } else {
      newFormErrors.restaurantType = '';
    }

    if (formData.cuisines.length === 0) {
      newFormErrors.cuisines = 'At least one cuisines type must be selected';
      valid = false;
    } else {
      newFormErrors.cuisines = '';
    }

    if (selectedImages.length === 0) {
      newFormErrors.images = "Please select at least one image.";
      valid = false;
    } else {
      newFormErrors.images = '';
    }

    setFormErrors(newFormErrors);
    return valid;
  };

  const handleSubmit = async () => {
    const isValid = validateForm();

    if (!isValid) {
      return;
    } else {
      // Create a new FormData object
      const newFormData = new FormData();

      // Append fields from formData to new FormData
      for (const [key, value] of Object.entries(formData)) {
        if (key === 'mealsType' || key === 'daysOfWeek' || key === 'restaurantType' || key === 'cuisines') {
          // Convert arrays to comma-separated strings
          newFormData.append(key, value.join(','));
        }
        // else if (key === 'addTable') {
        //   // Append addTable sub-fields to new FormData
        //   for (const table of value) {
        //       // console.log("table-",value);
        //     newFormData.append('addTable', JSON.stringify(table));
        //     for (const img of table.images) {
        //     //   console.log("table-",img);
        //     // newFormData.append('img', img);

        //     }
        //   }
        // } 

        else {
          newFormData.append(key, value);
        }
      }
      for (const image of selectedImages) {
        newFormData.append('images', image);
      }
   const id = localStorage.getItem("userId")
   newFormData.append('id', id);
      axiosInstance.post('/restaurant/adminAddRestorent', newFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          console.log('Response from backend:', response.data);
          setFormData({
            restaurantName: '',
            location: '',
            startTime: '',
            endTime: '',
            mealsType: [],
            daysOfWeek: [],
            restaurantType: [],
            cuisines: [],
            addTable: null
          })
          setSelectedImages([])
          setOpenAddDialog(false);
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
  console.log("samad",datas);
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



            <div style={{ display: 'flex', marginBottom: '18px' }} >
              {/* <TextField fullWidth label="Location" sx={{ mr: 1 }}
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                error={!!formErrors.location}
                helperText={formErrors.location} /> */}
              <FormControl sx={{ mr: 1, minWidth: 120 }} fullWidth>
                <InputLabel id="demo-controlled-open-select-label">Location</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={selectOpen}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={formData.location}
                  label="Location"
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  error={!!formErrors.location}
                >
                  {names.map((location)=>
                    <MenuItem value={location}>{location}</MenuItem>)}
                  
                </Select>
              </FormControl>

              <Button variant="contained" color="primary" component="span" onClick={handleLocation}>
                Location
              </Button>
            </div>
            {formErrors.location && (
              <p style={{ color: 'red', textAlign: 'center', fontSize: 'small' }}>{formErrors.location}</p>
            )}




            <Stack direction="row" mb={2}>
              <TextField label="Start time" id='startTime' sx={{ mr: 1 }}
                value={formData.startTime}
                fullWidth
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                error={!!formErrors.startTime}
                helperText={formErrors.startTime} />
              <TextField label="End time" id='endTime' sx={{ ml: 1 }}
                value={formData.endTime}
                fullWidth
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
                // error={!!formErrors.daysOfWeek}
                // helperText={formErrors.daysOfWeek} 
                />
              )}
            />

            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              sx={{ mb: 2 }}
              options={resType}
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
              value={formData.restaurantType} // Set the selected values here
              onChange={(event, newValue) => setFormData({ ...formData, restaurantType: newValue })}
              renderInput={(params) => (
                <TextField {...params} label="Restaurant Type" placeholder="select"
                  error={!!formErrors.restaurantType}
                  helperText={formErrors.restaurantType} />
              )}
            />

            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              sx={{ mb: 2 }}
              options={cuisinesTypes}
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
              value={formData.cuisines} // Set the selected values here
              onChange={(event, newValue) => setFormData({ ...formData, cuisines: newValue })}
              renderInput={(params) => (
                <TextField {...params} label="Cuisines" placeholder="select"
                  error={!!formErrors.cuisines}
                  helperText={formErrors.cuisines} />
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
                accept='image/*'
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
            </div>
            {formErrors.images && (
              <p style={{ color: 'red', textAlign: 'center', fontSize: 'small' }}>{formErrors.images}</p>
            )}

            {/* <DynamicFieldsExample  onValueChange={handleValueFromChild} /> */}

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

        <Card >
        <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={datas?.restaurantId?.images[0]} 
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Name:{datas?.restaurantId?.restaurantName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Location:{datas?.restaurantId?.location}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Start Time:{datas?.restaurantId?.startTime}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          End Time:{datas?.restaurantId?.endTime}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Location:{datas?.restaurantId?.location}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Location:{datas?.restaurantId?.location}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions> */}
        </Card>
      </Container>
    </>
  );
}
