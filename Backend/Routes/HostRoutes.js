const express = require('express');
const router = express.Router();
const hostFunc = require("../HostService/HostFunctions")
const broadcast = require("../RealTime/broadcast")


router.post("/events", async(req,res)=>{
    try{ const event = await hostFunc.createEvent(req.body)
        broadcast.broadcast(req.app, "EVENT_CREATED", event)
         return res.status(200).json(event)
    }catch(err){console.error(err); res.status(500).json({message:err.message, stack:err.stack})}
})

router.get("/events", async (req,res)=>{
     try{const id = req.user.id
      const events = await hostFunc.getHostEvents(id)
      return res.status(200).json(events)
 }catch(err){console.error(err); res.status(500).json({message:err.message, stack:err.stack})}
})

router.get("/events/:eventid", async (req,res)=>{
    try{
        const attendeeAnalytics = await hostFunc.getEventAnalytics(req.params.eventid)
        return res.status(200).json(attendeeAnalytics)
    }catch(err){console.error(err); res.status(500).json({message:err.message, stack:err.stack})}
})

module.exports = router;


