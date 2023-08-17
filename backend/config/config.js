const dotenv = require('dotenv')
dotenv.config()

const config = {
    mongodbURL:process.env.MONGODB_URI,
    PORT:process.env.PORT
};

module.exports = config;