const express = require('express')
const admin_router = express();
const {notification,adminVerify,fetchUserData,adminBlocked,fetchaddUserReq,changeRole,fetchRestaurants,location,fetchLocations} = require('../controllers/adminController')
const { verifyToken } = require('../middleware/userMiddleware')
admin_router.get('/notification',verifyToken,notification)
admin_router.patch('/adminVerify',verifyToken,adminVerify)
admin_router.get('/fetchUserData',verifyToken,fetchUserData)
admin_router.get('/fetchaddUserReq',verifyToken,fetchaddUserReq)
admin_router.patch('/adminBlocked',verifyToken,adminBlocked)
admin_router.patch('/changeRole',verifyToken,changeRole)
admin_router.get('/fetchRestaurants',verifyToken,fetchRestaurants)
admin_router.post('/location',verifyToken,location)
admin_router.get('/fetchLocations',verifyToken,fetchLocations)


module.exports = admin_router;