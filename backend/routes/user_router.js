const express = require('express');
const user_router = express.Router();
const {signup,signin,logout,addhotelreq} =require('../controllers/userController')
const { verifyToken } = require('../middleware/userMiddleware')

user_router.post('/signup',signup)
user_router.post('/signin',signin)
user_router.post('/logout',logout)
user_router.post('/addhotelreq',addhotelreq)



module.exports = user_router;



