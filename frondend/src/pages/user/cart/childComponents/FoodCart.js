import React from 'react'
import { Paper, Box, Grid, Typography } from "@mui/material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const FoodCart = () => {
    return (
        <>
            <Paper sx={{ padding: 3 }}>
                <Box sx={{ width: '100%',border: '1px solid #000',borderRadius:'5px',padding:1,display:'flex',justifyContent:"space-between",alignItems:'center'}}>
                        <img width={'70px'} height={'70px'} src='https://www.pixelstalk.net/wp-content/uploads/2016/07/Wallpapers-pexels-photo.jpg' alt="Description of the image" />
                    <Box>   
                        <Grid container spacing={1} direction={'column'}>
                            <Grid item>Food details</Grid>
                            <Grid item>description</Grid>
                        </Grid>
                        </Box>
                        <Typography><CurrencyRupeeIcon sx={{fontSize :'18px'}} /> price</Typography>
                </Box>
            </Paper>
        </>
    )
}

export default FoodCart
