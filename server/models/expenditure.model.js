const mongoose = require("mongoose");

const expenditureSchema = new mongoose.Schema({
    reference: { type: String, required: true },
    amount: { type: String },
    userid:{type: String},
    status:{type:Boolean, default:false}
    
}, {
    versionKey: false,
    timestamp:true
})

module.exports= mongoose.model("expenditures", expenditureSchema);