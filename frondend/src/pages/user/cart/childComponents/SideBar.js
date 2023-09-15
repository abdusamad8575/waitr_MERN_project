import React from 'react'
import Scrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Paper, Box, Typography, Grid, Divider, Button } from '@mui/material';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import axiosInstance from '../../../../axios';

const SideBar = ({ data }) => {
    React.useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    const handleSubmit = async () => {
        const total = data.reduce((total, val) => total += val.count * val.price, 0)
        const res = await axiosInstance.post('/payment/razorpay', { total }).then((res) => {
            var options = {
                "key": res.data.key_id,
                "amount": parseInt(res.data.total),
                "name": "WAITR",
                "description": "Payment for your order",
                "image": "/uploads/logo.png",
                "order_id": res.data.order_id,
                "handler": function (response) {
                    console.log(response + 'la la la');
                    var payment_id = response.razorpay_payment_id;
                },
                "prefill": {
                    "name": 'data.user.name',
                    "email": 'data.user.email',
                    "contact": 'data.user.mobile'
                },
                "theme": {
                    "color": "#212529"
                }
            };
            var rzp = new Razorpay(options);
            rzp.on('payment.cancel', function (response) {
                // handle the payment cancellation
                alert('Payment cancelled!');
            });

            rzp.on('payment.error', function (response) {
                // handle the payment error
                var error_code = response.error.code;
                var error_description = response.error.description;
                alert('Payment error: ' + error_description + ' (' + error_code + ')');
            });
            rzp.open();

        })
        
    }

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
                    <Grid container direction={'column'} p={2}>
                        {data.map((val) => {
                            return <Grid item>
                                <Grid container>
                                    <Grid item xs={10}><SlideshowIcon sx={{ fontSize: 'x-small', color: 'green' }} /> {val.foodName}</Grid>
                                    <Grid item xs={0.5}><CurrencyRupeeIcon sx={{ fontSize: '18px' }} /></Grid>
                                    <Grid item xs={1.5} sx={{ display: 'flex', justifyContent: 'end' }}>{val.count * val.price}</Grid>
                                </Grid>
                            </Grid>
                        })}
                        <Divider
                            sx={{
                                backgroundColor: "red",
                                height: "2px",
                                margin: "10px 0",
                            }} />
                        <Grid item>
                            <Grid container>
                                <Grid item xs={10}><SlideshowIcon sx={{ fontSize: 'x-small', color: 'green' }} /> Total</Grid>
                                <Grid item xs={0.5}><CurrencyRupeeIcon sx={{ fontSize: '18px' }} /></Grid>
                                <Grid item xs={1.5} sx={{ display: 'flex', justifyContent: 'end' }}>{data.reduce((total, val) => total += val.count * val.price, 0)}</Grid>
                            </Grid>
                        </Grid>
                        <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant='contained' color='error' sx={{ backgroundColor: 'rgb(255, 100, 90)' }} onClick={handleSubmit}>Pay Order</Button>
                        </Grid>
                    </Grid>

                </Paper>
            </Scrollbar>

        </>
    )
}

export default SideBar
