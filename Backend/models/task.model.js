const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String },
    userid:{type: String, required: true},
    status:{type:Boolean, default:false}
    
}, {
    versionKey: false,
    timestamp:true
})

module.exports= mongoose.model("tasks", taskSchema);