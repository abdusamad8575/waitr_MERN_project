const express = require('express')
const admin_router = express();
const {notification,adminVerify} = require('../controllers/adminController')

admin_router.get('/notification',notification)
admin_router.patch('/adminVerify',adminVerify)


module.exports = admin_router;