const express = require('express')
const { getItems, createItems, updateUser } = require('../controller/user.control')
const { verifyToken } = require('../utils/verifyUser')
const router = express.Router()

router.get('/',getItems).post('/',createItems)
router.post('/update/:id',verifyToken,updateUser)

module.exports = router