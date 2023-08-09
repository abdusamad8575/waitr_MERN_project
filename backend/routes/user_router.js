const express = require('express');
const user_router = express.Router();
const {signup,signin,logout,addhotelreq,userDitails,verify,uploadProfilepicture} =require('../controllers/userController')
const { verifyToken } = require('../middleware/userMiddleware')
const {upload} = require('../middleware/multer')

user_router.post('/signup',signup)
user_router.post('/signin',signin)
user_router.post('/logout',logout)
user_router.post('/addhotelreq',addhotelreq)
user_router.get('/userDitails',userDitails)
user_router.post('/verify',verify)
user_router.post('/uploadProfilepicture',upload.single('image'),uploadProfilepicture)


module.exports = user_router;



