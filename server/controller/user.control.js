 const User = require('../model/user')
const Product = require('../model/user')
const errorHandler = require('../utils/error')
const bcryptjs = require('bcryptjs')
const getItems = async(req,res)=>{
    try {
        
        const data = await Product.find({})
        res.send(data)
        console.log(data)
    } catch (error) {
        res.status(500).json({error,msg:"There might be a problem with the internet or the cluster"})
        console.log(error)
    }
}
const createItems = async(req,res)=>{
    try {
        
        const data = new Product(req.body);
        const result = await data.save()
        res.send(result)
        
    } catch (error) {
       res.status(500).json({error,msg:"There might be a problem with the internet or cluster"})
       console.log(error)
    }
}
const updateUser = async(req,res,next)=>{
 if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own account!'))
  try {
    if(req.body.password){
        req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }
    
    const updatedUser = await User.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            username:req.body.username,
            email:req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
        }
    },{new:true})
    const {password,...rest} = updatedUser._doc;
    res.status(200).json({rest})
  } catch (error) {
    next(error)
  }
}
const deleteUser = async(req,res,next)=>{
    const data = await User.findOneAndDelete({_id:req.params.id})
    if(!data) return next(errorHandler(404,`There is no data with this id: ${req.params.id}`))
    res.send(data)
}
module.exports = {
    getItems, createItems,updateUser,deleteUser
}