import React from 'react'
import { Paper, Box, Grid, Typography } from "@mui/material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Scrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

const FoodCart = ({ data }) => {
    console.log('oderFoods', data);

    return (
        <>
            <Scrollbar style={{height: '350px', borderRadius: '5px' }}>
                <Paper sx={{minHeight: '350px',padding: 3 }} >
                    {data.map((value, index) => {
                        return <Box key={index} sx={{ width: '100%', border: '1px solid #858d94c4', borderRadius: '5px', padding: 1, marginBottom: 2 }}>
                            <Grid container alignItems={'center'}>
                                <Grid item xs={4} md={2}>
                                    <img width={'70px'} height={'70px'} src={value.images[0]} alt="Description of the image" />
                                </Grid>
                                <Grid item xs={8} md={10} >

                                    <Grid container>
                                        <Grid item xs={12} sm={7} md={8}>
                                            <Grid container spacing={0.5} direction={'column'}>
                                                <Grid item>{value.foodName}</Grid>
                                                <Grid item>{value.description}</Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid xs={12} sm={5} md={4} container alignItems={'center'}>
                                            <Grid item sm={12} md={6}>
                                                <Typography >Count: {value.count}</Typography>
                                            </Grid>
                                            <Grid item sm={12} md={6}>
                                                <Typography ><CurrencyRupeeIcon sx={{ fontSize: '18px' }} />{value.price}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    })}
                </Paper>
            </Scrollbar>
        </>
    )
}

export default FoodCart
