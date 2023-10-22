const jwt= require('jsonwebtoken');
const User=require('../models/user');
module.exports.isAuthenticated= async (req,res,next) => {

const token = req.headers.token;
if ( ! token ){
    res.status(400).json({message: "please login"});
}

const decoded_data= await jwt.verify(token,process.env.JWT_SECRET);
const user= await User.findById(decoded_data.id);
if (! user){
    res.status(400).json({message: "user not found"});
}
req.user=user;
delete req.user.password;
next();


}

module.exports.restrict=(role) =>{
    return  (req,res,next) =>{
        if (req.user.userType===role){
            return next();
        }
            res.status(400).json({message: "unauthorized user"});
        
    }
    r
    
}

