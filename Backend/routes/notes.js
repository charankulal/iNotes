const express=require('express')
const router=express.Router()

router.get('/',(req,res)=>{
    let obj={
        a:'name',
        number:35
    }
    res.json(obj)
})
module.exports=router