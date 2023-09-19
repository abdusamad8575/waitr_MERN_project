const express = require('express')
const restaurant_router = express();
const {adminAddRestorent,fetchRestaurant,foodDetails,getFoodDetails,allOrderDEtails} = require('../controllers/restaurentController')
const {upload} = require('../middleware/multer')
const { verifyToken } = require('../middleware/userMiddleware')


restaurant_router.post('/adminAddRestorent',upload.array('images',10),adminAddRestorent)
restaurant_router.post('/foodDetails',upload.array('images',10),foodDetails)
restaurant_router.get('/fetchRestaurant',verifyToken,fetchRestaurant)
restaurant_router.get('/foodDetails',verifyToken,getFoodDetails)
restaurant_router.get('/allOrderDEtails',verifyToken,allOrderDEtails)

 
module.exports = restaurant_router;