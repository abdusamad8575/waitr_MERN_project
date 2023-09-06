import { Button, Grid, Typography, Box ,TextField} from '@mui/material'
import React, { useState } from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const GuestsDetails = ({ detail, setDetails, state, setState }) => {
    const [guests, setGuests] = useState(0)
    const handleClick = () => {
        setState(false)
    }
console.log("zxc=",detail);
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
                    onChange={(event)=>setDetails({...detail,name:event.target.value})}
                    />
                </Grid>
                <Grid item>
                    <TextField fullWidth label="phone" id="Phone" 
                    value={detail.phone}
                    onChange={(event)=>setDetails({...detail,phone:event.target.value})}
                    />
                </Grid>
                <Grid item>
                    <TextField fullWidth label="email" id="Email" 
                    value={detail.email}
                    onChange={(event)=>setDetails({...detail,email:event.target.value})}
                    />
                </Grid>
                <Grid item>
                <Button variant='contained' sx={{ backgroundColor: 'rgb(255, 100, 90)', justifyContent: 'center' }} onClick={handleClick}>Selected Foods</Button>
                </Grid>
            </Grid>

        </>
    )
}

export default GuestsDetails
