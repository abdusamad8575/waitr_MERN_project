const express = require('express');
const user_router = express.Router();
const { verifyToken } = require('../middleware/userMiddleware')
const {signup,signin,logout} =require('../controllers/userController')

user_router.post('/signup',signup)
user_router.post('/signin',signin)
user_router.post('/logout',verifyToken,logout)



module.exports = user_router;



