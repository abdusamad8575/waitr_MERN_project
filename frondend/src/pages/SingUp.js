import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import tryCatch from '../utils/tryCatch'


const defaultTheme = createTheme();

export default function  SignUp() {
  const History = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [showErrors, setShowErrors] = useState(false); // Flag to show validation errors

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    // Disable validation while the user is filling the form
    setShowErrors(false);
  };


  const sendRequest = tryCatch(()=>{
      const res = axiosInstance.post('/signup', formData);
      return res
    }
)

  const handleSubmit = async (event) => {
    // console.log(formData);
    event.preventDefault();
    // Enable validation upon form submission
    setShowErrors(true);

    // Validation logic
    const errors = {};
    if (!formData.firstName.trim()) {
      errors.firstName = 'First Name is required';
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last Name is required';
    }
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
    sendRequest().then(()=> History("/signin"))
    .catch(err=>console.log(err))
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
          <Typography sx={{ fontWeight: '600' }}>Sign Up</Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formData.firstName}
                  onChange={handleChange}
                  error={showErrors && !formData.firstName.trim()} // Show error if field is empty and showErrors is true
                  helperText={showErrors && !formData.firstName.trim() ? 'First Name is required' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={showErrors && !formData.lastName.trim()} // Show error if field is empty and showErrors is true
                  helperText={showErrors && !formData.lastName.trim() ? 'Last Name is required' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={showErrors && (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))} // Show error if field is empty or has invalid format and showErrors is true
                  helperText={showErrors && !formData.email.trim() ? 'Email is required' : (showErrors && !/\S+@\S+\.\S+/.test(formData.email) ? 'Invalid email format' : '')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  error={showErrors && !formData.password.trim()} // Show error if field is empty and showErrors is true
                  helperText={showErrors && !formData.password.trim() ? 'Password is required' : ''}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#FF645A' }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={() => History('/signin')} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
