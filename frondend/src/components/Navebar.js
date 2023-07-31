import * as React from 'react';
import './Navebar.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import {Link, useNavigate} from 'react-router-dom'
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
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios';
import { logout } from '../redux-toolkit/userSlice';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
const pages = ['Home', 'Find Restaurant', 'Posts'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const settings = ['Login', 'Account', 'Add Hotels'];
const LogInSettings = ['Account', 'Add Hotels' ,'Logout'];



function Navebar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openAddDialog,setOpenAddDialog] = React.useState(false)
  const History = useNavigate(); 
  const dispatch = useDispatch();

  const sendLogoutReq = async()=>{  
    const res = await axios.post('/logout');
    if (res.status === 200) {
      return res;
    }
    return new Error('Unable to Logout');
  }

  const handleOpenAddDialog = () =>{
    setOpenAddDialog(true)
  }
  const handleCloseAddDialog = ()=>{
    setOpenAddDialog(false)
  }

  const isLoggedIn = useSelector((state)=>{
    return state.user.isLoggedIn          
  })
  const handleLogout = ()=>{
    sendLogoutReq()
    .then(()=>{
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
  };


  const [showSearch, setShowSearch] = React.useState(false);

  const handleToggleSearch = () => {
    setShowSearch((prevShowSearch) => !prevShowSearch);
  };

  return (
    <>
    <AppBar position="static">
      <Container maxWidth="xl" style={{ backgroundColor: 'white' }}>
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
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
                // display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page,index) => (
                <MenuItem key={page} onClick={handlePages}>
                  <Typography textAlign="center"><Link className='linkStyle' to={index ===0?'/':index === 1?'/findrestaurant':'/post'}>{page}</Link></Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src='/assets/1689067571491.png' alt="menu3" style={{ width: '70px', height: '30px' }} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} style={{ marginTop: '12px' }}>
            {pages.map((page,index) => (
              <Button
                key={page}
                onClick={handlePages}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
               <Link className='linkStyle' to={index ===0?'/':index === 1?'/findrestaurant':'/post'}> {page}</Link>
              </Button>
            ))}
          </Box>

          

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' }, // Show on mobile, hide on md and above
              alignItems: 'center',
              justifyContent: 'flex-end', // Align the search icon to the right
              ml: 2, // Add some left margin for spacing
            }}
          >
            <IconButton
              size="large"
              aria-label="search"
              aria-haspopup="true"
              onClick={handleToggleSearch} // Toggle the search box visibility on click
              color="inherit"
            >
              <SearchIcon style={{ color: 'black' }} />
            </IconButton>
          </Box>

          {/* Expanded Search Input and Button (for mobile and larger view) */}
          <Box
            sx={{
              flexGrow: 1,
              display: showSearch ? 'flex' : { xs: 'none', md: 'flex' }, // Show on mobile when expanded, hide on md and above
              alignItems: 'center',
              justifyContent: 'flex-end', // Align the search bar to the right
              ml: 2, // Add some left margin for spacing
            }}
          >
            <form className="d-flex" role="search">
              <input
                className="form-control me-1"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-sm"
                type="submit"
                style={{ backgroundColor: "#FF645A", color: 'white' }}
              >
                Search
              </button>
            </form>
          </Box>



          <Box sx={{ flexGrow: 0,marginLeft:'10px' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              {isLoggedIn ? LogInSettings.map((settings,index)=> (
                <MenuItem key={settings} onClick={()=>{index === 0 ? History('/account'): index ===1 ?handleOpenAddDialog() : handleLogout()}}>
                <Typography textAlign="center">{settings}</Typography>
              </MenuItem>
              )) : settings.map((setting) => (
                // <MenuItem key={setting} onClick={()=>handleSettings({setting})}>
                <MenuItem key={setting} onClick={handleSettings}>
                  <Typography textAlign="center"><Link className='linkStyle' to={'/signin'}>{setting}</Link></Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Dialog open={openAddDialog} onClose={setOpenAddDialog}>
      <DialogTitle>Send Adding Restaurant request</DialogTitle>
      <DialogContent>
      <TextField label="Restaurant Name" fullWidth />
          <TextField label="Location" fullWidth />
          <TextField label="Restaurant No." fullWidth />
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
    </>
  );
}

export default Navebar
