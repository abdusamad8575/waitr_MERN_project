const User = require('../model/userModel')

const signup = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    try {
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

const signin =async(req,res,next)=>{
    
}


module.exports = {
    signup,
    signin
}