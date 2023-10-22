const User = require('../model/user')
const bcryptjs = require('bcryptjs');
const errorHandler = require('../utils/error');
const jwt = require('jsonwebtoken')
const signup = async(req,res, next) => {
    try {
         const {username, email, password} = req.body;
         const hashedPassword = bcryptjs.hashSync(password,10);
         const newUser = new User({username,email,password:hashedPassword});
          const result = await newUser.save();
           res.send(result)
          console.log(result)
        
        } catch (error) {
            next(error);
            
        }
    }
     const signin = async(req,res,next)=>{
        const {email, password} = req.body
        try {
           const validUser = await User.findOne({email});
           if(!validUser) return next(errorHandler(404,"User not found")) 
           const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword) return next(errorHandler(401,"wrong credentials"));
        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET)
        const {password:clearingpasswordforsecurity,...rest} = validUser._doc;
         res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)

        } catch (error) {
           next(error) 
        }
     }

module.exports = {
    signup,signin
}
