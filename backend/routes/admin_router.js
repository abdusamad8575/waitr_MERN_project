const express = require('express')
const admin_router = express();
const {notification} = require('../controllers/adminController')

admin_router.get('/notification',notification)


module.exports = admin_router;