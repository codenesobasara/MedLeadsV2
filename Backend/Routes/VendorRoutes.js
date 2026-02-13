const express = require('express');
const router = express.Router();
const broadcast = require("../RealTime/broadcast")
const vendorFunc = require("../VendorServices/VendorFunctions.js");
const VendorAnalytics = require("../VendorServices/VendorAnalytics.js")
const Rep = require("../Models/SalesRepProfile.js")
const User = require("../Models/Users.js")
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

router.post("/events/:eventId/rep", async (req, res) => {
  try {
    const vendorId = Number(req.user.id);
    const eventId = req.params.eventId;

    const rep = req.body.rep;
    const shifts = req.body.shifts ?? [];
    const territories = req.body.territories ?? [];
    const exists = await User.findOne({ where: { email: rep.email } }); 
    if (exists) {
      return res.status(409).json({ message: "this user already exists" });
    }
    const newRep = await vendorFunc.createRep( 
      rep,
      vendorId,
      eventId,
      territories,
      shifts
    );
    const enrichedRep = VendorAnalytics.enrichRep(newRep,eventId)
    return res.status(200).json({ enrichedRep });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message, stack: err.stack });
  }
});

router.get('/vendor/events/:eventId/:repId/analytics', async (req,res)=>{

})

router.get("/events/:eventId/reps/:salesRepId/attendees", async (req, res) => {
  try {
    const vendorId = req.user.id; 
    const eventId = req.params.eventId;
    const salesRepId = req.params.salesRepId; 
    const day = req.query.day; 
    const cursorDate = req.query.cursorDate || null;
    const cursorId = req.query.cursorId ? Number(req.query.cursorId) : null;

    let data;
    if (day) {
      data = await vendorFunc.getDailyRepAttendees(
        salesRepId,
        vendorId,
        eventId,
        cursorDate,
        cursorId,
        day
      );
    } else {
      data = await vendorFunc.getTotalRepAttendees(
        salesRepId,
        vendorId,
        eventId,
        cursorDate,
        cursorId
      );
    }

    const response = VendorAnalytics.buildRepAttendees(data, 10);
    return res.status(200).json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
});
module.exports = router