const dotenv = require('dotenv')
dotenv.config()

const config = {
    mongodbURL:process.env.MONGODB_URI
};

module.exports = config;