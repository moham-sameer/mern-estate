const express = require('express')
const app = express()
const cors = require('cors')
const userRouter = require('./routes/user.route')
const authRouter = require('./routes/auth.route')
const cookieParser = require('cookie-parser')
require('./db/connect')
// const corsOptions = {
//     origin: 'http://localhost:5173', // Replace with the actual origin of your React app
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,  // If you are using cookies or sessions
//     optionsSuccessStatus: 204,
//   };
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use((error,req,res, next) =>{
 const statusCode = error.statusCode || 500;
 const message = error.message || "Internal Server Error";
 return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
 })
})
app.listen(3000,console.log('server is listening on port 3000...'))