const mongoose = require('mongoose');

const RestaurantDetailsSchema = new mongoose.Schema({
    ownerId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
    restaurantName:
    {
        type: String,
        required: true,
    },
    location:
    {
        type: String,
        required: true,
    },
    startTime:
    {
        type: String,
        required: true,
    },
    endTime:
    {
        type: String,
        required: true,
    },
    mealsType: [
        {
            type:String,
            required: true,
        }
    ],
    daysOfWeek: [
        {
            type:String,
        }
    ],
    cuisines: [
        {
            type:String,
            required: true,
        }
    ],
    restaurantType: [
        {
            type:String,
            required: true,
        }
    ],
    
    images:[
        {
            type:String,
        },
    ],
    addTable:[
        {
            tableName:{
                type:String,
            },
            charCount:{
                type:Number,
            },
            Images:[
                {
                    type:String
                }
            ]
        }
    ]

});
const RestaurantDetails = mongoose.model('Restaurant',RestaurantDetailsSchema);
module.exports = RestaurantDetails;