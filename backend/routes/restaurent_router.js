const express = require('express')
const restaurant_router = express();
const {adminAddRestorent,fetchRestaurant} = require('../controllers/restaurentController')
const {upload} = require('../middleware/multer')
const { verifyToken } = require('../middleware/userMiddleware')


restaurant_router.post('/adminAddRestorent',upload.array('images',10),adminAddRestorent)
restaurant_router.get('/fetchRestaurant',verifyToken,fetchRestaurant)


module.exports = restaurant_router;