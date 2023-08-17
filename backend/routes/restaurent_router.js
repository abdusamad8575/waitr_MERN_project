const express = require('express')
const restaurant_router = express();
const {adminAddRestorent} = require('../controllers/restaurentController')
const {upload} = require('../middleware/multer')
const { verifyToken } = require('../middleware/userMiddleware')


restaurant_router.post('/adminAddRestorent',upload.array('images',10),adminAddRestorent)


module.exports = restaurant_router;