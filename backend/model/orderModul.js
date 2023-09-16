const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
        required:true
    },
    paymentId:{
        type:String,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    guestDetails:{
        type:Object,
        required:true
    },
    foodDetails:{
        type:Array,
        required:true
    }

})

const OrderDetails = mongoose.model('Order',orderSchema)
module.exports = OrderDetails;