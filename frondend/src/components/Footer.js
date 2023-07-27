import React from 'react'
import './Footer.css'
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
            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{color:'#ff645a'}}>Discover
</h6>
              <p>
                <a href='#!' className='text-reset'>
                Trending Restaurants
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Super Savers
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Post
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Contactless Dining
                </a>
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{color:'#ff645a'}}>About</h6>
              <p>
                <a href='#!' className='text-reset'>
                About Us
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Post
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Careers
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Dineout for Business
                </a>
              </p>
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{color:'#ff645a'}}>Top Facilities</h6>
              <p>
                <a href='#!' className='text-reset'>
                Fine Dining
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                5 Star
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                4 Star
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Rooftop
                </a>
              </p>

              
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{color:'#ff645a'}}>Contact</h6>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                Kochi, Panampalli, Kerala
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                waitr@gmail.com
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> + 91 9544208575
              </p>
              <p>
                <MDBIcon color='secondary' icon='print' className='me-3' /> + 91 8943190615
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
        {/* Logo Image */}
        <Box textAlign="center" mb={2}>
          <img src="/assets/1689067571491.png" alt="Logo" style={{ width: '150px', height: 'auto',display: 'inline-block' }} />
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
