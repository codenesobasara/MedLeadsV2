

const host = require("../Models/HostProfile")
const Events = require("../Models/EventModel")
const scans = require("../Models/ScanModel")
const Vendor = require("../Models/VendorProfile")
const func = require("../GeneralFunctions")
const hostanalytics = require("../HostService/HostAnalytics")
const { where } = require("sequelize")
const { createEventAnalyticsObject } = require("../GeneralFunctions")


async function createHost(data){
const newHost = await host.createHost(data)
return newHost
}

async function getHostEvents(id){
    const events = await Events.findAll({where:{hostId:id}})
    return events
}

async function getSingleEvent(id) {
    const event = await Events.findByPk(id)
    return event
}

async function createEvent(data) {
const newEvent = await Events.create(data)
return newEvent    
}


async function fetchEventData(id){
const [allEventScans,attendingVendors] = await Promise.all([
    scans.findAll({where:{eventId:id,type: "scan"},
        include:[{model:Vendor, attributes:['companyName']}]
    }), Vendor.findAll({where:{eventId:id}})]
)

return {allEventScans,attendingVendors}}

async function getEventAnalytics (id){
const obj = func.createEventAnalyticsObject()
const data = await fetchEventData(id)
const analyticsObj = hostanalytics.eventAnalytics(data,obj)
return analyticsObj
}





module.exports ={getEventAnalytics, getHostEvents}