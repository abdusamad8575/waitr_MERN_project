import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from 'react-redux'
import {signin} from '../redux-toolkit/userSlice'
import { Google } from './google';

const defaultTheme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch()
  const History = useNavigate();

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const [showErrors, setShowErrors] = React.useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    // Disable validation while the user is filling the form
    setShowErrors(false);
  };

  const sendRequest=async()=>{
    try{
      // Implement form submission logic here (e.g., send data to the server)
      const res = await axiosInstance.post('/signin',formData);
      const data = res.data;
      // console.log("data=>"+data.role)
      return data;
    } catch (err) {
      console.error('Error submitting data:', err.message);
      throw err
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Enable validation upon form submission
    setShowErrors(true);

    // Validation logic
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }

    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      // Validation failed, do not submit the form
      console.log('Validation errors:', errors);
      return;
    }

    // If validation passed, proceed with form submission
    // console.log(sendRequest());
    sendRequest()
    // .then(()=>dispatch(signin()))
    .then((data)=>{
      const userRole = data.role;
      dispatch(signin(data.user))
      switch (userRole) {
        case 'admin':
          History('/dashboard'); 
          break;
        case 'restaurent':
          History('/restaurent');
          break;
        default:
          History('/');
          break;
      }

    })
    .catch((err) => {
      toast.error(err?.response?.data?.message || err.message);
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
            padding: '30px',
            color: '#FF645A',
          }}
        >
          <img
            src="/assets/1689067571491.png"
            alt="menu3"
            style={{ width: '70px', height: '30px', margin: '10px' }}
            onClick={() => History('/')}
          />
          <Typography sx={{ fontWeight: '600' }}>Sign In</Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={showErrors && (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))} // Show error if field is empty or has invalid format and showErrors is true
                  helperText={showErrors && !formData.email.trim() ? 'Email is required' : (showErrors && !/\S+@\S+\.\S+/.test(formData.email) ? 'Invalid email format' : '')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={showErrors && !formData.password.trim()} // Show error if field is empty and showErrors is true
              helperText={showErrors && !formData.password.trim() ? 'Password is required' : ''}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#FF645A' }}
            >
              Sign In
            </Button>
            <Google />
            <Grid container>
              <Grid item xs>
                <Link variant="body2">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link onClick={() => History('/signup')} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
