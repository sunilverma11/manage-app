const jwt = require('jsonwebtoken');
const generateToken = async (req, res, next)=>{

    console.log("in auth")
    if(!req.body?.user) {
        return res.send("invalid data")
    }
    const user = req.body.user;
    console.log(user)
    const secretkey = process.env.secretkey;   
    const token = jwt.sign({ name:user.name,email:user.email,_id:secretkey}, secretkey);
    req.body.token=token;
    console.log("tkn",token)
    next()

}
const verifyToken = async (req, res, next)=>{
    
    console.log("in vrfy auth")
    const secretkey = process.env.secretkey;
    //if secret key missing
    if(!secretkey) return res.send("network error")
    const user_token = req.headers.authorization;
    console.log("user_token",user_token)
    //if token not exists
    if(user_token===undefined) {
        return res.send("token error")
    }
    console.log("after if")
    let payload = jwt.verify(user_token, secretkey);
    console.log("jwt vrfy",payload)
    next()

}
module.exports = {generateToken,verifyToken};


/*const {email,password} = req.body;
        const user = await userModel.findOne({email}).lean().exec();
        const hashedPassword = user.password
        console.log(user);
        console.log(password);
        if(user.length===0){
            return res.status(201).send("Invalid credentials");
        }
        bcrypt.compare(password, hashedPassword, function(err, result) {
            if(err){
                return res.status(404).send("Please try again later");
            }
            if(result){
                const secretkey = user._id.toString();
                const token = jwt.sign({ name:user.name,email:user.email,_id:secretkey}, secretkey);
                return res.status(201).send({status:"Login successfully",token:token});
            }
            else{
                return res.send("Invalid credentials");
            }            
        });  */