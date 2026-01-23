const express = require('express');
const router = express.Router();
const broadcast = require("../RealTime/broadcast")
const vendorFunc = require("../VendorServices/VendorFunctions.js");
const VendorAnalytics = require("../VendorServices/VendorAnalytics.js")
const func = require("../GeneralFunctions.js")

router.get("/events", async (req,res)=>{
     try{const id = req.user.id
          const events = await vendorFunc.getVendorEvents(id)
          return res.status(200).json(events)
     }catch(err){console.error(err); res.status(500).json({message:err.message, stack:err.stack})}
    })
    
router.get("/events/:eventId/analytics", async (req, res) => {
  try {const
      data = await vendorFunc.VendorAnalyticsFrameWork(1,req.params.eventId)
      const booth = new VendorAnalytics.BoothAnalytics()
      const repMap = {};
      data.eventScans.forEach(s =>{
       const {dayKey,hourKey} = func.getDayHourKeys(s.scannedAt,data.event.timeZone)
       booth.addScan(dayKey,hourKey)
       const repId = s.salesRepId; if (!repId) return;
       if (!repMap[repId]) repMap[repId] = new VendorAnalytics.RepAnalytics();
       repMap[repId].addScan(data.reps, s, dayKey, hourKey);
      })
      
      data.analyticsObject.reps = Object.values(repMap);
      data.analyticsObject.booth =booth
      data.analyticsObject.reps.forEach(r=>r.finalize())


     return res.status(200).json(data.analyticsObject)

          
     }catch(err){console.error(err); res.status(500).json({message:err.message, stack:err.stack})}
})
module.exports = router;

