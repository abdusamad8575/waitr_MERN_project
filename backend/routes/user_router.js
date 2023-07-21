const express = require('express');
const user_router = express.Router();
const {signup,signin} =require('../controllers/userController')

user_router.post('/signup',signup)
user_router.post('/signin',signin)



module.exports = user_router;



