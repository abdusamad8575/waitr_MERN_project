import React from 'react'
import Scrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Paper, Box, Typography, Grid, Divider, Button } from '@mui/material';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import axiosInstance from '../../../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { orderSuccess } from '../../../../redux-toolkit/userSlice';

const SideBar = ({ data }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const total = data.reduce((total, val) => total += val.count * val.price, 0)
    const State = useSelector((state)=>state.user.restaurantId) 
    const restaurantId =  State.restaurantId ? State.restaurantId : JSON.parse(localStorage.getItem('restaurantId'));
    const guest = State.guestDetails ? State.guestDetails : JSON.parse(localStorage.getItem('guestDetails'));
    const userId = State.userId ?  State.userId : JSON.parse(localStorage.getItem('userId'));

    React.useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handleOrderPlaved =async(paymentId)=>{
        await axiosInstance.post('/orderFullDetails',{total, data, paymentId , restaurantId , guest ,userId})
        .then((res)=>{
            dispatch(orderSuccess(res.data.order))
            navigate('/orderSuccess')
        })
        
    }
    const handleSubmit = async () => {
            const options = {
              key: process.env.REACT_APP_RAZORPAY_ID_KEY,
              amount: total * 100,
              currency: 'INR',
              name: 'WAITR',
              description: 'Add Money to Wallet',
              image: "/assets/1689067571491.png",
            //   order_id: data.order_id,
              handler: (response)=> {
                // console.log('response:-',response.razorpay_payment_id)
                if(response.razorpay_payment_id){
                    handleOrderPlaved(response.razorpay_payment_id)
                }

                          },
              prefill: {
                email: 'samadns8575@gmail.com',
              },
              theme: {
                color: '#ff645a', 
              },
            };
        
            const rzp = new window.Razorpay(options);
            rzp.on('payment.cancel', function(response) {
                // handle the payment cancellation
                alert('Payment cancelled!');
            });
            
            rzp.on('payment.error', function(response) {
                // handle the payment error
                const error_code = response.error.code;
                const error_description = response.error.description;
                alert('Payment error: ' + error_description + ' (' + error_code + ')');
            });
            rzp.open()
          };

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
