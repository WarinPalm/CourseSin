require('dotenv').config();

const config = {
    host: process.env.HOST,
    port: process.env.PORT,
    secret: process.env.SECRET
}

module.exports = config;