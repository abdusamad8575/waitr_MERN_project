const express = require('express')
const admin_router = express();
const {notification,adminVerify,fetchUserData,adminBlocked} = require('../controllers/adminController')

admin_router.get('/notification',notification)
admin_router.patch('/adminVerify',adminVerify)
admin_router.get('/fetchUserData',fetchUserData)
admin_router.patch('/adminBlocked',adminBlocked)


module.exports = admin_router;