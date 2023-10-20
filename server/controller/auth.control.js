const User = require('../model/user')
const bcryptjs = require('bcryptjs')
const signup = async(req,res) => {
    try {
         const {username, email, password} = req.body;
         const hashedPassword = bcryptjs.hashSync(password,10);
         const newUser = new User({username,email,password:hashedPassword});
          const result = await newUser.save();
           res.send(result)
          console.log(result)
        
     } catch (error) {
        res.status(500).json(error.message)
     }
}

module.exports = {
    signup
}