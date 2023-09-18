import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';
import axiosInstance from '../../../axios';
// import { IconButton } from '@mui/material';
import { Box, Typography, Grid, IconButton, Button, Card, Avatar } from '@mui/material';
import './account.css'
import { signin } from '../../../redux-toolkit/userSlice';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { compareTime } from '../../../utils/compareTime';
import SlideshowIcon from '@mui/icons-material/Slideshow';


export default function AccountContant() {
  const dispatch = useDispatch()
  const userId = JSON.parse(localStorage.getItem('userId'))

  const [hovered, setHovered] = useState(false);
  const [user, setUser] = useState('')
  const [order, setOrder] = useState({})
  const [orderShow, setOrderShow] = useState('live');
  useEffect(() => {
    const fetchUserData = async () => {
      await axiosInstance.get('/userDitails', {
        params: {
          userId: userId
        }
      })
        .then((res) => {
          setUser(res.data.user)
          setSelectedImage(res.data.user.profilePic)
        })
        .catch((error) => {
          console.log(error);
        })
    }
    const fetchOrders = async () => {
      await axiosInstance.get(`/fetchOrderDetails?userId=${userId}`)
        .then((res) => {
          const data = {
            live: [],
            past: []
          }
          res?.data?.order?.map(x => compareTime(x.guestDetails.date, x.guestDetails.time) ? data.live.push(x) : data.past.push(x))
          setOrder(data)
        })
        .catch((error) => {
          console.log(error);
        })
    }
    fetchUserData()
    fetchOrders()
  }, [])


  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axiosInstance.post(`/uploadProfilepicture?id=${userId}`, formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        // console.log('Image uploaded successfully');
        setSelectedImage(response.data.user.profilePic)
        dispatch(signin(response.data.user))

      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  // const currentDate=new Date().toLocaleDateString()
  return (
    <div className="gradient-custom-2">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              {/* <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#FF645A', height: '200px' }}>

                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <div className="image-upload-container">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                    >
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleImageChange}
                      />
                      <MDBCardImage
                        src={selectedImage
                          ? selectedImage
                          : 'https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png'}
                        alt="User Profile"
                        className="mt-4 mb-2 img-thumbnail"
                        fluid
                        style={{ width: '150px' }}
                      />
                      {hovered && (
                        <div className="edit-icon-container">
                          <EditIcon className="edit-icon" />
                        </div>
                      )}
                    </IconButton>
                  </div>
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }} >
                  <MDBTypography tag="h5">{user.firstName + " " + user.lastName}</MDBTypography>
                  <MDBCardText>{user.email}</MDBCardText>
                </div>

              </div> */}
              <Card
                elevation={0}
                sx={{
                  backgroundColor: '#FF645A',
                  height: 'auto', 
                  color: 'white',
                  padding: '16px',
                }}
              >
                <Grid container alignItems={"center"}>
                  <Grid item xs={12} md={4} >
                    <div style={{ width: '100%' }}>
                      <div className="image-upload-container" >
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="label"
                          onMouseEnter={() => setHovered(true)}
                          onMouseLeave={() => setHovered(false)}
                        >
                          <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={handleImageChange}
                          />
                          <MDBCardImage
                            src={selectedImage
                              ? selectedImage
                              : 'https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png'}
                            alt="User Profile"
                            className="mt-4 mb-2 img-thumbnail"
                            fluid
                            style={{ width: '150px' }}
                          />
                          {hovered && (
                            <div className="edit-icon-container">
                              <EditIcon className="edit-icon" />
                            </div>
                          )}
                        </IconButton>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Typography variant="h5" >{user.firstName + ' ' + user.lastName}</Typography>
                    <Typography>{user.email}</Typography>
                  </Grid>
                </Grid>
              </Card>
              <div className="p-2 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <Grid container justifyContent={{ xs: 'center', sm: 'flex-end' }} alignItems="center" spacing={3}>
                  <Grid item>
                    <div
                      style={{ cursor: 'pointer', color: 'green' }}
                      onClick={() => setOrderShow('live')}
                    >
                      <Typography variant="h5" gutterBottom sx={{ display: 'flex', justifyContent: 'center' }}>
                        {order && order?.live?.length}
                      </Typography>
                      <Typography variant="body2" style={{ color: 'green' }}>
                        Live Orders
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item>
                    <div
                      style={{ cursor: 'pointer', color: 'red' }}
                      onClick={() => setOrderShow('past')}
                    >
                      <Typography variant="h5" gutterBottom sx={{ display: 'flex', justifyContent: 'center' }}>
                        {order && order?.past?.length}
                      </Typography>
                      <Typography variant="body2" style={{ color: 'red' }}>
                        Past Orders
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </div>

              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">Orders</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>

                    {order && order?.[orderShow]?.map((value, index) => (

                      <Grid container
                        key={index}
                        sx={{
                          backgroundColor: '#f2f2f2',
                          p: 3,
                          borderRadius: 4,
                          boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
                          minWidth: { sm: "300px", md: "400px" },
                          mb: 1,
                        }}
                      >
                        <Grid item xs={1}>
                          <SlideshowIcon sx={{ fontSize: 'x-small', color: compareTime(value.guestDetails.date, value.guestDetails.time) ? 'green' : 'red' }} />
                        </Grid>
                        <Grid item xs={11}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mb: 1,
                            }}
                          >
                            <div>
                              <Typography>{value._id}</Typography>
                            </div>
                            <div>
                              <Typography>₹{value.totalAmount}</Typography>
                            </div>
                          </Box>
                          <Grid container>
                            <Grid item xs={8}>
                              {value && value?.foodDetails.map((val) => (
                                <Box
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                  }}
                                >
                                  <div>
                                    <Typography>{val.foodName}</Typography>
                                  </div>
                                  <div>
                                    <Typography>₹{val.price}</Typography>
                                  </div>
                                </Box>
                              ))}
                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                              {compareTime(value.guestDetails.date, value.guestDetails.time) ? <Button color='success'>Active</Button> : <Button color='error'>Expired</Button>}
                            </Grid>

                          </Grid>
                        </Grid>
                      </Grid>
                    ))}


                  </div>
                </div>

              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}