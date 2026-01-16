const express = require('express');
const router = express.Router();
const auth = require("../AuthService/AutheService");
const userService = require("../UserService/UserFunctions")
const authController = require("../AuthService/AuthController")
const hostFunc = require("../HostService/HostFunctions")

router.get("/events", async (req,res)=>{
 try{const id = req.user.id
      const events = await hostFunc.getHostEvents(id)
      return res.status(200).json(events)
 }catch(err){console.error(err); res.status(500).json({message:err.message, stack:err.stack})}
})



