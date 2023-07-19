import React from 'react'
import { Container, Box, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Typography from '@mui/material/Typography';
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';


function Footer() {
  return (
    <footer style={{ backgroundColor: '#f5f5f5', padding: '20px 0' }}>
      <Container maxWidth="lg">
      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{color:'#ff645a'}}>
                <MDBIcon color='secondary' icon='gem' className='me-3' />
                Company name
              </h6>
              <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit
                amet, consectetur adipisicing elit.
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{color:'#ff645a'}}>Products</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Angular
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  React
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Vue
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Laravel
                </a>
              </p>
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{color:'#ff645a'}}>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>

              
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{color:'#ff645a'}}>Contact</h6>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                New York, NY 10012, US
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                info@example.com
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon color='secondary' icon='print' className='me-3' /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
        {/* Logo Image */}
        <Box textAlign="center" mb={2}>
          <img src="/accets/1689067571491.png" alt="Logo" style={{ width: '150px', height: 'auto' }} />
        </Box>

        <Typography variant="body2" align="center" color="textSecondary">
          Find the best Restaurants, Deals, Discounts & Offers
        </Typography>
        <Typography variant="body2" align="center" color="textTernary">
          Contact:+91-9544208575
        </Typography>

        {/* Social Media Icons */}
        <Box display="flex" justifyContent="center">
          <IconButton href="https://www.instagram.com/" target="_blank" rel="noopener" color="inherit">
            <InstagramIcon style={{ color: '#E1306C' }} />
          </IconButton>
          <IconButton href="https://twitter.com/" target="_blank" rel="noopener" color="inherit">
            <TwitterIcon style={{ color: '#1DA1F2' }} />
          </IconButton>
          <IconButton href="https://www.facebook.com/" target="_blank" rel="noopener" color="inherit">
            <FacebookIcon style={{ color: '#1877F2' }} />
          </IconButton>
          <IconButton href="https://www.linkedin.com/" target="_blank" rel="noopener" color="inherit">
            <LinkedInIcon style={{ color: '#0A66C2' }} />
          </IconButton>
        </Box>
          <Typography variant="body2" align="center" style={{ fontSize: '10px', color: '#626262' }}>
            © 2023, Whitr.com All Rights Reserved.    
            </Typography>
      </Container>
    </footer>
  )
}

export default Footer
