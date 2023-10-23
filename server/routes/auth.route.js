const express = require('express')
const { signup, signin, google } = require('../controller/auth.control')
 const router = express.Router()

 router.route('/signup').post(signup)
 router.route('/signin').post(signin)
 router.route('/google').post(google)

 module.exports = router;
   