const User = require('../model/userModel');
const Restaurant = require('../model/restaurantModel')


const notification = async (req, res) => {
    try {
        const notification = await User.find({}, 'addHotel');
        // console.log("notification", notification);
        if (!notification) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            return res.status(200).json({ message: 'Find notification details successfully', notification });
        }
    } catch (error) {
        console.error('Error finding notification details:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const adminVerify = async (req, res) => {
    try {
        const { id } = req.body
        const user = await User.findById(id)
        // console.log(existingUser);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            user.addHotel[0].adminverify = false
            await user.save();
            return res.status(200).json({ message: 'Adminverify updated successfully', user });
        }

    } catch (error) {
        return res.status(500).json({ message: 'Server Error' });
    }
}
const fetchUserData = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' });

        if (!users) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            return res.status(200).json({ message: 'users data fetch successfuly', users })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server Error' });
    }
}
const adminBlocked = async (req, res) => {
    try {
        const { id } = req.body;
        // console.log(id);
        const user = await User.findById(id)
        // console.log('user',user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            user.AdminBlocked === 0 ? user.AdminBlocked = 1 : user.AdminBlocked = 0;
            await user.save();
            return res.status(200).json({ message: 'user blocked successfully', user })
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Server Error' });
    }

}
const adminAddRestorent = async (req, res) => {
    try {
        const { restaurantName, location, startTime, endTime, mealsType, daysOfWeek, addTable } = req.body;
    const images = req.files.map(file => file.filename);
    console.log(restaurantName, location, startTime, endTime, mealsType, daysOfWeek, addTable,images );
        // const data = req.body;
        // console.log(req.files);
        // const restaurant = new Restaurant({
        //     restaurantName: data.restaurantName,
        //     location: data.location,
        //     startTime: data.startTime,
        //     endTime: data.endTime,
        //     mealsType: data.mealsType,
        //     daysOfWeek: data.daysOfWeek,
        //     addTable: data.addTable.map(table => ({
        //         tableName: table.tableName,
        //         charCount: table.charCount,
        //         images: table.images.map(image => `data:image/jpeg;base64,${image}`), // Include base64 encoded images
        //       })),
        //     images:  data.images.map(image => `data:image/jpeg;base64,${image}`),
        // })
        // console.log("datas-",restaurant)
        // const RestaurantDetails = await restaurant.save()
        // res.json({ message: 'Data saved successfully', data: RestaurantDetails });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
    notification,
    adminVerify,
    fetchUserData,
    adminBlocked,
    adminAddRestorent
}