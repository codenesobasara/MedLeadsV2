const express = require('express');
const router = express.Router();
const auth = require("../AuthService/AutheService");
const userService = require("../UserService/UserFunctions")
const authController = require("../AuthService/AuthController")
const connection = require("../mainConfig");

router.post("/login", async (req,res)=>{
     console.log("✅ HIT /auth/login", req.body);
try{const {email,password} = req.body
const user = await auth.authCheck(email,password)
if(!user){return res.status(404).json({message:"user not found"})}
const tokens = await auth.authorize(user)
if(!tokens){res.status(500).json({message:"Failed to Create Tokens"})}
return res.status(200).json({tokens})
}catch(err){console.error(err); res.status(500).json({message:err.message, stack:err.stack})}
})

router.post("/register", async (req,res)=>{
  try{
    const data = req.body
    if(Object,keys(data).length === 3){
    const user = auth.createUser(data)
    if(user){const Tokens = auth.authorize(user); return res.status(200).json({message:"user Created", Tokens})}}
    if(Object.keys(data).length > 3){
    const existingUser = await userService.getUserByEmail(data.email)
    await existingUser.update(data)
    const tokens = await auth.authorize(existingUser)
    return res.status(200).json({message:"user created", tokens})
    }return res.status(500).json({message:"Failed to Create User"})
  }catch(err){console.error(err); res.status(500).json({message:err.message, stack:err.stack})}
})

router.post("/auth/refresh",authController.refreshToken)

module.exports = router;