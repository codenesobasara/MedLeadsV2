const VendorEvents = require("../Models/Vendorevent")
const EventModel = require("../Models/EventModel")
const salesReps = require("../Models/SalesRepProfile")
const VendorQuestion =require("../Models/VendorQuestions")
const VendorProduct = require("../Models/VendorProductsModel")
const scan = require("../Models/ScanModel")
const Attendee =require ("../Models/Attendee")
const shifts = require("../Models/ShiftsModel")
const func = require("../GeneralFunctions")


async function getVendorEvents(id){
const attendingEvents = await VendorEvents.findAll({
    where:{id},
    attributes:['eventId'],
    raw:true})
const eventIds =attendingEvents.map(e => e.eventId)
if(eventIds.length === 0){return []}
 const events = await EventModel.findAll({ where: { id: eventIds } })
  return events.map(e => {
    const obj = e.toJSON();
    obj.attendeeGroups = obj.attendeeGroups
      ? JSON.parse(obj.attendeeGroups)
      : [];
    return obj;
  });
}


async function VendorAnalyticsFrameWork(vendorId,eventId){
 const reps = await salesReps.findAll({ where: { vendorId, eventId } })
const eventScans = await scan.findAll({ where: { vendorId, eventId, type: "scan" } })
 const products = await VendorProduct.findAll({ where: { vendorId:vendorId } })
const questions = await VendorQuestion.findAll({ where: { vendorId } })
 const event = await EventModel.findByPk(eventId)
 const eventAttendees = await Attendee.findAll({
  include: [{model: scan, required: true,attributes: [],
    where: { vendorId, eventId, type: "scan" }
  }]
});
 const scannedProducts = await VendorProduct.findAll({include: [{ model: scan,required: true,where: { vendorId, eventId },through: { attributes: [] },}],});
 const analyticsObject = VendorAnalyticsObject()
 const repShifts = await shifts.findAll({where:{vendorId,eventId}})
 
return {reps,eventScans,products,questions,event, analyticsObject,eventAttendees,scannedProducts,repShifts}
}


function VendorAnalyticsObject(){
  return obj ={
    booth:{
      totalScans:0,
      peakDay:{},
      peakDayHour:{},
      questions:[],
      attendingReps:[],
      allScans:[],
      dayHourScans:[],
      avgScansPerRep:0,
      activeRepCount:0,
      
    },
    reps:[]
  }
}




module.exports ={getVendorEvents,VendorAnalyticsFrameWork,VendorAnalyticsObject,}