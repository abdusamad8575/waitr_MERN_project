import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';
import axiosInstance from '../../../axios';
// import { IconButton } from '@mui/material';
import { Box, Typography, Grid, IconButton, Button } from '@mui/material';
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
  const [order, setOrder] = useState('')
  const [orderShow,setOrderShow] = useState('live');
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
          setOrder(res.data.order)
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


  console.log("mko:-", order);
  // console.log("mko1:-",typeof(order[0].guestDetails.date));

  return (
    <div className="gradient-custom-2">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#FF645A', height: '200px' }}>
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
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">{user.firstName + " " + user.lastName}</MDBTypography>
                  <MDBCardText>{user.email}</MDBCardText>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div style={{cursor:'pointer'}} onClick={()=>setOrderShow('live')}>
                    <MDBCardText className="mb-1 h5">{order && order?.reduce((total, value) => (compareTime(value.guestDetails.date, value.guestDetails.time) ? total + 1 : total), 0)}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Live Orders</MDBCardText>
                  </div>
                  <div className="px-3" style={{cursor:'pointer',color:'red'}} onClick={()=>setOrderShow('past')}>
                    <MDBCardText className="mb-1 h5">{order && order?.reduce((total, value) => (compareTime(value.guestDetails.date, value.guestDetails.time) ? total : total + 1), 0)}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Past  Orders</MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">Orders</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    {order && order?.map((value,index) => (

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
                          <SlideshowIcon sx={{ fontSize: 'x-small', color: compareTime(value.guestDetails.date, value.guestDetails.time) ?'green' :'red'}} />
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
                            <Grid item xs={4} sx={{display:'flex',justifyContent:'center',alignContent:'center'}}>
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