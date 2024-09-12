const express = require('express')
const router = express.Router();
const User = require('../models/User')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const JWT_SECRET='avanisG00dg*rl';
const fetchuser=require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator')
//ROUTE 1 - authenticate a user using /api/auth/createuser 
router.post('/createuser', [
  // authentication of user data
  body('name', "enter a valid name with min value : 3").isLength({ min: 3 }),
  body('email', "enter a valid email").isEmail(),
  body('password', "enter a valid password with min value : 5").isLength({ min: 5 }),
], async (req, res) => {
  // getting validated if any error occurs
  const errors = validationResult(req);
  let success=false;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    // check condition if a user already exist with the mail id
    // it will return a promise so keep await for that
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      success=false;
      return res.status(400).json({ "error": "Sorry a User with this email already exist" })
    }

    const salt= await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(req.body.password,salt);
    // returns a promise
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    })
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET)
    success=true;
    res.json({success,authtoken});
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Some Internal Error Occured");
  }

})
//ROUTE 2 - authenticate a user using /api/auth/login
router.post('/login', [
  // authentication of user data
  body('email', "enter a valid email").isEmail(),
  body('password','password cannot be blank').exists(),
], async (req, res) => {
  const errors=validationResult(req);
  if(!errors.isEmpty()){
          return res.status(400).json({errors:errors.array()})
  }
  const {email,password}=req.body;
  try{
    let user =await User.findOne({email});
    let success=false;
    if(!user){
      success=false;
      return res.status(400).json({error:"Please try to enter correct credentials"})
    }
    const passwordCompare= await bcrypt.compare(password,user.password);

    if(!passwordCompare){
       success=false;
      return res.status(400).json({error:"Please try to enter correct credentials"});
    }
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    success=true;
    res.json({success,authtoken})
  }catch(error){
    console.error(error.message)
    res.status(500).send("Some Internal Error Occured");
  }
})
// ROUTE 3 -  get logged i user details /getuser . Login required
router.post('/getuser',fetchuser,async (req,res)=>{
  try{
   const userId=req.user.id;
    const user=await User.findById(userId).select("-password");
   res.send(user)
  }catch(err){
    console.error(err.message)
    res.status(500).send("Some Internal Error Occured");
  }
  
})
// user details api
router.get('/username', fetchuser, async (req, res) => {
  try {
      const userId = req.user.id; // Extract the user id from request
      const user = await User.findById(userId).select("name"); // Find user by id and select the name field

      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ name: user.name });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal Error Occurred");
  }
});

module.exports = router;