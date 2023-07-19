const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./config/config')


const mongodbURL = config.mongodbURL;



// Connect to MongoDB
mongoose.connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
        app.listen(5000)
        console.log('Connected to MongoDB 5000');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });