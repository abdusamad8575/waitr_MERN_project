import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';
import axiosInstance from '../../../../../../axios';
import { IconButton } from '@mui/material';
import './profile.css'
import { signin } from '../../../../../../redux-toolkit/userSlice';


// import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import tryCatch from '../../../../../../utils/tryCatch';


export default function ProfileContent() {
  const userId = localStorage.getItem('userId')
  const dispatch = useDispatch()

  const [hovered, setHovered] = useState(false);

  const [user, setUser] = useState('')
  useEffect(() => {
    const fetchUserData = tryCatch (() => {
      const res = axiosInstance.get('/userDitails', {
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
    })
    fetchUserData()
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
  

console.log(selectedImage);

  return (
    <div className="gradient-custom-2">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#FF645A', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>

                  {/* <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                    <MDBCardImage src={user.profilePic ? user.profilePic : 'https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png'}
                      alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                  </IconButton> */}
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
                  <div>
                    <MDBCardText className="mb-1 h5">01</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Currant Orders</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">03</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Total  Orders</MDBCardText>
                  </div>
                  {/* <div>
                    <MDBCardText className="mb-1 h5">478</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                  </div> */}
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <MDBCardText className="font-italic mb-1">Web Developer</MDBCardText>
                    <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText>
                    <MDBCardText className="font-italic mb-0">Photographer</MDBCardText>
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