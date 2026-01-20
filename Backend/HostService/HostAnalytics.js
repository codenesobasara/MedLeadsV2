
const attendees = require("../Models/Attendee")
const scans = require("../Models/ScanModel")
const func = require("../GeneralFunctions")
const hostfunc =require("../HostService/HostFunctions")
const vendors = require("../Models/VendorProfile")
const reps = require("../Models/SalesRepProfile")
const event = require("../Models/EventModel")
const { where, Sequelize } = require("sequelize")
const { Op } = require('sequelize');
const { createEventAnalyticsObject } = require("../GeneralFunctions")
const fetchEventData = require("../HostService/HostFunctions")
/**
 * @param {{ allEventScans: [], attendingVendors: [] }} data 
 * @param {ReturnType<typeof createEventAnalyticsObject>} obj
 */



function eventAnalytics(data,obj){
const {allEventScans,attendingVendors} = data  
const vendorMap ={}
const hourMap ={}
allEventScans.forEach(scan => {
obj.totals.totalScans++
const ID = scan.vendorId;
const date = new Date(scan.scannedAt).toISOString().split('T')[0]; 
const hour = `${new Date(scan.scannedAt).getHours()}:00`;
if(!vendorMap[ID]){vendorMap[ID] ={vendorId:ID, name:scan.companyName, count:0,dayhour:{[date]:{[hour]:0}}}}
vendorMap[ID].count++
if(!vendorMap[ID].dayhour[date]){vendorMap.dayhour[date]={}}
if(!vendorMap[ID].dayhour[date][time]){vendorMap.dayhour[date][time]=0}
if (!hourMap[date]) hourMap[date] = {}; 
hourMap[date][hour] = (hourMap[date][hour] || 0) + 1;
})
let peak = { Day: "", hourKey: "", scans: 0 };
for (const day in hourMap) {
    for (const hour in hourMap[day]) {
    const scans = hourMap[day][hour];
    if (scans > peak.scans) {
      peak = { Day: day, hourKey: hour, scans };
    }
  }
}
const sortedVendors = Object.values(vendorMap).sort((a, b) => b.count - a.count);
obj.vendorCharData = Object.values(sortedVendors)
obj.summary.vendorEngagementRate =Object.values(vendorMap).length / attendingVendors.length;
obj.summary.avgScansPerActiveVendor = allEventScans.length/Object.values(vendorMap).length;
obj.eventScans =allEventScans;
obj.summary.peakHour = peak;
obj.summary.topVendor=  sortedVendors[0].name;
obj.Attendingvendors = attendingVendors;
obj.activeVendors =Object.values(vendorMap);
obj.totals.byDayHour = hourMap;
obj.summary.activeVendorsAmount = Object.values(vendorMap).length;
obj.summary.attendingVendorsAmount = attendingVendors.length ;
 return obj
}




























module.exports={eventAnalytics}