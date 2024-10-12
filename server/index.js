// here we are using express
const express = require("express");
const taskController = require("./controllers/task.controller")
const userController = require("./controllers/user.controller")
const expenditureController = require("./controllers/expenditure.controller")
const app = express()
const cors = require('cors');
const connectDB = require("./configs/db");
const PORT = process.env.PORT || 5432;
const URL = process.env.CLIENT_URL;
connectDB();
const corsOptions ={
    origin: URL,
    credentials:true, //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


// to read json file have to initialize
app.use(express.json())

app.use("", taskController, userController, expenditureController);
app.get("/",(req,res)=>{
    return res.send("welcome on api server")
})
app.listen(PORT, async () => {
    try {      
      console.log("listioning to port "+PORT);
    } catch (error) {
      console.log(error);
    }
  });