const mongoose = require('mongoose');
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {console.log("Connection Successful")})
    .catch( (error) => {
        console.log("Issue in DB connection");
        console.error(error.message);
        process.exit();
    } );
}

module.exports = dbConnect;