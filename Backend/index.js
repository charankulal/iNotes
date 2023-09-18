const connectToMongo=require('./db')
const express=require('express')


connectToMongo();

const app=express()
const port=3000

app.get('/',(req,res)=>
    res.send("Hello")
)
app.get('/api/v1/login',(req,res)=>
    res.send("Login")
)
app.get('/api/v1/signup',(req,res)=>
    res.send("Signup")
)

app.listen(port,()=>
    console.log("example")
)