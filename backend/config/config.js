const dotenv = require('dotenv')
dotenv.config()

const config = {
    mongodbURL:process.env.MONGODB_URI,
    PORT:process.env.PORT,
    FRONDEND_PORT:process.env.FRONDEND_PORT,
};

module.exports = config;