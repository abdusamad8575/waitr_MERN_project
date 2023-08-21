const mongoose = require('mongoose');

// console.log("mongo");
const locationSchema = new mongoose.Schema({
    location:{
        type:[String],
        required: true,
    }
})
const locationModel =mongoose.model('Location',locationSchema)
module.exports = locationModel;