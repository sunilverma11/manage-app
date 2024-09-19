const mongoose = require("mongoose");
require("dotenv").config()
connectionUrl = process.env.connection;
module.exports = () => {
    return mongoose.connect(connectionUrl)
    // return mongoose.connect("mongodb+srv://srksaroya:suniltodopassword@cluster0.664mqkn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    //return mongoose.connect("mongodb+srv://srksaroya:sunil@sunilcluster.s9by7.mongodb.net/todoDB?retryWrites=true&w=majority")
}
//mongodb+srv://srksaroya:suniltodopassword@cluster0.664mqkn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0