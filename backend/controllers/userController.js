const User = require('../model/userModel')
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const Restaurant = require('../model/restaurantModel')
const Order = require('../model/orderModul')
const dotenv = require('dotenv')
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
dotenv.config()

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
            const adminBlocked = existingUser.AdminBlocked === 1;
            if (!adminBlocked) {
                return res.status(400).json({ message: "this user admin blocked" })
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
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day expiration
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
            Rcontact,
            adminverify: true
        };

        // Save the updated user document
        await user.save();

        return res.status(201).json({ message: 'Add Hotel Request successfully', user });
    } catch (error) {
        console.error('Error adding hotel request:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }


}

const userDitails = async (req, res) => {
    try {
        const userId = req.query.userId
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        } else {
            return res.status(200).json({ message: "user data fetched", user })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


async function verify(req, res) {
    const { client_id, jwtToken } = req.body
    const client = new OAuth2Client(client_id);

    // Call the verifyIdToken to
    // varify and decode it
    const ticket = await client.verifyIdToken({
        idToken: jwtToken,
        audience: client_id,
    });

    // Get the JSON with all the user info
    const payload = ticket.getPayload();
    const email = payload.email;
    const existingUser = await User.findOne({ email: email })
    if (!existingUser) {
        console.log('acdsa');
        const user = new User({
            firstName: payload.given_name,
            lastName: payload.family_name,
            email,
            profilePic: payload.picture
        })

        await user.save();
    }
    else {
        // This is a JSON object that contains
        // all the user info
        const adminBlocked = existingUser.AdminBlocked === 1;
        if (!adminBlocked) {
            return res.status(400).json({ message: "this user admin blocked" })
        } else {
            const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
                expiresIn: "1d"
            })
            res.cookie("token", token, {
                path: '/',
                expires: new Date(Date.now() + 24 * 1000 * 60 * 60), // 1 hour expiration
                httpOnly: true,
                sameSite: 'lax',
            });
            return res.status(200).json({
                message: "Successfully Logged in",
                user: existingUser,
                token,
                role: existingUser.role,
            })
        }
    }
}

const uploadProfilepicture = async (req, res) => {
    try {
        const id = req.query.id
        if (!req.file) {
            return res.json({ error: 'Image is required' });
        }
        const filepath = req.file.filename;

        await User.findByIdAndUpdate(id, {
            $set: {
                profilePic: `${process.env.URL}${filepath}`,
            },
        });
        const user = await User.findById(id);

        return res.json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }

}

const restorentDetails = async (req, res) => {
    try {
        const restaurant = await Restaurant.find()
        if (restaurant) {
            return res.status(200).json({ message: "Restaurant details fetch saccessfully", restaurant })
        } else {
            return res.status(400).json({ message: "Restaurant details fetch Error" })
        }

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
const filterData = async (req, res) => {
    try {
        const { filter, location, currentPage } = req.body;
        const { RestaurantType, cuisines, search } = filter;
        console.log("currentPage", currentPage);
        const query = []

        location && query.push({ location: location });
        RestaurantType?.length && query.push({ restaurantType: { $in: RestaurantType } });
        cuisines?.length && query.push({ cuisines: { $in: cuisines } });
        search && query.push({ restaurantName: { $regex: search, $options: 'i' } })

        //   search && query.push({    $or: [
        //     { restaurantName: { $regex: search, $options: 'i' } }, 
        //     { location: { $regex: search, $options: 'i' } }
        //   ]})

        console.log(query);
        const Query = query.length ? { $and: query } : {}
        const data = await Restaurant.find(Query)

        //pagination
        const itemsPerPage = 9;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const itemsToDisplay = data?.slice(startIndex, endIndex);
        const totalDataLength = data.length
        if (!data) {
            return res.status(404).json({ message: "Something Went Wrong !" });
        }
        return res.status(200).json({ returnData: { itemsToDisplay, totalDataLength } });

    } catch (error) {
        return new Error(error);
    }
}
const selectedRestaurant = async (req, res) => {
    try {
        const { id } = req.body  
        const restaurant = await Restaurant.findById(id)
        if (restaurant) {
            return res.status(200).json({ message: "Restaurant details fetch saccessfully", restaurant })
        } else {
            return res.status(400).json({ message: "Restaurant details fetch Error" })
        }

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
const orderFullDetails = async (req, res) => {
    try {
        const { total, data, paymentId, restaurantId, guest, userId } = req.body
        // console.log(total);
        const order = new Order({
            userId,
            restaurantId,
            paymentId,
            totalAmount: total,
            guestDetails: guest,
            foodDetails: data
        })
        await order.save()
         //email sending
         if(order){
          const transporter = nodemailer.createTransport({
              service: 'Gmail',
              auth: {
                  user: process.env.EMAIL_ID,
                  pass: process.env.EMAIL_SECRET
              }
          });
          // Configure mailgen by setting a theme and your product info
          const mailGenerator = new Mailgen({
              theme: 'default',
              product: {
                  // Appears in header & footer of e-mails
                  name: 'Waitr',
                  link: 'https://mailgen.js/'
                  // Optional product logo
                  // logo: 'https://mailgen.js/img/logo.png'
              }
          });
          //create mail content
          const email = {
              body: {
                  name: 'Customer',
                  intro: 'Order is successfully placed.',
                  action: {
                      instructions: `order id:${order._id}`,
                      // instructions: 'watch your order details.just visit the app, please click here:',
                      button: {
                          color: '#22BC66', // Optional action button color
                          text: 'view order',
                          link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
                      }
                  },
                  outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
              }
          };
  
          // Generate an HTML email with the provided contents
          const emailBody = mailGenerator.generate(email);
  
          const mailOptions = {
              from: process.env.EMAIL_ID,
              to: 'samadns8575@gmail.com',
              to: 'samadpts786313@gmail.com',
              subject: 'Hello from Waitr',
              // text: 'This is a test email sent from Nodemailer!'
              html:emailBody,
          };
  
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  console.error('Error sending email: ', error);
              } else {
                  console.log('Email sent successfully: ', info.response);
              }
          });
  
         }
        return res.status(200).json({ message: 'order stored saccessfully', order })


    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const fetchOrderDetails = async (req, res) => {
    try {
        const id = req.query.userId
        // console.log(id);
        const order = await Order.find({ userId: id }) 

        if (order) {
            return res.status(200).json({ message: "Restaurant details fetch saccessfully", order })
        } else {
            return res.status(400).json({ message: "Restaurant details fetch Error" })
        }

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = {
    signup,
    signin,
    logout,
    addhotelreq,
    userDitails,
    verify,
    uploadProfilepicture,
    restorentDetails,
    filterData,
    selectedRestaurant,
    orderFullDetails,
    fetchOrderDetails
}