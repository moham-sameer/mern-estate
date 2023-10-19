const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to MongoDB")
}).catch((err)=>{
 console.log(err)
})