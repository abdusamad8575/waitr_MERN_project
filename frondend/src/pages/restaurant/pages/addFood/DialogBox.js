
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useState } from 'react';


const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
const DialogBox = ({ openAddDialog, setOpenAddDialog }) => {
    const [selectedImages, setSelectedImages] = useState([]);

    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
    };
    const [formData, setFormData] = useState({
        foodName: '',
        price: '',
        description: '',
    });
    const [formErrors, setFormErrors] = useState({
        foodName: '',
        price: '',
        description: '',
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

        if (formData.foodName.trim() === '') {
            newFormErrors.foodName = 'Food name name is required';
            valid = false;
        } else {
            newFormErrors.foodName = '';
        }

        if (formData.price.trim() === '') {
            newFormErrors.price = 'Price is required';
            valid = false;
        } else {
            newFormErrors.price = '';
        }

        if (formData.description === '') {
            newFormErrors.description = 'description is required';
            valid = false;
        } else {
            newFormErrors.description = '';
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

            for (const image of selectedImages) {
                newFormData.append('images', image);
            }
            const id = localStorage.getItem("userId")
            newFormData.append('id', id);
            // axiosInstance.post('/restaurant/adminAddRestorent', newFormData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // })
            //     .then(response => {
            //         console.log('Response from backend:', response.data);
            //         setFormData({
            //    foodName: '',
            //    price: '',
            //    description: '',
            //         })
            //         setSelectedImages([])
            //         setOpenAddDialog(false);
            //     })
            //     .catch(error => {
            //         console.error('Error:', error);
            //     });
        }
    };

    return (
        <>
            <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
                <DialogTitle sx={{ pt: 5 }}>Add Restaurant Details</DialogTitle>
                <DialogContent >
                    <TextField fullWidth label="Food Name" id="foodName" sx={{ mb: 2 }}
                        value={formData.foodName}
                        onChange={(e) => setFormData({ ...formData, foodName: e.target.value })}
                        error={!!formErrors.foodName}
                        helperText={formErrors.foodName} />

                    <TextField fullWidth label="Price" id="price" sx={{ mb: 2 }}
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, Price: e.target.value })}
                        error={!!formErrors.price}
                        helperText={formErrors.price} />

                    <TextField fullWidth label="Description" id="description" sx={{ mb: 2 }}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        error={!!formErrors.description}
                        helperText={formErrors.description} />


                    {formErrors.location && (
                        <p style={{ color: 'red', textAlign: 'center', fontSize: 'small' }}>{formErrors.location}</p>
                    )}

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
        </>
    )
}

export default DialogBox
