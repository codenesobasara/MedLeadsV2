const express = require('express');
const router = express.Router();
const auth = require("../AuthService/AutheService");
const userService = require("../UserService/UserFunctions")
const authController = require("../AuthService/AuthController")
const func = require("../VendorServices/VendorFunctions")
const EventModel = require("../Models/EventModel")
const connection = require("../mainConfig");

router.post("/login", async (req,res)=>{
try{const {email,password} = req.body
const user = await auth.authCheck(email,password)
if(!user){return res.status(404).json({message:"user not found"})}
const tokens = await auth.authorize(user)
if(!tokens){return res.status(500).json({message:"Failed to Create Tokens"})}
return res.status(200).json({tokens})
}catch(err){console.error(err); return res.status(500).json({message:err.message})}
})

router.post("/register", async (req,res)=>{
  try{
    const data = req.body
    if(Object.keys(data).length === 3){
    const user = await auth.createUser(data.email, data.password, data.role)
    if(user){const Tokens = await auth.authorize(user); return res.status(200).json({message:"user Created", Tokens})}}
    if(Object.keys(data).length > 3){
    const existingUser = await userService.getUserByEmail(data.email)
    if(!existingUser){return res.status(404).json({message:"User not found"})}
    await existingUser.update(data)
    const tokens = await auth.authorize(existingUser)
    return res.status(200).json({message:"user created", tokens})
    }return res.status(400).json({message:"Invalid user data"})
  }catch(err){console.error(err); return res.status(500).json({message:err.message})}
})

router.post("/auth/refresh",authController.refreshToken)

router.get('/test', async(req,res)=>{
  try{
   const eventId = Number(req.query.eventId )
   const vendorId = Number(req.query.vendorId)
  result = await func.boothBase(vendorId,eventId)
  res.status(200).json(result)
  }catch(err){console.error(err); return res.status(500).json({message:err.message})}

})

module.exports = router;