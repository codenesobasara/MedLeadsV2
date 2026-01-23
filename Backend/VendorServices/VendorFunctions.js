const VendorEvents = require("../Models/Vendorevent")
const EventModel = require("../Models/EventModel")
const salesReps = require("../Models/SalesRepProfile")
const VendorQuestion =require("../Models/VendorQuestions")
const VendorProduct = require("../Models/VendorProductsModel")
const scan = require("../Models/ScanModel")
const func = require("../GeneralFunctions")
const { where } = require("sequelize")


async function getVendorEvents(id){
const attendingEvents = await VendorEvents.findAll({
    where:{id},
    attributes:['eventId'],
    raw:true
})
const eventIds =attendingEvents.map(e => e.eventId)
if(eventIds.length === 0){return []}
 const events = await event.findAll({ where: { id: eventIds } })
  return events.map(e => {
    const obj = e.toJSON();
    obj.attendeeGroups = obj.attendeeGroups
      ? JSON.parse(obj.attendeeGroups)
      : [];
    return obj;
  });
}




async function VendorAnalyticsFrameWork(vendorId,eventId){
 const reps = await salesReps.findAll({where:{vendorId}}) 
 const eventScans = await scan.findAll({vendorId,eventId})
 const products = await VendorProduct.findAll({vendorId})
 const questions = await VendorQuestion.findAll({vendorId})
 const event = await EventModel.findByPk(eventId)
 const analyticsObject = VendorAnalyticsObject()
 
return {reps,eventScans,products,questions,event, analyticsObject}
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