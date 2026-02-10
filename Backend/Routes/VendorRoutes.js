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
        const eventId = req.params.eventId
        const vendorId = req.user.id
        const data = await VendorAnalytics.getBoothBaseData(vendorId,eventId)
        const result = VendorAnalytics.buildBoothBaseObject(data)
        res.status(200).json(result)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
});

router.get("/events/:eventId/analytics/reps", async (req, res) => {
  try {
    const vendorId = req.user.id;
    const eventId = req.params.eventId;
    const day = req.query.day || null;
    const data = await VendorAnalytics.getRepAnalyticsData(vendorId, eventId, day);
    const result = VendorAnalytics.buildRepAnalyticsObject(data);

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message, stack: err.stack });
  }
});
module.exports = router