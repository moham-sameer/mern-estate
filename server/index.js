const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.send("Hello World! How are you ?")
})

app.listen(4444,console.log('server is listening on port 4444...'))