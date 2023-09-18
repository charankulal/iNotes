const express=require('express')
const User = require('../models/User')
const router=express.Router()

//Create a User using POST
router.post('/',(req,res)=>{
    console.log(req.body)
    var user=User(req.body)
    user.save()
    res.send(req.body)
    
})
module.exports=router