const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    location:{
        type:[String],
        required: true,
    }
})
const locationModel =mongoose.model('Location',locationSchema)
module.exports = locationModel;