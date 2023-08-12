const express = require('express')
const admin_router = express();
const {notification,adminVerify,fetchUserData,adminBlocked,adminAddRestorent} = require('../controllers/adminController')
const {upload} = require('../middleware/multer')
admin_router.get('/notification',notification)
admin_router.patch('/adminVerify',adminVerify)
admin_router.get('/fetchUserData',fetchUserData)
admin_router.patch('/adminBlocked',adminBlocked)
admin_router.post('/adminAddRestorent',upload.array('images',5),adminAddRestorent)


module.exports = admin_router;