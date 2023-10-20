const express = require('express')
const { signup } = require('../controller/auth.control')
 const router = express.Router()

 router.route('/signup').post(signup)

 module.exports = router;
