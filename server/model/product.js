 const mongoose = require('mongoose')

 const productSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "must provide name"],
      trim: true,
      maxlength: [40, "name can not be more than 20 characters"],
    },
    password: {
      type: String,
      required: [true, "must provide password"],
      trim: true,
      maxlength: [40, "name can not be more than 20 characters"],
    },
 })

 module.exports = mongoose.model('products',productSchema)