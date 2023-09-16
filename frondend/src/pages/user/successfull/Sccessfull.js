import React, { useEffect, useState } from 'react';
import Navebar from '../../../components/Navebar';
import Footer from '../../../components/Footer';
import { Box, Typography, Container, Card, CardContent } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSpring, animated } from 'react-spring';
import './style.css' 
import { useSelector } from 'react-redux';

const Successful = () => {
    const order = useSelector((state)=>state.user.orderDetails)
    const orderDetails = order || JSON.parse(localStorage.getItem('orderData'))
    console.log('dsa',orderDetails);
    const [showOrderDetails, setShowOrderDetails] = useState(false);

    const fadeIn = useSpring({
        opacity: showOrderDetails ? 1 : 0,
        transform: showOrderDetails ? 'translateY(0)' : 'translateY(20px)',
        config: { duration: 300 }, // Animation duration in milliseconds
    });

    const slideIn = useSpring({
        opacity: showOrderDetails ? 1 : 0,
        transform: showOrderDetails ? 'translateY(0)' : 'translateY(-20px)',
        config: { duration: 1000 }, // Animation duration in milliseconds
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowOrderDetails(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Navebar />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: 3
                }}
            >
                <animated.div style={fadeIn}>
                    <Box sx={{display:'flex',flexDirection: 'column',alignItems: 'center'}}>
                        <CheckCircleIcon sx={{ fontSize: 80, color: '#6ac576' }} />
                        <Typography variant="h5" sx={{ marginTop: 2, color: '#6f7274', margin: 0 }}>
                            Payment Successful
                        </Typography>
                    </Box>
                </animated.div>
                {showOrderDetails && (
                    <animated.div
                        style={slideIn}
                    >
                        <Container
                            sx={{
                                backgroundColor: '#eee',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 3
                            }}
                        >
                            <Card
                                sx={{
                                    width: '100%',
                                    maxWidth: 600,
                                    border: '3px solid #ff645a',
                                    padding: 1
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h5"
                                        sx={{ color: '#ff645a', fontWeight: 'bold', mb: 2 }}
                                    >
                                        Order Details
                                    </Typography>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <div>
                                            <Typography variant="body2" color="text.secondary">
                                                Date
                                            </Typography>
                                            <Typography>{orderDetails.guestDetails.date}</Typography>
                                        </div>
                                        <div>
                                            <Typography variant="body2" color="text.secondary">
                                                Time.
                                            </Typography>
                                            <Typography>{orderDetails.guestDetails.time}</Typography>
                                        </div>
                                    </Box>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <div>
                                            <Typography variant="body2" color="text.secondary">
                                                Order No.
                                            </Typography>
                                            <Typography>012j1gvs356c</Typography>
                                        </div>
                                    </div>

                                    <Box
                                        sx={{
                                            backgroundColor: '#f2f2f2',
                                            p: 3,
                                            borderRadius: 4,
                                            boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                mb: 1,
                                            }}
                                        >
                                            <div>
                                                <Typography>BEATS Solo 3 Wireless Headphones</Typography>
                                            </div>
                                            <div>
                                                <Typography>₹299.99</Typography>
                                            </div>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <div>
                                                <Typography>Shipping</Typography>
                                            </div>
                                            <div>
                                                <Typography>₹33.00</Typography>
                                            </div>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                        <Typography
                                            variant="h6"
                                            sx={{ color: '#ff645a', fontWeight: 'bold' }}
                                        >
                                            ₹{orderDetails.totalAmount}
                                        </Typography>
                                    </Box>

                                    {/* <Typography
                                        variant="h6"
                                        sx={{ color: '#ff645a', fontWeight: 'bold', mt: 4, mb: 2 }}
                                    >
                                        Tracking Order
                                    </Typography> */}



                                    <Typography variant="body2" mt={2} mb={0}>
                                        Want any help? <a href="#!" style={{ color: '#ff645a' }}>Please contact us</a>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Container>




                    </animated.div>
                )}
            </Box>
            <Footer />
        </>
    );
};

export default Successful;


