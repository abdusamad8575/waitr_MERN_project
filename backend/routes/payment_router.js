const express = require('express');
const Payment_router = express()
const { verifyToken } = require('../middleware/userMiddleware');
const {razorpay} = require('../controllers/paymentController')

Payment_router.post('/razorpay',verifyToken,razorpay)




module.exports = Payment_router;