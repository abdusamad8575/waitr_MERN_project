
const Restaurant = require('../model/restaurantModel')
const User = require('../model/userModel')
const moment = require('moment');


const adminAddRestorent = async (req, res) => {
    try {
        const { restaurantName, location, startTime, endTime, mealsType, daysOfWeek, addTable, cuisines, restaurantType, id } = req.body;
        console.log("startTime", startTime);
        console.log("endTime", endTime);
        const start = new Date(startTime)
        const end = new Date(endTime)
        const images = req.files.map(file => file.filename);
        if (id && images) {
            const parsedMealsType = mealsType.split(',');
            const parsedDaysOfWeek = daysOfWeek.split(',');
            const parsedcuisines = cuisines.split(',');
            const parsedrestaurantType = restaurantType.split(',');
            const img = images.map(img => `http://localhost:8000/assets/${img}`)
            const restaurant = new Restaurant({
                ownerId: id,
                restaurantName: restaurantName,
                location: location,
                startTime: start,
                endTime: end,
                mealsType: parsedMealsType.map(item => item),
                daysOfWeek: parsedDaysOfWeek.map(item => item),
                cuisines: parsedcuisines.map(item => item),
                restaurantType: parsedrestaurantType.map(item => item),
                // addTable: Table.map(table => ({
                //     tableName: table.tableName,
                //     charCount: table.charCount,
                //     images: table.images.map(image =>image.name), 
                //   })),
                images: img,
            })
            console.log("datas-", restaurant)
            await restaurant.save()
            await User.updateOne({ _id: id }, { $set: { restaurantId: restaurant._id } })
            return res.json({ message: 'Data saved successfully' });

        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Server Error' });
    }
}

const fetchRestaurant = async (req, res) => {
    try {
        const userId = req.id
        const restaurant = await User.findOne({_id:userId}).populate('restaurantId').lean()
        console.log({...restaurant});
        const start = restaurant.restaurantId.startTime;
        const startTime = moment(start).utcOffset('+05:30').format('HH:mm');
        const end = restaurant.restaurantId.endTime;
        const endTime = moment(end).utcOffset('+05:30').format('HH:mm');
        console.log('IST Time:', startTime,endTime); 
        if (!restaurant.restaurantId) {
            return res.status(400).json({ message: 'data not fetch' })
        } else {
            return res.status(200).json({ message: 'restaurant data fetch saccessfully', restaurant:{...restaurant,startTime,endTime} }) 
        }

    } catch (error) {
        return res.status(500).json({ message: 'Server Error' });
    }
}


const foodDetails = async (req, res) => {
    try {
        const { foodName, price, description, id } = req.body;
        const images = req.files.map(file => file.filename);
        console.log(foodName, price, description, id);
        //     if(id && images) {
        // const img = images.map(img=>`http://localhost:8000/assets/${img}`)
        //     const restaurant = new Restaurant({  
        //         ownerId:id,
        //         restaurantName: restaurantName,
        //         images: img ,
        //     })
        //     console.log("datas-",restaurant)
        //     await restaurant.save()
        //     await User.updateOne({_id:id},{$set:{restaurantId:restaurant._id}})
        //     return res.json({ message: 'Data saved successfully' });

        // }
    }
    catch (error) {
        return res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
    adminAddRestorent,
    fetchRestaurant,
    foodDetails
}