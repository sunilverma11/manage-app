const mongoose = require("mongoose");
require("dotenv").config()
connectionUrl = process.env.connection;
module.exports = () => {
    return mongoose.connect(connectionUrl)
}