const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var fetchuser=require('../middleware/fetchuser')

const JWT_SECRET_KEY = "gatewayformyapplication";

//ROUTE 1:  Create a User using POST: "/api/auth/createuser"
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    // If errors found.. then return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Check whether user exists
    try {
      let user = await User.findOne({ email: req.body.email });
      // console.log(user)
      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }
      //Creating the hashed password or implementing password hashing.
      const salt = await bcrypt.genSalt(10); //generates the salt
      const securedPassword = await bcrypt.hash(req.body.password, salt); //hashing the password using salt value
      // Creating a promise to create a user in User collection
      user = await User.create({
        name: req.body.name,
        password: securedPassword,
        email: req.body.email,
      });
      //setting data
      const data = {
        user: {
          id: user.id,
        },
      };
      //Used to create a jwt authentication token or jwt token
      //sign() is a synchronized function --> no need of await
      const jwtData = jwt.sign(data, JWT_SECRET_KEY);
      console.log(jwtData);
      res.json(jwtData);
    } catch (error) {
      //Catching the errors if user cannot created
      console.log("Error in creating the new user", error);
      res.status(500).send("Some error has occured");
    }
  }
);

//ROUTE 2:  Authenticating the user using POST: "api/auth/login"
router.post(
    "/login",
    [
      body("email", "Enter a valid email").isEmail(),
      body("password", "Enter a valid password").exists(),
    ],
    async (req, res) => {
      //Reporting errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //Destructuring and getting the values of email and password from req.body
      const {email,password}=req.body;
      try {
        //Fetching the user creadential using email
        let user=await User.findOne({email})
        //Reporting the error to the user
        if(!user){
          return res.status(400).json({error:'Invalid user credentials'})
        }
        //Comparing the passwords entered by user if we get valid email
        const passwordCompare=await bcrypt.compare(password,user.password)

        if(!passwordCompare){
          return res.status(400).json({error:'Invalid user credentials'})
        }

        const data = {
          user: {
            id: user.id,
          },
        };
        const jwtData = jwt.sign(data, JWT_SECRET_KEY);
      console.log(jwtData);
      res.json(jwtData);
        
      } catch (error) {
        console.error(error.message)
      res.status(500).send("Internal server error");
      }
    })

//ROUTE 3:  Get loggedin user's details using POST: "api/auth/getuser"
router.post(
  "/getuser",fetchuser, async (req, res) => {
try {
  var userId=req.user.id;
  const user= await User.findById(userId).select("-password")
  res.send(user)
  console.log(user)
  
} catch (error) {
  console.error(error.message)
      res.status(500).send("Internal server error");
}
})

module.exports = router;
