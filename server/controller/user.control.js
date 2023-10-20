 const Product = require('../model/user')

const getItems = async(req,res)=>{
    try {
        
        const data = await Product.find({})
        res.send(data)
        console.log(data)
    } catch (error) {
        res.status(500).json({error,msg:"There might be a problem with the internet or the cluster"})
        console.log(error)
    }
}
const createItems = async(req,res)=>{
    try {
        
        const data = new Product(req.body);
        const result = await data.save()
        res.send(result)
    } catch (error) {
       res.status(500).json({error,msg:"There might be a problem with the internet or cluster"})
       console.log(error)
    }
}

module.exports = {
    getItems, createItems
}