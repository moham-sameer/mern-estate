const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  username: {
     type: String,
     required: [true, "must provide name"],
     trim: true,
     unique:true,
     maxlength: [40, "name can not be more than 20 characters"],
   },
  email: {
     type: String,
     required: [true, "must provide name"],
     trim: true,
     unique:true,
     maxlength: [40, "name can not be more than 20 characters"],
   },
   password: {
     type: String,
     required: [true, "must provide password"],
     trim: true,
     maxlength: [40, "name can not be more than 20 characters"],
   },
},{timestamps: true})

module.exports = mongoose.model('users',productSchema);