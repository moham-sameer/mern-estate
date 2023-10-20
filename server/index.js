const express = require('express')
const app = express()
const Router = require('./routes/user.route')
require('./db/connect')
app.use(express.json())
app.use('/api/user',Router)

app.listen(4444,console.log('server is listening on port 4444...'))