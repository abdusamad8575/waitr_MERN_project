import React from 'react'
import Scrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Paper, Box, Typography, Grid } from '@mui/material';
import SlideshowIcon from '@mui/icons-material/Slideshow';

const SideBar = ({ data }) => {
    return (
        <>
            <Scrollbar style={{ height: '350px', borderRadius: '5px' }}>
                <Paper variant="outlined" elevation={3} sx={{ borderRadius: '5px' }}>
                    <Box sx={{ width: "100%", height: '40px', backgroundColor: 'rgb(255, 100, 90)', borderRadius: '5px 5px 0 0' }}>
                        <Typography
                            variant="h6"
                            color="#fff"
                            sx={{ textAlign: 'center', paddingTop: '5px', }}>
                            Checkout
                        </Typography>
                    </Box>
                    <Grid container direction={'column'} p={1}>
                        {/* {data.map((val) => {
                            return (<Grid item> <SlideshowIcon sx={{ fontSize: 'x-small' }} /> {val.foodName}</Grid>
                            <Grid item> </Grid>
                        )})} */}
                    </Grid>

                </Paper>
            </Scrollbar>

        </>
    )
}

export default SideBar
