const express = require('express')
const admin_router = express();
const {notification,adminVerify,fetchUserData} = require('../controllers/adminController')

admin_router.get('/notification',notification)
admin_router.patch('/adminVerify',adminVerify)
admin_router.get('/fetchUserData',fetchUserData)


module.exports = admin_router;