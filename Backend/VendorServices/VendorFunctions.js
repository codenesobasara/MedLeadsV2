const VendorEvents = require("../Models/Vendorevent")
const EventModel = require("../Models/EventModel")
const SalesRep = require("../Models/SalesRepProfile")
const VendorQuestion =require("../Models/VendorQuestions")
const VendorProduct = require("../Models/VendorProductsModel")
const Scan = require("../Models/ScanModel")
const Attendee =require ("../Models/Attendee")
const Shift = require("../Models/ShiftsModel")
const func = require("../GeneralFunctions")
const { where, col, literal, fn } = require("sequelize")
const { DateTime } = require('luxon');
const { Op } = require('sequelize');


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
 const reps = await SalesRep.findAll({ where: { vendorId, eventId } })
const eventScans = await Scan.findAll({ where: { vendorId, eventId, type: "Scan" } })
 const products = await VendorProduct.findAll({ where: { vendorId:vendorId } })
const questions = await VendorQuestion.findAll({ where: { vendorId } })
 const event = await EventModel.findByPk(eventId)
 const eventAttendees = await Attendee.findAll({
  include: [{model: Scan, required: true,attributes: [],
    where: { vendorId, eventId, type: "Scan" }
  }]
});
 const ScannedProducts = await VendorProduct.findAll({include: [{ model: Scan,required: true,where: { vendorId, eventId },through: { attributes: [] },}],});
 const analyticsObject = VendorAnalyticsObject()
 const repShifts = await Shift.findAll({where:{vendorId,eventId}})
 
return {reps,eventScans,products,questions,event, analyticsObject,eventAttendees,ScannedProducts,repShifts}
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

async function BoothBase(vendorId,eventId){
  const repCount = await SalesRep.count({where:{eventId:eventId,vendorId:vendorId}})
  const totalScanCount = await Scan.count({where:{vendorId:vendorId,eventId:eventId,type:"scan"}})
  const activeRepCount = await Scan.count({where:{vendorId:vendorId,eventId:eventId,type:"scan"}, distinct:true, col:'salesRepId'})
  const attendeesScanned = await Scan.count({where:{vendorId,eventId,type:"scan"}, distinct:true,col:"attendeeId"})
  const questions = await VendorQuestion.findAll({vendorId,eventId})
  const topFiveReps = await Scan.findAll({
    where:{eventId,vendorId,type:"scan"},
    attributes:["salesRepId",[fn("COUNT",col("id")),"ScanCount"]],
    include:[{
    model:SalesRep, 
    attributes:["firstName","lastName"],
    required:true
    }],
    group:["salesRepId", "SalesRep.id"],
    order:[[literal("ScanCount"),"DESC"]],
    limit:5,
    raw:true
  })
  const topFiveAttendees = await Scan.findAll({
    where:{eventId,vendorId,type:"scan"},
    attributes:["attendeeId",[fn('COUNT',col("id")),"ScanCount"]],
    include:[{
      model:Attendee,
      attributes:["firstName","lastName"],
      required:true
    }],
    group:["attendeeId","Attendee.id"],
    order:[[literal("ScanCount"), "DESC"]],
    limit:5,
    raw:true
  })
  const peakScanDay= await Scan.findOne({
  where: { eventId, vendorId, type: "scan" },
  attributes: [
    [fn("DATE", col("createdAt")), "day"],
    [fn("COUNT", col("id")), "scanCount"]
  ],
  group: [fn("DATE", col("createdAt"))],
  order: [[literal("scanCount"), "DESC"]],
  raw: true
});
  return data ={repCount,totalScanCount,activeRepCount,attendeesScanned,topFiveReps,topFiveAttendees,peakScanDay}
}

async function scansOverTimeChart(date, tz, vendorId, eventId) {
  const start = DateTime.fromISO(date, { zone: tz }).startOf('day');
  const end = start.endOf('day');
  const offset = start.toFormat('ZZ'); 
  const chartData = await Scan.findAll({
    where: {
      eventId,
      vendorId,
      type: "scan",
      scannedAt: {
        [Op.between]: [start.toJSDate(), end.toJSDate()]
      },
    },
    attributes: [
      [
        fn('HOUR', fn('CONVERT_TZ', col('scannedAt'), '+00:00', offset)), 
        'hour'
      ],
      [fn('COUNT', col('id')), 'count']
    ],
    group: [fn('HOUR', fn('CONVERT_TZ', col('scannedAt'), '+00:00', offset))],
    order: [[fn('HOUR', fn('CONVERT_TZ', col('scannedAt'), '+00:00', offset)), "ASC"]],
    raw: true
  });

  return chartData;
}



 }






module.exports ={getVendorEvents,VendorAnalyticsFrameWork,VendorAnalyticsObject,}