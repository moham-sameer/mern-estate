const express = require('express')
const { getItems, createItems } = require('../controller/user.control')
const router = express.Router()

router.route('/').get(getItems).post(createItems)

module.exports = router