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
  try {
    const data = await vendorFunc.VendorAnalyticsFrameWork(
      req.user.id,
      req.params.eventId
    );

    console.log("DATA SHAPE:", Object.keys(data));
    console.log("EVENT SCANS:", data.eventScans?.length);
    console.log("REPS:", data.reps?.length);
    

    const vendorAnalyticsObj = VendorAnalytics.buildVendorAnalytics(data);
    return res.status(200).json(vendorAnalyticsObj);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
});
module.exports = router