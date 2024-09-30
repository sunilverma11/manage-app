const bcrypt = require('bcrypt');
const userModel = require('../models/user.model')

const hashingPassword = async (req,res,next)=>{
    const {name,email,password} = req.body;
    let userAlreadyExist = await userModel.findOne({email})
    if(userAlreadyExist) {
        req.body.userAlreadyExist=true;
        return next();
    }
    bcrypt.hash(password, 8, async function(err, hash) {
        // Store hash in your password DB.
        if(err){
            return req.body.hashstatus=false; 
        }
        // console.log(name,email,password,hash)
        let user = await userModel.create({name,email,password:hash})
        req.body.hashstatus=true;
        req.body.user=user;
        next()
    });
}
const comparePassword = async (req,res,next)=>{
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        req.body.userNotExist=true;
        return next()
    }
    bcrypt.compare(password, user.password, function(err, result) {
        if(err){
            req.body.error=false;
            return next()
        }
        // console.log("result",result)
        req.body.status=result;        
        if(result){
            const {name,email,_id} = user;
            req.body.user ={name,email,_id};
        }
        return next()
    });    
}
module.exports = {hashingPassword, comparePassword}