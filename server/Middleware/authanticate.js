const jwt = require('jsonwebtoken')
const User = require('../model/userSchema')

const Authanticate=async(req,res,next)=>{
try{
    const token = req.cookies.jwtoken
    console.log('here is ' + token + 'from authantication')
    const veryfyToken=jwt.verify(token,process.env.SECREAT_KEY)

    const rootUser=await User.findOne({_id:veryfyToken._id,"tokens.token":token})
    if(!rootUser){
        throw new Error('user not found')
    }
    req.token=token
    req.rootUser=rootUser
    req.userID =rootUser._id

    next()

}catch(err){
    res.status(401).send('Unauthorized:No token provided')
console.log(err)
}
}
module.exports=Authanticate