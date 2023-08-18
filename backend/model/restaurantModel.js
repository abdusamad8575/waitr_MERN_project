const mongoose = require('mongoose');

const RestaurantDetailsSchema = new mongoose.Schema({
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
        type: Number,
        required: true,
    },
    endTime:
    {
        type: Number,
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