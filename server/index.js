const express = require('express')
const app = express()
const Product = require('./model/product')
require('./db/connect')
app.use(express.json())
app.get('/',async(req,res)=>{
    try {
        
        const data = await Product.find({})
        res.send(data)
        console.log(data)
    } catch (error) {
        res.status(500).json({error,msg:"There might be a problem with the internet or the cluster"})
        console.log(error)
    }
})

app.post('/',async(req,res)=>{
    try {
        
        const data = new Product(req.body);
        const result = await data.save()
        res.send(result)
    } catch (error) {
       res.status(500).json({error,msg:"There might be a problem with the internet or cluster"})
       console.log(error)
    }
})

app.listen(4444,console.log('server is listening on port 4444...'))