const express = require('express')
const app = express()
const userRouter = require('./routes/user.route')
const authRouter = require('./routes/auth.route')
require('./db/connect')
app.use(express.json())
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use((err,req,res, next) =>{
 const statusCode = err.statusCode || 500;
 const message = err.message || "Internal Server Error";
 return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
 })
})
app.listen(4444,console.log('server is listening on port 4444...'))