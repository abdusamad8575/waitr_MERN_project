const User = require('../model/userModel')

const notification = async (req, res) => {
    try {
        const notification = await User.find({},'addHotel');
        console.log("notification", notification);
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

module.exports = {
    notification
}