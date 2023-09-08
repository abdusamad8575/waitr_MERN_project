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
        type: Date,
        required: true,
    },
    endTime:
    {
        type: Date,
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
    foodDetails:[
        {
            foodName:{
                type: String,
            },
            price:{
                type:Number
            },
            description:{
                type:String
            },
            images:[
                {
                    type:String,
                }
            ],
            rating:{
                type:Number
            }
        }
    ]
    // addTable:[
    //     {
    //         tableName:{
    //             type:String,
    //         },
    //         charCount:{
    //             type:Number,
    //         },
    //         Images:[
    //             {
    //                 type:String
    //             }
    //         ]
    //     }
    // ]

});
const RestaurantDetails = mongoose.model('Restaurant',RestaurantDetailsSchema);
module.exports = RestaurantDetails;