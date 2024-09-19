// here we are using express
// express is big function , function of objects
const express = require("express");
const taskController = require("./controllers/task.controller")
const userController = require("./controllers/user.controller")
const app = express()
const cors = require('cors');
const corsOptions ={
    origin: 'http://localhost:3000', 
    // origin:'https://todos-api-react.netlify.app',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


// to read json file have to initialize

app.use(express.json())

app.use("", taskController,userController);

module.exports=app