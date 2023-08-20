const express = require('express')
const admin_router = express();
const {notification,adminVerify,fetchUserData,adminBlocked,fetchaddUserReq,changeRole,fetchRestaurants} = require('../controllers/adminController')
const { verifyToken } = require('../middleware/userMiddleware')
admin_router.get('/notification',verifyToken,notification)
admin_router.patch('/adminVerify',verifyToken,adminVerify)
admin_router.get('/fetchUserData',verifyToken,fetchUserData)
admin_router.get('/fetchaddUserReq',verifyToken,fetchaddUserReq)
admin_router.patch('/adminBlocked',verifyToken,adminBlocked)
admin_router.patch('/changeRole',verifyToken,changeRole)
admin_router.get('/fetchRestaurants',verifyToken,fetchRestaurants)


module.exports = admin_router;