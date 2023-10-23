const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  username: {
     type: String,
     required: [true, "must provide username"],
     trim: true,
     unique:true,
     maxlength: [40, "name can not be more than 40 characters"],
   },
  email: {
     type: String,
     required: [true, "must provide email"],
     trim: true,
     unique:true,
     maxlength: [40, "name can not be more than 40 characters"],
   },
   password: {
     type: String,
     required: [true, "must provide password"], 
   },
   avatar: {
     type: String,
     default:"https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg" 
   },
},{timestamps: true})

module.exports = mongoose.model('users',productSchema);