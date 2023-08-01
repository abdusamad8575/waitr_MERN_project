const User = require('../model/userModel')
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {

    try {
        const { firstName, lastName, email, password } = req.body;
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exist" })
        }

        const user = new User({
            firstName,
            lastName,
            email,
            password
        })
        await user.save()
        return res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

}

const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email: email })
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" })
        } else {
            const isPassword = (await existingUser.matchPasswords(password))
            if (!isPassword) {
                return res.status(400).json({ message: "Invalid Email Id or password" })
            } else {
                const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
                    expiresIn: "1d"
                })
                console.log("token send", token)
                res.cookie("token", token, {
                    path: '/',
                    expires: new Date(Date.now() + 500 * 60 * 60), // 1 hour expiration
                    httpOnly: true,
                    sameSite: 'lax',
                });
                console.log('existingUser=>', existingUser);
                return res.status(200).json({
                    message: "Successfully Logged in",
                    user: existingUser,
                    token,
                    role: existingUser.role,
                })
            }
        }


    } catch (error) {
        return new Error(error)
    }
}
const logout = async (req, res) => {
    console.log('logout1');
    const token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        res.clearCookie('token')
        return res.status(200).json({ message: "Succefully Logged out" })
    });

}
const addhotelreq = async (req, res) => {
    try {
        const { Rname, Rlocation, Rcontact } = req.body;
        const userId = req.query.id;
        console.log('userId=>', userId);

        // Find the user by their ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the addHotel field of the user
        user.addHotel = {
            Rname,
            Rlocation,
            Rcontact
        };

        // Save the updated user document
        await user.save();

        return res.status(201).json({ message: 'Add Hotel Request successfully', user });
    } catch (error) {
        console.error('Error adding hotel request:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }


}

module.exports = {
    signup,
    signin,
    logout,
    addhotelreq
}