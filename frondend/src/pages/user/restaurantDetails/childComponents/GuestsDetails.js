import { Button, Grid, Typography, Box, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {orderUserDetails} from '../../../../redux-toolkit/userSlice'

const GuestsDetails = ({ detail, setDetails, setState }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const initial = detail.guestsCount ? detail.guestsCount : 0;
    const [guests, setGuests] = useState(initial)
    const [formErrors, setFormErrors] = useState({
        guestsCount: '',
        name: '',
        phone: '',
        email: ''
    })
    const handleClick = () => {
        setState(false)
    }
    useEffect(() => {
        setDetails({ ...detail, guestsCount: guests })
    }, [guests])

    const validateForm = () => {
        let valid = true;
        const newFormErrors = { ...formErrors };

        if (detail.name.trim() === '') {
            newFormErrors.name = 'Restaurant name is required';
            valid = false;
        } else {
            newFormErrors.name = '';
        }

        if(/^\d{10}$/.test(detail.phone)){
            newFormErrors.phone = '';
            valid = false;
        }else {
            newFormErrors.phone = 'Please Enter 10-digit Phone Number';
        }

        if(!/\S+@\S+\.\S+/.test(detail.email)){
            newFormErrors.email = 'Email is required';
            valid = false;
        }else {
            newFormErrors.email = '';
        }


        setFormErrors(newFormErrors);
        return valid;
    }

    const handleSubmit = () => {
        const isValid = validateForm();
        if(!isValid){
            return
        }else{
            dispatch(orderUserDetails(detail))
            navigate('/foodDetails')
        }
    }
    console.log("zxc=", detail);
    return (
        <>
            <Grid container sx={{ justifyContent: 'center' }}>
                <Grid item p={2}>
                    <Typography variant='body1'>Selected Date</Typography>
                    <Button sx={{ color: 'rgb(255, 100, 90)' }} onClick={handleClick}>{detail?.date}</Button>
                </Grid>
                <Grid item p={2}>
                    <Typography variant='body1'>Selected Time</Typography>
                    <Button sx={{ color: 'rgb(255, 100, 90)' }} onClick={handleClick}>{detail?.time}</Button>
                </Grid>
            </Grid>
            <Grid container direction={'column'} rowSpacing={1} p={1}>
                <Grid item>
                    <Typography variant='body2'>Select Guest/s</Typography>
                </Grid>
                <Grid item>
                    <Typography sx={{ color: 'gray', fontSize: 'small' }}>Choose the number of guests going:</Typography>
                </Grid>
                <Grid item >
                    <Box sx={{ width: '100%', height: '40px', backgroundColor: 'rgb(255, 100, 90)', color: '#ffffff', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '5px' }}>
                        <RemoveCircleOutlineIcon onClick={() => setGuests((state) => state && state - 1)} sx={{ cursor: 'pointer' }} />
                        <Box sx={{ fontWeight: 600, }} mr={2} ml={2} >{guests}</Box>
                        <AddCircleOutlineIcon onClick={() => setGuests((state) => state + 1)} sx={{ cursor: 'pointer' }} />
                    </Box>
                </Grid>
                <Grid item>
                    <Typography variant='body2'>Enter Guest Details</Typography>
                </Grid>
                <Grid item>
                    <TextField fullWidth label="name" id="Full Name"
                        value={detail.name}
                        onChange={(event) => setDetails({ ...detail, name: event.target.value })}
                        error={!!formErrors.name}
                        helperText={formErrors.name}
                    />
                </Grid>
                <Grid item>
                    <TextField fullWidth label="phone" id="Phone"
                        value={detail.phone}
                        onChange={(event) => setDetails({ ...detail, phone: event.target.value })}
                        error={!!formErrors.phone}
                        helperText={formErrors.phone}
                    />
                </Grid>
                <Grid item>
                    <TextField fullWidth label="email" id="Email"
                        value={detail.email}
                        onChange={(event) => setDetails({ ...detail, email: event.target.value })}
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                    />
                </Grid>
                {guests>0 && <Grid item sx={{ display: 'flex', justifyContent: 'center'}}>
                    <Button variant='contained' color='error' sx={{ backgroundColor: 'rgb(255, 100, 90)' }} onClick={handleSubmit}>Selected Foods</Button>
                </Grid>}
            </Grid>

        </>
    )
}

export default GuestsDetails
