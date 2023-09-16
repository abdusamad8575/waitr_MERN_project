const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./config/config')
const cors = require('cors')
const path = require('path');
const user_router = require('./routes/user_router')
const admin_router = require('./routes/admin_router')
const restaurent_router =require('./routes/restaurent_router')
const cookieParser = require('cookie-parser')

const mongodbURL = config.mongodbURL;
const port = config.PORT;
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()) 
app.use(cors({credentials:true,origin:"http://localhost:3000"}))
app.use('/',user_router)
app.use('/dashboard',admin_router)
app.use('/restaurant',restaurent_router)



// Connect to MongoDB
mongoose.connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
        app.listen(port)
        console.log(`Connected to MongoDB ${port}`);
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);  
    });