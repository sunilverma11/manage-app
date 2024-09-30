const jwt = require('jsonwebtoken');
const generateToken = async (req, res, next)=>{

    if(!req.body?.user) {
        return res.send("invalid data")
    }
    const user = req.body.user;
    // console.log(user)
    const secretkey = process.env.secretkey;   
    const token = jwt.sign({ name:user.name,email:user.email,_id:secretkey}, secretkey);
    req.body.token=token;
    // console.log("tkn",token)
    next()

}
const verifyToken = async (req, res, next)=>{
    
    const secretkey = process.env.secretkey;
    //if secret key missing
    if(!secretkey) return res.send("network error")
    const user_token = req.headers.authorization;
    // console.log("user_token",user_token)
    //if token not exists
    if(user_token===undefined) {
        return res.send("token error")
    }
    let payload = jwt.verify(user_token, secretkey);
    // console.log("jwt vrfy",payload)
    next()

}
module.exports = {generateToken,verifyToken};