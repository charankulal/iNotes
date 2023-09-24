const express=require('express')
const User = require('../models/User')
const router=express.Router()
const {body, validationResult} = require('express-validator')

//Create a User using POST
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid password').isLength({min:8}),
], async (req,res)=>{
    // If errors found.. then return bad request
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    //Check whether user exists
    try{
    let user= await User.findOne({email:req.body.email})
    console.log(user)
    if(user){
        return  res.status(400).json({error:"User already exists"})
    }
    // Creating a promise to create a user in User collection
    user= await User.create({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email,
    })
    res.json(user)}
    //Catching the errors if user cannot created
    catch(error){
        console.log("Error in creating the new user", error);
        res.status(500).send("Some error has occured")
    }
    
    
    
       
})
module.exports=router