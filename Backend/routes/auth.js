const express=require('express')
const User = require('../models/User')
const router=express.Router()
const {body, validationResult} = require('express-validator')

//Create a User using POST
router.post('/',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid password').isLength({min:8}),
],(req,res)=>{
    
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    User.create({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email,
    }).then(user=>res.json(user))
    .catch(err=>{console.log(err)
    res.json({error:'The Email Already Exists',message:err.message})
    })
       
})
module.exports=router