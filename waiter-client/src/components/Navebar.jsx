import React from 'react';
import './Navebar.css';
import AppBar from '@mui/material/AppBar';
import { Link, useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../axios';
import axios from 'axios';
import { logout, locations } from '../redux-toolkit/userSlice';
import { Autocomplete, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { styled, alpha } from "@mui/material/styles";
import tryCatch from '../utils/tryCatch';

const pages = ['Home', 'Find Restaurant', 'Posts'];
const settings = ['Login', 'Account', 'Add Hotels'];
const LogInSettings = ['Account', 'Add Hotels', 'Logout'];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#000", 0.05),
  "&:hover": {
    backgroundColor: alpha('#ebebeb', 0.25),
  },
  marginLeft: 0,
  border: 20,
  width: "250px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: "#8f8888",
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
//------------------------------------------------------------------------------------------

function Navebar() {
  const location = useSelector((state) => state.user.location)
  const History = useNavigate();
  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openAddDialog, setOpenAddDialog] = React.useState(false)
  const [errors, setErrors] = React.useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false); 
  const [addHotel, setAddHotel] = React.useState({
    Rname: '',
    Rlocation: '',
    Rcontact: '',
  })
  const isLogged = useSelector((state) => {
    return state.user;
  })
  const isLoggedIn = isLogged.isLoggedIn;
  const userId = localStorage.getItem('userId')
  const userDetails = localStorage.getItem("user")
  const user = userDetails ? JSON.parse(userDetails) : ''




  //-----------------------------------------------------------------------------
  const [names, setNames] = React.useState([]);
  React.useEffect(() => {
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
    fetchData();
  }, [])

  const handleCarrentLocation = async () => {
    await axios.get('https://ipapi.co/json')
      .then((res) => dispatch(locations(res.data.city)))
      .catch((error) => console.log(error))
  }


  console.log("location1-", location);
  //------------------------------------------------------------------------------------------

  const sendLogoutReq = tryCatch(() => {
    const res = axiosInstance.post('/logout');
    return res;
  })

  const sendAddHotelReq = tryCatch(() => {
    console.log("userId=>", userId);
    const res = axiosInstance.post(`/addhotelreq?id=${userId}`, addHotel);
    return res

  })

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true)
    setAnchorElUser(null);
  }
  const handleProfile = () => {
    History('/account')
    setAnchorElUser(null);
  }
  const handleCloseAddDialog = () => {
    setAddHotel({
      Rname: '',
      Rlocation: '',
      Rcontact: '',
    });
    setOpenAddDialog(false)
  }

  const handleLogout = () => {
    sendLogoutReq()
      .then(() => {
        dispatch(logout())
        History('/')
      })
      .catch((err) => console.log(err));
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handlePages = () => {
    setAnchorElNav(null);
  };

  const handleSettings = () => {
    setAnchorElUser(null);
    History('/signin')
  };

  // -----------------------------------------------------------------------
  const [selectOpen, setSelectOpen] = React.useState(false);
  const validateForm = () => {
    const newErrors = {};

    if (!addHotel.Rname.trim()) {
      newErrors.Rname = 'Restaurant Name is required';
    }

    if (!addHotel.Rlocation.trim()) {
      newErrors.Rlocation = 'Location is required';
    }

    if (! /^\d{10}$/.test(addHotel.Rcontact)) {
      newErrors.Rcontact = 'Please Enter 10-digit Phone Number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDialogSubmit = async () => {
    const isValid = validateForm();
    if (isValid) {
      setAddHotel({
        Rname: '',
        Rlocation: '',
        Rcontact: '',
      });
      sendAddHotelReq()
      setOpenAddDialog(false);
    }

  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddHotel((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
  return (
    <Box mb={{ xs: 8, sm: 9, md: 11, lg: 12 }}>
      <AppBar position="fixed" sx={{ backgroundColor: 'white' }} >
        <Container maxWidth="xl" >
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
              onClick={()=>History('/')}
            >
              <img src='/assets/1689067571491.png' alt="menu3" style={{ width: '70px', height: '30px' }} />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon style={{ color: 'black' }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handlePages}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                

                <Search >
              <Tooltip title="Current Location">
                <LocationOnIcon style={{
                  color: "#8f8888",
                  paddingLeft: 6,
                  height: "100%",
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: 'pointer'
                }}
                  onClick={handleCarrentLocation}
                />
              </Tooltip>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                value={location}
                options={names}
                sx={{ width: {xs:"100%",sm:250}, paddingLeft: { xs: '10px', sm: '20px', md: "30px" } }}
                renderInput={(params) => <TextField {...params} placeholder='Location' sx={{
                  boxShadow: 'none',
                  '.MuiOutlinedInput-notchedOutline': {
                    border: 0,
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'transparent',
                  },
                }} />}
                size='small'
                onChange={(e, value) => dispatch(locations(value))}

              />
            </Search>



                {pages.map((page, index) => (
                  <MenuItem key={page} onClick={handlePages}>
                    <Typography textAlign="center"><Link className='linkStyle' to={index === 0 ? '/' : index === 1 ? '/findrestaurant' : '/post'}>{page}</Link></Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                // mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
              onClick={()=>History('/')}
            >
              <img src='/assets/1689067571491.png' alt="menu3" style={{ width: '70px', height: '30px' }} />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} style={{ marginTop: '12px' }}>
              {pages.map((page, index) => (
                <Button
                  key={page}
                  onClick={handlePages}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  <Link className='linkStyle' to={index === 0 ? '/' : index === 1 ? '/findrestaurant' : '/post'}> {page}</Link>
                </Button>
              ))}
            </Box>
            <Search sx={{display:{xs:'none',md:'block'}}}>
              <Tooltip title="Current Location">
                <LocationOnIcon style={{
                  color: "#8f8888",
                  paddingLeft: 6,
                  height: "100%",
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: 'pointer'
                }}
                  onClick={handleCarrentLocation}
                />
              </Tooltip>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                value={location}
                options={names}
                sx={{ width: {xs:120,sm:250}, paddingLeft: { xs: '10px', sm: '20px', md: "30px" } }}
                renderInput={(params) => <TextField {...params} placeholder='Location' sx={{
                  boxShadow: 'none',
                  '.MuiOutlinedInput-notchedOutline': {
                    border: 0,
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'transparent',
                  },
                }} />}
                size='small'
                onChange={(e, value) => dispatch(locations(value))}

              />
            </Search>








            <Box sx={{ flexGrow: 0, marginLeft: '10px' }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={user?.profilePic ? user.profilePic : "/static/images/avatar/2.jpg"} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleSettings}
              >
                {isLoggedIn ? LogInSettings.map((settings, index) => (
                  <MenuItem key={settings} onClick={() => { index === 0 ? handleProfile() : index === 1 ? handleOpenAddDialog() : handleLogout() }}>
                    <Typography textAlign="center">{settings}</Typography>
                  </MenuItem>
                )) : settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleSettings}>
                    <Typography textAlign="center"><Link className='linkStyle'>{setting}</Link></Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box
              sx={{
                display: { xs: isMobileMenuOpen ? 'block' : 'none', md: 'none' },
                width: '100%',
                textAlign: 'center',
              }}
            >
              {pages.map((page, index) => (
                <Button
                  key={page}
                  onClick={handlePages}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  <Link className='linkStyle' to={index === 0 ? '/' : index === 1 ? '/findrestaurant' : '/post'}> {page}</Link>
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Dialog open={openAddDialog} onClose={setOpenAddDialog} onSubmit={handleDialogSubmit}>
        <DialogTitle sx={{ color: '#FF645A' }} >Send Adding Restaurant request</DialogTitle>
        <DialogContent>
          <TextField label="Restaurant Name" fullWidth name='Rname' onChange={handleChange} value={addHotel.Rname} required
            error={!!errors.Rname}
            helperText={errors.Rname} />
          <TextField label="Location" fullWidth name='Rlocation' onChange={handleChange} value={addHotel.Rlocation} required
            error={!!errors.Rlocation}
            helperText={errors.Rlocation} />
          <TextField label="Your Contact Number" fullWidth name='Rcontact' onChange={handleChange} value={addHotel.Rcontact}
            required
            error={!!errors.Rcontact}
            helperText={errors.Rcontact} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} sx={{ color: '#FF645A' }} >
            Cancel
          </Button>
          <Button onClick={handleDialogSubmit} sx={{ color: '#FF645A' }} type='submit'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Navebar
