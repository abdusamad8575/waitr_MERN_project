
const Restaurant = require('../model/restaurantModel')
const User = require('../model/userModel')
const moment = require('moment');
const dotenv = require('dotenv')
dotenv.config()
const adminAddRestorent = async (req, res) => {
    try {
        const { restaurantName, location, startTime, endTime, mealsType, daysOfWeek, addTable, cuisines, restaurantType, id } = req.body;
        const start = new Date(startTime)
        const end = new Date(endTime)
        const images = req.files.map(file => file.filename);
        if (id && images) {
            const parsedMealsType = mealsType.split(',');
            const parsedDaysOfWeek = daysOfWeek.split(',');
            const parsedcuisines = cuisines.split(',');
            const parsedrestaurantType = restaurantType.split(',');
            const img = images.map(img => `${process.env.URL}${img}`)
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
            // console.log("datas-", restaurant)
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
        const restaurant = await User.findById(userId).populate('restaurantId').lean()
        // console.log({...restaurant});
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
        const { id,...datas } = req.body;
        const images = req.files.map(file => file.filename);
        const img = images.map(img => `${process.env.URL}${img}`)
        
        
        const user = await User.findById(id);
        if (!user || !user.restaurantId) {
            return res.status(404).json({ message: 'Restaurant not found for this user' });
        }
        const reId =user.restaurantId.toHexString()
        console.log("89",reId);
        const restaurant = await Restaurant.findById(reId);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });

        }

        restaurant.foodDetails.push({
            ...datas,
            images:img,
        });

        await restaurant.save();

        return res.status(200).json({ message: 'Food details added successfully' });
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