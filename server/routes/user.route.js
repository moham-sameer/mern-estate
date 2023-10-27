const express = require('express')
const { getItems, createItems, updateUser, deleteUser } = require('../controller/user.control')
const { verifyToken } = require('../utils/verifyUser')
const router = express.Router()

router.get('/',getItems).post('/',createItems)
router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',deleteUser)
module.exports = router;